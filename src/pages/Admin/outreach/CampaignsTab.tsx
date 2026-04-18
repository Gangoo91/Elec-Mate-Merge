import { useState, useEffect, useMemo } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Skeleton } from '@/components/ui/skeleton';
import AdminEmptyState from '@/components/admin/AdminEmptyState';
import {
  Mail,
  Plus,
  Clock,
  Send,
  Loader2,
  Eye,
  MousePointerClick,
  Sparkles,
} from 'lucide-react';
import { formatDistanceToNow, format } from 'date-fns';
import CampaignDetail from './CampaignDetail';
import {
  callOutreach,
  CAMPAIGN_STATUS_STYLES,
  type OutreachCampaign,
} from './shared';

interface CampaignsTabProps {
  onNewCampaign: () => void;
  onJumpToTemplates: () => void;
  externalSelectedCampaign?: OutreachCampaign | null;
  onExternalSelectionConsumed?: () => void;
}

export default function CampaignsTab({
  onNewCampaign,
  onJumpToTemplates,
  externalSelectedCampaign,
  onExternalSelectionConsumed,
}: CampaignsTabProps) {
  const queryClient = useQueryClient();
  const [selectedCampaign, setSelectedCampaign] = useState<OutreachCampaign | null>(null);
  const [statusFilter, setStatusFilter] = useState<'all' | 'draft' | 'scheduled' | 'sending' | 'completed'>('all');

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['outreach-campaigns'],
    queryFn: () => callOutreach('get_campaigns'),
    staleTime: 15_000,
  });

  const campaigns: OutreachCampaign[] = useMemo(
    () => data?.campaigns || [],
    [data]
  );

  // Auto-refresh while sending
  useEffect(() => {
    const anySending = campaigns.some((c) => c.status === 'sending');
    if (anySending) {
      const interval = setInterval(() => refetch(), 3000);
      return () => clearInterval(interval);
    }
  }, [campaigns, refetch]);

  // Consume external selection (e.g. from Overview tab)
  useEffect(() => {
    if (externalSelectedCampaign) {
      setSelectedCampaign(externalSelectedCampaign);
      onExternalSelectionConsumed?.();
    }
  }, [externalSelectedCampaign, onExternalSelectionConsumed]);

  const filtered = campaigns.filter((c) =>
    statusFilter === 'all' ? true : c.status === statusFilter
  );

  const counts = campaigns.reduce(
    (acc, c) => {
      acc.all++;
      if (c.status === 'draft') acc.draft++;
      else if (c.status === 'scheduled') acc.scheduled++;
      else if (c.status === 'sending') acc.sending++;
      else if (c.status === 'completed') acc.completed++;
      return acc;
    },
    { all: 0, draft: 0, scheduled: 0, sending: 0, completed: 0 }
  );

  return (
    <div className="space-y-4">
      {/* Action row */}
      <div className="grid grid-cols-2 gap-2">
        <Button
          className="h-12 gap-2 bg-elec-yellow hover:bg-elec-yellow/90 text-black font-semibold touch-manipulation rounded-xl"
          onClick={onNewCampaign}
        >
          <Plus className="h-5 w-5" />
          New
        </Button>
        <Button
          variant="outline"
          className="h-12 gap-2 border-violet-500/30 bg-violet-500/10 text-violet-300 hover:bg-violet-500/20 touch-manipulation rounded-xl font-semibold"
          onClick={onJumpToTemplates}
        >
          <Sparkles className="h-5 w-5" />
          From template
        </Button>
      </div>

      {/* Status filter pills */}
      <div className="-mx-1 overflow-x-auto no-scrollbar">
        <div className="flex gap-2 px-1 pb-1">
          {(['all', 'draft', 'scheduled', 'sending', 'completed'] as const).map((s) => {
            const active = statusFilter === s;
            const n = counts[s];
            return (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                className={`shrink-0 h-10 px-3.5 rounded-full border text-sm font-medium touch-manipulation transition-colors ${
                  active
                    ? 'bg-elec-yellow text-black border-elec-yellow'
                    : 'bg-white/[0.03] text-white/80 border-white/10 hover:bg-white/[0.08]'
                }`}
              >
                {s === 'all' ? 'All' : s.charAt(0).toUpperCase() + s.slice(1)}
                <Badge
                  className={`ml-2 h-5 ${
                    active ? 'bg-black/20 text-black' : 'bg-white/10 text-white/70'
                  }`}
                >
                  {n}
                </Badge>
              </button>
            );
          })}
        </div>
      </div>

      {/* List */}
      {isLoading ? (
        <div className="space-y-3">
          {[0, 1, 2].map((i) => (
            <Skeleton key={i} className="h-32 rounded-2xl" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <AdminEmptyState
          icon={Mail}
          title={
            statusFilter === 'all'
              ? 'No campaigns yet'
              : `No ${statusFilter} campaigns`
          }
          description={
            statusFilter === 'all'
              ? 'Create your first outreach campaign — start from a template or from scratch.'
              : 'Switch filter or create a new campaign.'
          }
        />
      ) : (
        <div className="space-y-3">
          {filtered.map((c) => (
            <CampaignCard
              key={c.id}
              campaign={c}
              onSelect={() => setSelectedCampaign(c)}
            />
          ))}
        </div>
      )}

      {selectedCampaign && (
        <CampaignDetail
          campaign={selectedCampaign}
          open={!!selectedCampaign}
          onOpenChange={(v) => !v && setSelectedCampaign(null)}
          onRefresh={() => {
            refetch();
            queryClient.invalidateQueries({ queryKey: ['outreach-stats'] });
          }}
          onCloned={(c) => {
            refetch();
            setSelectedCampaign(c);
          }}
        />
      )}
    </div>
  );
}

function CampaignCard({
  campaign,
  onSelect,
}: {
  campaign: OutreachCampaign;
  onSelect: () => void;
}) {
  const progress =
    campaign.total_recipients > 0
      ? Math.round((campaign.sent_count / campaign.total_recipients) * 100)
      : 0;
  const openRate =
    campaign.sent_count > 0
      ? Math.round((campaign.open_count / campaign.sent_count) * 100)
      : null;
  const clickRate =
    campaign.sent_count > 0
      ? Math.round((campaign.click_count / campaign.sent_count) * 100)
      : null;

  return (
    <Card
      className="border-border/30 cursor-pointer active:scale-[0.99] transition-transform touch-manipulation overflow-hidden"
      onClick={onSelect}
    >
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-elec-yellow/10 border border-elec-yellow/30 flex items-center justify-center shrink-0">
            {campaign.status === 'sending' ? (
              <Send className="h-4 w-4 text-elec-yellow animate-pulse" />
            ) : campaign.status === 'scheduled' ? (
              <Clock className="h-4 w-4 text-violet-300" />
            ) : campaign.status === 'completed' ? (
              <Eye className="h-4 w-4 text-green-400" />
            ) : (
              <Mail className="h-4 w-4 text-elec-yellow" />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-white truncate text-sm">{campaign.name}</h3>
              <Badge className={`${CAMPAIGN_STATUS_STYLES[campaign.status] || ''} text-[10px] shrink-0`}>
                {campaign.status}
              </Badge>
            </div>
            <p className="text-xs text-white/60 truncate mt-0.5">{campaign.subject}</p>
          </div>
        </div>

        {campaign.status === 'scheduled' && campaign.scheduled_at && (
          <div className="mt-3 bg-violet-500/10 border border-violet-500/20 rounded-lg px-3 py-2 flex items-center gap-2">
            <Clock className="h-3.5 w-3.5 text-violet-300" />
            <p className="text-xs text-violet-200">
              Scheduled for {format(new Date(campaign.scheduled_at), "dd MMM yyyy 'at' HH:mm")}
            </p>
          </div>
        )}

        {(campaign.status === 'sending' ||
          campaign.status === 'completed' ||
          campaign.status === 'paused') && (
          <>
            <div className="mt-3">
              <Progress value={progress} className="h-2" />
              <div className="flex items-center justify-between mt-1.5 text-xs">
                <span className="text-white/60">
                  {campaign.sent_count}/{campaign.total_recipients}
                </span>
                <span className="text-white/60">{progress}%</span>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2 mt-3">
              <MiniStat
                icon={Send}
                value={campaign.sent_count.toLocaleString()}
                label="Sent"
                colour="text-white"
              />
              <MiniStat
                icon={Eye}
                value={openRate !== null ? `${openRate}%` : '—'}
                label={`${campaign.open_count} opens`}
                colour="text-green-400"
              />
              <MiniStat
                icon={MousePointerClick}
                value={clickRate !== null ? `${clickRate}%` : '—'}
                label={`${campaign.click_count} clicks`}
                colour="text-blue-400"
              />
            </div>
          </>
        )}

        {campaign.status === 'draft' && (
          <p className="text-[11px] text-white/50 mt-2">
            Created {formatDistanceToNow(new Date(campaign.created_at), { addSuffix: true })}
          </p>
        )}

        {campaign.status === 'sending' && (
          <div className="flex items-center gap-2 mt-3 text-blue-300 text-xs">
            <Loader2 className="h-3 w-3 animate-spin" />
            Sending…
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function MiniStat({
  icon: Icon,
  value,
  label,
  colour,
}: {
  icon: typeof Mail;
  value: string;
  label: string;
  colour: string;
}) {
  return (
    <div className="bg-white/[0.03] border border-white/[0.06] rounded-lg px-2.5 py-2">
      <div className={`flex items-center gap-1 ${colour}`}>
        <Icon className="h-3 w-3" />
        <span className="text-sm font-bold">{value}</span>
      </div>
      <p className="text-[10px] text-white/50 mt-0.5 truncate">{label}</p>
    </div>
  );
}
