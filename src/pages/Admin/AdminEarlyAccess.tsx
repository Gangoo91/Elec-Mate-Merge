/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useRef, useMemo } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase, SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
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
import AdminEmptyState from '@/components/admin/AdminEmptyState';
import AdminSearchInput from '@/components/admin/AdminSearchInput';
import PullToRefresh from '@/components/admin/PullToRefresh';
import {
  RefreshCw,
  RotateCcw,
  Send,
  Users,
  CheckCircle,
  Mail,
  TrendingUp,
  Loader2,
  Clock,
  Target,
  TestTube,
  MousePointerClick,
  MailOpen,
  Ban,
  ExternalLink,
  BarChart3,
  UserCheck,
  ChevronDown,
  ChevronRight,
  Square,
  Eye,
  Gift,
  Zap,
} from 'lucide-react';
import { format, formatDistanceToNow } from 'date-fns';
import { toast } from 'sonner';
import { useHaptic } from '@/hooks/useHaptic';

interface UnconvertedLead {
  id: string;
  email: string;
  created_at: string;
  conversion_status: 'unsent' | 'sent' | 'opened' | 'clicked';
  conversion_email_sent_at: string | null;
  conversion_email_opened_at: string | null;
  conversion_email_clicked_at: string | null;
}

interface ConvertedLead {
  id: string;
  email: string;
  claimed_at: string | null;
  user: {
    full_name: string;
    role: string;
    signed_up_at: string;
  } | null;
}

interface ConversionStats {
  total_unconverted: number;
  unsent: number;
  sent: number;
  totalSent: number;
  delivered: number;
  opened: number;
  clicked: number;
  emailBounced: number;
  total_converted: number;
  bounced: number;
  openRate: string;
  clickRate: string;
  bounceRate: string;
  topLinks: Array<{ url: string; count: number }>;
}

interface ConversionData {
  unconverted: UnconvertedLead[];
  converted: ConvertedLead[];
  stats: ConversionStats;
}

