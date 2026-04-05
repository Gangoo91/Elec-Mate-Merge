import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useHaptic } from '@/hooks/useHaptic';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';
import {
  User,
  Mail,
  Calendar,
  Zap,
  Gift,
  Crown,
  CreditCard,
  Loader2,
  CheckCircle,
  XCircle,
  GraduationCap,
  Building2,
  MessageSquare,
  Clock,
  Eye,
  Activity,
  Flame,
  Snowflake,
  LogIn,
  Send,
  Timer,
  AlertTriangle,
} from 'lucide-react';
import { formatDistanceToNow, format } from 'date-fns';
import { cn } from '@/lib/utils';
import {
  getInitials,
  getRoleColor,
  calculateEngagementScore,
  getScoreColor,
  SCORE_COLOR_MAP,
} from '@/utils/adminUtils';
import MessageUserSheet from './MessageUserSheet';

interface UserData {
  id: string;
  full_name: string | null;
  email?: string;
  role?: string;
  subscribed?: boolean;
  subscription_tier?: string;
  subscription_end?: string | null;
  stripe_customer_id?: string | null;
  free_access_granted?: boolean;
  free_access_expires_at?: string | null;
  free_access_reason?: string | null;
  created_at: string;
  last_sign_in?: string | null; // From admin-get-users
}

// Format seconds into human readable time
const formatTimeSpent = (seconds: number): string => {
  if (!seconds || seconds === 0) return '0m';
  if (seconds < 60) return `${seconds}s`;
  if (seconds < 3600) return `${Math.round(seconds / 60)}m`;
  const hours = Math.floor(seconds / 3600);
  const mins = Math.round((seconds % 3600) / 60);
  return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
};

interface UserManagementSheetProps {
  user: UserData | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  extraActions?: React.ReactNode;
}

const tierPricing: Record<string, string> = {
  Apprentice: '£4.99/mo',
  Electrician: '£9.99/mo',
  Employer: '£29.99/mo',
};

