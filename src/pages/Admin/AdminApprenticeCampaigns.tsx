import { useState, useMemo } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { formatDistanceToNow, parseISO, format } from 'date-fns';
import PullToRefresh from '@/components/admin/PullToRefresh';
import AdminSearchInput from '@/components/admin/AdminSearchInput';
import AdminEmptyState from '@/components/admin/AdminEmptyState';
import { useHaptic } from '@/hooks/useHaptic';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Users,
  Send,
  Mail,
  Loader2,
  Target,
  ChevronRight,
  Clock,
  Eye,
  User,
  CheckCheck,
  GraduationCap,
  TrendingUp,
  Sparkles,
  BookOpen,
  Bell,
  Gift,
} from 'lucide-react';

// Campaign type definitions
const CAMPAIGN_TYPES = {
  feature_spotlight: {
    label: 'Feature Spotlight',
    description: 'Highlight a specific feature to subscribed apprentices',
    icon: Sparkles,
    colour: 'from-purple-500 to-violet-500',
    badgeColour: 'bg-purple-500/20 text-purple-400',
  },
  new_content: {
    label: 'New Content',
    description: 'Announce new content or features to subscribed apprentices',
    icon: BookOpen,
    colour: 'from-green-500 to-emerald-500',
    badgeColour: 'bg-green-500/20 text-green-400',
  },
  engagement_nudge: {
    label: 'Engagement Nudge',
    description: 'Re-engage subscribed apprentices inactive for 14+ days',
    icon: Bell,
    colour: 'from-blue-500 to-cyan-500',
    badgeColour: 'bg-blue-500/20 text-blue-400',
  },
  trial_winback: {
    label: 'Trial Win-Back',
    description: 'Win back apprentices whose trial expired without subscribing',
    icon: Gift,
    colour: 'from-amber-500 to-orange-500',
    badgeColour: 'bg-amber-500/20 text-amber-400',
  },
} as const;

type CampaignType = keyof typeof CAMPAIGN_TYPES;

const SPOTLIGHT_FEATURES = [
  { key: 'study_centre', label: 'Study Centre' },
  { key: 'am2_simulator', label: 'AM2 Simulator' },
  { key: 'epa_simulator', label: 'EPA Simulator' },
  { key: 'portfolio_hub', label: 'Portfolio Hub' },
  { key: 'site_diary', label: 'Site Diary' },
  { key: 'ask_dave', label: 'Ask Dave' },
  { key: 'mental_health', label: 'Mental Health Hub' },
  { key: 'career_development', label: 'Career Development' },
  { key: 'ojt_hub', label: 'OJT Hub' },
  { key: 'learning_videos', label: 'Learning Videos' },
  { key: 'calculators', label: 'Calculators' },
];

interface EligibleUser {
  id: string;
  full_name: string | null;
  username: string;
  email: string;
  created_at: string;
  last_sign_in?: string;
  apprentice_campaign_sent_at?: string;
}

interface SentUser {
  id: string;
  full_name: string | null;
  username: string;
  created_at: string;
  apprentice_campaign_sent_at: string;
  apprentice_campaign_type: string;
  subscribed: boolean;
}

