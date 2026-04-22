import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Users,
  Mail,
  MousePointerClick,
  Eye,
  Sparkles,
  ArrowRight,
  Send,
  Clock,
  Zap,
  Loader2,
  TrendingUp,
  Target,
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { useToast } from '@/hooks/use-toast';
import {
  callOutreach,
  CAMPAIGN_STATUS_STYLES,
  type OutreachCampaign,
  type OutreachTemplate,
} from './shared';

interface OverviewTabProps {
  onJumpToCampaigns: () => void;
  onJumpToContacts: () => void;
  onJumpToTemplates: () => void;
  onOpenComposer: () => void;
  onSelectCampaign: (c: OutreachCampaign) => void;
}

export default function OverviewTab({
  onJumpToCampaigns,
  onJumpToContacts,
  onJumpToTemplates,
  onOpenComposer,
  onSelectCampaign,
}: OverviewTabProps) {
  const { data: stats, isLoading: loadingStats } = useQuery({
    queryKey: ['outreach-stats'],
    queryFn: () => callOutreach('get_stats'),
    staleTime: 30_000,
  });

  const { data: campaignData, isLoading: loadingCampaigns } = useQuery({
    queryKey: ['outreach-campaigns', 'overview'],
    queryFn: () => callOutreach('get_campaigns'),
    staleTime: 30_000,
  });

  const recent: OutreachCampaign[] = (campaignData?.campaigns || []).slice(0, 3);

  return (
    <div className="space-y-4">
      {/* Hero banner */}
      <HeroBanner onOpenComposer={onOpenComposer} onJumpToTemplates={onJumpToTemplates} />

      {/* KPI tiles */}
      <div className="grid grid-cols-2 gap-3">
        <KPICard
          label="Contacts"
          value={stats?.totalContacts}
          suffix={stats?.suppressedContacts ? `${stats.suppressedContacts} suppressed` : null}
          icon={Users}
          accent="text-blue-400 bg-blue-500/10 border-blue-500/20"
          loading={loadingStats}
          onClick={onJumpToContacts}
        />
        <KPICard
          label="Campaigns"
          value={stats?.totalCampaigns}
          suffix={stats?.totalSent ? `${stats.totalSent} sent` : null}
          icon={Mail}
          accent="text-elec-yellow bg-elec-yellow/10 border-elec-yellow/20"
          loading={loadingStats}
          onClick={onJumpToCampaigns}
        />
        <KPICard
          label="Open rate"
          value={stats ? `${stats.openRate}%` : undefined}
          suffix={stats?.totalOpened ? `${stats.totalOpened} opens` : null}
          icon={Eye}
          accent="text-green-400 bg-green-500/10 border-green-500/20"
          loading={loadingStats}
        />
        <KPICard
          label="Click rate"
          value={stats ? `${stats.clickRate}%` : undefined}
          suffix={stats?.totalClicked ? `${stats.totalClicked} clicks` : null}
          icon={MousePointerClick}
          accent="text-purple-400 bg-purple-500/10 border-purple-500/20"
          loading={loadingStats}
        />
      </div>

      {/* Quick Send widget */}
      <QuickSend />

      {/* Delivery health */}
      {stats && stats.totalSent > 0 && (
        <Card className="border-border/30">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-green-400" />
                <p className="text-sm font-semibold text-white">Delivery health</p>
              </div>
              <Badge className="bg-green-500/20 text-green-300 text-xs">Live</Badge>
            </div>
            <div className="grid grid-cols-4 gap-2">
              <HealthStat label="Delivered" value={stats.totalSent} colour="text-white" />
              <HealthStat
                label="Opened"
                value={stats.totalOpened}
                colour="text-green-400"
              />
              <HealthStat
                label="Clicked"
                value={stats.totalClicked}
                colour="text-blue-400"
              />
              <HealthStat
                label="Bounced"
                value={stats.totalBounced}
                colour="text-red-400"
              />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Recent campaigns */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-white" />
            <p className="text-sm font-semibold text-white">Recent campaigns</p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 text-elec-yellow hover:bg-elec-yellow/10 touch-manipulation"
            onClick={onJumpToCampaigns}
          >
            View all
            <ArrowRight className="h-3.5 w-3.5 ml-1" />
          </Button>
        </div>
        {loadingCampaigns ? (
          <div className="space-y-2">
            {[0, 1].map((i) => (
              <Skeleton key={i} className="h-20 rounded-2xl" />
            ))}
          </div>
        ) : recent.length === 0 ? (
          <Card className="border-border/30 border-dashed">
            <CardContent className="p-6 text-center">
              <Mail className="h-8 w-8 text-white mx-auto mb-2" />
              <p className="text-sm text-white">No campaigns yet</p>
              <Button
                size="sm"
                className="mt-3 h-10 bg-elec-yellow hover:bg-elec-yellow/90 text-black font-semibold rounded-xl touch-manipulation"
                onClick={onOpenComposer}
              >
                <Send className="h-4 w-4 mr-1" />
                Create first campaign
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-2">
            {recent.map((c) => (
              <Card
                key={c.id}
                className="border-border/30 cursor-pointer active:scale-[0.98] transition-transform touch-manipulation"
                onClick={() => onSelectCampaign(c)}
              >
                <CardContent className="p-3.5 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-elec-yellow/10 border border-elec-yellow/30 flex items-center justify-center shrink-0">
                    {c.status === 'sending' ? (
                      <Send className="h-4 w-4 text-elec-yellow animate-pulse" />
                    ) : c.status === 'scheduled' ? (
                      <Clock className="h-4 w-4 text-violet-300" />
                    ) : c.status === 'completed' ? (
                      <Eye className="h-4 w-4 text-green-400" />
                    ) : (
                      <Mail className="h-4 w-4 text-elec-yellow" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-semibold text-white truncate text-sm">{c.name}</p>
                      <Badge
                        className={`${CAMPAIGN_STATUS_STYLES[c.status] || ''} text-[10px] shrink-0`}
                      >
                        {c.status}
                      </Badge>
                    </div>
                    <p className="text-xs text-white truncate mt-0.5">
                      {c.sent_count}/{c.total_recipients} sent ·{' '}
                      {formatDistanceToNow(new Date(c.created_at), { addSuffix: true })}
                    </p>
                  </div>
                  <ArrowRight className="h-4 w-4 text-white shrink-0" />
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Hero banner ────────────────────────────────────────────────
function HeroBanner({
  onOpenComposer,
  onJumpToTemplates,
}: {
  onOpenComposer: () => void;
  onJumpToTemplates: () => void;
}) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-elec-yellow/30 bg-gradient-to-br from-elec-yellow/15 via-amber-600/5 to-transparent">
      <div
        className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-elec-yellow/20 blur-3xl pointer-events-none"
        aria-hidden
      />
      <div className="relative p-5">
        <div className="flex items-center gap-2 mb-1.5">
          <Target className="h-4 w-4 text-elec-yellow" />
          <p className="text-[11px] text-elec-yellow uppercase tracking-wider font-bold">
            Your outreach mission
          </p>
        </div>
        <h2 className="text-lg font-bold text-white leading-tight">
          Get Elec-Mate in front of every UK electrical apprentice.
        </h2>
        <p className="text-sm text-white mt-1.5 leading-relaxed">
          Start from a V1 template, or compose something new. Test send to yourself first, then
          fire to hundreds of colleges, tutors &amp; employers.
        </p>
        <div className="flex items-center gap-2 mt-4">
          <Button
            size="sm"
            className="h-10 gap-2 bg-elec-yellow hover:bg-elec-yellow/90 text-black font-semibold rounded-xl touch-manipulation"
            onClick={onOpenComposer}
          >
            <Send className="h-4 w-4" />
            New campaign
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="h-10 gap-2 border-elec-yellow/40 bg-black/20 text-elec-yellow hover:bg-elec-yellow/10 rounded-xl touch-manipulation"
            onClick={onJumpToTemplates}
          >
            <Sparkles className="h-4 w-4" />
            Browse templates
          </Button>
        </div>
      </div>
    </div>
  );
}

// ─── Quick Send widget ──────────────────────────────────────────
function QuickSend() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [email, setEmail] = useState('founder@elec-mate.com');
  const [templateSlug, setTemplateSlug] = useState<string>('');

  const { data: templateData, isLoading: loadingTemplates } = useQuery({
    queryKey: ['outreach-templates'],
    queryFn: () => callOutreach('list_templates'),
    staleTime: 60_000,
  });

  const templates: OutreachTemplate[] = templateData?.templates || [];

  const seedMutation = useMutation({
    mutationFn: () => callOutreach('seed_templates'),
    onSuccess: () => {
      toast({ title: 'Templates installed' });
      queryClient.invalidateQueries({ queryKey: ['outreach-templates'] });
    },
    onError: (e: Error) =>
      toast({ title: 'Error', description: e.message, variant: 'destructive' }),
  });

  const sendMutation = useMutation({
    mutationFn: () =>
      callOutreach('send_template_direct', {
        toEmail: email.trim(),
        templateSlug,
      }),
    onSuccess: () =>
      toast({
        title: 'Test email sent',
        description: `Check ${email} — should land in 5-10s.`,
      }),
    onError: (e: Error) =>
      toast({ title: 'Error', description: e.message, variant: 'destructive' }),
  });

  const canSend = email.includes('@') && templateSlug && !sendMutation.isPending;

  return (
    <Card className="border-violet-500/30 bg-gradient-to-br from-violet-500/10 via-purple-500/5 to-transparent overflow-hidden">
      <CardContent className="p-4">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-8 h-8 rounded-lg bg-violet-500/20 border border-violet-500/30 flex items-center justify-center">
            <Zap className="h-4 w-4 text-violet-300" />
          </div>
          <div>
            <p className="text-sm font-semibold text-white">Quick Send</p>
            <p className="text-[11px] text-white">
              One-off test to any address — no campaign needed.
            </p>
          </div>
        </div>

        {templates.length === 0 && !loadingTemplates ? (
          <div className="bg-elec-yellow/5 border border-elec-yellow/25 rounded-xl p-3 flex items-center gap-3">
            <Sparkles className="h-5 w-5 text-elec-yellow shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-white">Install templates first</p>
              <p className="text-[11px] text-white mt-0.5">
                One tap, then you can Quick Send any of 5 V1 emails.
              </p>
            </div>
            <Button
              size="sm"
              className="h-9 bg-elec-yellow hover:bg-elec-yellow/90 text-black font-semibold rounded-lg touch-manipulation shrink-0"
              onClick={() => seedMutation.mutate()}
              disabled={seedMutation.isPending}
            >
              {seedMutation.isPending ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                'Install'
              )}
            </Button>
          </div>
        ) : (
          <div className="space-y-2.5">
            <div>
              <Label className="text-white text-xs">Template</Label>
              <Select value={templateSlug} onValueChange={setTemplateSlug}>
                <SelectTrigger className="h-11 touch-manipulation rounded-xl mt-1">
                  <SelectValue placeholder="Pick a template…" />
                </SelectTrigger>
                <SelectContent>
                  {templates.map((t) => (
                    <SelectItem key={t.slug} value={t.slug}>
                      {t.thumbnail_emoji} {t.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-white text-xs">Send to</Label>
              <div className="flex gap-2 mt-1">
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your.email@domain.com"
                  className="h-11 flex-1 touch-manipulation"
                />
                <Button
                  className="h-11 px-5 gap-2 bg-elec-yellow hover:bg-elec-yellow/90 text-black font-semibold rounded-xl touch-manipulation shrink-0"
                  onClick={() => sendMutation.mutate()}
                  disabled={!canSend}
                >
                  {sendMutation.isPending ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                  Send
                </Button>
              </div>
            </div>
            <p className="text-[11px] text-white">
              Arrives with merge tags filled in (Sam Tutor · Sample College · London).
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// ─── KPI card ───────────────────────────────────────────────────
function KPICard({
  label,
  value,
  suffix,
  icon: Icon,
  accent,
  loading,
  onClick,
}: {
  label: string;
  value?: string | number;
  suffix?: string | null;
  icon: typeof Users;
  accent: string;
  loading?: boolean;
  onClick?: () => void;
}) {
  const content = (
    <CardContent className="p-5 relative overflow-hidden">
      <div
        className={`absolute -right-8 -top-8 w-24 h-24 rounded-full blur-2xl opacity-40 ${accent.split(' ').find((c) => c.startsWith('bg-')) || ''}`}
        aria-hidden
      />
      <div className="relative">
        <div className="flex items-center justify-between mb-3">
          <div className={`w-10 h-10 rounded-xl border flex items-center justify-center ${accent}`}>
            <Icon className="h-5 w-5" />
          </div>
        </div>
        {loading ? (
          <Skeleton className="h-10 w-20" />
        ) : (
          <>
            <p className="text-3xl font-bold text-white leading-none tracking-tight">
              {value === undefined || value === null ? '—' : value}
            </p>
            <p className="text-[11px] text-white uppercase tracking-wider font-semibold mt-1.5">
              {label}
            </p>
            {suffix && (
              <p className="text-[11px] text-white mt-0.5 truncate">{suffix}</p>
            )}
          </>
        )}
      </div>
    </CardContent>
  );
  if (onClick) {
    return (
      <button
        onClick={onClick}
        className="text-left active:scale-[0.97] transition-transform touch-manipulation"
      >
        <Card className="border-border/30 hover:border-elec-yellow/30 transition-colors overflow-hidden">
          {content}
        </Card>
      </button>
    );
  }
  return <Card className="border-border/30 overflow-hidden">{content}</Card>;
}

function HealthStat({
  label,
  value,
  colour,
}: {
  label: string;
  value: number;
  colour: string;
}) {
  return (
    <div className="text-center">
      <p className={`text-lg font-bold ${colour}`}>{value.toLocaleString()}</p>
      <p className="text-[10px] text-white uppercase tracking-wider">{label}</p>
    </div>
  );
}