export default function UserManagementSheet({
  user,
  open,
  onOpenChange,
  extraActions,
}: UserManagementSheetProps) {
  const queryClient = useQueryClient();
  const haptic = useHaptic();
  const [selectedTier, setSelectedTier] = useState<string>(
    user?.subscription_tier || 'Employer'
  );
  const [expiresOption, setExpiresOption] = useState<string>('7days');
  const [customExpiry, setCustomExpiry] = useState<string>('');
  const [reason, setReason] = useState<string>('');
  const [messageSheetOpen, setMessageSheetOpen] = useState(false);
  const [extendDate, setExtendDate] = useState('');
  const [manageTier, setManageTier] = useState(user?.subscription_tier || '');

  // Fetch user activity data + area breakdown
  const { data: activityData } = useQuery({
    queryKey: ['user-activity', user?.id],
    queryFn: async () => {
      if (!user?.id) return null;

      const [summaryRes, userActivityRes, areaRes, studyRes, featuresRes, journeyRes] = await Promise.all([
        supabase.from('user_activity_summary').select('*').eq('user_id', user.id).maybeSingle(),
        supabase
          .from('user_activity')
          .select('points, streak, last_active_date')
          .eq('user_id', user.id)
          .maybeSingle(),
        supabase
          .from('user_engagement_by_area' as any)
          .select('*')
          .eq('user_id', user.id)
          .order('seconds_in_area', { ascending: false }),
        supabase
          .from('user_study_detail' as any)
          .select('*')
          .eq('user_id', user.id)
          .order('seconds_spent', { ascending: false })
          .limit(10),
        supabase
          .from('user_events')
          .select('event_name, event_data, created_at')
          .eq('user_id', user.id)
          .eq('event_type', 'feature_use')
          .order('created_at', { ascending: false })
          .limit(20),
        supabase
          .from('user_events')
          .select('event_type, event_name, event_data, page_path, created_at')
          .eq('user_id', user.id)
          .in('event_type', ['login', 'feature_use', 'page_view', 'session_start'])
          .order('created_at', { ascending: false })
          .limit(50),
      ]);

      const summary = summaryRes.data;
      const userActivity = userActivityRes.data;

      return {
        loginCount: summary?.login_count || 0,
        pageViewCount: summary?.page_view_count || 0,
        featureUseCount: summary?.feature_use_count || 0,
        totalSecondsTracked: summary?.total_seconds_tracked || 0,
        uniquePagesVisited: summary?.unique_pages_visited || 0,
        activeDays: summary?.active_days || 0,
        lastActivity: summary?.last_activity,
        featuresUsed: summary?.features_used || [],
        points: userActivity?.points || 0,
        streak: userActivity?.streak || 0,
        areaBreakdown: (areaRes.data || []) as Array<{
          area: string;
          page_views: number;
          unique_pages: number;
          heartbeats: number;
          seconds_in_area: number;
          features_used: number;
          feature_names: string[] | null;
          active_days: number;
        }>,
        studyDetail: (studyRes.data || []) as Array<{
          page_path: string;
          course_level: string;
          module_slug: string;
          section_slug: string;
          views: number;
          seconds_spent: number;
        }>,
        recentFeatures: (featuresRes.data || []) as Array<{
          event_name: string;
          event_data: Record<string, any>;
          created_at: string;
        }>,
        journeyEvents: (journeyRes.data || []) as Array<{
          event_type: string;
          event_name: string | null;
          event_data: Record<string, any> | null;
          page_path: string | null;
          created_at: string;
        }>,
      };
    },
    enabled: !!user?.id && open,
    staleTime: 30 * 1000,
  });

  // Send trial reminder email mutation
  const sendEmailMutation = useMutation({
    mutationFn: async () => {
      if (!user) throw new Error('No user selected');
      const { data, error } = await supabase.functions.invoke('send-trial-reminder', {
        body: { userId: user.id, type: 'reminder' },
      });
      if (error) throw error;
      if (data?.skipped) {
        throw new Error('Email already sent today');
      }
      return data;
    },
    onSuccess: () => {
      toast({
        title: 'Email Sent',
        description: `Trial reminder sent to ${user?.full_name}`,
      });
      queryClient.invalidateQueries({ queryKey: ['admin-email-sends-today'] });
    },
    onError: (error) => {
      toast({
        title: 'Email Failed',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  // Grant free access mutation
  const grantMutation = useMutation({
    mutationFn: async () => {
      if (!user) throw new Error('No user selected');

      let expires_at: string | null = null;
      if (expiresOption === '7days') {
        const date = new Date();
        date.setDate(date.getDate() + 7);
        expires_at = date.toISOString();
      } else if (expiresOption === '30days') {
        const date = new Date();
        date.setDate(date.getDate() + 30);
        expires_at = date.toISOString();
      } else if (expiresOption === '90days') {
        const date = new Date();
        date.setDate(date.getDate() + 90);
        expires_at = date.toISOString();
      } else if (expiresOption === '1year') {
        const date = new Date();
        date.setFullYear(date.getFullYear() + 1);
        expires_at = date.toISOString();
      } else if (expiresOption === 'custom' && customExpiry) {
        expires_at = new Date(customExpiry).toISOString();
      }

      const { data, error } = await supabase.functions.invoke('admin-manage-subscription', {
        body: {
          action: 'grant_free_access',
          target_user_id: user.id,
          subscription_tier: selectedTier,
          expires_at,
          reason: reason || undefined,
        },
      });

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-dashboard-stats'] });
      queryClient.invalidateQueries({ queryKey: ['admin-users'] });
      toast({
        title: 'Access Granted',
        description: `${user?.full_name} now has ${selectedTier} access`,
      });
      onOpenChange(false);
      setReason('');
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  // Revoke free access mutation
  const revokeMutation = useMutation({
    mutationFn: async () => {
      if (!user) throw new Error('No user selected');

      const { data, error } = await supabase.functions.invoke('admin-manage-subscription', {
        body: {
          action: 'revoke_free_access',
          target_user_id: user.id,
          reason: reason || 'Admin revoked',
        },
      });

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-dashboard-stats'] });
      queryClient.invalidateQueries({ queryKey: ['admin-users'] });
      toast({
        title: 'Access Revoked',
        description: `${user?.full_name}'s free access has been revoked`,
      });
      onOpenChange(false);
      setReason('');
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  // Extend trial / subscription end date
  const handleExtendTrial = async () => {
    if (!user || !extendDate) return;
    const { error } = await supabase
      .from('profiles')
      .update({ subscription_end: new Date(extendDate).toISOString() } as Record<string, unknown>)
      .eq('id', user.id);
    if (error) {
      haptic.error();
      toast({
        title: 'Error extending trial',
        description: error.message,
        variant: 'destructive',
      });
      return;
    }
    haptic.success();
    toast({
      title: 'Trial extended',
      description: `Extended until ${extendDate}`,
    });
    setExtendDate('');
    queryClient.invalidateQueries({ queryKey: ['admin-users'] });
  };

  // Change subscription tier
  const handleChangeTier = async () => {
    if (!user || !manageTier || manageTier === user.subscription_tier) return;
    const { error } = await supabase
      .from('profiles')
      .update({ subscription_tier: manageTier } as Record<string, unknown>)
      .eq('id', user.id);
    if (error) {
      haptic.error();
      toast({
        title: 'Error updating tier',
        description: error.message,
        variant: 'destructive',
      });
      return;
    }
    haptic.success();
    toast({
      title: 'Tier updated',
      description: `Changed to ${manageTier}`,
    });
    queryClient.invalidateQueries({ queryKey: ['admin-users'] });
  };

  // Cancel subscription
  const handleCancelSubscription = async () => {
    if (!user) return;
    const { error } = await supabase
      .from('profiles')
      .update({
        subscribed: false,
        subscription_tier: null,
        subscription_end: null,
      } as Record<string, unknown>)
      .eq('id', user.id);
    if (error) {
      haptic.error();
      toast({
        title: 'Error cancelling subscription',
        description: error.message,
        variant: 'destructive',
      });
      return;
    }
    haptic.success();
    toast({ title: 'Subscription cancelled' });
    queryClient.invalidateQueries({ queryKey: ['admin-users'] });
  };

  const [showAllJourney, setShowAllJourney] = useState(false);

  if (!user) return null;

  const colors = getRoleColor(user.role);

  const isLoading = grantMutation.isPending || revokeMutation.isPending;

  // Compute engagement status
  const hasActivity = activityData && (activityData.loginCount > 0 || activityData.totalSecondsTracked > 0);
  const lastLogin = user.last_sign_in;
  const isHot = (activityData?.totalSecondsTracked || 0) > 300 || (activityData?.featureUseCount || 0) > 2;
  const statusColor = !lastLogin && !hasActivity ? 'blue' : !hasActivity ? 'amber' : isHot ? 'green' : 'amber';
  const statusLabel = !lastLogin && !hasActivity ? 'Never logged in' : !hasActivity ? 'Signed up & left' : isHot ? 'Engaged' : 'Low activity';

  // Engagement score
  const engagementScore = calculateEngagementScore(activityData ? {
    login_count: activityData.loginCount,
    page_view_count: activityData.pageViewCount,
    total_seconds_tracked: activityData.totalSecondsTracked,
    feature_use_count: activityData.featureUseCount,
    active_days: activityData.activeDays,
    unique_pages_visited: activityData.uniquePagesVisited,
  } : null);
  const scoreColor = getScoreColor(engagementScore);
  const { stroke: scoreStroke } = SCORE_COLOR_MAP[scoreColor];

  // Journey timeline — group consecutive page_views on same path within 5min
  const journeyMilestones = (() => {
    const events = activityData?.journeyEvents || [];
    const milestones: Array<{
      type: string;
      label: string;
      timestamp: string;
      color: string;
    }> = [];

    const pathLabels: Record<string, string> = {
      '/dashboard': 'Dashboard',
      '/study-centre': 'Study Centre',
      '/certificates': 'Certificates',
      '/tools': 'AI Tools',
      '/quotes': 'Quotes & Invoices',
      '/materials': 'Materials',
      '/subscription': 'Subscription',
      '/settings': 'Settings',
      '/wellbeing': 'Wellbeing',
      '/electrician-hub': 'Electrician Hub',
    };

    const featureLabels: Record<string, string> = {
      quote_saved: 'Saved Quote',
      invoice_created: 'Created Invoice',
      ai_cost_engineer: 'AI Cost Engineer',
      ai_rams_generator: 'Generated RAMS',
      ai_circuit_designer: 'Circuit Designer',
      certificate_opened: 'Opened Certificate',
      certificate_saved: 'Saved Certificate',
      board_scanner: 'Board Scanner',
      material_search: 'Materials Search',
      calculator_used: 'Used Calculator',
      study_session: 'Study Session',
    };

    const typeColors: Record<string, string> = {
      page_view: 'bg-blue-500',
      feature_use: 'bg-green-500',
      session_start: 'bg-amber-500',
      login: 'bg-purple-500',
    };

    let lastPath: string | null = null;
    let lastTime: number | null = null;

    for (const ev of events) {
      // Group consecutive page_views within 5min on same path
      if (ev.event_type === 'page_view') {
        const evTime = new Date(ev.created_at).getTime();
        if (ev.page_path === lastPath && lastTime && evTime > lastTime - 5 * 60 * 1000) {
          lastTime = evTime;
          continue;
        }
        lastPath = ev.page_path;
        lastTime = evTime;

        const pathRoot = '/' + (ev.page_path?.replace(/^\//, '').split('/')[0] || '');
        const label = pathLabels[pathRoot] || ev.page_path?.replace(/^\//, '').split('/')[0]?.replace(/-/g, ' ').replace(/\b\w/g, (c: string) => c.toUpperCase()) || 'Page';

        milestones.push({ type: 'page_view', label: `Viewed ${label}`, timestamp: ev.created_at, color: typeColors.page_view });
      } else if (ev.event_type === 'feature_use') {
        lastPath = null;
        lastTime = null;
        const label = featureLabels[ev.event_name || ''] || ev.event_name?.replace(/_/g, ' ') || 'Action';
        milestones.push({ type: 'feature_use', label, timestamp: ev.created_at, color: typeColors.feature_use });
      } else if (ev.event_type === 'session_start') {
        lastPath = null;
        lastTime = null;
        milestones.push({ type: 'session_start', label: 'Started Session', timestamp: ev.created_at, color: typeColors.session_start });
      } else if (ev.event_type === 'login') {
        lastPath = null;
        lastTime = null;
        milestones.push({ type: 'login', label: 'Logged In', timestamp: ev.created_at, color: typeColors.login });
      }
    }
    return milestones;
  })();

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="h-[90vh] rounded-t-2xl p-0 overflow-hidden">
        <div className="flex flex-col h-full bg-background">
          {/* Drag Handle */}
          <div className="flex justify-center pt-3 pb-1">
            <div className="w-10 h-1 rounded-full bg-white/20" />
          </div>

          <SheetHeader className="sr-only">
            <SheetTitle>{user.full_name}</SheetTitle>
          </SheetHeader>

          <div className="flex-1 overflow-y-auto">
            {/* ── Hero Profile Card ── */}
            <div className="relative px-5 pt-4 pb-5">
              <div className="absolute inset-0 bg-gradient-to-b from-white/[0.03] to-transparent" />
              <div className="relative flex flex-col items-center text-center">
                {/* Avatar + Engagement Ring */}
                <div className="relative mb-3">
                  <div className={cn(
                    'w-16 h-16 rounded-2xl flex items-center justify-center text-xl font-bold ring-2 ring-white/10',
                    colors.bg, colors.text
                  )}>
                    {getInitials(user.full_name)}
                  </div>
                  {/* Score ring overlay — bottom-right */}
                  {activityData && (
                    <div className="absolute -bottom-1.5 -right-1.5 bg-background rounded-full p-0.5">
                      <svg width={28} height={28}>
                        <circle cx={14} cy={14} r={11.5} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth={3} />
                        <circle
                          cx={14} cy={14} r={11.5} fill="none"
                          stroke={scoreStroke} strokeWidth={3} strokeLinecap="round"
                          strokeDasharray={2 * Math.PI * 11.5}
                          strokeDashoffset={2 * Math.PI * 11.5 - (engagementScore / 100) * 2 * Math.PI * 11.5}
                          transform="rotate(-90 14 14)"
                        />
                        <text x="50%" y="50%" dominantBaseline="central" textAnchor="middle"
                          fill={scoreStroke} fontSize={9} fontWeight="700">
                          {engagementScore}
                        </text>
                      </svg>
                    </div>
                  )}
                </div>

                {/* Name + Status */}
                <h3 className="text-lg font-bold text-white">{user.full_name || 'Unknown'}</h3>

                {/* Email — tappable */}
                {user.email && (
                  <a
                    href={`mailto:${user.email}`}
                    className="text-sm text-blue-400 mt-0.5 flex items-center gap-1.5 active:text-blue-300 touch-manipulation"
                  >
                    <Mail className="h-3.5 w-3.5" />
                    <span className="underline underline-offset-2">{user.email}</span>
                  </a>
                )}

                {/* Badges row */}
                <div className="flex items-center gap-2 mt-2.5">
                  {user.role && (
                    <Badge className={cn('text-[10px] capitalize', colors.bg, colors.text)}>
                      {user.role}
                    </Badge>
                  )}
                  <Badge className={cn(
                    'text-[10px]',
                    user.subscribed ? 'bg-emerald-500/20 text-emerald-400' : 'bg-white/10 text-white'
                  )}>
                    {user.subscribed ? (user.subscription_tier || 'Subscribed') : 'Free'}
                  </Badge>
                  <Badge className={cn(
                    'text-[10px]',
                    statusColor === 'green' ? 'bg-green-500/20 text-green-400' :
                    statusColor === 'amber' ? 'bg-amber-500/20 text-amber-400' :
                    'bg-blue-500/20 text-blue-400'
                  )}>
                    {statusLabel}
                  </Badge>
                </div>

                <p className="text-[11px] text-white mt-1.5">
                  Joined {formatDistanceToNow(new Date(user.created_at), { addSuffix: true })}
                  {activityData?.lastActivity && (
                    <> · Last active {formatDistanceToNow(new Date(activityData.lastActivity), { addSuffix: true })}</>
                  )}
                </p>
              </div>
            </div>

            {/* ── Quick Actions ── */}
            <div className="px-4 pb-4 flex gap-2">
              {user.email && (
                <a
                  href={`mailto:${user.email}`}
                  className="flex-1 h-11 rounded-xl bg-blue-500/10 ring-1 ring-blue-500/20 flex items-center justify-center gap-2 text-blue-400 text-sm font-medium active:bg-blue-500/20 touch-manipulation transition-colors"
                >
                  <Mail className="h-4 w-4" />
                  Email
                </a>
              )}
              <button
                className="flex-1 h-11 rounded-xl bg-white/[0.06] ring-1 ring-white/10 flex items-center justify-center gap-2 text-white text-sm font-medium active:bg-white/10 touch-manipulation transition-colors"
                onClick={() => setMessageSheetOpen(true)}
              >
                <MessageSquare className="h-4 w-4" />
                Message
              </button>
              {!user.subscribed && (
                <button
                  className="h-11 px-4 rounded-xl bg-yellow-500/10 ring-1 ring-yellow-500/20 flex items-center justify-center gap-2 text-yellow-400 text-sm font-medium active:bg-yellow-500/20 touch-manipulation transition-colors disabled:opacity-50"
                  onClick={() => sendEmailMutation.mutate()}
                  disabled={sendEmailMutation.isPending}
                >
                  {sendEmailMutation.isPending ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                </button>
              )}
            </div>

            {/* ── Stats Grid ── */}
            <div className="px-4 pb-4">
              <div className="grid grid-cols-4 gap-2">
                <div className="text-center p-3 rounded-xl bg-white/[0.04] ring-1 ring-white/[0.06]">
                  <p className="text-lg font-bold text-white">
                    {formatTimeSpent(activityData?.totalSecondsTracked || 0)}
                  </p>
                  <p className="text-[10px] text-white mt-0.5">Time</p>
                </div>
                <div className="text-center p-3 rounded-xl bg-white/[0.04] ring-1 ring-white/[0.06]">
                  <p className="text-lg font-bold text-white">{activityData?.uniquePagesVisited || 0}</p>
                  <p className="text-[10px] text-white mt-0.5">Pages</p>
                </div>
                <div className="text-center p-3 rounded-xl bg-white/[0.04] ring-1 ring-white/[0.06]">
                  <p className="text-lg font-bold text-white">{activityData?.loginCount || 0}</p>
                  <p className="text-[10px] text-white mt-0.5">Logins</p>
                </div>
                <div className="text-center p-3 rounded-xl bg-white/[0.04] ring-1 ring-white/[0.06]">
                  <p className="text-lg font-bold text-white">{activityData?.activeDays || 0}</p>
                  <p className="text-[10px] text-white mt-0.5">Days</p>
                </div>
              </div>
            </div>

            <div className="px-4 space-y-3 pb-6">

            {/* Where They Spend Time */}
            {activityData?.areaBreakdown && activityData.areaBreakdown.length > 0 && (
              <div className="rounded-xl border border-border p-4 space-y-3">
                <h4 className="font-medium flex items-center gap-2">
                  <Eye className="h-4 w-4 text-blue-400" />
                  Where They Spend Time
                </h4>
                <div className="space-y-2">
                  {activityData.areaBreakdown
                    .filter((a) => a.page_views > 0)
                    .map((area) => {
                      const areaLabels: Record<string, { label: string; color: string }> = {
                        study_centre: { label: 'Study Centre', color: 'bg-purple-500' },
                        certificates: { label: 'Certificates', color: 'bg-blue-500' },
                        tools: { label: 'AI Tools', color: 'bg-cyan-500' },
                        quotes_invoices: { label: 'Quotes & Invoices', color: 'bg-green-500' },
                        subscription: { label: 'Subscription', color: 'bg-yellow-500' },
                        dashboard: { label: 'Dashboard', color: 'bg-amber-500' },
                        materials: { label: 'Materials', color: 'bg-orange-500' },
                        electrician_hub: { label: 'Electrician Hub', color: 'bg-teal-500' },
                        wellbeing: { label: 'Wellbeing', color: 'bg-pink-500' },
                        settings: { label: 'Settings', color: 'bg-gray-500' },
                        other: { label: 'Other', color: 'bg-gray-500' },
                      };
                      const config = areaLabels[area.area] || { label: area.area, color: 'bg-gray-500' };
                      const maxViews = Math.max(...activityData.areaBreakdown.map((a) => a.page_views));
                      const pct = maxViews > 0 ? (area.page_views / maxViews) * 100 : 0;

                      return (
                        <div key={area.area} className="space-y-1">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-white font-medium">{config.label}</span>
                            <div className="flex items-center gap-3 text-xs text-muted-foreground">
                              <span>{area.page_views} pages</span>
                              {area.seconds_in_area > 0 && (
                                <span className="font-medium text-white">
                                  {formatTimeSpent(area.seconds_in_area)}
                                </span>
                              )}
                              {area.features_used > 0 && (
                                <span className="text-cyan-400">{area.features_used} actions</span>
                              )}
                            </div>
                          </div>
                          <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                            <div
                              className={cn('h-full rounded-full transition-all', config.color)}
                              style={{ width: `${pct}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            )}

            {/* Study Centre Detail */}
            {activityData?.studyDetail && activityData.studyDetail.length > 0 && (
              <div className="rounded-xl border border-border p-4 space-y-3">
                <h4 className="font-medium flex items-center gap-2">
                  <GraduationCap className="h-4 w-4 text-purple-400" />
                  Study Centre Activity
                </h4>
                <div className="space-y-1.5">
                  {activityData.studyDetail.slice(0, 8).map((s, i) => {
                    const moduleName = s.module_slug
                      ? s.module_slug.replace(/-/g, ' ').replace(/\b\w/g, (c: string) => c.toUpperCase())
                      : '';
                    const sectionName = s.section_slug
                      ? s.section_slug.replace(/-/g, ' ').replace(/\b\w/g, (c: string) => c.toUpperCase())
                      : '';
                    return (
                      <div key={i} className="flex items-center gap-2 p-2 rounded-lg bg-muted/30 text-sm">
                        <div className="w-1 self-stretch rounded-full bg-purple-500 opacity-60" />
                        <div className="flex-1 min-w-0">
                          <p className="text-white truncate font-medium">
                            {moduleName || s.course_level || 'Study Page'}
                          </p>
                          {sectionName && (
                            <p className="text-xs text-muted-foreground truncate">{sectionName}</p>
                          )}
                        </div>
                        <div className="text-right shrink-0">
                          <p className="text-xs text-white">{s.views} views</p>
                          {s.seconds_spent > 0 && (
                            <p className="text-[10px] text-muted-foreground">
                              {formatTimeSpent(s.seconds_spent)}
                            </p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* User Journey Timeline */}
            {journeyMilestones.length > 0 && (
              <div className="rounded-xl border border-border p-4 space-y-3">
                <h4 className="font-medium flex items-center gap-2">
                  <Activity className="h-4 w-4 text-cyan-400" />
                  User Journey
                </h4>
                <div className="relative pl-4">
                  {/* Vertical line */}
                  <div className="absolute left-[7px] top-1 bottom-1 w-px bg-white/10" />

                  <div className="space-y-2">
                    {(showAllJourney ? journeyMilestones : journeyMilestones.slice(0, 15)).map((m, i) => {
                      // Compute gap from previous milestone
                      const prevTime = i > 0 ? new Date(journeyMilestones[i - 1].timestamp).getTime() : null;
                      const curTime = new Date(m.timestamp).getTime();
                      const gapMin = prevTime ? Math.round((prevTime - curTime) / 60000) : null;
                      const showGap = gapMin !== null && gapMin > 10;

                      return (
                        <div key={i}>
                          {showGap && (
                            <div className="flex items-center gap-2 py-1 pl-2">
                              <span className="text-[10px] text-white">
                                {gapMin! >= 60 ? `${Math.floor(gapMin! / 60)}h ${gapMin! % 60}m gap` : `${gapMin}m gap`}
                              </span>
                            </div>
                          )}
                          <div className="flex items-start gap-3 relative">
                            <div className={cn('w-2.5 h-2.5 rounded-full mt-1.5 shrink-0 -ml-[5px] ring-2 ring-background', m.color)} />
                            <div className="flex-1 min-w-0">
                              <p className="text-[13px] text-white font-medium truncate">{m.label}</p>
                            </div>
                            <span className="text-[10px] text-white shrink-0 mt-0.5">
                              {formatDistanceToNow(new Date(m.timestamp), { addSuffix: true }).replace('about ', '')}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {journeyMilestones.length > 15 && !showAllJourney && (
                    <button
                      className="mt-2 text-xs text-blue-400 font-medium touch-manipulation active:text-blue-300"
                      onClick={() => setShowAllJourney(true)}
                    >
                      Show {journeyMilestones.length - 15} more
                    </button>
                  )}
                </div>

                {/* Legend */}
                <div className="flex items-center gap-3 pt-2 border-t border-white/[0.06]">
                  <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-blue-500" /><span className="text-[10px] text-white">Page</span></div>
                  <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-green-500" /><span className="text-[10px] text-white">Feature</span></div>
                  <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-amber-500" /><span className="text-[10px] text-white">Session</span></div>
                  <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-purple-500" /><span className="text-[10px] text-white">Login</span></div>
                </div>
              </div>
            )}

            {/* Current Subscription Status */}
            <div className="rounded-xl border border-border p-4 space-y-3">
              <h4 className="font-medium flex items-center gap-2">
                <Zap className="h-4 w-4 text-yellow-400" />
                Subscription Status
              </h4>

              {user.subscribed ? (
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-400" />
                    <span className="font-medium text-green-400">Active</span>
                    {user.subscription_tier && (
                      <Badge className="bg-yellow-500/20 text-yellow-400">
                        {user.subscription_tier} - {tierPricing[user.subscription_tier] || ''}
                      </Badge>
                    )}
                  </div>

                  {user.free_access_granted && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Gift className="h-4 w-4 text-yellow-400" />
                      <span>Admin-granted free access</span>
                    </div>
                  )}

                  {user.free_access_expires_at && (
                    <p className="text-sm text-muted-foreground">
                      Expires: {format(new Date(user.free_access_expires_at), 'dd MMM yyyy')}
                    </p>
                  )}

                  {user.free_access_reason && (
                    <p className="text-sm text-muted-foreground">
                      Reason: {user.free_access_reason}
                    </p>
                  )}
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <XCircle className="h-5 w-5 text-red-400" />
                  <span className="text-red-400">Not Subscribed</span>
                </div>
              )}
            </div>

            {/* Subscription Management */}
            <div className="space-y-4 border-t border-border pt-4 mt-4">
              <h4 className="text-sm font-semibold flex items-center gap-2">
                <CreditCard className="h-4 w-4 text-yellow-400" />
                Subscription Management
              </h4>

              {/* Current status display */}
              <div className="flex items-center gap-2 text-sm">
                <span className="text-muted-foreground">Current:</span>
                <Badge>{user.subscription_tier || 'No tier'}</Badge>
                <Badge variant={user.subscribed ? 'default' : 'outline'}>
                  {user.subscribed ? 'Subscribed' : 'Not subscribed'}
                </Badge>
              </div>

              {/* Extend Trial / Subscription End Date */}
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Extend Trial / Subscription Until
                  {user.subscription_end && (
                    <span className="ml-2 text-xs text-muted-foreground">
                      (currently: {format(new Date(user.subscription_end), 'dd MMM yyyy')})
                    </span>
                  )}
                </label>
                <div className="flex gap-2">
                  <Input
                    type="date"
                    value={extendDate}
                    onChange={(e) => setExtendDate(e.target.value)}
                    className="h-11 touch-manipulation flex-1"
                    min={new Date().toISOString().split('T')[0]}
                  />
                  <Button
                    onClick={handleExtendTrial}
                    className="h-11 touch-manipulation bg-green-500 hover:bg-green-600 text-white"
                    disabled={!extendDate}
                  >
                    <Clock className="h-4 w-4 mr-1" />
                    Extend
                  </Button>
                </div>
              </div>

              {/* Change Subscription Tier */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Subscription Tier</label>
                <div className="flex gap-2">
                  <Select value={manageTier} onValueChange={setManageTier}>
                    <SelectTrigger className="h-11 touch-manipulation flex-1">
                      <SelectValue placeholder="Select tier" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="free">Free</SelectItem>
                      <SelectItem value="basic">Basic</SelectItem>
                      <SelectItem value="pro">Pro</SelectItem>
                      <SelectItem value="enterprise">Enterprise</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button
                    onClick={handleChangeTier}
                    className="h-11 touch-manipulation"
                    disabled={!manageTier || manageTier === user?.subscription_tier}
                  >
                    Save
                  </Button>
                </div>
              </div>

              {/* Cancel Subscription */}
              <Button
                variant="destructive"
                onClick={handleCancelSubscription}
                className="h-11 touch-manipulation w-full"
              >
                <XCircle className="h-4 w-4 mr-2" />
                Cancel Subscription
              </Button>
            </div>

            {/* Actions */}
            {!user.subscribed || user.free_access_granted ? (
              <div className="rounded-xl border border-border p-4 space-y-4">
                <h4 className="font-medium flex items-center gap-2">
                  <Gift className="h-4 w-4 text-yellow-400" />
                  {user.free_access_granted ? 'Manage Free Access' : 'Grant Free Access'}
                </h4>

                {user.free_access_granted && user.free_access_expires_at && (
                  <div className="flex items-center gap-2 text-sm text-white bg-amber-500/10 border border-amber-500/30 rounded-lg px-3 py-2">
                    <Clock className="h-4 w-4 text-amber-400 shrink-0" />
                    Current access expires {format(new Date(user.free_access_expires_at), 'PPP')}
                  </div>
                )}

                {/* Tier Selection */}
                <div className="space-y-2">
                  <Label>Subscription Tier</Label>
                  <Select value={selectedTier} onValueChange={setSelectedTier}>
                    <SelectTrigger className="h-11 touch-manipulation">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Apprentice">
                        <div className="flex items-center gap-2">
                          <GraduationCap className="h-4 w-4 text-yellow-400" />
                          Apprentice - £4.99/mo
                        </div>
                      </SelectItem>
                      <SelectItem value="Electrician">
                        <div className="flex items-center gap-2">
                          <Zap className="h-4 w-4 text-yellow-400" />
                          Electrician - £9.99/mo
                        </div>
                      </SelectItem>
                      <SelectItem value="Employer">
                        <div className="flex items-center gap-2">
                          <Building2 className="h-4 w-4 text-blue-400" />
                          Employer - £29.99/mo
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Expiry Selection */}
                <div className="space-y-2">
                  <Label>Access Duration</Label>
                  <Select value={expiresOption} onValueChange={setExpiresOption}>
                    <SelectTrigger className="h-11 touch-manipulation">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="7days">1 week (Free trial)</SelectItem>
                      <SelectItem value="30days">30 days</SelectItem>
                      <SelectItem value="90days">90 days</SelectItem>
                      <SelectItem value="1year">1 year</SelectItem>
                      <SelectItem value="never">Never expires</SelectItem>
                      <SelectItem value="custom">Custom date</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {expiresOption === 'custom' && (
                  <div className="space-y-2">
                    <Label>Expiry Date</Label>
                    <Input
                      type="date"
                      value={customExpiry}
                      onChange={(e) => setCustomExpiry(e.target.value)}
                      className="h-11 touch-manipulation"
                      min={new Date().toISOString().split('T')[0]}
                    />
                  </div>
                )}

                {/* Reason */}
                <div className="space-y-2">
                  <Label>Reason (optional)</Label>
                  <Input
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    placeholder="e.g., Beta tester, Competition winner"
                    className="h-11 touch-manipulation"
                  />
                </div>
              </div>
            ) : (
              <div className="rounded-xl bg-amber-500/10 border border-amber-500/30 p-4">
                <p className="text-sm text-amber-400">
                  This user has an active Stripe subscription. To manage their subscription, they
                  should use the customer portal or contact support.
                </p>
              </div>
            )}
            </div>
          </div>

          {/* Footer Actions */}
          <SheetFooter className="p-4 border-t border-border gap-2">
            {user.free_access_granted || (user.subscribed && !user.stripe_customer_id) ? (
              <>
                <Button
                  className="flex-1 h-12 touch-manipulation bg-yellow-600 hover:bg-yellow-700"
                  onClick={() => grantMutation.mutate()}
                  disabled={isLoading}
                >
                  {grantMutation.isPending ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Updating...
                    </>
                  ) : (
                    <>
                      <Gift className="h-4 w-4 mr-2" />
                      Update Access
                    </>
                  )}
                </Button>
                <Button
                  variant="destructive"
                  className="h-12 touch-manipulation px-4"
                  onClick={() => revokeMutation.mutate()}
                  disabled={isLoading}
                >
                  {revokeMutation.isPending ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <XCircle className="h-4 w-4" />
                  )}
                </Button>
              </>
            ) : !user.subscribed ? (
              <Button
                className="flex-1 h-12 touch-manipulation bg-yellow-600 hover:bg-yellow-700"
                onClick={() => grantMutation.mutate()}
                disabled={isLoading}
              >
                {grantMutation.isPending ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Granting...
                  </>
                ) : (
                  <>
                    <Gift className="h-4 w-4 mr-2" />
                    Grant Free Access
                  </>
                )}
              </Button>
            ) : (
              <p className="flex-1 text-sm text-muted-foreground text-center py-3">
                Managed via Stripe subscription
              </p>
            )}
          </SheetFooter>

          {/* Extra actions passed by parent (e.g. admin controls) */}
          {extraActions && (
            <div className="p-4 border-t border-border space-y-2">
              {extraActions}
            </div>
          )}
        </div>
      </SheetContent>

      {/* Message User Sheet */}
      <MessageUserSheet
        open={messageSheetOpen}
        onOpenChange={setMessageSheetOpen}
        user={
          user
            ? {
                id: user.id,
                full_name: user.full_name || undefined,
                email: user.email,
                role: user.role,
              }
            : null
        }
      />
    </Sheet>
  );
}