export default function AdminApprenticeCampaigns() {
  const queryClient = useQueryClient();
  const haptic = useHaptic();

  // State
  const [campaignType, setCampaignType] = useState<CampaignType>('trial_winback');
  const [search, setSearch] = useState('');
  const [selectedUsers, setSelectedUsers] = useState<Set<string>>(new Set());
  const [selectedUser, setSelectedUser] = useState<EligibleUser | null>(null);
  const [confirmSendAll, setConfirmSendAll] = useState(false);
  const [showSentHistory, setShowSentHistory] = useState(false);
  const [testEmail, setTestEmail] = useState('');
  const [manualEmail, setManualEmail] = useState('');

  // Campaign-specific config
  const [featureKey, setFeatureKey] = useState('study_centre');
  const [contentTitle, setContentTitle] = useState('');
  const [contentDescription, setContentDescription] = useState('');

  const campaignConfig = CAMPAIGN_TYPES[campaignType];

  // ─── Queries ────────────────────────────────────────────
  const { data: stats, isLoading: statsLoading } = useQuery({
    queryKey: ['apprentice-campaign-stats', campaignType],
    queryFn: async () => {
      const { data, error } = await supabase.functions.invoke('send-apprentice-campaign', {
        body: { action: 'get_stats', campaignType },
      });
      if (error) throw error;
      return data;
    },
    staleTime: 30000,
    refetchInterval: 60000,
  });

  const { data: eligibleUsers, isLoading: usersLoading } = useQuery({
    queryKey: ['apprentice-campaign-eligible', campaignType],
    queryFn: async () => {
      const { data, error } = await supabase.functions.invoke('send-apprentice-campaign', {
        body: { action: 'get_eligible', campaignType },
      });
      if (error) throw error;
      return data?.users || [];
    },
    staleTime: 30000,
  });

  const { data: sentUsers, isLoading: sentLoading } = useQuery({
    queryKey: ['apprentice-campaign-sent'],
    queryFn: async () => {
      const { data, error } = await supabase.functions.invoke('send-apprentice-campaign', {
        body: { action: 'get_sent_history' },
      });
      if (error) throw error;
      return (data?.users || []) as SentUser[];
    },
    enabled: showSentHistory,
    staleTime: 30000,
  });

  // ─── Mutations ──────────────────────────────────────────
  const campaignParams = {
    campaignType,
    featureKey: campaignType === 'feature_spotlight' ? featureKey : undefined,
    contentTitle: campaignType === 'new_content' ? contentTitle : undefined,
    contentDescription: campaignType === 'new_content' ? contentDescription : undefined,
  };

  const sendSingleMutation = useMutation({
    mutationFn: async (uid: string) => {
      const { data, error } = await supabase.functions.invoke('send-apprentice-campaign', {
        body: { action: 'send_single', userId: uid, ...campaignParams },
      });
      if (error) throw error;
      return data;
    },
    onSuccess: (data) => {
      haptic.success();
      toast.success(`Campaign email sent to ${data.email}`);
      queryClient.invalidateQueries({
        queryKey: ['apprentice-campaign-stats'],
      });
      queryClient.invalidateQueries({
        queryKey: ['apprentice-campaign-eligible'],
      });
      queryClient.invalidateQueries({
        queryKey: ['apprentice-campaign-sent'],
      });
      setSelectedUser(null);
      setSelectedUsers((prev) => {
        const next = new Set(prev);
        next.delete(data.email);
        return next;
      });
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (err: any) => {
      haptic.error();
      toast.error(err.message || 'Failed to send email');
    },
  });

  const sendBulkMutation = useMutation({
    mutationFn: async (uids: string[]) => {
      const { data, error } = await supabase.functions.invoke('send-apprentice-campaign', {
        body: { action: 'send_bulk', userIds: uids, ...campaignParams },
      });
      if (error) throw error;
      return data;
    },
    onSuccess: (data) => {
      haptic.success();
      toast.success(
        `Sent ${data.sent} emails${data.skipped ? `, ${data.skipped} skipped` : ''}${data.failed ? `, ${data.failed} failed` : ''}`
      );
      queryClient.invalidateQueries({
        queryKey: ['apprentice-campaign-stats'],
      });
      queryClient.invalidateQueries({
        queryKey: ['apprentice-campaign-eligible'],
      });
      queryClient.invalidateQueries({
        queryKey: ['apprentice-campaign-sent'],
      });
      setSelectedUsers(new Set());
      setConfirmSendAll(false);
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (err: any) => {
      haptic.error();
      toast.error(err.message || 'Bulk send failed');
    },
  });

  const sendTestMutation = useMutation({
    mutationFn: async (email: string) => {
      const { data, error } = await supabase.functions.invoke('send-apprentice-campaign', {
        body: { action: 'send_test', testEmail: email, ...campaignParams },
      });
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      haptic.success();
      toast.success('Test email sent!');
      setTestEmail('');
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (err: any) => {
      haptic.error();
      toast.error(err.message || 'Failed to send test email');
    },
  });

  const sendManualMutation = useMutation({
    mutationFn: async (email: string) => {
      const { data, error } = await supabase.functions.invoke('send-apprentice-campaign', {
        body: {
          action: 'send_manual',
          manualEmail: email,
          ...campaignParams,
        },
      });
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      haptic.success();
      toast.success('Email sent!');
      setManualEmail('');
      queryClient.invalidateQueries({
        queryKey: ['apprentice-campaign-stats'],
      });
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (err: any) => {
      haptic.error();
      toast.error(err.message || 'Failed to send email');
    },
  });

  // ─── Filtering & Selection ─────────────────────────────
  const filteredUsers = useMemo(() => {
    if (!eligibleUsers) return [];
    if (!search) return eligibleUsers;
    const q = search.toLowerCase();
    return eligibleUsers.filter(
      (u: EligibleUser) =>
        u.full_name?.toLowerCase().includes(q) ||
        u.email?.toLowerCase().includes(q) ||
        u.username?.toLowerCase().includes(q)
    );
  }, [eligibleUsers, search]);

  const toggleUserSelection = (uid: string) => {
    setSelectedUsers((prev) => {
      const next = new Set(prev);
      if (next.has(uid)) next.delete(uid);
      else next.add(uid);
      return next;
    });
  };

  const toggleSelectAll = () => {
    if (selectedUsers.size === filteredUsers.length) {
      setSelectedUsers(new Set());
    } else {
      setSelectedUsers(new Set(filteredUsers.map((u: EligibleUser) => u.id)));
    }
  };

  const handleSendSelected = () => {
    if (selectedUsers.size > 0) {
      setConfirmSendAll(true);
    }
  };

  // Reset selection when campaign type changes
  const handleCampaignTypeChange = (ct: CampaignType) => {
    setCampaignType(ct);
    setSelectedUsers(new Set());
    setSearch('');
  };

  return (
    <PullToRefresh
      onRefresh={async () => {
        await Promise.all([
          queryClient.invalidateQueries({
            queryKey: ['apprentice-campaign-stats'],
          }),
          queryClient.invalidateQueries({
            queryKey: ['apprentice-campaign-eligible'],
          }),
        ]);
      }}
    >
      <div className="space-y-4 pb-20">
        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-violet-500 flex items-center justify-center">
            <GraduationCap className="h-5 w-5 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-bold">Apprentice Campaigns</h2>
            <p className="text-xs text-muted-foreground">
              Targeted email campaigns for apprentice users
            </p>
          </div>
        </div>

        {/* Campaign Type Selector */}
        <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
          {(Object.keys(CAMPAIGN_TYPES) as CampaignType[]).map((ct) => {
            const config = CAMPAIGN_TYPES[ct];
            const Icon = config.icon;
            const isActive = campaignType === ct;
            return (
              <Button
                key={ct}
                variant={isActive ? 'default' : 'ghost'}
                size="sm"
                onClick={() => handleCampaignTypeChange(ct)}
                className={`shrink-0 gap-1.5 touch-manipulation h-11 px-3 text-xs ${
                  isActive
                    ? `bg-gradient-to-r ${config.colour} text-white hover:opacity-90`
                    : 'text-muted-foreground'
                }`}
              >
                <Icon className="h-4 w-4" />
                {config.label}
              </Button>
            );
          })}
        </div>

        {/* Campaign Description */}
        <p className="text-sm text-muted-foreground px-1">{campaignConfig.description}</p>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <Card className="bg-gradient-to-br from-purple-500/10 to-purple-500/5 border-purple-500/20">
            <CardContent className="pt-4 pb-3 px-4">
              <div className="flex items-center gap-2 mb-1">
                <Target className="h-4 w-4 text-purple-400" />
                <span className="text-xs text-muted-foreground">Eligible</span>
              </div>
              <p className="text-xl sm:text-2xl font-bold">
                {statsLoading ? '...' : stats?.totalEligible || 0}
              </p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-blue-500/10 to-blue-500/5 border-blue-500/20">
            <CardContent className="pt-4 pb-3 px-4">
              <div className="flex items-center gap-2 mb-1">
                <Send className="h-4 w-4 text-blue-400" />
                <span className="text-xs text-muted-foreground">Sent</span>
              </div>
              <p className="text-xl sm:text-2xl font-bold">
                {statsLoading ? '...' : stats?.offersSent || 0}
              </p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-green-500/10 to-green-500/5 border-green-500/20">
            <CardContent className="pt-4 pb-3 px-4">
              <div className="flex items-center gap-2 mb-1">
                <CheckCheck className="h-4 w-4 text-green-400" />
                <span className="text-xs text-muted-foreground">Converted</span>
              </div>
              <p className="text-xl sm:text-2xl font-bold">
                {statsLoading ? '...' : stats?.conversions || 0}
              </p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-amber-500/10 to-amber-500/5 border-amber-500/20">
            <CardContent className="pt-4 pb-3 px-4">
              <div className="flex items-center gap-2 mb-1">
                <TrendingUp className="h-4 w-4 text-amber-400" />
                <span className="text-xs text-muted-foreground">Rate</span>
              </div>
              <p className="text-xl sm:text-2xl font-bold">
                {statsLoading ? '...' : `${stats?.conversionRate || 0}%`}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Campaign Config Card */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center gap-2">
              <campaignConfig.icon className="h-4 w-4 text-amber-400" />
              Campaign Configuration
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {campaignType === 'feature_spotlight' && (
              <div>
                <label className="text-sm text-muted-foreground mb-2 block">
                  Feature to highlight
                </label>
                <Select value={featureKey} onValueChange={setFeatureKey}>
                  <SelectTrigger className="h-11 touch-manipulation bg-elec-gray border-elec-gray focus:border-elec-yellow focus:ring-elec-yellow data-[state=open]:border-elec-yellow data-[state=open]:ring-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="z-[100] bg-elec-gray border-elec-gray text-foreground">
                    {SPOTLIGHT_FEATURES.map((f) => (
                      <SelectItem key={f.key} value={f.key}>
                        {f.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {campaignType === 'new_content' && (
              <>
                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">Content title</label>
                  <Input
                    value={contentTitle}
                    onChange={(e) => setContentTitle(e.target.value)}
                    placeholder="e.g. AM2 Practice Mode"
                    className="h-11 text-base touch-manipulation border-white/30 focus:border-yellow-500 focus:ring-yellow-500"
                  />
                </div>
                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">Description</label>
                  <Textarea
                    value={contentDescription}
                    onChange={(e) => setContentDescription(e.target.value)}
                    placeholder="What's new and why it's useful..."
                    className="touch-manipulation text-base min-h-[100px] focus:ring-2 focus:ring-elec-yellow/20 border-white/30 focus:border-yellow-500"
                  />
                </div>
              </>
            )}

            {/* Test email */}
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">Send test email</label>
              <div className="flex gap-2">
                <Input
                  type="email"
                  value={testEmail}
                  onChange={(e) => setTestEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="h-11 text-base touch-manipulation flex-1"
                />
                <Button
                  onClick={() => testEmail && sendTestMutation.mutate(testEmail)}
                  disabled={!testEmail || sendTestMutation.isPending}
                  className="h-11 px-4 touch-manipulation bg-yellow-500 hover:bg-yellow-600"
                >
                  {sendTestMutation.isPending ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Preview the {campaignConfig.label.toLowerCase()} email in your inbox
              </p>
            </div>

            <p className="text-xs text-muted-foreground text-center">
              All emails include CTA: "Grab it now before the app store launch"
            </p>
          </CardContent>
        </Card>

        {/* Filters & Actions */}
        <Card>
          <CardContent className="pt-4 pb-4 px-3 sm:px-6">
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <AdminSearchInput
                  value={search}
                  onChange={setSearch}
                  placeholder="Search..."
                  className="flex-1"
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowSentHistory(!showSentHistory)}
                  className="gap-1.5 h-11 px-2.5 touch-manipulation text-muted-foreground shrink-0"
                >
                  <Eye className="h-4 w-4" />
                  <span className="hidden sm:inline">History</span>
                </Button>
              </div>

              {/* Manual Email Entry */}
              <div className="flex items-center gap-2 pt-2 border-t border-border/50">
                <Input
                  type="email"
                  value={manualEmail}
                  onChange={(e) => setManualEmail(e.target.value)}
                  placeholder="Send to any email..."
                  className="h-11 text-base touch-manipulation flex-1"
                />
                <Button
                  onClick={() => manualEmail && sendManualMutation.mutate(manualEmail)}
                  disabled={!manualEmail || sendManualMutation.isPending}
                  className={`h-11 px-4 touch-manipulation bg-gradient-to-r ${campaignConfig.colour} hover:opacity-90 text-white shrink-0`}
                >
                  {sendManualMutation.isPending ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <>
                      <Send className="h-4 w-4 mr-1.5" />
                      <span className="hidden sm:inline">Send</span>
                    </>
                  )}
                </Button>
              </div>

              {/* Bulk Actions */}
              {filteredUsers.length > 0 && (
                <div className="flex items-center justify-between pt-2 border-t border-border/50">
                  <div className="flex items-center gap-3">
                    <Checkbox
                      checked={
                        filteredUsers.length > 0 && selectedUsers.size === filteredUsers.length
                      }
                      onCheckedChange={toggleSelectAll}
                      className="border-white/40 data-[state=checked]:bg-amber-500 data-[state=checked]:border-amber-500"
                    />
                    <span className="text-sm text-muted-foreground">
                      {selectedUsers.size > 0 ? `${selectedUsers.size} selected` : 'Select all'}
                    </span>
                  </div>

                  {selectedUsers.size > 0 && (
                    <Button
                      size="sm"
                      onClick={handleSendSelected}
                      disabled={sendBulkMutation.isPending}
                      className={`gap-2 h-10 touch-manipulation bg-gradient-to-r ${campaignConfig.colour} hover:opacity-90 text-white`}
                    >
                      {sendBulkMutation.isPending ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="h-4 w-4" />
                          Send to {selectedUsers.size}
                        </>
                      )}
                    </Button>
                  )}
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Eligible Users List */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Target className="h-4 w-4 text-amber-400" />
                Eligible Users
              </span>
              <Badge variant="outline" className="text-xs">
                {filteredUsers.length} users
              </Badge>
            </CardTitle>
            <CardDescription>
              Apprentices eligible for {campaignConfig.label.toLowerCase()} campaign
            </CardDescription>
          </CardHeader>
          <CardContent>
            {usersLoading ? (
              <div className="space-y-2">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-16 bg-muted/50 rounded-lg animate-pulse" />
                ))}
              </div>
            ) : filteredUsers.length === 0 ? (
              <AdminEmptyState
                icon={Users}
                title="No eligible users"
                description={
                  search
                    ? 'No users match your search criteria.'
                    : `No apprentices eligible for ${campaignConfig.label.toLowerCase()} right now.`
                }
              />
            ) : (
              <div className="space-y-2">
                {filteredUsers.map((user: EligibleUser) => (
                  <div
                    key={user.id}
                    className="flex items-center gap-3 p-3 rounded-xl bg-muted/50 touch-manipulation active:scale-[0.99] transition-transform"
                  >
                    <Checkbox
                      checked={selectedUsers.has(user.id)}
                      onCheckedChange={() => toggleUserSelection(user.id)}
                      onClick={(e) => e.stopPropagation()}
                      className="border-white/40 data-[state=checked]:bg-amber-500 data-[state=checked]:border-amber-500"
                    />

                    <div
                      className="flex-1 min-w-0 cursor-pointer"
                      onClick={() => setSelectedUser(user)}
                    >
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-sm truncate">
                          {user.full_name || 'Unknown'}
                        </p>
                        <Badge className="bg-purple-500/20 text-purple-400 text-xs">
                          <GraduationCap className="h-2.5 w-2.5 mr-0.5" />
                          Apprentice
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span className="truncate max-w-[150px]">{user.email}</span>
                        <span>&middot;</span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          Joined{' '}
                          {formatDistanceToNow(parseISO(user.created_at), {
                            addSuffix: true,
                          })}
                        </span>
                      </div>
                    </div>

                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedUser(user)}
                      className="h-11 px-2 touch-manipulation"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Sent History Sheet */}
        <Sheet open={showSentHistory} onOpenChange={setShowSentHistory}>
          <SheetContent side="bottom" className="h-[70vh] rounded-t-2xl p-0">
            <div className="flex flex-col h-full">
              <div className="flex justify-center pt-3 pb-2">
                <div className="w-10 h-1 rounded-full bg-muted-foreground/30" />
              </div>

              <SheetHeader className="px-4 pb-4 border-b border-border">
                <SheetTitle className="text-left flex items-center gap-2">
                  <Mail className="h-5 w-5 text-blue-400" />
                  Sent History
                </SheetTitle>
                <p className="text-sm text-muted-foreground text-left">
                  Apprentices who have received campaign emails
                </p>
              </SheetHeader>

              <div className="flex-1 overflow-y-auto p-4">
                {sentLoading ? (
                  <div className="space-y-2">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="h-16 bg-muted/50 rounded-lg animate-pulse" />
                    ))}
                  </div>
                ) : !sentUsers || sentUsers.length === 0 ? (
                  <div className="text-center py-8">
                    <Mail className="h-10 w-10 text-muted-foreground mx-auto mb-3 opacity-50" />
                    <p className="text-sm text-muted-foreground">No campaign emails sent yet</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {sentUsers.map((user) => (
                      <div
                        key={user.id}
                        className="flex items-center gap-3 p-3 rounded-xl bg-muted/50"
                      >
                        <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center shrink-0">
                          <User className="h-5 w-5 text-purple-400" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm truncate">
                            {user.full_name || user.username}
                          </p>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <span>
                              {CAMPAIGN_TYPES[user.apprentice_campaign_type as CampaignType]
                                ?.label || user.apprentice_campaign_type}
                            </span>
                            <span>&middot;</span>
                            <span>
                              {formatDistanceToNow(parseISO(user.apprentice_campaign_sent_at), {
                                addSuffix: true,
                              })}
                            </span>
                          </div>
                        </div>
                        {user.subscribed ? (
                          <Badge className="bg-green-500/20 text-green-400 text-xs">
                            <CheckCheck className="h-3 w-3 mr-1" />
                            Subscribed
                          </Badge>
                        ) : (
                          <Badge className="bg-gray-500/20 text-gray-400 text-xs">Pending</Badge>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </SheetContent>
        </Sheet>

        {/* User Detail Sheet */}
        <Sheet open={!!selectedUser} onOpenChange={() => setSelectedUser(null)}>
          <SheetContent side="bottom" className="h-[70vh] rounded-t-2xl p-0">
            <div className="flex flex-col h-full">
              <div className="flex justify-center pt-3 pb-2">
                <div className="w-10 h-1 rounded-full bg-muted-foreground/30" />
              </div>

              <SheetHeader className="px-4 pb-4 border-b border-border">
                <SheetTitle className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-violet-500/20 flex items-center justify-center">
                    <User className="h-6 w-6 text-purple-400" />
                  </div>
                  <div>
                    <p className="text-left">{selectedUser?.full_name || 'Unknown'}</p>
                    <p className="text-sm font-normal text-muted-foreground">
                      {selectedUser?.email}
                    </p>
                  </div>
                </SheetTitle>
              </SheetHeader>

              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <GraduationCap className="h-4 w-4 text-purple-400" />
                      User Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Signed Up</span>
                      <span className="text-sm">
                        {selectedUser?.created_at &&
                          format(parseISO(selectedUser.created_at), 'dd MMM yyyy')}
                      </span>
                    </div>
                    {selectedUser?.last_sign_in && (
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Last Active</span>
                        <span className="text-sm">
                          {formatDistanceToNow(parseISO(selectedUser.last_sign_in), {
                            addSuffix: true,
                          })}
                        </span>
                      </div>
                    )}
                    {selectedUser?.apprentice_campaign_sent_at && (
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Last Campaign</span>
                        <span className="text-sm">
                          {formatDistanceToNow(parseISO(selectedUser.apprentice_campaign_sent_at), {
                            addSuffix: true,
                          })}
                        </span>
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <Send className="h-4 w-4 text-amber-400" />
                      Send {campaignConfig.label}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Button
                      className={`w-full h-12 touch-manipulation bg-gradient-to-r ${campaignConfig.colour} hover:opacity-90 text-white font-semibold`}
                      onClick={() => selectedUser && sendSingleMutation.mutate(selectedUser.id)}
                      disabled={sendSingleMutation.isPending}
                    >
                      {sendSingleMutation.isPending ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Mail className="h-4 w-4 mr-2" />
                          Send {campaignConfig.label} Email
                        </>
                      )}
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </SheetContent>
        </Sheet>

        {/* Confirm Bulk Send Dialog */}
        <AlertDialog open={confirmSendAll} onOpenChange={setConfirmSendAll}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Send {campaignConfig.label.toLowerCase()} to {selectedUsers.size} users?
              </AlertDialogTitle>
              <AlertDialogDescription>
                This will send the {campaignConfig.label.toLowerCase()} email to{' '}
                {selectedUsers.size} apprentice{selectedUsers.size === 1 ? '' : 's'}. This action
                cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="h-11 touch-manipulation">Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => sendBulkMutation.mutate(Array.from(selectedUsers))}
                className={`h-11 touch-manipulation bg-gradient-to-r ${campaignConfig.colour} hover:opacity-90 text-white`}
              >
                {sendBulkMutation.isPending ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4 mr-2" />
                    Send to {selectedUsers.size}
                  </>
                )}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </PullToRefresh>
  );
}
