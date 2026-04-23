import { useMemo, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { copyToClipboard } from '@/utils/clipboard';
import { openExternalUrl } from '@/utils/open-external-url';
import {
  useLTIPlatforms,
  validateLtiUrl,
  type LTIPlatformRow,
  type LTIPlatformType,
} from '@/hooks/useLTIPlatforms';
import { useAuth } from '@/contexts/AuthContext';
import {
  PageFrame,
  PageHero,
  StatStrip,
  Pill,
  itemVariants,
  type Tone,
} from '@/components/college/primitives';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

/**
 * Shape used by the UI. Adapted from the live `lti_platforms` row +
 * settings.features JSONB (deep_linking / grade_sync / roster_sync) +
 * per-platform launch stats from the hook.
 */
interface LTIPlatform {
  id: string;
  name: string;
  type: 'canvas' | 'moodle' | 'blackboard' | 'd2l' | 'schoology' | 'other';
  status: 'Connected' | 'Disconnected' | 'Pending';
  url: string;
  clientId: string;
  deploymentId?: string;
  lastSync: string | null;
  features: {
    deepLinking: boolean;
    gradeSync: boolean;
    rosterSync: boolean;
  };
  stats: {
    launches: number;
    courses: number;
    users: number;
  };
}

function rowToPlatform(
  row: LTIPlatformRow,
  stats: { totalLaunches: number; uniqueContexts: number; uniqueUsers: number }
): LTIPlatform {
  const settings = (row.settings as Record<string, unknown> | null) ?? {};
  const features = (settings.features as Record<string, boolean> | undefined) ?? {};
  return {
    id: row.id,
    name: row.name,
    type: (row.platform_type as LTIPlatform['type']) ?? 'other',
    status: row.status as LTIPlatform['status'],
    url: row.issuer,
    clientId: row.client_id,
    deploymentId: row.deployment_id ?? undefined,
    lastSync: row.last_sync_at,
    features: {
      deepLinking: !!features.deep_linking,
      gradeSync: !!features.grade_sync,
      rosterSync: !!features.roster_sync,
    },
    stats: {
      launches: stats.totalLaunches,
      courses: stats.uniqueContexts,
      users: stats.uniqueUsers,
    },
  };
}

// Real LTI 1.3 backend (Supabase Edge Functions)
const LTI_BASE = 'https://jtwygbeceundfgnkirof.supabase.co/functions/v1';

const ltiConfig = {
  toolUrl: LTI_BASE + '/lti-launch',
  jwksUrl: LTI_BASE + '/lti-jwks',
  deepLinkUrl: LTI_BASE + '/lti-deep-link',
  redirectUris: [LTI_BASE + '/lti-launch'],
  oidcInitUrl: LTI_BASE + '/lti-oidc-init',
};

export function LTISettingsSection() {
  const { toast } = useToast();
  const { profile } = useAuth();
  const {
    collegeId,
    platforms: rows,
    launches,
    loading,
    error,
    refresh,
    addPlatform,
    updatePlatform,
    deletePlatform,
    statsForPlatform,
    verifyPlatform,
    globalStats,
    health,
    refreshHealth,
  } = useLTIPlatforms();

  const platforms: LTIPlatform[] = useMemo(
    () => rows.map((r) => rowToPlatform(r, statsForPlatform(r.id))),
    [rows, statsForPlatform]
  );

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isSetupGuideOpen, setIsSetupGuideOpen] = useState(false);
  const [selectedGuide, setSelectedGuide] = useState<'canvas' | 'moodle' | 'blackboard' | null>(
    null
  );
  const [isConfigureDialogOpen, setIsConfigureDialogOpen] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState<LTIPlatform | null>(null);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [isSyncing, setIsSyncing] = useState<string | null>(null);
  const [isSubmittingAdd, setIsSubmittingAdd] = useState(false);
  const [editingPlatformId, setEditingPlatformId] = useState<string | null>(null);
  const [verifyingId, setVerifyingId] = useState<string | null>(null);
  const [verifyResult, setVerifyResult] = useState<
    Record<string, { ok: boolean; checks: Array<{ name: string; ok: boolean; message: string }> }>
  >({});

  // New platform form state — captures everything needed to create an
  // `lti_platforms` row. college_id is taken from profile (required — H14).
  const [newPlatform, setNewPlatform] = useState({
    name: '',
    type: 'canvas' as LTIPlatformType,
    issuer: '',
    clientId: '',
    deploymentId: '',
    authLoginUrl: '',
    authTokenUrl: '',
    jwksUrl: '',
  });

  const handleCopyToClipboard = (text: string, field: string) => {
    copyToClipboard(text);
    setCopiedField(field);
    toast({
      title: 'Copied to clipboard',
      description: 'Value has been copied successfully',
    });
    setTimeout(() => setCopiedField(null), 2000);
  };

  // handleSavePlatform (add + edit) is defined below with validation.

  const handleSync = async (platformId: string) => {
    setIsSyncing(platformId);
    try {
      await updatePlatform(platformId, { status: 'Connected' });
      toast({
        title: 'Platform marked connected',
        description:
          'Roster/grade sync coming in Phase 16.5/16.6. For now, you can launch from your LMS.',
      });
    } catch (e) {
      toast({
        title: 'Sync failed',
        description: e instanceof Error ? e.message : 'Unknown error',
        variant: 'destructive',
      });
    } finally {
      setIsSyncing(null);
    }
  };

  const handleDisconnect = async (platformId: string) => {
    try {
      await deletePlatform(platformId);
      toast({
        title: 'Platform removed',
        description: 'The LTI connection has been deleted.',
      });
    } catch (e) {
      toast({
        title: 'Delete failed',
        description: e instanceof Error ? e.message : 'Unknown error',
        variant: 'destructive',
      });
    }
  };

  const handleVerify = async (platformId: string) => {
    setVerifyingId(platformId);
    try {
      const result = await verifyPlatform(platformId);
      setVerifyResult((prev) => ({ ...prev, [platformId]: result }));
      toast({
        title: result.ok ? 'Platform verified' : 'Verification failed',
        description: result.ok
          ? 'All checks passed. Status set to Connected.'
          : `${result.checks.filter((c) => !c.ok).length} check(s) failed — see details below.`,
        variant: result.ok ? 'default' : 'destructive',
      });
    } catch (e) {
      toast({
        title: 'Verify failed',
        description: e instanceof Error ? e.message : 'Unknown error',
        variant: 'destructive',
      });
    } finally {
      setVerifyingId(null);
    }
  };

  const handleStartEdit = (p: LTIPlatform) => {
    const row = rows.find((r) => r.id === p.id);
    if (!row) return;
    setEditingPlatformId(p.id);
    setNewPlatform({
      name: row.name,
      type: (row.platform_type as LTIPlatformType) ?? 'canvas',
      issuer: row.issuer,
      clientId: row.client_id,
      deploymentId: row.deployment_id ?? '',
      authLoginUrl: row.auth_login_url,
      authTokenUrl: row.auth_token_url,
      jwksUrl: row.jwks_url,
    });
    setIsAddDialogOpen(true);
  };

  // Live form validation for the add/edit dialog
  const formErrors = useMemo(() => {
    const errs: Record<string, string | null> = {
      name: newPlatform.name ? null : 'Name is required',
      issuer: validateLtiUrl(newPlatform.issuer, 'Issuer'),
      clientId: newPlatform.clientId ? null : 'Client ID is required',
      authLoginUrl: validateLtiUrl(newPlatform.authLoginUrl, 'Authorisation login URL'),
      authTokenUrl: validateLtiUrl(newPlatform.authTokenUrl, 'Authorisation token URL'),
      jwksUrl: validateLtiUrl(newPlatform.jwksUrl, 'JWKS URL'),
    };
    return errs;
  }, [newPlatform]);
  const formValid = Object.values(formErrors).every((e) => e === null);

  const handleSavePlatform = async () => {
    if (!collegeId) return;
    if (!formValid) {
      toast({
        title: 'Form has errors',
        description: 'Please fix the validation messages before saving.',
        variant: 'destructive',
      });
      return;
    }

    setIsSubmittingAdd(true);
    try {
      if (editingPlatformId) {
        await updatePlatform(editingPlatformId, {
          name: newPlatform.name,
          platform_type: newPlatform.type,
          issuer: newPlatform.issuer,
          client_id: newPlatform.clientId,
          deployment_id: newPlatform.deploymentId || null,
          auth_login_url: newPlatform.authLoginUrl,
          auth_token_url: newPlatform.authTokenUrl,
          jwks_url: newPlatform.jwksUrl,
        });
        toast({ title: 'Platform updated' });
      } else {
        await addPlatform({
          name: newPlatform.name,
          platform_type: newPlatform.type,
          issuer: newPlatform.issuer,
          client_id: newPlatform.clientId,
          deployment_id: newPlatform.deploymentId || null,
          auth_login_url: newPlatform.authLoginUrl,
          auth_token_url: newPlatform.authTokenUrl,
          jwks_url: newPlatform.jwksUrl,
          college_id: collegeId,
        });
        toast({ title: 'Platform added', description: 'Now click Verify to confirm it reaches your LMS.' });
      }
      setNewPlatform({
        name: '',
        type: 'canvas',
        issuer: '',
        clientId: '',
        deploymentId: '',
        authLoginUrl: '',
        authTokenUrl: '',
        jwksUrl: '',
      });
      setEditingPlatformId(null);
      setIsAddDialogOpen(false);
    } catch (e) {
      toast({
        title: editingPlatformId ? 'Update failed' : 'Add failed',
        description: e instanceof Error ? e.message : 'Unknown error',
        variant: 'destructive',
      });
    } finally {
      setIsSubmittingAdd(false);
    }
  };

  const handleToggleFeature = async (
    platformId: string,
    feature: keyof LTIPlatform['features']
  ) => {
    const row = rows.find((r) => r.id === platformId);
    if (!row) return;
    const featureKey =
      feature === 'deepLinking' ? 'deep_linking' : feature === 'gradeSync' ? 'grade_sync' : 'roster_sync';
    const currentFeatures =
      ((row.settings as Record<string, unknown> | null)?.features as Record<string, boolean>) ?? {};
    const nextFeatures = { ...currentFeatures, [featureKey]: !currentFeatures[featureKey] };
    try {
      await updatePlatform(platformId, { settings: { ...(row.settings ?? {}), features: nextFeatures } });
      toast({ title: 'Feature updated' });
    } catch (e) {
      toast({
        title: 'Toggle failed',
        description: e instanceof Error ? e.message : 'Unknown error',
        variant: 'destructive',
      });
    }
  };

  const openSetupGuide = (type: 'canvas' | 'moodle' | 'blackboard') => {
    setSelectedGuide(type);
    setIsSetupGuideOpen(true);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Connected':
        return 'bg-green-500/10 text-green-500 border-green-500/20';
      case 'Disconnected':
        return 'bg-red-500/10 text-red-500 border-red-500/20';
      case 'Pending':
        return 'bg-amber-500/10 text-amber-500 border-amber-500/20';
      default:
        return 'bg-muted text-white';
    }
  };

  const getPlatformColor = (type: string) => {
    const colors: Record<string, string> = {
      canvas: 'bg-red-500',
      moodle: 'bg-orange-500',
      blackboard: 'bg-gray-700',
      other: 'bg-elec-yellow',
    };
    return colors[type] || 'bg-elec-yellow';
  };

  return (
    <PageFrame>
      <motion.div variants={itemVariants}>
        <PageHero
          eyebrow="Resources · VLE Integration"
          title="LTI & VLE integration"
          description="Connect to Canvas, Moodle, Blackboard and other LMS platforms via LTI 1.3."
          tone="blue"
          actions={
            <button
              onClick={() => setIsAddDialogOpen(true)}
              className="text-[12.5px] font-medium text-elec-yellow/90 hover:text-elec-yellow transition-colors touch-manipulation whitespace-nowrap"
            >
              Add platform →
            </button>
          }
        />
      </motion.div>

      {/* Connection Overview */}
      <motion.div variants={itemVariants}>
        <StatStrip
          columns={3}
          stats={[
            {
              value: platforms.filter((p) => p.status === 'Connected').length,
              label: 'Connected',
              sub: 'Active platforms',
              tone: 'green',
            },
            {
              value: platforms.reduce((sum, p) => sum + p.stats.launches, 0),
              label: 'Launches',
              sub: 'Total tool launches',
              tone: 'yellow',
            },
            {
              value: platforms.reduce((sum, p) => sum + p.stats.users, 0),
              label: 'Users',
              sub: 'Linked accounts',
              tone: 'blue',
            },
          ]}
        />
      </motion.div>

      {/* Prominent "Your tool URLs" card — admin's cheat sheet to paste into any LMS */}
      <motion.div variants={itemVariants} className="mb-10">
        <div className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl p-5 sm:p-6">
          <div className="flex items-baseline justify-between gap-3 flex-wrap">
            <div>
              <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                Tool URLs
              </div>
              <h3 className="mt-1 text-lg sm:text-xl font-semibold text-white tracking-tight">
                Give these four URLs to your LMS admin
              </h3>
              <p className="mt-1 text-[12.5px] text-white/55">
                These are fixed for your Elec-Mate instance. Paste them into your LMS's LTI tool
                configuration. Each URL has a copy button.
              </p>
            </div>
          </div>
          <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {[
              { label: 'OIDC login init', value: ltiConfig.oidcInitUrl },
              { label: 'Launch URL', value: ltiConfig.toolUrl },
              { label: 'Redirect URI', value: ltiConfig.redirectUris[0] },
              { label: 'Public JWKS', value: ltiConfig.jwksUrl },
              { label: 'Deep linking', value: ltiConfig.deepLinkUrl },
            ].map((row) => (
              <div
                key={row.label}
                className="flex items-center gap-3 bg-[hsl(0_0%_10%)] border border-white/[0.05] rounded-lg px-3 py-2"
              >
                <div className="min-w-0 flex-1">
                  <div className="text-[10px] uppercase tracking-wider text-white/55">
                    {row.label}
                  </div>
                  <div className="mt-0.5 text-[11.5px] font-mono text-white/80 truncate">
                    {row.value}
                  </div>
                </div>
                <button
                  onClick={() => handleCopyToClipboard(row.value, row.label)}
                  className="text-[11px] font-medium text-elec-yellow/90 hover:text-elec-yellow transition-colors touch-manipulation shrink-0"
                >
                  {copiedField === row.label ? '✓ Copied' : 'Copy'}
                </button>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      <Tabs defaultValue="platforms">
        <TabsList className="inline-flex items-center gap-1 p-1 bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-full h-auto w-auto">
          <TabsTrigger
            value="platforms"
            className="px-4 py-1.5 rounded-full text-[12.5px] font-medium data-[state=active]:bg-elec-yellow data-[state=active]:text-black text-white/70"
          >
            Platforms
          </TabsTrigger>
          <TabsTrigger
            value="config"
            className="px-4 py-1.5 rounded-full text-[12.5px] font-medium data-[state=active]:bg-elec-yellow data-[state=active]:text-black text-white/70"
          >
            Configuration
          </TabsTrigger>
          <TabsTrigger
            value="dynamic"
            className="px-4 py-1.5 rounded-full text-[12.5px] font-medium data-[state=active]:bg-elec-yellow data-[state=active]:text-black text-white/70"
          >
            Dynamic registration
          </TabsTrigger>
          <TabsTrigger
            value="guides"
            className="px-4 py-1.5 rounded-full text-[12.5px] font-medium data-[state=active]:bg-elec-yellow data-[state=active]:text-black text-white/70"
          >
            Setup guides
          </TabsTrigger>
        </TabsList>

        <TabsContent value="platforms" className="space-y-5 mt-6">
          {platforms.length === 0 ? (
            <div className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl p-8 sm:p-12 text-center">
              <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                No platforms connected
              </div>
              <h3 className="mt-2 text-xl sm:text-2xl font-semibold text-white tracking-tight">
                Connect your first VLE
              </h3>
              <p className="mt-3 text-[13px] text-white/55 max-w-md mx-auto leading-relaxed">
                Link Canvas, Moodle or Blackboard via LTI 1.3 for single sign-on, grade sync and
                roster import.
              </p>
              <div className="mt-6 flex items-center justify-center gap-4">
                <button
                  onClick={() => setIsAddDialogOpen(true)}
                  className="h-11 px-5 bg-elec-yellow text-black rounded-full text-[13px] font-semibold hover:opacity-90 transition-opacity touch-manipulation"
                >
                  Add platform →
                </button>
                <button
                  onClick={() => openSetupGuide('canvas')}
                  className="text-[12.5px] font-medium text-white/70 hover:text-white transition-colors touch-manipulation"
                >
                  View guide
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              {platforms.map((platform) => {
                const platformTone: Tone =
                  platform.type === 'canvas'
                    ? 'red'
                    : platform.type === 'moodle'
                      ? 'orange'
                      : platform.type === 'blackboard'
                        ? 'indigo'
                        : 'yellow';
                const statusTone: Tone =
                  platform.status === 'Connected'
                    ? 'green'
                    : platform.status === 'Disconnected'
                      ? 'red'
                      : 'amber';
                return (
                  <div
                    key={platform.id}
                    className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl overflow-hidden"
                  >
                    <div
                      className={cn(
                        'h-px',
                        platformTone === 'red' && 'bg-red-400/60',
                        platformTone === 'orange' && 'bg-orange-400/60',
                        platformTone === 'indigo' && 'bg-indigo-400/60',
                        platformTone === 'yellow' && 'bg-elec-yellow/60'
                      )}
                    />
                    <div className="p-5 sm:p-6">
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <div className="text-[10px] font-medium uppercase tracking-[0.16em] text-white/55">
                            {platform.type}
                          </div>
                          <h3 className="mt-1 text-lg sm:text-xl font-semibold text-white tracking-tight">
                            {platform.name}
                          </h3>
                          <p className="mt-0.5 text-[12px] text-white/75 truncate">
                            {platform.url}
                          </p>
                        </div>
                        <div className="flex items-center gap-1.5 shrink-0">
                          <Pill tone={statusTone}>{platform.status}</Pill>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <button
                                className="text-white/75 hover:text-white text-[18px] leading-none px-1 touch-manipulation"
                                aria-label="Options"
                              >
                                ⋯
                              </button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem
                                className="h-11"
                                onClick={() => handleVerify(platform.id)}
                                disabled={verifyingId === platform.id}
                              >
                                {verifyingId === platform.id ? 'Verifying…' : 'Verify config'}
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                className="h-11"
                                onClick={() => handleStartEdit(platform)}
                              >
                                Edit details
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                className="h-11"
                                onClick={() => {
                                  setSelectedPlatform(platform);
                                  setIsConfigureDialogOpen(true);
                                }}
                              >
                                Configure features
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                className="h-11"
                                onClick={() => openExternalUrl(platform.url)}
                              >
                                Open LMS
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                className="h-11 text-red-400"
                                onClick={() => handleDisconnect(platform.id)}
                              >
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>

                      {/* Verify result inline — shows after clicking "Verify config" */}
                      {verifyResult[platform.id] && (
                        <div
                          className={cn(
                            'mt-4 rounded-lg border p-3 text-xs space-y-1.5',
                            verifyResult[platform.id].ok
                              ? 'border-emerald-500/30 bg-emerald-500/5'
                              : 'border-red-500/30 bg-red-500/5'
                          )}
                        >
                          <div className="font-medium text-white/80">
                            {verifyResult[platform.id].ok
                              ? '✓ All checks passed'
                              : `${verifyResult[platform.id].checks.filter((c) => !c.ok).length} check(s) failed`}
                          </div>
                          {verifyResult[platform.id].checks.map((c) => (
                            <div key={c.name} className="flex items-start gap-2">
                              <span
                                className={cn(
                                  'mt-0.5 font-mono text-[10px]',
                                  c.ok ? 'text-emerald-400' : 'text-red-400'
                                )}
                              >
                                {c.ok ? '✓' : '✗'}
                              </span>
                              <div className="flex-1">
                                <span className="text-white/70">{c.name}:</span>{' '}
                                <span className="text-white/75">{c.message}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Feature Toggles */}
                      <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-2">
                        {[
                          { key: 'deepLinking' as const, label: 'Deep linking' },
                          { key: 'gradeSync' as const, label: 'Grade sync' },
                          { key: 'rosterSync' as const, label: 'Roster sync' },
                        ].map((feat) => {
                          const enabled = platform.features[feat.key];
                          return (
                            <button
                              key={feat.key}
                              onClick={() => handleToggleFeature(platform.id, feat.key)}
                              className="flex items-center justify-between px-4 py-3 bg-[hsl(0_0%_10%)] border border-white/[0.06] rounded-xl hover:bg-[hsl(0_0%_13%)] transition-colors touch-manipulation text-left"
                            >
                              <span className="text-[12px] text-white/70">{feat.label}</span>
                              <Pill tone={enabled ? 'green' : 'yellow'}>
                                {enabled ? 'On' : 'Off'}
                              </Pill>
                            </button>
                          );
                        })}
                      </div>

                      {/* Stats */}
                      <div className="mt-5 pt-5 border-t border-white/[0.06] flex flex-wrap items-center gap-x-5 gap-y-1 text-[11.5px] text-white/75">
                        <span className="tabular-nums">
                          {platform.stats.launches.toLocaleString()} launches
                        </span>
                        <span className="tabular-nums">{platform.stats.courses} courses</span>
                        <span className="tabular-nums">{platform.stats.users} users</span>
                        {platform.lastSync && (
                          <span className="tabular-nums">
                            Last sync{' '}
                            {new Date(platform.lastSync).toLocaleDateString('en-GB', {
                              day: 'numeric',
                              month: 'short',
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </TabsContent>

        <TabsContent value="config" className="space-y-6 mt-6">
          {/* LTI Tool Configuration */}
          <div className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl p-5 sm:p-6">
            <div className="text-[10px] font-medium uppercase tracking-[0.16em] text-white/55">
              LTI 1.3 Tool Configuration
            </div>
            <p className="mt-2 text-[12.5px] text-white/55 leading-relaxed">
              Copy these values when registering Elec-Mate as an LTI tool in your LMS.
            </p>

            <div className="mt-5 space-y-3">
              {[
                { label: 'Tool launch URL', value: ltiConfig.toolUrl, key: 'toolUrl' },
                {
                  label: 'OIDC initiation URL',
                  value: ltiConfig.oidcInitUrl,
                  key: 'oidcInitUrl',
                },
                { label: 'JWKS URL (public key set)', value: ltiConfig.jwksUrl, key: 'jwksUrl' },
                { label: 'Deep linking URL', value: ltiConfig.deepLinkUrl, key: 'deepLinkUrl' },
                {
                  label: 'Redirect URIs',
                  value: ltiConfig.redirectUris.join(', '),
                  key: 'redirectUris',
                },
              ].map((item) => (
                <div key={item.key}>
                  <Label className="text-[10px] font-medium uppercase tracking-[0.14em] text-white/55">
                    {item.label}
                  </Label>
                  <div className="mt-1.5 flex gap-2">
                    <input
                      value={item.value}
                      readOnly
                      className="flex-1 h-11 px-4 font-mono text-[12.5px] bg-[hsl(0_0%_9%)] border border-white/[0.08] rounded-xl text-white focus:outline-none focus:border-elec-yellow/60 touch-manipulation"
                    />
                    <button
                      onClick={() => handleCopyToClipboard(item.value, item.key)}
                      className="h-11 px-4 bg-[hsl(0_0%_9%)] border border-white/[0.08] text-white rounded-xl text-[12.5px] font-medium hover:bg-[hsl(0_0%_13%)] transition-colors touch-manipulation whitespace-nowrap"
                    >
                      {copiedField === item.key ? 'Copied ✓' : 'Copy'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Security Settings */}
          <div className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl p-5 sm:p-6">
            <div className="text-[10px] font-medium uppercase tracking-[0.16em] text-white/55">
              Security Settings
            </div>
            <div className="mt-4 divide-y divide-white/[0.06]">
              {[
                {
                  label: 'Require state parameter',
                  desc: 'Enforce state validation for the OIDC flow.',
                  default: true,
                },
                {
                  label: 'Validate nonce',
                  desc: 'Prevents replay attacks on authentication tokens.',
                  default: true,
                },
                {
                  label: 'Auto-provision users',
                  desc: 'Create accounts automatically on first LTI launch.',
                  default: true,
                },
                {
                  label: 'Sync grades automatically',
                  desc: 'Push grades to LMS when recorded in Elec-Mate.',
                  default: false,
                },
              ].map((setting, idx) => (
                <div key={idx} className="flex items-center justify-between gap-4 py-4">
                  <div className="min-w-0">
                    <div className="text-[13.5px] font-medium text-white">{setting.label}</div>
                    <div className="mt-0.5 text-[11.5px] text-white/75">{setting.desc}</div>
                  </div>
                  <Switch defaultChecked={setting.default} />
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        {/* Dynamic Registration tab — Sprint 3 / ELE-832 */}
        <TabsContent value="dynamic" className="space-y-6 mt-6">
          <div className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl p-5 sm:p-6">
            <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
              Recommended · 30-second install
            </div>
            <h3 className="mt-1 text-xl sm:text-2xl font-semibold text-white tracking-tight">
              Install with one URL
            </h3>
            <p className="mt-2 text-[13px] text-white/60 leading-relaxed">
              Modern LMSes (Canvas, Moodle 4+, D2L, Schoology) support the 1EdTech LTI Dynamic
              Registration flow. Paste the URL below into your LMS's "Register external tool" field —
              your LMS then handshakes with Elec-Mate automatically, no 8-field form required.
            </p>

            {!collegeId ? (
              <div className="mt-5 rounded-lg border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-300">
                You must be a member of a college to use Dynamic Registration. Speak to your Elec-Mate admin.
              </div>
            ) : (
              <>
                <div className="mt-5 flex items-center gap-3 bg-[hsl(0_0%_10%)] border border-white/[0.06] rounded-lg px-3 py-3">
                  <div className="min-w-0 flex-1">
                    <div className="text-[10px] uppercase tracking-wider text-white/55">
                      Dynamic registration URL
                    </div>
                    <div className="mt-0.5 text-[12px] font-mono text-white/85 break-all">
                      {`${LTI_BASE}/lti-dynamic-register?college_id=${collegeId}`}
                    </div>
                  </div>
                  <button
                    onClick={() =>
                      handleCopyToClipboard(
                        `${LTI_BASE}/lti-dynamic-register?college_id=${collegeId}`,
                        'dynamic-reg'
                      )
                    }
                    className="shrink-0 px-3 py-1.5 rounded-full bg-elec-yellow hover:bg-elec-yellow/90 text-black text-[11.5px] font-medium touch-manipulation"
                  >
                    {copiedField === 'dynamic-reg' ? '✓ Copied' : 'Copy URL'}
                  </button>
                </div>

                <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    {
                      step: '1',
                      title: 'Copy the URL above',
                      desc: 'The `college_id` is already baked in for your college.',
                    },
                    {
                      step: '2',
                      title: 'Paste into your LMS',
                      desc: 'In Canvas → Admin → Developer Keys → LTI Advantage Tool Registration. In Moodle → External Tools → LTI Advantage.',
                    },
                    {
                      step: '3',
                      title: "Follow the LMS's prompts",
                      desc: 'Your LMS redirects to Elec-Mate, we handshake, save config, and you see a success page.',
                    },
                  ].map((s) => (
                    <div
                      key={s.step}
                      className="bg-[hsl(0_0%_10%)] border border-white/[0.06] rounded-xl p-4"
                    >
                      <div className="text-[10px] font-medium uppercase tracking-[0.16em] text-white/55">
                        Step {s.step}
                      </div>
                      <h4 className="mt-2 text-[14px] font-semibold text-white">{s.title}</h4>
                      <p className="mt-1 text-[11.5px] text-white/75 leading-relaxed">{s.desc}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-4 text-[11.5px] text-white/70">
                  LMS doesn't support Dynamic Registration? Switch to the <b className="text-white/60">Platforms</b> tab and use the manual 8-field form.
                </div>
              </>
            )}
          </div>
        </TabsContent>

        <TabsContent value="guides" className="space-y-6 mt-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-white/[0.06] border border-white/[0.06] rounded-2xl overflow-hidden">
            {[
              { type: 'canvas' as const, name: 'Canvas LMS', desc: 'Instructure Canvas', tone: 'red' as Tone },
              { type: 'moodle' as const, name: 'Moodle', desc: 'Moodle LMS 4.x', tone: 'orange' as Tone },
              { type: 'blackboard' as const, name: 'Blackboard', desc: 'Blackboard Learn', tone: 'indigo' as Tone },
            ].map((guide) => (
              <button
                key={guide.type}
                onClick={() => openSetupGuide(guide.type)}
                className="group relative bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors p-6 text-left touch-manipulation flex flex-col min-h-[180px]"
              >
                <div
                  className={cn(
                    'absolute inset-x-0 top-0 h-px opacity-70 group-hover:opacity-100 transition-opacity',
                    guide.tone === 'red' && 'bg-red-400',
                    guide.tone === 'orange' && 'bg-orange-400',
                    guide.tone === 'indigo' && 'bg-indigo-400'
                  )}
                />
                <div className="text-[10px] font-medium uppercase tracking-[0.16em] text-white/55">
                  Setup Guide
                </div>
                <h3 className="mt-2 text-lg sm:text-xl font-semibold text-white tracking-tight">
                  {guide.name}
                </h3>
                <p className="mt-1 text-[12.5px] text-white/75">{guide.desc}</p>
                <div className="flex-grow" />
                <div className="mt-4 text-[12px] font-medium text-elec-yellow/80 group-hover:text-elec-yellow group-hover:translate-x-0.5 transition-all">
                  View guide →
                </div>
              </button>
            ))}
          </div>

          {/* Quick Start */}
          <div className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl p-5 sm:p-6">
            <div className="text-[10px] font-medium uppercase tracking-[0.16em] text-white/55">
              Quick Start
            </div>
            <h3 className="mt-2 text-lg sm:text-xl font-semibold text-white tracking-tight">
              Four steps to connect
            </h3>
            <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                {
                  step: '01',
                  title: 'Register tool',
                  desc: 'Add Elec-Mate as an LTI tool in your LMS admin panel.',
                },
                {
                  step: '02',
                  title: 'Copy config',
                  desc: 'Use the values from the Configuration tab.',
                },
                {
                  step: '03',
                  title: 'Add platform',
                  desc: 'Enter your LMS details in the Platforms tab.',
                },
                {
                  step: '04',
                  title: 'Test launch',
                  desc: 'Create a test assignment and verify the connection.',
                },
              ].map((item) => (
                <div
                  key={item.step}
                  className="bg-[hsl(0_0%_10%)] border border-white/[0.06] rounded-xl p-4"
                >
                  <div className="text-[10px] font-medium uppercase tracking-[0.16em] text-white/55">
                    Step {item.step}
                  </div>
                  <h4 className="mt-2 text-[14px] font-semibold text-white">{item.title}</h4>
                  <p className="mt-1 text-[11.5px] text-white/75 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* Observability dashboard — Sprint 2 / ELE-831 */}
      <motion.div variants={itemVariants} className="mt-10">
        <div className="flex items-baseline justify-between gap-3 flex-wrap mb-4">
          <div>
            <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
              Observability
            </div>
            <h3 className="mt-1 text-xl sm:text-2xl font-semibold text-white tracking-tight">
              Health & launch metrics
            </h3>
          </div>
          <div className="flex items-center gap-3">
            <span
              className={cn(
                'inline-flex items-center gap-1.5 text-[11px] font-medium tabular-nums',
                health.status === 'ok'
                  ? 'text-emerald-400'
                  : health.status === 'degraded'
                    ? 'text-red-400'
                    : 'text-white/70'
              )}
            >
              <span
                className={cn(
                  'h-1.5 w-1.5 rounded-full',
                  health.status === 'ok'
                    ? 'bg-emerald-400 animate-pulse'
                    : health.status === 'degraded'
                      ? 'bg-red-400'
                      : 'bg-white/30'
                )}
                aria-hidden
              />
              {health.status === 'ok'
                ? 'Systems operational'
                : health.status === 'degraded'
                  ? 'Degraded'
                  : 'Checking…'}
              {health.total_ms ? ` · ${health.total_ms}ms` : ''}
            </span>
            <button
              onClick={refreshHealth}
              className="text-[11px] text-white/75 hover:text-white/80 transition-colors"
            >
              ↻
            </button>
          </div>
        </div>

        {/* KPI tiles */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            {
              label: 'Launches (50)',
              value: globalStats.total,
              tone: 'white/80',
            },
            {
              label: 'Success rate',
              value: globalStats.successRate === null ? '—' : `${globalStats.successRate}%`,
              tone:
                globalStats.successRate === null
                  ? 'white/60'
                  : globalStats.successRate >= 99
                    ? 'emerald-400'
                    : globalStats.successRate >= 95
                      ? 'amber-400'
                      : 'red-400',
            },
            {
              label: 'Failed',
              value: globalStats.failed,
              tone: globalStats.failed > 0 ? 'red-400' : 'white/60',
            },
            {
              label: 'Platforms',
              value: rows.length,
              tone: 'white/80',
            },
          ].map((k) => (
            <div
              key={k.label}
              className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-xl p-4"
            >
              <div className="text-[10px] uppercase tracking-wider text-white/55">{k.label}</div>
              <div className={cn('mt-1 text-xl font-semibold tabular-nums', `text-${k.tone}`)}>
                {k.value}
              </div>
            </div>
          ))}
        </div>

        {/* 7-day sparkline */}
        <div className="mt-3 bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-xl p-4">
          <div className="text-[10px] uppercase tracking-wider text-white/55 mb-3">
            Last 7 days · launches per day
          </div>
          <div className="flex items-end gap-2 h-20">
            {globalStats.days.map((d) => {
              const max = Math.max(1, ...globalStats.days.map((x) => x.total));
              const h = Math.round((d.total / max) * 100);
              const fh = d.total ? Math.round((d.failed / d.total) * h) : 0;
              return (
                <div key={d.date} className="flex-1 flex flex-col items-center gap-1">
                  <div className="w-full flex-1 flex items-end">
                    <div
                      className="w-full rounded-t bg-emerald-400/70 relative"
                      style={{ height: `${Math.max(2, h)}%` }}
                      title={`${d.total} launches (${d.failed} failed) on ${d.date}`}
                    >
                      {fh > 0 && (
                        <div
                          className="absolute top-0 left-0 right-0 rounded-t bg-red-400/80"
                          style={{ height: `${fh}%` }}
                        />
                      )}
                    </div>
                  </div>
                  <span className="text-[9px] tabular-nums text-white/65">
                    {d.date.slice(-2)}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Top errors */}
        {globalStats.topErrors.length > 0 && (
          <div className="mt-3 bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-xl p-4">
            <div className="text-[10px] uppercase tracking-wider text-white/55 mb-3">
              Top errors
            </div>
            <div className="space-y-1.5">
              {globalStats.topErrors.map((e) => (
                <div
                  key={e.code}
                  className="flex items-center justify-between gap-3 text-[12px]"
                >
                  <span className="font-mono text-red-300/90 truncate">{e.code}</span>
                  <span className="text-white/70 tabular-nums">{e.count}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </motion.div>

      {/* Recent launches — admin diagnostic panel (H8 / ELE-823) */}
      <motion.div variants={itemVariants} className="mt-10">
        <div className="flex items-baseline justify-between mb-4">
          <div>
            <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
              Diagnostic
            </div>
            <h3 className="mt-1 text-xl sm:text-2xl font-semibold text-white tracking-tight">
              Recent launches
            </h3>
          </div>
          <div className="text-[11px] text-white/70 tabular-nums">
            {loading ? 'loading…' : `${launches.length} in last 50`}
          </div>
        </div>
        {error && (
          <div className="mb-3 rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-xs text-red-300">
            {error}
          </div>
        )}
        <div className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl overflow-hidden">
          {launches.length === 0 ? (
            <div className="p-8 text-center text-[12px] text-white/70">
              No launches recorded yet. Register a platform and click test-launch to see entries here.
            </div>
          ) : (
            <div className="divide-y divide-white/[0.06] max-h-[440px] overflow-y-auto">
              {launches.slice(0, 50).map((l) => {
                const platform = rows.find((p) => p.id === l.platform_id);
                const errorCode = (l.launch_data as Record<string, unknown> | null)?.error as
                  | string
                  | undefined;
                const cid = (l.launch_data as Record<string, unknown> | null)?.cid as
                  | string
                  | undefined;
                return (
                  <div
                    key={l.id}
                    className="flex items-start gap-3 px-4 sm:px-5 py-3 text-left"
                  >
                    <span
                      className={cn(
                        'mt-1.5 h-1.5 w-1.5 rounded-full shrink-0',
                        l.validated ? 'bg-emerald-400' : 'bg-red-400'
                      )}
                      aria-hidden
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-3 flex-wrap">
                        <div className="text-[13px] text-white">
                          <span className="font-medium">{platform?.name ?? 'Unknown platform'}</span>
                          <span className="text-white/75 mx-1.5">·</span>
                          <span className="text-white/70 font-mono text-[11px]">{l.lti_user_id}</span>
                          {l.context_title && (
                            <>
                              <span className="text-white/75 mx-1.5">·</span>
                              <span className="text-white/70">{l.context_title}</span>
                            </>
                          )}
                        </div>
                        <span className="text-[11px] tabular-nums text-white/70 shrink-0">
                          {new Date(l.created_at).toLocaleString('en-GB', {
                            day: '2-digit',
                            month: 'short',
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </span>
                      </div>
                      <div className="mt-1 flex items-center gap-1.5 flex-wrap">
                        <Pill tone={l.validated ? 'green' : 'red'}>
                          {l.validated ? 'OK' : 'Failed'}
                        </Pill>
                        {errorCode && (
                          <span className="text-[11px] font-mono text-red-300/90 bg-red-500/10 border border-red-500/20 rounded px-1.5 py-0.5">
                            {errorCode}
                          </span>
                        )}
                        {l.roles && l.roles.length > 0 && (
                          <span className="text-[11px] text-white/75">
                            {l.roles
                              .map((r) => r.split('#').pop() ?? r)
                              .slice(0, 2)
                              .join(', ')}
                          </span>
                        )}
                        {cid && (
                          <span className="text-[10px] font-mono text-white/60 ml-auto">
                            {cid}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </motion.div>

      {/* Add Platform Dialog */}
      <Dialog
        open={isAddDialogOpen}
        onOpenChange={(open) => {
          setIsAddDialogOpen(open);
          if (!open) {
            setEditingPlatformId(null);
            setNewPlatform({
              name: '',
              type: 'canvas',
              issuer: '',
              clientId: '',
              deploymentId: '',
              authLoginUrl: '',
              authTokenUrl: '',
              jwksUrl: '',
            });
          }
        }}
      >
        <DialogContent className="w-[min(100vw-2rem,640px)] max-h-[90vh] overflow-y-auto bg-[hsl(0_0%_10%)] border-white/[0.08] p-0">
          {/* Sticky header */}
          <div className="sticky top-0 z-10 bg-[hsl(0_0%_10%)] border-b border-white/[0.06] px-6 py-5">
            <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
              LMS integration
            </div>
            <DialogTitle className="mt-1 text-xl font-semibold text-white tracking-tight">
              {editingPlatformId ? 'Edit LTI platform' : 'Add LTI platform'}
            </DialogTitle>
            <DialogDescription className="mt-1 text-[13px] text-white/75 leading-relaxed">
              {editingPlatformId
                ? 'Update the LMS configuration. Changes take effect on the next launch.'
                : 'Manually register an LMS using LTI 1.3. If your LMS supports Dynamic Registration, switch to that tab — it only needs one URL.'}
            </DialogDescription>
          </div>

          <div className="px-6 py-5 space-y-6">
            {/* —— Section 1: Platform identity —— */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-elec-yellow" aria-hidden />
                <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/85">
                  Platform identity
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-2 sm:col-span-1">
                  <Label className="text-[12.5px] font-medium text-white">
                    Display name <span className="text-elec-yellow">*</span>
                  </Label>
                  <Input
                    placeholder="Canvas — Production"
                    value={newPlatform.name}
                    onChange={(e) => setNewPlatform({ ...newPlatform, name: e.target.value })}
                    className="h-11 bg-[hsl(0_0%_13%)] border-white/[0.08] text-white placeholder:text-white/60 focus:border-elec-yellow focus:ring-1 focus:ring-elec-yellow"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-[12.5px] font-medium text-white">
                    LMS type <span className="text-elec-yellow">*</span>
                  </Label>
                  <Select
                    value={newPlatform.type}
                    onValueChange={(value: LTIPlatformType) =>
                      setNewPlatform({ ...newPlatform, type: value })
                    }
                  >
                    <SelectTrigger className="h-11 bg-[hsl(0_0%_13%)] border-white/[0.08] text-white focus:border-elec-yellow focus:ring-1 focus:ring-elec-yellow">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-[hsl(0_0%_12%)] border-white/[0.08]">
                      <SelectItem value="canvas">Canvas</SelectItem>
                      <SelectItem value="moodle">Moodle</SelectItem>
                      <SelectItem value="blackboard">Blackboard Learn</SelectItem>
                      <SelectItem value="d2l">D2L Brightspace</SelectItem>
                      <SelectItem value="schoology">Schoology</SelectItem>
                      <SelectItem value="other">Other LTI 1.3</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-[12.5px] font-medium text-white">
                  Issuer URL (iss) <span className="text-elec-yellow">*</span>
                </Label>
                <Input
                  placeholder="https://canvas.instructure.com"
                  value={newPlatform.issuer}
                  onChange={(e) => setNewPlatform({ ...newPlatform, issuer: e.target.value })}
                  className={cn(
                    'h-11 bg-[hsl(0_0%_13%)] text-white placeholder:text-white/60 focus:border-elec-yellow focus:ring-1 focus:ring-elec-yellow',
                    formErrors.issuer && newPlatform.issuer
                      ? 'border-red-500/60'
                      : 'border-white/[0.08]'
                  )}
                />
                {formErrors.issuer && newPlatform.issuer ? (
                  <p className="text-[11.5px] text-red-400">{formErrors.issuer}</p>
                ) : (
                  <p className="text-[11.5px] text-white/70 leading-relaxed">
                    The canonical URL your LMS uses as its OpenID issuer.
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label className="text-[12.5px] font-medium text-white">
                    Client ID <span className="text-elec-yellow">*</span>
                  </Label>
                  <Input
                    placeholder="From LMS tool settings"
                    value={newPlatform.clientId}
                    onChange={(e) => setNewPlatform({ ...newPlatform, clientId: e.target.value })}
                    className="h-11 bg-[hsl(0_0%_13%)] border-white/[0.08] text-white placeholder:text-white/60 focus:border-elec-yellow focus:ring-1 focus:ring-elec-yellow font-mono text-[12.5px]"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-[12.5px] font-medium text-white">
                    Deployment ID{' '}
                    <span className="text-[10px] font-normal text-white/60">(optional)</span>
                  </Label>
                  <Input
                    placeholder="Optional"
                    value={newPlatform.deploymentId}
                    onChange={(e) =>
                      setNewPlatform({ ...newPlatform, deploymentId: e.target.value })
                    }
                    className="h-11 bg-[hsl(0_0%_13%)] border-white/[0.08] text-white placeholder:text-white/60 focus:border-elec-yellow focus:ring-1 focus:ring-elec-yellow font-mono text-[12.5px]"
                  />
                </div>
              </div>
            </div>

            {/* —— Section 2: LMS endpoints —— */}
            <div className="space-y-4 pt-2 border-t border-white/[0.06]">
              <div className="flex items-center justify-between gap-3 pt-2">
                <div className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-elec-yellow" aria-hidden />
                  <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/85">
                    LMS endpoints
                  </div>
                </div>
                <span className="text-[10.5px] text-white/60">
                  All three are required
                </span>
              </div>

              <div className="space-y-2">
                <Label className="text-[12.5px] font-medium text-white">
                  Authorisation login URL <span className="text-elec-yellow">*</span>
                </Label>
                <Input
                  placeholder="https://canvas.../api/lti/authorize_redirect"
                  value={newPlatform.authLoginUrl}
                  onChange={(e) =>
                    setNewPlatform({ ...newPlatform, authLoginUrl: e.target.value })
                  }
                  className={cn(
                    'h-11 bg-[hsl(0_0%_13%)] text-white placeholder:text-white/60 focus:border-elec-yellow focus:ring-1 focus:ring-elec-yellow font-mono text-[12px]',
                    formErrors.authLoginUrl && newPlatform.authLoginUrl
                      ? 'border-red-500/60'
                      : 'border-white/[0.08]'
                  )}
                />
                {formErrors.authLoginUrl && newPlatform.authLoginUrl && (
                  <p className="text-[11.5px] text-red-400">{formErrors.authLoginUrl}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label className="text-[12.5px] font-medium text-white">
                  Authorisation token URL <span className="text-elec-yellow">*</span>
                </Label>
                <Input
                  placeholder="https://canvas.../login/oauth2/token"
                  value={newPlatform.authTokenUrl}
                  onChange={(e) =>
                    setNewPlatform({ ...newPlatform, authTokenUrl: e.target.value })
                  }
                  className={cn(
                    'h-11 bg-[hsl(0_0%_13%)] text-white placeholder:text-white/60 focus:border-elec-yellow focus:ring-1 focus:ring-elec-yellow font-mono text-[12px]',
                    formErrors.authTokenUrl && newPlatform.authTokenUrl
                      ? 'border-red-500/60'
                      : 'border-white/[0.08]'
                  )}
                />
                {formErrors.authTokenUrl && newPlatform.authTokenUrl && (
                  <p className="text-[11.5px] text-red-400">{formErrors.authTokenUrl}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label className="text-[12.5px] font-medium text-white">
                  LMS JWKS URL <span className="text-elec-yellow">*</span>
                </Label>
                <Input
                  placeholder="https://canvas.../api/lti/security/jwks"
                  value={newPlatform.jwksUrl}
                  onChange={(e) => setNewPlatform({ ...newPlatform, jwksUrl: e.target.value })}
                  className={cn(
                    'h-11 bg-[hsl(0_0%_13%)] text-white placeholder:text-white/60 focus:border-elec-yellow focus:ring-1 focus:ring-elec-yellow font-mono text-[12px]',
                    formErrors.jwksUrl && newPlatform.jwksUrl
                      ? 'border-red-500/60'
                      : 'border-white/[0.08]'
                  )}
                />
                {formErrors.jwksUrl && newPlatform.jwksUrl ? (
                  <p className="text-[11.5px] text-red-400">{formErrors.jwksUrl}</p>
                ) : (
                  <p className="text-[11.5px] text-white/70 leading-relaxed">
                    We fetch the LMS's public keys from here to verify signed launches.
                  </p>
                )}
              </div>
            </div>

            {!collegeId && (
              <div className="rounded-lg border border-red-500/30 bg-red-500/10 text-red-300 p-3 text-[12px]">
                You must belong to a college to register a platform. Ask your Elec-Mate admin to
                add you to a college first.
              </div>
            )}
          </div>

          {/* Sticky footer */}
          <DialogFooter className="sticky bottom-0 bg-[hsl(0_0%_10%)] border-t border-white/[0.06] px-6 py-4 gap-2">
            <Button
              variant="outline"
              onClick={() => setIsAddDialogOpen(false)}
              disabled={isSubmittingAdd}
              className="h-11 touch-manipulation rounded-full border-white/[0.12] text-white hover:bg-white/[0.06]"
            >
              Cancel
            </Button>
            <Button
              className="h-11 touch-manipulation rounded-full bg-elec-yellow hover:bg-elec-yellow/90 text-black font-medium px-6 gap-2"
              onClick={handleSavePlatform}
              disabled={isSubmittingAdd || !collegeId || !formValid}
            >
              {isSubmittingAdd
                ? editingPlatformId
                  ? 'Saving…'
                  : 'Adding…'
                : editingPlatformId
                  ? 'Save changes →'
                  : 'Add platform →'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Setup Guide Dialog */}
      <Dialog open={isSetupGuideOpen} onOpenChange={setIsSetupGuideOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto bg-elec-dark border-elec-yellow/20">
          <DialogHeader>
            <DialogTitle>
              {selectedGuide === 'canvas' && 'Canvas LMS setup guide'}
              {selectedGuide === 'moodle' && 'Moodle setup guide'}
              {selectedGuide === 'blackboard' && 'Blackboard Learn setup guide'}
            </DialogTitle>
            <DialogDescription>
              Follow these steps to connect your LMS to Elec-Mate
            </DialogDescription>
          </DialogHeader>

          <div className="py-4">
            {selectedGuide === 'canvas' && (
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="step1">
                  <AccordionTrigger className="text-left">
                    <div className="flex items-center gap-3">
                      <div className="h-6 w-6 rounded-full bg-elec-yellow/20 flex items-center justify-center text-xs font-bold text-elec-yellow">
                        1
                      </div>
                      Access Developer Keys
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-white space-y-2 pl-9">
                    <p>1. Log in to Canvas as an admin</p>
                    <p>
                      2. Go to <strong>Admin → Developer Keys</strong>
                    </p>
                    <p>
                      3. Click <strong>+ Developer Key → + LTI Key</strong>
                    </p>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="step2">
                  <AccordionTrigger className="text-left">
                    <div className="flex items-center gap-3">
                      <div className="h-6 w-6 rounded-full bg-elec-yellow/20 flex items-center justify-center text-xs font-bold text-elec-yellow">
                        2
                      </div>
                      Configure LTI Key
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-white space-y-2 pl-9">
                    <p>Enter the following values:</p>
                    <ul className="list-disc pl-4 space-y-1">
                      <li>
                        <strong>Key Name:</strong> Elec-Mate
                      </li>
                      <li>
                        <strong>Redirect URIs:</strong> {ltiConfig.redirectUris[0]}
                      </li>
                      <li>
                        <strong>Method:</strong> Manual Entry
                      </li>
                      <li>
                        <strong>Target Link URI:</strong> {ltiConfig.toolUrl}
                      </li>
                      <li>
                        <strong>OpenID Connect Initiation URL:</strong> {ltiConfig.oidcInitUrl}
                      </li>
                      <li>
                        <strong>JWK Method:</strong> Public JWK URL
                      </li>
                      <li>
                        <strong>Public JWK URL:</strong> {ltiConfig.jwksUrl}
                      </li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="step3">
                  <AccordionTrigger className="text-left">
                    <div className="flex items-center gap-3">
                      <div className="h-6 w-6 rounded-full bg-elec-yellow/20 flex items-center justify-center text-xs font-bold text-elec-yellow">
                        3
                      </div>
                      Enable Additional Features
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-white space-y-2 pl-9">
                    <p>Under LTI Advantage Services, enable:</p>
                    <ul className="list-disc pl-4 space-y-1">
                      <li>Can create and view assignment data in the gradebook</li>
                      <li>Can view assignment data in the gradebook</li>
                      <li>Can view submission data for assignments</li>
                      <li>Can access Names and Roles Provisioning</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="step4">
                  <AccordionTrigger className="text-left">
                    <div className="flex items-center gap-3">
                      <div className="h-6 w-6 rounded-full bg-elec-yellow/20 flex items-center justify-center text-xs font-bold text-elec-yellow">
                        4
                      </div>
                      Save and Copy Client ID
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-white space-y-2 pl-9">
                    <p>
                      1. Click <strong>Save</strong>
                    </p>
                    <p>
                      2. Set the key state to <strong>ON</strong>
                    </p>
                    <p>
                      3. Copy the <strong>Client ID</strong> (shown in Details column)
                    </p>
                    <p>4. Add this platform in Elec-Mate using the Client ID</p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            )}

            {selectedGuide === 'moodle' && (
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="step1">
                  <AccordionTrigger className="text-left">
                    <div className="flex items-center gap-3">
                      <div className="h-6 w-6 rounded-full bg-elec-yellow/20 flex items-center justify-center text-xs font-bold text-elec-yellow">
                        1
                      </div>
                      Access External Tools
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-white space-y-2 pl-9">
                    <p>1. Log in to Moodle as an admin</p>
                    <p>
                      2. Go to{' '}
                      <strong>
                        Site Administration → Plugins → Activity modules → External tool → Manage
                        tools
                      </strong>
                    </p>
                    <p>
                      3. Click <strong>configure a tool manually</strong>
                    </p>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="step2">
                  <AccordionTrigger className="text-left">
                    <div className="flex items-center gap-3">
                      <div className="h-6 w-6 rounded-full bg-elec-yellow/20 flex items-center justify-center text-xs font-bold text-elec-yellow">
                        2
                      </div>
                      Configure Tool Settings
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-white space-y-2 pl-9">
                    <p>Enter the following values:</p>
                    <ul className="list-disc pl-4 space-y-1">
                      <li>
                        <strong>Tool name:</strong> Elec-Mate
                      </li>
                      <li>
                        <strong>Tool URL:</strong> {ltiConfig.toolUrl}
                      </li>
                      <li>
                        <strong>LTI version:</strong> LTI 1.3
                      </li>
                      <li>
                        <strong>Public key type:</strong> Keyset URL
                      </li>
                      <li>
                        <strong>Public keyset:</strong> {ltiConfig.jwksUrl}
                      </li>
                      <li>
                        <strong>Initiate login URL:</strong> {ltiConfig.oidcInitUrl}
                      </li>
                      <li>
                        <strong>Redirection URI(s):</strong> {ltiConfig.redirectUris[0]}
                      </li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="step3">
                  <AccordionTrigger className="text-left">
                    <div className="flex items-center gap-3">
                      <div className="h-6 w-6 rounded-full bg-elec-yellow/20 flex items-center justify-center text-xs font-bold text-elec-yellow">
                        3
                      </div>
                      Enable Services
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-white space-y-2 pl-9">
                    <p>Under Services, set these to "Use this service":</p>
                    <ul className="list-disc pl-4 space-y-1">
                      <li>IMS LTI Assignment and Grade Services</li>
                      <li>IMS LTI Names and Role Provisioning Services</li>
                    </ul>
                    <p className="mt-2">Under Privacy, set:</p>
                    <ul className="list-disc pl-4 space-y-1">
                      <li>Share launcher's name: Always</li>
                      <li>Share launcher's email: Always</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="step4">
                  <AccordionTrigger className="text-left">
                    <div className="flex items-center gap-3">
                      <div className="h-6 w-6 rounded-full bg-elec-yellow/20 flex items-center justify-center text-xs font-bold text-elec-yellow">
                        4
                      </div>
                      Save and Get Credentials
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-white space-y-2 pl-9">
                    <p>
                      1. Click <strong>Save changes</strong>
                    </p>
                    <p>
                      2. Click on <strong>View configuration details</strong>
                    </p>
                    <p>
                      3. Copy the <strong>Client ID</strong>
                    </p>
                    <p>4. Add this platform in Elec-Mate using the Client ID</p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            )}

            {selectedGuide === 'blackboard' && (
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="step1">
                  <AccordionTrigger className="text-left">
                    <div className="flex items-center gap-3">
                      <div className="h-6 w-6 rounded-full bg-elec-yellow/20 flex items-center justify-center text-xs font-bold text-elec-yellow">
                        1
                      </div>
                      Access LTI Tool Providers
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-white space-y-2 pl-9">
                    <p>1. Log in to Blackboard as an admin</p>
                    <p>
                      2. Go to <strong>System Admin → Integrations → LTI Tool Providers</strong>
                    </p>
                    <p>
                      3. Click <strong>Register LTI 1.3/Advantage Tool</strong>
                    </p>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="step2">
                  <AccordionTrigger className="text-left">
                    <div className="flex items-center gap-3">
                      <div className="h-6 w-6 rounded-full bg-elec-yellow/20 flex items-center justify-center text-xs font-bold text-elec-yellow">
                        2
                      </div>
                      Register the Tool
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-white space-y-2 pl-9">
                    <p>Enter the following values:</p>
                    <ul className="list-disc pl-4 space-y-1">
                      <li>
                        <strong>Client ID:</strong> (generated by Blackboard)
                      </li>
                      <li>
                        <strong>Tool Provider Key:</strong> {ltiConfig.toolUrl}
                      </li>
                      <li>
                        <strong>Tool Provider Secret:</strong> (leave blank for LTI 1.3)
                      </li>
                      <li>
                        <strong>Tool Provider Domain:</strong> jtwygbeceundfgnkirof.supabase.co
                      </li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="step3">
                  <AccordionTrigger className="text-left">
                    <div className="flex items-center gap-3">
                      <div className="h-6 w-6 rounded-full bg-elec-yellow/20 flex items-center justify-center text-xs font-bold text-elec-yellow">
                        3
                      </div>
                      Configure LTI 1.3 Settings
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-white space-y-2 pl-9">
                    <p>In the LTI 1.3 configuration:</p>
                    <ul className="list-disc pl-4 space-y-1">
                      <li>
                        <strong>Login Initiation URL:</strong> {ltiConfig.oidcInitUrl}
                      </li>
                      <li>
                        <strong>Tool Redirect URL:</strong> {ltiConfig.redirectUris[0]}
                      </li>
                      <li>
                        <strong>Tool JWKS URL:</strong> {ltiConfig.jwksUrl}
                      </li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="step4">
                  <AccordionTrigger className="text-left">
                    <div className="flex items-center gap-3">
                      <div className="h-6 w-6 rounded-full bg-elec-yellow/20 flex items-center justify-center text-xs font-bold text-elec-yellow">
                        4
                      </div>
                      Complete Registration
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-white space-y-2 pl-9">
                    <p>
                      1. Enable <strong>Course Memberships Service</strong>
                    </p>
                    <p>
                      2. Enable <strong>Assignment and Grades Service</strong>
                    </p>
                    <p>
                      3. Click <strong>Submit</strong>
                    </p>
                    <p>
                      4. Copy the generated <strong>Application ID</strong> (Client ID)
                    </p>
                    <p>5. Add this platform in Elec-Mate</p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            )}
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsSetupGuideOpen(false)}>
              Close
            </Button>
            <Button
              className="bg-elec-yellow hover:bg-elec-yellow/90 text-black"
              onClick={() => {
                setIsSetupGuideOpen(false);
                setIsAddDialogOpen(true);
              }}
            >
              Add Platform →
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Configure Platform Dialog */}
      <Dialog open={isConfigureDialogOpen} onOpenChange={setIsConfigureDialogOpen}>
        <DialogContent className="max-w-lg bg-elec-dark border-elec-yellow/20">
          <DialogHeader>
            <DialogTitle>Configure {selectedPlatform?.name}</DialogTitle>
            <DialogDescription>Update platform settings and features</DialogDescription>
          </DialogHeader>
          {selectedPlatform && (
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Platform Name</Label>
                <Input
                  defaultValue={selectedPlatform.name}
                  className="bg-elec-gray border-elec-yellow/20"
                />
              </div>
              <div className="space-y-2">
                <Label>Platform URL</Label>
                <Input
                  defaultValue={selectedPlatform.url}
                  className="bg-elec-gray border-elec-yellow/20"
                />
              </div>
              <div className="space-y-2">
                <Label>Client ID</Label>
                <Input
                  defaultValue={selectedPlatform.clientId}
                  className="bg-elec-gray border-elec-yellow/20"
                />
              </div>
              <div className="pt-4 border-t border-elec-yellow/10">
                <h4 className="font-medium mb-3">Features</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label>Deep Linking</Label>
                    <Switch defaultChecked={selectedPlatform.features.deepLinking} />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label>Grade Sync</Label>
                    <Switch defaultChecked={selectedPlatform.features.gradeSync} />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label>Roster Sync</Label>
                    <Switch defaultChecked={selectedPlatform.features.rosterSync} />
                  </div>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsConfigureDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              className="bg-elec-yellow hover:bg-elec-yellow/90 text-black"
              onClick={() => {
                setIsConfigureDialogOpen(false);
                toast({
                  title: 'Settings saved',
                  description: 'Platform configuration has been updated',
                });
              }}
            >
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </PageFrame>
  );
}