export default function AdminEarlyAccess() {
  const queryClient = useQueryClient();
  const haptic = useHaptic();
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState<'unsent' | 'sent'>('unsent');
  const [showTestEmail, setShowTestEmail] = useState(false);
  const [testEmail, setTestEmail] = useState('');
  const [manualEmails, setManualEmails] = useState('');
  const [manualSending, setManualSending] = useState(false);
  const [manualProgress, setManualProgress] = useState({ sent: 0, failed: 0, total: 0 });
  const [confirmSendAll, setConfirmSendAll] = useState(false);
  const [convertedOpen, setConvertedOpen] = useState(false);

  // Batch sending state — all stored on window to survive React lifecycle
  const [batchSending, setBatchSending] = useState(() => !!(window as any).__convBatchRunning);
  const [batchProgress, setBatchProgress] = useState(
    () => (window as any).__convBatchProgress || { sent: 0, remaining: 0 }
  );
  const stopRef = useRef(false);

  // Fetch conversion data
  const {
    data: conversionData,
    isLoading,
    refetch,
  } = useQuery<ConversionData>({
    queryKey: ['admin-conversion-leads'],
    queryFn: async () => {
      const { data, error } = await supabase.functions.invoke('send-early-access-invite', {
        body: { action: 'get_conversion_leads' },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      return data;
    },
    staleTime: 30 * 1000,
    refetchInterval: 30 * 1000,
  });

  const stats = conversionData?.stats;

  // Send test email mutation
  const sendTestMutation = useMutation({
    mutationFn: async (email: string) => {
      const { data, error } = await supabase.functions.invoke('send-early-access-invite', {
        body: { action: 'send_test_conversion_email', testEmail: email },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      return data;
    },
    onSuccess: () => {
      haptic.success();
      toast.success('Test email sent! Check your inbox.');
      setTestEmail('');
      setShowTestEmail(false);
    },
    onError: (error) => {
      haptic.error();
      toast.error(`Failed: ${error.message}`);
    },
  });

  // Parse emails from textarea (comma, newline, space, or semicolon separated)
  const parseEmails = (text: string): string[] => {
    const raw = text.split(/[\n,;\s]+/).map((e) => e.trim().toLowerCase());
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return [...new Set(raw.filter((e) => emailRegex.test(e)))];
  };

  const parsedEmails = useMemo(() => parseEmails(manualEmails), [manualEmails]);

  // Send multiple manual emails sequentially
  const sendManualBulk = async () => {
    const emails = parsedEmails;
    if (emails.length === 0) return;

    setManualSending(true);
    setManualProgress({ sent: 0, failed: 0, total: emails.length });

    let sent = 0;
    let failed = 0;
    const failures: string[] = [];

    for (const email of emails) {
      try {
        const { data, error } = await supabase.functions.invoke('send-early-access-invite', {
          body: { action: 'send_manual_conversion_email', manualEmail: email },
        });
        if (error) throw error;
        if (data?.error) throw new Error(data.error);
        sent++;
      } catch {
        failed++;
        failures.push(email);
      }
      setManualProgress({ sent, failed, total: emails.length });
    }

    setManualSending(false);

    if (failed === 0) {
      haptic.success();
      toast.success(`All ${sent} emails sent successfully!`);
      setManualEmails('');
    } else {
      haptic.error();
      toast.error(`Sent ${sent}, failed ${failed}: ${failures.join(', ')}`);
      // Keep failed emails in the box so they can retry
      setManualEmails(failures.join('\n'));
    }

    queryClient.invalidateQueries({ queryKey: ['admin-conversion-leads'] });
  };

  // ──────────────────────────────────────────────────────────────
  // Batch sender — runs entirely on window with setTimeout chaining.
  // React re-renders, dialog unmounts, component updates — nothing
  // can stop this except the stop button or completion.
  // ──────────────────────────────────────────────────────────────
  const startBatchLoop = () => {
    if ((window as any).__convBatchRunning) return;

    (window as any).__convBatchRunning = true;
    (window as any).__convBatchStopped = false;
    (window as any).__convBatchTotal = 0;
    (window as any).__convBatchProgress = { sent: 0, remaining: stats?.unsent || 0 };

    stopRef.current = false;
    setBatchSending(true);
    setBatchProgress({ sent: 0, remaining: stats?.unsent || 0 });

    const sendOneBatch = async () => {
      // Check stop
      if ((window as any).__convBatchStopped) {
        toast.success(`Stopped — sent ${(window as any).__convBatchTotal} emails so far`);
        cleanup();
        return;
      }

      try {
        const session = (await supabase.auth.getSession()).data.session;
        const resp = await fetch(`${SUPABASE_URL}/functions/v1/send-early-access-invite`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${session?.access_token}`,
            apikey: SUPABASE_PUBLISHABLE_KEY,
          },
          body: JSON.stringify({ action: 'send_conversion_campaign' }),
        });

        const data = await resp.json();
        if (!resp.ok || data.error) throw new Error(data.error || `HTTP ${resp.status}`);

        (window as any).__convBatchTotal += data.sent;
        const progress = {
          sent: (window as any).__convBatchTotal,
          remaining: data.remaining,
        };
        (window as any).__convBatchProgress = progress;
        setBatchProgress(progress);

        if (data.complete || data.sent === 0) {
          toast.success(`All done! Sent ${(window as any).__convBatchTotal} conversion emails`);
          cleanup();
          return;
        }

        toast.info(
          `Batch of ${data.sent} sent (${(window as any).__convBatchTotal} total) — next batch in 10s...`
        );

        // Schedule next batch in 10 seconds
        (window as any).__convBatchTimer = window.setTimeout(sendOneBatch, 10000);
      } catch (err: any) {
        toast.error(`Batch error: ${err.message} — retrying in 15s...`);
        // Retry on error instead of giving up
        (window as any).__convBatchTimer = window.setTimeout(sendOneBatch, 15000);
      }
    };

    const cleanup = () => {
      (window as any).__convBatchRunning = false;
      if ((window as any).__convBatchTimer) {
        window.clearTimeout((window as any).__convBatchTimer);
      }
      setBatchSending(false);
      setConfirmSendAll(false);
      queryClient.invalidateQueries({ queryKey: ['admin-conversion-leads'] });
    };

    // Kick off immediately
    sendOneBatch();
  };

  const stopBatchLoop = () => {
    (window as any).__convBatchStopped = true;
    stopRef.current = true;
    if ((window as any).__convBatchTimer) {
      window.clearTimeout((window as any).__convBatchTimer);
      toast.success(`Stopped — sent ${(window as any).__convBatchTotal || 0} emails so far`);
      (window as any).__convBatchRunning = false;
      setBatchSending(false);
      queryClient.invalidateQueries({ queryKey: ['admin-conversion-leads'] });
    }
  };

  // ── £7.99 Offer Campaign ─────────────────────────────────────────
  const [offerVersion, setOfferVersion] = useState<'v5' | 'v6' | 'v7'>('v7');
  const [offerTestEmail, setOfferTestEmail] = useState('');
  const [showOfferTest, setShowOfferTest] = useState(false);
  const [confirmOfferSend, setConfirmOfferSend] = useState(false);
  const [offerBatchSending, setOfferBatchSending] = useState(
    () => !!(window as any).__eaOfferBatchRunning
  );
  const [offerBatchProgress, setOfferBatchProgress] = useState(
    () => (window as any).__eaOfferBatchProgress || { sent: 0, remaining: 0 }
  );
  const offerStopRef = useRef(false);
  const [confirmResetOffer, setConfirmResetOffer] = useState(false);
  const [resettingOffer, setResettingOffer] = useState(false);

  // Fetch offer status
  const { data: offerStatus, refetch: refetchOffer } = useQuery<{
    total: number;
    sent: number;
    remaining: number;
  }>({
    queryKey: ['admin-ea-offer-status'],
    queryFn: async () => {
      const { data, error } = await supabase.functions.invoke('send-early-access-invite', {
        body: { action: 'get_ea_offer_status' },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      return data;
    },
    staleTime: 30 * 1000,
    refetchInterval: 30 * 1000,
  });

  // Send test offer email
  const sendOfferTestMutation = useMutation({
    mutationFn: async (email: string) => {
      const { data, error } = await supabase.functions.invoke('send-early-access-invite', {
        body: { action: 'send_ea_offer_test', testEmail: email, email_version: offerVersion },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      return data;
    },
    onSuccess: () => {
      haptic.success();
      toast.success('Test offer email sent! Check your inbox.');
      setOfferTestEmail('');
      setShowOfferTest(false);
    },
    onError: (error) => {
      haptic.error();
      toast.error(`Failed: ${error.message}`);
    },
  });

  // Reset offer campaign — clears offer_sent_at so campaign can be re-sent
  const resetOfferMutation = useMutation({
    mutationFn: async () => {
      const { data, error } = await supabase.functions.invoke('send-early-access-invite', {
        body: { action: 'reset_ea_offer_campaign' },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      return data;
    },
    onSuccess: (data) => {
      haptic.success();
      toast.success(`Campaign reset — ${data.remaining} recipients ready to send`);
      setConfirmResetOffer(false);
      queryClient.invalidateQueries({ queryKey: ['admin-ea-offer-status'] });
    },
    onError: (error) => {
      haptic.error();
      toast.error(`Reset failed: ${error.message}`);
    },
    onSettled: () => setResettingOffer(false),
  });

  // Offer batch sender — same window pattern as conversion campaign
  const startOfferBatchLoop = () => {
    if ((window as any).__eaOfferBatchRunning) return;

    (window as any).__eaOfferBatchRunning = true;
    (window as any).__eaOfferBatchStopped = false;
    (window as any).__eaOfferBatchTotal = 0;
    (window as any).__eaOfferBatchProgress = { sent: 0, remaining: offerStatus?.remaining || 0 };

    offerStopRef.current = false;
    setOfferBatchSending(true);
    setOfferBatchProgress({ sent: 0, remaining: offerStatus?.remaining || 0 });

    const sendOneBatch = async () => {
      if ((window as any).__eaOfferBatchStopped) {
        toast.success(`Stopped — sent ${(window as any).__eaOfferBatchTotal} offer emails so far`);
        offerCleanup();
        return;
      }

      try {
        const session = (await supabase.auth.getSession()).data.session;
        const resp = await fetch(`${SUPABASE_URL}/functions/v1/send-early-access-invite`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${session?.access_token}`,
            apikey: SUPABASE_PUBLISHABLE_KEY,
          },
          body: JSON.stringify({ action: 'send_ea_offer_campaign', email_version: offerVersion }),
        });

        const data = await resp.json();
        if (!resp.ok || data.error) throw new Error(data.error || `HTTP ${resp.status}`);

        (window as any).__eaOfferBatchTotal += data.sent;
        const progress = {
          sent: (window as any).__eaOfferBatchTotal,
          remaining: data.remaining,
        };
        (window as any).__eaOfferBatchProgress = progress;
        setOfferBatchProgress(progress);

        if (data.complete || data.sent === 0) {
          toast.success(`All done! Sent ${(window as any).__eaOfferBatchTotal} offer emails`);
          offerCleanup();
          return;
        }

        toast.info(
          `Batch of ${data.sent} sent (${(window as any).__eaOfferBatchTotal} total) — next batch in 10s...`
        );

        (window as any).__eaOfferBatchTimer = window.setTimeout(sendOneBatch, 10000);
      } catch (err: any) {
        toast.error(`Batch error: ${err.message} — retrying in 15s...`);
        (window as any).__eaOfferBatchTimer = window.setTimeout(sendOneBatch, 15000);
      }
    };

    const offerCleanup = () => {
      (window as any).__eaOfferBatchRunning = false;
      if ((window as any).__eaOfferBatchTimer) {
        window.clearTimeout((window as any).__eaOfferBatchTimer);
      }
      setOfferBatchSending(false);
      setConfirmOfferSend(false);
      queryClient.invalidateQueries({ queryKey: ['admin-ea-offer-status'] });
    };

    sendOneBatch();
  };

  const stopOfferBatchLoop = () => {
    (window as any).__eaOfferBatchStopped = true;
    offerStopRef.current = true;
    if ((window as any).__eaOfferBatchTimer) {
      window.clearTimeout((window as any).__eaOfferBatchTimer);
      toast.success(
        `Stopped — sent ${(window as any).__eaOfferBatchTotal || 0} offer emails so far`
      );
      (window as any).__eaOfferBatchRunning = false;
      setOfferBatchSending(false);
      queryClient.invalidateQueries({ queryKey: ['admin-ea-offer-status'] });
    }
  };

  // Filter leads
  const filteredUnsent = useMemo(() => {
    const leads = (conversionData?.unconverted || []).filter(
      (l) => l.conversion_status === 'unsent'
    );
    if (!search) return leads;
    return leads.filter((l) => l.email.toLowerCase().includes(search.toLowerCase()));
  }, [conversionData, search]);

  const filteredSent = useMemo(() => {
    const leads = (conversionData?.unconverted || []).filter(
      (l) => l.conversion_status !== 'unsent'
    );
    if (!search) return leads;
    return leads.filter((l) => l.email.toLowerCase().includes(search.toLowerCase()));
  }, [conversionData, search]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'clicked':
        return (
          <Badge className="bg-green-500/20 text-green-400 text-[10px] px-1.5">
            <MousePointerClick className="h-3 w-3 mr-0.5" />
            Clicked
          </Badge>
        );
      case 'opened':
        return (
          <Badge className="bg-yellow-500/20 text-yellow-400 text-[10px] px-1.5">
            <MailOpen className="h-3 w-3 mr-0.5" />
            Opened
          </Badge>
        );
      case 'sent':
        return (
          <Badge className="bg-blue-500/20 text-blue-400 text-[10px] px-1.5">
            <Mail className="h-3 w-3 mr-0.5" />
            Sent
          </Badge>
        );
      default:
        return (
          <Badge className="bg-zinc-500/20 text-zinc-400 text-[10px] px-1.5">
            <Clock className="h-3 w-3 mr-0.5" />
            Unsent
          </Badge>
        );
    }
  };

  // Funnel bar helper
  const FunnelBar = ({
    label,
    value,
    max,
    colour,
    icon: Icon,
  }: {
    label: string;
    value: number;
    max: number;
    colour: string;
    icon: any;
  }) => {
    const pct = max > 0 ? (value / max) * 100 : 0;
    return (
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1.5 w-24 shrink-0">
          <Icon className={`h-3.5 w-3.5 ${colour}`} />
          <span className="text-xs text-white font-medium">{label}</span>
        </div>
        <div className="flex-1 h-5 bg-muted/50 rounded-full overflow-hidden relative">
          <div
            className="h-full rounded-full transition-all duration-700"
            style={{
              width: `${Math.max(pct, 2)}%`,
              background: `var(--bar-${label.toLowerCase()})`,
            }}
          />
          <span className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-white">
            {value} ({pct.toFixed(1)}%)
          </span>
        </div>
      </div>
    );
  };

  const totalSent = stats?.totalSent || 0;

  return (
    <PullToRefresh
      onRefresh={async () => {
        await refetch();
      }}
    >
      <div
        className="space-y-4 pb-20"
        style={
          {
            '--bar-delivered': '#3b82f6',
            '--bar-opened': '#22c55e',
            '--bar-clicked': '#fbbf24',
            '--bar-bounced': '#ef4444',
          } as React.CSSProperties
        }
      >
        {/* ── £7.99 Offer Campaign ──────────────────────────────────── */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <Gift className="h-5 w-5 text-amber-400" />
              £7.99 Offer Campaign
            </h2>
            <p className="text-sm text-white">
              £7.99/month locked forever — only people WITHOUT accounts
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => refetchOffer()}
            className="gap-2 h-11 touch-manipulation"
          >
            <RefreshCw className="h-4 w-4" />
            <span className="hidden sm:inline">Refresh</span>
          </Button>
        </div>

        {/* Offer Stats — 3 cards */}
        <div className="grid grid-cols-3 gap-2">
          {[
            {
              label: 'Total',
              value: offerStatus?.total || 0,
              icon: Users,
              colour: 'text-amber-400',
              bg: 'from-amber-500/10 to-yellow-500/5',
              border: 'border-amber-500/20',
            },
            {
              label: 'Sent',
              value: offerStatus?.sent || 0,
              icon: Mail,
              colour: 'text-green-400',
              bg: 'from-green-500/10 to-emerald-500/5',
              border: 'border-green-500/20',
            },
            {
              label: 'Remaining',
              value: offerStatus?.remaining || 0,
              icon: Clock,
              colour: 'text-zinc-400',
              bg: 'from-zinc-500/10 to-zinc-600/5',
              border: 'border-zinc-500/20',
            },
          ].map((s) => (
            <Card key={s.label} className={`bg-gradient-to-br ${s.bg} ${s.border}`}>
              <CardContent className="p-2.5 sm:p-3 text-center">
                <s.icon className={`h-4 w-4 ${s.colour} mx-auto mb-1`} />
                <p className="text-lg sm:text-xl font-bold">
                  {offerStatus ? s.value.toLocaleString() : '...'}
                </p>
                <p className="text-[10px] sm:text-xs text-white">{s.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Offer Campaign Controls */}
        <Card className="border-amber-500/30 bg-gradient-to-br from-amber-500/5 to-yellow-500/5">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-amber-400" />
                Offer Controls
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowOfferTest(!showOfferTest)}
                className="gap-1.5 h-9 touch-manipulation text-amber-400 border-amber-400/30 hover:bg-amber-500/10"
              >
                <TestTube className="h-3.5 w-3.5" />
                Test
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {/* Version selector */}
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-xs text-white font-semibold mr-1">Template:</span>
              <Button
                variant={offerVersion === 'v7' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setOfferVersion('v7')}
                className={`h-8 touch-manipulation text-xs relative ${offerVersion === 'v7' ? 'bg-green-500 text-white hover:bg-green-600' : ''}`}
              >
                v7 Stats
                <Badge className="absolute -top-1.5 -right-1.5 bg-yellow-500 text-[9px] px-1 py-0 h-4 text-black border-0">
                  NEW
                </Badge>
              </Button>
              <Button
                variant={offerVersion === 'v6' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setOfferVersion('v6')}
                className={`h-8 touch-manipulation text-xs ${offerVersion === 'v6' ? 'bg-indigo-500 text-white hover:bg-indigo-600' : ''}`}
              >
                v6 No Brainer
              </Button>
              <Button
                variant={offerVersion === 'v5' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setOfferVersion('v5')}
                className={`h-8 touch-manipulation text-xs ${offerVersion === 'v5' ? 'bg-red-500 text-white hover:bg-red-600' : ''}`}
              >
                v5 Original
              </Button>
            </div>

            {/* Pricing preview */}
            <div className="grid grid-cols-2 gap-2">
              <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/20 text-center">
                <p className="text-xs text-amber-400 font-semibold">Monthly</p>
                <p className="text-lg font-bold text-amber-400">£7.99</p>
                <p className="text-[10px] text-white">locked forever</p>
              </div>
              <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/20 text-center">
                <p className="text-xs text-amber-400 font-semibold">Yearly</p>
                <p className="text-lg font-bold text-amber-400">£79.99</p>
                <p className="text-[10px] text-white">£6.67/mo</p>
              </div>
            </div>

            {/* Email preview */}
            <div className="p-3 rounded-xl bg-muted/50 border border-border/50 space-y-1.5">
              <p className="text-xs text-white font-semibold">Email Preview</p>
              <p className="text-xs text-amber-400 font-medium">
                Subject:{' '}
                {offerVersion === 'v7'
                  ? '7 weeks. No launch. No App Store. Just electricians getting shit done.'
                  : offerVersion === 'v6'
                    ? "You signed up early. Here's what that gets you."
                    : 'One-off offer — £7.99/month, locked forever'}
              </p>
              <p className="text-xs text-white">
                From: Elec-Mate &lt;offers@elec-mate.com&gt; · Reply-To: founder@elec-mate.com
              </p>
              <p className="text-xs text-white">
                V5-style template with stats strip, feature sections, Stripe payment links, and Mate
                WhatsApp section
              </p>
            </div>

            {/* Test email section */}
            {showOfferTest && (
              <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 space-y-2">
                <p className="text-xs text-amber-400 font-semibold">Send Test Offer Email</p>
                <div className="flex gap-2">
                  <Input
                    type="email"
                    value={offerTestEmail}
                    onChange={(e) => setOfferTestEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="h-11 text-base touch-manipulation flex-1"
                  />
                  <Button
                    onClick={() => offerTestEmail && sendOfferTestMutation.mutate(offerTestEmail)}
                    disabled={!offerTestEmail || sendOfferTestMutation.isPending}
                    className="h-11 px-4 touch-manipulation bg-amber-500 hover:bg-amber-600"
                  >
                    {sendOfferTestMutation.isPending ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Send className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>
            )}

            {/* Batch progress */}
            {offerBatchSending && (
              <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2 text-amber-400 font-semibold">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Sending...
                  </span>
                  <span className="text-white">
                    {offerBatchProgress.sent} sent · {offerBatchProgress.remaining} left
                  </span>
                </div>
                <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-amber-500 to-yellow-500 rounded-full transition-all duration-500"
                    style={{
                      width: `${
                        offerBatchProgress.sent + offerBatchProgress.remaining > 0
                          ? (offerBatchProgress.sent /
                              (offerBatchProgress.sent + offerBatchProgress.remaining)) *
                            100
                          : 0
                      }%`,
                    }}
                  />
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full h-9 touch-manipulation text-red-400 border-red-500/30 hover:bg-red-500/10 gap-1.5"
                  onClick={stopOfferBatchLoop}
                >
                  <Square className="h-3 w-3 fill-current" />
                  Stop Sending
                </Button>
              </div>
            )}

            {/* Send all button */}
            {!offerBatchSending && (offerStatus?.remaining || 0) > 0 && (
              <div className="pt-1">
                <Button
                  onClick={() => setConfirmOfferSend(true)}
                  className="w-full h-12 touch-manipulation text-sm font-bold bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-black rounded-xl gap-2"
                >
                  <Send className="h-4 w-4" />
                  Send to All Remaining ({offerStatus?.remaining || 0})
                </Button>
                <p className="text-[10px] text-white text-center mt-1">
                  Sends in batches of 10 · Excludes signed-up users and bounced emails
                </p>
              </div>
            )}

            {/* Reset campaign — clears sent flags so campaign can be re-sent (e.g. new email version) */}
            {!offerBatchSending && (
              <div className="pt-2 border-t border-border/40">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setConfirmResetOffer(true)}
                  disabled={resettingOffer}
                  className="w-full h-10 touch-manipulation text-xs text-red-400 border-red-500/30 hover:bg-red-500/10 gap-2"
                >
                  {resettingOffer ? (
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  ) : (
                    <RotateCcw className="h-3.5 w-3.5" />
                  )}
                  Reset Campaign
                </Button>
                <p className="text-[10px] text-white/50 text-center mt-1">
                  Clears sent history so this campaign can be re-sent (e.g. new email version)
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Confirm Offer Send Dialog */}
        <AlertDialog open={confirmOfferSend} onOpenChange={setConfirmOfferSend}>
          <AlertDialogContent className="max-w-[calc(100vw-2rem)] sm:max-w-lg rounded-2xl p-5 sm:p-6">
            <AlertDialogHeader className="space-y-3">
              <AlertDialogTitle className="text-base sm:text-lg leading-tight">
                Send £7.99 offer to {offerStatus?.remaining || 0} leads?
              </AlertDialogTitle>
              <AlertDialogDescription className="text-sm leading-relaxed">
                This sends the early access offer email in batches of 10. People who have already
                signed up and bounced emails are automatically excluded. You can stop at any time.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="flex-col-reverse sm:flex-row gap-2 sm:gap-2 pt-2">
              <AlertDialogCancel className="h-12 sm:h-11 touch-manipulation text-base sm:text-sm w-full sm:w-auto mt-0">
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={() => {
                  setConfirmOfferSend(false);
                  window.setTimeout(startOfferBatchLoop, 200);
                }}
                className="h-12 sm:h-11 touch-manipulation text-base sm:text-sm bg-amber-500 hover:bg-amber-600 text-black font-semibold w-full sm:w-auto"
              >
                <Send className="h-4 w-4 mr-2" />
                Start Sending
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        {/* Reset Offer Campaign Dialog */}
        <AlertDialog open={confirmResetOffer} onOpenChange={setConfirmResetOffer}>
          <AlertDialogContent className="max-w-[calc(100vw-2rem)] sm:max-w-lg rounded-2xl p-5 sm:p-6">
            <AlertDialogHeader className="space-y-3">
              <AlertDialogTitle className="text-base sm:text-lg leading-tight">
                Reset the £7.99 offer campaign?
              </AlertDialogTitle>
              <AlertDialogDescription className="text-sm leading-relaxed space-y-2">
                <span className="block">
                  This clears the sent history for all{' '}
                  <strong>{(offerStatus?.sent || 0).toLocaleString()}</strong> records so the
                  campaign can be re-sent — for example, to deliver the new v6 email to everyone.
                </span>
                <span className="block">
                  Anyone who has already created an account will still be automatically excluded
                  when you next send. Bounced emails are never touched.
                </span>
                <span className="block font-semibold text-amber-400">This cannot be undone.</span>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="flex-col-reverse sm:flex-row gap-2 sm:gap-2 pt-2">
              <AlertDialogCancel
                className="h-12 sm:h-11 touch-manipulation text-base sm:text-sm w-full sm:w-auto mt-0"
                disabled={resettingOffer}
              >
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={() => {
                  setResettingOffer(true);
                  setConfirmResetOffer(false);
                  resetOfferMutation.mutate();
                }}
                disabled={resettingOffer}
                className="h-12 sm:h-11 touch-manipulation text-base sm:text-sm bg-red-500 hover:bg-red-600 text-white font-semibold w-full sm:w-auto"
              >
                {resettingOffer ? (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <RotateCcw className="h-4 w-4 mr-2" />
                )}
                Yes, Reset Campaign
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        {/* ── Conversion Campaign (existing) ─────────────────────────── */}

        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <Target className="h-5 w-5 text-purple-400" />
              Conversion Campaign
            </h2>
            <p className="text-sm text-white">Only targets leads who haven't created an account</p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              refetch();
            }}
            className="gap-2 h-11 touch-manipulation"
          >
            <RefreshCw className="h-4 w-4" />
            <span className="hidden sm:inline">Refresh</span>
          </Button>
        </div>

        {/* Hero Stats — 6 cards */}
        <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
          {[
            {
              label: 'Unsent',
              value: stats?.unsent || 0,
              icon: Clock,
              colour: 'text-zinc-400',
              bg: 'from-zinc-500/10 to-zinc-600/5',
              border: 'border-zinc-500/20',
            },
            {
              label: 'Sent',
              value: totalSent,
              icon: Mail,
              colour: 'text-blue-400',
              bg: 'from-blue-500/10 to-cyan-500/5',
              border: 'border-blue-500/20',
            },
            {
              label: 'Delivered',
              value: stats?.delivered || 0,
              icon: CheckCircle,
              colour: 'text-sky-400',
              bg: 'from-sky-500/10 to-blue-500/5',
              border: 'border-sky-500/20',
            },
            {
              label: 'Opened',
              value: stats?.opened || 0,
              icon: MailOpen,
              colour: 'text-green-400',
              bg: 'from-green-500/10 to-emerald-500/5',
              border: 'border-green-500/20',
            },
            {
              label: 'Clicked',
              value: stats?.clicked || 0,
              icon: MousePointerClick,
              colour: 'text-yellow-400',
              bg: 'from-yellow-500/10 to-amber-500/5',
              border: 'border-yellow-500/20',
            },
            {
              label: 'Converted',
              value: stats?.total_converted || 0,
              icon: TrendingUp,
              colour: 'text-emerald-400',
              bg: 'from-emerald-500/10 to-green-500/5',
              border: 'border-emerald-500/20',
            },
          ].map((s) => (
            <Card key={s.label} className={`bg-gradient-to-br ${s.bg} ${s.border}`}>
              <CardContent className="p-2.5 sm:p-3 text-center">
                <s.icon className={`h-4 w-4 ${s.colour} mx-auto mb-1`} />
                <p className="text-lg sm:text-xl font-bold">
                  {isLoading ? '...' : s.value.toLocaleString()}
                </p>
                <p className="text-[10px] sm:text-xs text-white">{s.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Engagement Funnel */}
        <Card className="border-purple-500/30 bg-gradient-to-br from-purple-500/5 to-indigo-500/5">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center justify-between">
              <span className="flex items-center gap-2">
                <BarChart3 className="h-4 w-4 text-purple-400" />
                Engagement Funnel
              </span>
              <a
                href="https://resend.com/emails"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-xs text-purple-400 hover:text-purple-300 touch-manipulation"
              >
                Resend Dashboard <ExternalLink className="h-3 w-3" />
              </a>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {/* Rates row */}
            <div className="grid grid-cols-3 gap-2">
              <div className="p-2 rounded-lg bg-green-500/10 border border-green-500/20 text-center">
                <p className="text-base sm:text-lg font-bold text-green-400">
                  {stats?.openRate || '0'}%
                </p>
                <p className="text-[10px] text-white">Open Rate</p>
              </div>
              <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/20 text-center">
                <p className="text-base sm:text-lg font-bold text-amber-400">
                  {stats?.clickRate || '0'}%
                </p>
                <p className="text-[10px] text-white">Click Rate</p>
              </div>
              <div className="p-2 rounded-lg bg-red-500/10 border border-red-500/20 text-center">
                <p className="text-base sm:text-lg font-bold text-red-400">
                  {stats?.bounceRate || '0'}%
                </p>
                <p className="text-[10px] text-white">Bounce Rate</p>
              </div>
            </div>

            {/* Funnel bars */}
            <div className="space-y-2">
              <FunnelBar
                label="Delivered"
                value={stats?.delivered || 0}
                max={totalSent || stats?.delivered || 1}
                colour="text-blue-400"
                icon={CheckCircle}
              />
              <FunnelBar
                label="Opened"
                value={stats?.opened || 0}
                max={stats?.delivered || 1}
                colour="text-green-400"
                icon={MailOpen}
              />
              <FunnelBar
                label="Clicked"
                value={stats?.clicked || 0}
                max={stats?.delivered || 1}
                colour="text-amber-400"
                icon={MousePointerClick}
              />
              <FunnelBar
                label="Bounced"
                value={stats?.emailBounced || 0}
                max={stats?.delivered || 1}
                colour="text-red-400"
                icon={Ban}
              />
            </div>

            {/* Top clicked links */}
            {(stats?.topLinks || []).length > 0 && (
              <div className="space-y-1.5 pt-2 border-t border-border/50">
                <p className="text-xs text-white font-semibold">Top Clicked Links</p>
                {stats!.topLinks.map((link, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 p-2 rounded-lg bg-muted/50 text-sm"
                  >
                    <ExternalLink className="h-3 w-3 text-white shrink-0" />
                    <span className="truncate flex-1 text-xs text-white">
                      {link.url.replace('https://', '').slice(0, 50)}
                    </span>
                    <Badge variant="outline" className="text-xs shrink-0">
                      {link.count} clicks
                    </Badge>
                  </div>
                ))}
              </div>
            )}

            {totalSent === 0 && (
              <p className="text-xs text-white text-center py-2">
                No tracking data yet. Send emails to see engagement stats here.
              </p>
            )}
          </CardContent>
        </Card>

        {/* Campaign Controls */}
        <Card className="border-purple-500/30 bg-gradient-to-br from-purple-500/5 to-violet-500/5">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Send className="h-4 w-4 text-purple-400" />
                Campaign Controls
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowTestEmail(!showTestEmail)}
                className="gap-1.5 h-9 touch-manipulation text-yellow-400 border-yellow-400/30 hover:bg-yellow-500/10"
              >
                <TestTube className="h-3.5 w-3.5" />
                Test
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {/* Pricing preview */}
            <div className="grid grid-cols-2 gap-2">
              <div className="p-2 rounded-xl bg-purple-500/10 border border-purple-500/20 text-center">
                <p className="text-xs text-purple-400 font-semibold">Standard</p>
                <p className="text-lg font-bold text-purple-400">£9.99</p>
                <p className="text-[10px] text-white">per month</p>
              </div>
              <div className="p-2 rounded-xl bg-green-500/10 border border-green-500/20 text-center">
                <p className="text-xs text-green-400 font-semibold">Apprentice</p>
                <p className="text-lg font-bold text-green-400">£4.99</p>
                <p className="text-[10px] text-white">per month</p>
              </div>
            </div>

            {/* Test email section */}
            {showTestEmail && (
              <div className="p-3 rounded-xl bg-yellow-500/10 border border-yellow-500/20 space-y-2">
                <p className="text-xs text-yellow-400 font-semibold">Send Test Email</p>
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
              </div>
            )}

            {/* Manual email — supports multiple addresses */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <p className="text-xs text-white font-semibold">Manual Send</p>
                {parsedEmails.length > 0 && (
                  <Badge className="bg-purple-500/20 text-purple-400 text-[10px]">
                    {parsedEmails.length} email{parsedEmails.length !== 1 ? 's' : ''} ready
                  </Badge>
                )}
              </div>
              <Textarea
                value={manualEmails}
                onChange={(e) => setManualEmails(e.target.value)}
                placeholder="Paste emails here — one per line, or comma/space separated..."
                className="text-base touch-manipulation min-h-[80px] resize-y border-white/30 focus:border-purple-500 focus:ring-purple-500"
                disabled={manualSending}
              />
              {manualSending ? (
                <div className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/20 space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-2 text-purple-400 font-semibold">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Sending...
                    </span>
                    <span className="text-white">
                      {manualProgress.sent + manualProgress.failed} of {manualProgress.total}
                      {manualProgress.failed > 0 && (
                        <span className="text-red-400 ml-1">({manualProgress.failed} failed)</span>
                      )}
                    </span>
                  </div>
                  <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-purple-500 to-violet-500 rounded-full transition-all duration-300"
                      style={{
                        width: `${
                          manualProgress.total > 0
                            ? ((manualProgress.sent + manualProgress.failed) /
                                manualProgress.total) *
                              100
                            : 0
                        }%`,
                      }}
                    />
                  </div>
                </div>
              ) : (
                <Button
                  onClick={sendManualBulk}
                  disabled={parsedEmails.length === 0}
                  className="w-full h-11 touch-manipulation bg-gradient-to-r from-purple-500 to-violet-500 hover:from-purple-600 hover:to-violet-600 text-white gap-2"
                >
                  <Send className="h-4 w-4" />
                  {parsedEmails.length > 1
                    ? `Send to ${parsedEmails.length} Emails`
                    : parsedEmails.length === 1
                      ? 'Send Email'
                      : 'Send to Any Email'}
                </Button>
              )}
            </div>

            {/* Batch progress */}
            {batchSending && (
              <div className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/20 space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2 text-purple-400 font-semibold">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Sending...
                  </span>
                  <span className="text-white">
                    {batchProgress.sent} sent · {batchProgress.remaining} left
                  </span>
                </div>
                <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-purple-500 to-violet-500 rounded-full transition-all duration-500"
                    style={{
                      width: `${
                        batchProgress.sent + batchProgress.remaining > 0
                          ? (batchProgress.sent / (batchProgress.sent + batchProgress.remaining)) *
                            100
                          : 0
                      }%`,
                    }}
                  />
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full h-9 touch-manipulation text-red-400 border-red-500/30 hover:bg-red-500/10 gap-1.5"
                  onClick={stopBatchLoop}
                >
                  <Square className="h-3 w-3 fill-current" />
                  Stop Sending
                </Button>
              </div>
            )}

            {/* Send all button */}
            {!batchSending && (stats?.unsent || 0) > 0 && (
              <div className="pt-1">
                <Button
                  onClick={() => setConfirmSendAll(true)}
                  className="w-full h-12 touch-manipulation text-sm font-bold bg-gradient-to-r from-purple-500 to-violet-500 hover:from-purple-600 hover:to-violet-600 text-white rounded-xl gap-2"
                >
                  <Send className="h-4 w-4" />
                  Send to All Unsent ({stats?.unsent || 0})
                </Button>
                <p className="text-[10px] text-white text-center mt-1">
                  Sends in batches of 10 · Excludes signed-up users and bounced emails
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Tab switcher */}
        <div className="flex gap-1 p-1 bg-muted/50 rounded-xl border border-border">
          <Button
            variant={activeTab === 'unsent' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setActiveTab('unsent')}
            className={`flex-1 h-10 touch-manipulation text-sm gap-1.5 ${activeTab === 'unsent' ? 'bg-purple-500 text-white hover:bg-purple-600' : ''}`}
          >
            <Target className="h-3.5 w-3.5" />
            Unsent ({filteredUnsent.length})
          </Button>
          <Button
            variant={activeTab === 'sent' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setActiveTab('sent')}
            className={`flex-1 h-10 touch-manipulation text-sm gap-1.5 ${activeTab === 'sent' ? 'bg-blue-500 text-white hover:bg-blue-600' : ''}`}
          >
            <Mail className="h-3.5 w-3.5" />
            Sent & Tracking ({filteredSent.length})
          </Button>
        </div>

        {/* Search */}
        <AdminSearchInput value={search} onChange={setSearch} placeholder="Search by email..." />

        {/* Unsent Tab */}
        {activeTab === 'unsent' && (
          <Card>
            <CardContent className="pt-4 pb-4 px-3 sm:px-4">
              {isLoading ? (
                <div className="space-y-2">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="h-14 bg-muted/50 rounded-lg animate-pulse" />
                  ))}
                </div>
              ) : filteredUnsent.length === 0 ? (
                <AdminEmptyState
                  icon={Users}
                  title="No unsent leads"
                  description={
                    search
                      ? 'No leads match your search.'
                      : 'All leads have been sent the conversion email.'
                  }
                />
              ) : (
                <div className="space-y-1.5">
                  {filteredUnsent.map((lead) => (
                    <div
                      key={lead.id}
                      className="flex items-center gap-3 p-2.5 rounded-xl bg-muted/50"
                    >
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm text-white truncate">{lead.email}</p>
                        <p className="text-xs text-white">
                          Signed up {format(new Date(lead.created_at), 'd MMM yyyy')}
                        </p>
                      </div>
                      {getStatusBadge(lead.conversion_status)}
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Sent & Tracking Tab */}
        {activeTab === 'sent' && (
          <Card>
            <CardContent className="pt-4 pb-4 px-3 sm:px-4">
              {isLoading ? (
                <div className="space-y-2">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="h-14 bg-muted/50 rounded-lg animate-pulse" />
                  ))}
                </div>
              ) : filteredSent.length === 0 ? (
                <AdminEmptyState
                  icon={Mail}
                  title="No emails sent yet"
                  description="Send conversion emails to see tracking data here."
                />
              ) : (
                <div className="space-y-1.5">
                  {filteredSent.map((lead) => (
                    <div
                      key={lead.id}
                      className="flex items-center gap-3 p-2.5 rounded-xl bg-muted/50"
                    >
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm text-white truncate">{lead.email}</p>
                        <p className="text-xs text-white">
                          Sent{' '}
                          {lead.conversion_email_sent_at
                            ? formatDistanceToNow(new Date(lead.conversion_email_sent_at), {
                                addSuffix: true,
                              })
                            : 'recently'}
                        </p>
                      </div>
                      {getStatusBadge(lead.conversion_status)}
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Already Converted (collapsible) */}
        {conversionData && conversionData.converted.length > 0 && (
          <Card className="bg-gradient-to-br from-green-500/5 to-emerald-500/5 border-green-500/20">
            <Collapsible open={convertedOpen} onOpenChange={setConvertedOpen}>
              <CollapsibleTrigger asChild>
                <CardHeader className="cursor-pointer touch-manipulation pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <UserCheck className="h-4 w-4 text-green-400" />
                      <CardTitle className="text-sm font-bold">Already Converted</CardTitle>
                      <Badge className="bg-green-500/20 text-green-400">
                        {conversionData.converted.length}
                      </Badge>
                    </div>
                    {convertedOpen ? (
                      <ChevronDown className="h-5 w-5 text-white" />
                    ) : (
                      <ChevronRight className="h-5 w-5 text-white" />
                    )}
                  </div>
                </CardHeader>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <CardContent className="pt-0 pb-4">
                  <div className="space-y-1.5">
                    {conversionData.converted.map((lead) => (
                      <div
                        key={lead.id}
                        className="flex items-center justify-between p-2.5 rounded-xl bg-green-500/5"
                      >
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-medium text-white truncate">{lead.email}</p>
                          <p className="text-xs text-green-400">
                            {lead.user?.full_name || 'Unknown'} · {lead.user?.role || ''}
                          </p>
                        </div>
                        <Badge className="bg-green-500/20 text-green-400 text-[10px] px-1.5">
                          <UserCheck className="h-3 w-3 mr-0.5" />
                          Signed Up
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </CollapsibleContent>
            </Collapsible>
          </Card>
        )}

        {/* Confirm Send All Dialog */}
        <AlertDialog open={confirmSendAll} onOpenChange={setConfirmSendAll}>
          <AlertDialogContent className="max-w-[calc(100vw-2rem)] sm:max-w-lg rounded-2xl p-5 sm:p-6">
            <AlertDialogHeader className="space-y-3">
              <AlertDialogTitle className="text-base sm:text-lg leading-tight">
                Send to all {stats?.unsent || 0} unsent leads?
              </AlertDialogTitle>
              <AlertDialogDescription className="text-sm leading-relaxed">
                This sends the conversion email in batches of 10. People who have already signed up
                ({stats?.total_converted || 0}) and bounced emails ({stats?.bounced || 0}) are
                automatically excluded. You can stop at any time.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="flex-col-reverse sm:flex-row gap-2 sm:gap-2 pt-2">
              <AlertDialogCancel className="h-12 sm:h-11 touch-manipulation text-base sm:text-sm w-full sm:w-auto mt-0">
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={() => {
                  setConfirmSendAll(false);
                  // Defer to next tick so the dialog fully unmounts first
                  window.setTimeout(startBatchLoop, 200);
                }}
                className="h-12 sm:h-11 touch-manipulation text-base sm:text-sm bg-purple-500 hover:bg-purple-600 text-white font-semibold w-full sm:w-auto"
              >
                <Send className="h-4 w-4 mr-2" />
                Start Sending
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </PullToRefresh>
  );
}
