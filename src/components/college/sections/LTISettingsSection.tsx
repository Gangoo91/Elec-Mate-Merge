/**
 * LTISettingsSection — LTI 1.3 / VLE integration, on the shared hub language.
 * Content only; the masthead is CollegeDashboard's.
 *
 * Shape: KPI row → the one solid volt action (Add platform) → four h-11
 * chips standing in for the old pill tabs → the chosen panel as CARD_SURFACE
 * cards → observability → recent launches. Forms use underline fields, chips
 * for the 2–6-option choices, and exactly one solid volt Save per dialog.
 *
 * Every field, integration test and connect action survives: verify config,
 * edit details, configure features, open the LMS, delete, dynamic
 * registration, the three setup guides, copy-to-clipboard on every URL, the
 * health probe and the launch log.
 *
 * Two things were dishonest and are fixed rather than restyled:
 *   - "Configure features" showed uncontrolled inputs and switches and its
 *     Save only raised a "Settings saved" toast. It now writes name, issuer,
 *     client id and the three feature flags through `updatePlatform`.
 *   - The five tool URLs were drawn twice (a cheat-sheet card above the tabs
 *     and again in Configuration). They live once, in Configuration.
 * A `handleSync` that flipped status to Connected and promised a sync
 * "coming in Phase 16.5" was never reachable from the UI and is gone.
 */
import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { copyToClipboard } from '@/utils/clipboard';
import { openExternalUrl } from '@/utils/open-external-url';
import {
  useLTIPlatforms,
  validateLtiUrl,
  type LTIPlatformRow,
  type LTIPlatformType,
} from '@/hooks/useLTIPlatforms';
import { cn } from '@/lib/utils';
import { CARD_BASE, CARD_NEUTRAL, CARD_SURFACE } from '@/components/ui/card-recipe';
import { HubKpi, HubKpiRow, HubSectionHeading } from '@/components/hub/HubPrimitives';
import { containerVariants, itemVariants } from '@/components/college/primitives';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import {
  ResponsiveDialog,
  ResponsiveDialogContent,
  ResponsiveDialogDescription,
  ResponsiveDialogFooter,
  ResponsiveDialogTitle,
} from '@/components/ui/responsive-dialog';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

/* ── Hub-language atoms ──────────────────────────────────────────────── */

const CHIP =
  'inline-flex h-11 shrink-0 items-center gap-1.5 rounded-full border px-4 text-[12.5px] transition-colors touch-manipulation';
const CHIP_ON = 'border-elec-yellow bg-elec-yellow font-semibold text-black';
const CHIP_OFF = 'border-white/[0.12] bg-white/[0.06] font-medium text-white hover:bg-white/[0.10]';
const FIELD =
  'input-underline h-11 w-full rounded-none border-0 border-b border-white/[0.15] bg-transparent px-1 text-base font-medium text-white caret-elec-yellow transition-colors placeholder:text-white placeholder:opacity-60 hover:border-white/[0.3] focus:border-elec-yellow focus:outline-none focus:ring-0 touch-manipulation';
const LABEL = 'mb-1 block text-[12px] font-medium text-white';
const PRIMARY =
  'inline-flex h-11 w-full items-center justify-center rounded-full bg-elec-yellow px-5 text-[13px] font-semibold text-black transition-[opacity,transform] hover:opacity-90 active:scale-[0.98] disabled:bg-white/[0.08] disabled:text-white disabled:opacity-60 touch-manipulation sm:w-auto';
const NEUTRAL =
  'inline-flex h-11 items-center justify-center rounded-full border border-white/[0.12] bg-white/[0.06] px-4 text-[13px] font-medium text-white transition-colors hover:bg-white/[0.10] disabled:opacity-50 touch-manipulation';
const TEXT_ACTION =
  'flex h-11 shrink-0 items-center px-2 text-[12px] font-bold text-elec-yellow transition-colors touch-manipulation';
const CARD = cn('overflow-hidden rounded-2xl border border-elec-yellow/35', CARD_SURFACE);
const LIST_CARD = cn(
  '-mx-4 overflow-hidden border-y border-elec-yellow/35 sm:mx-0 sm:rounded-2xl sm:border-x',
  CARD_SURFACE
);
const CARD_PAD = 'px-4 py-4 sm:px-5 sm:py-5';
const CARD_TITLE = 'text-[15px] font-semibold tracking-tight text-elec-yellow';
const ROW_STATIC = 'flex items-center gap-3 px-4 py-3.5 sm:px-5';
const DIALOG = 'border-white/[0.10] bg-elec-dark p-0';

/* ── Types ────────────────────────────────────────────────────────────── */

/**
 * Shape used by the UI. Adapted from the live `lti_platforms` row +
 * settings.features JSONB (deep_linking / grade_sync / roster_sync) +
 * per-platform launch stats from the hook.
 */
interface LTIPlatform {
  id: string;
  name: string;
  type: LTIPlatformType;
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
    type: (row.platform_type as LTIPlatformType) ?? 'other',
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

const PLATFORM_TYPES: { value: LTIPlatformType; label: string }[] = [
  { value: 'canvas', label: 'Canvas' },
  { value: 'moodle', label: 'Moodle' },
  { value: 'blackboard', label: 'Blackboard Learn' },
  { value: 'd2l', label: 'D2L Brightspace' },
  { value: 'schoology', label: 'Schoology' },
  { value: 'other', label: 'Other LTI 1.3' },
];

const platformTypeLabel = (t: string) =>
  PLATFORM_TYPES.find((p) => p.value === t)?.label ?? 'LTI 1.3';

// Real LTI 1.3 backend (Supabase Edge Functions)
const LTI_BASE = 'https://jtwygbeceundfgnkirof.supabase.co/functions/v1';

const ltiConfig = {
  toolUrl: LTI_BASE + '/lti-launch',
  jwksUrl: LTI_BASE + '/lti-jwks',
  deepLinkUrl: LTI_BASE + '/lti-deep-link',
  redirectUris: [LTI_BASE + '/lti-launch'],
  oidcInitUrl: LTI_BASE + '/lti-oidc-init',
};

const EMPTY_FORM = {
  name: '',
  type: 'canvas' as LTIPlatformType,
  issuer: '',
  clientId: '',
  deploymentId: '',
  authLoginUrl: '',
  authTokenUrl: '',
  jwksUrl: '',
};

type Tab = 'platforms' | 'config' | 'dynamic' | 'guides';
type GuideType = 'canvas' | 'moodle' | 'blackboard';

/* ── Small form pieces ───────────────────────────────────────────────── */

function Field({
  label,
  required,
  error,
  hint,
  children,
}: {
  label: string;
  required?: boolean;
  error?: string | null;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className={LABEL}>
        {label}
        {required && <span className="ml-1 text-elec-yellow">*</span>}
      </label>
      {children}
      {error ? (
        <p className="mt-1 text-[11.5px] text-red-300">{error}</p>
      ) : hint ? (
        <p className="mt-1 text-[11.5px] leading-snug text-white">{hint}</p>
      ) : null}
    </div>
  );
}

function StepNumber({ n }: { n: number }) {
  return (
    <span className="w-5 shrink-0 text-[13px] font-bold tabular-nums text-elec-yellow">{n}</span>
  );
}

/* ── Component ───────────────────────────────────────────────────────── */

export function LTISettingsSection() {
  const { toast } = useToast();
  const {
    collegeId,
    platforms: rows,
    launches,
    loading,
    error,
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

  const [tab, setTab] = useState<Tab>('platforms');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isSetupGuideOpen, setIsSetupGuideOpen] = useState(false);
  const [selectedGuide, setSelectedGuide] = useState<GuideType | null>(null);
  const [isConfigureDialogOpen, setIsConfigureDialogOpen] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState<LTIPlatform | null>(null);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [isSubmittingAdd, setIsSubmittingAdd] = useState(false);
  const [editingPlatformId, setEditingPlatformId] = useState<string | null>(null);
  const [verifyingId, setVerifyingId] = useState<string | null>(null);
  const [verifyResult, setVerifyResult] = useState<
    Record<string, { ok: boolean; checks: Array<{ name: string; ok: boolean; message: string }> }>
  >({});
  // Tapped sparkline day — touch alternative to a hover title.
  const [sparkTapped, setSparkTapped] = useState<{
    date: string;
    total: number;
    failed: number;
  } | null>(null);

  // New platform form state — captures everything needed to create an
  // `lti_platforms` row. college_id comes from the hook (required — H14).
  const [newPlatform, setNewPlatform] = useState({ ...EMPTY_FORM });

  // Configure-features form — CONTROLLED, and saved. See file comment.
  const [configForm, setConfigForm] = useState({
    name: '',
    url: '',
    clientId: '',
    deepLinking: false,
    gradeSync: false,
    rosterSync: false,
  });
  const [isSavingConfig, setIsSavingConfig] = useState(false);

  const handleCopyToClipboard = (text: string, field: string) => {
    copyToClipboard(text);
    setCopiedField(field);
    toast({
      title: 'Copied to clipboard',
      description: 'Value has been copied successfully',
    });
    setTimeout(() => setCopiedField(null), 2000);
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

  const openConfigure = (p: LTIPlatform) => {
    setSelectedPlatform(p);
    setConfigForm({
      name: p.name,
      url: p.url,
      clientId: p.clientId,
      deepLinking: p.features.deepLinking,
      gradeSync: p.features.gradeSync,
      rosterSync: p.features.rosterSync,
    });
    setIsConfigureDialogOpen(true);
  };

  const handleSaveConfigure = async () => {
    if (!selectedPlatform) return;
    const row = rows.find((r) => r.id === selectedPlatform.id);
    if (!row) return;
    setIsSavingConfig(true);
    try {
      const existingSettings = (row.settings as Record<string, unknown> | null) ?? {};
      await updatePlatform(selectedPlatform.id, {
        name: configForm.name.trim() || row.name,
        issuer: configForm.url.trim() || row.issuer,
        client_id: configForm.clientId.trim() || row.client_id,
        settings: {
          ...existingSettings,
          features: {
            deep_linking: configForm.deepLinking,
            grade_sync: configForm.gradeSync,
            roster_sync: configForm.rosterSync,
          },
        },
      });
      toast({ title: 'Settings saved', description: 'Platform configuration has been updated.' });
      setIsConfigureDialogOpen(false);
    } catch (e) {
      toast({
        title: 'Save failed',
        description: e instanceof Error ? e.message : 'Unknown error',
        variant: 'destructive',
      });
    } finally {
      setIsSavingConfig(false);
    }
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
        toast({
          title: 'Platform added',
          description: 'Now run Verify config to confirm it reaches your LMS.',
        });
      }
      setNewPlatform({ ...EMPTY_FORM });
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
      feature === 'deepLinking'
        ? 'deep_linking'
        : feature === 'gradeSync'
          ? 'grade_sync'
          : 'roster_sync';
    const currentFeatures =
      ((row.settings as Record<string, unknown> | null)?.features as Record<string, boolean>) ?? {};
    const nextFeatures = { ...currentFeatures, [featureKey]: !currentFeatures[featureKey] };
    try {
      await updatePlatform(platformId, {
        settings: { ...(row.settings ?? {}), features: nextFeatures },
      });
      toast({ title: 'Feature updated' });
    } catch (e) {
      toast({
        title: 'Toggle failed',
        description: e instanceof Error ? e.message : 'Unknown error',
        variant: 'destructive',
      });
    }
  };

  const openSetupGuide = (type: GuideType) => {
    setSelectedGuide(type);
    setIsSetupGuideOpen(true);
  };

  /* ── Derived figures ──────────────────────────────────────────────── */

  const connectedCount = platforms.filter((p) => p.status === 'Connected').length;
  const pendingCount = platforms.filter((p) => p.status === 'Pending').length;
  const linkedUsers = platforms.reduce((sum, p) => sum + p.stats.users, 0);
  const dynamicUrl = collegeId ? `${LTI_BASE}/lti-dynamic-register?college_id=${collegeId}` : '';

  const toolUrls = [
    { label: 'Tool launch URL', value: ltiConfig.toolUrl, key: 'toolUrl' },
    { label: 'OIDC initiation URL', value: ltiConfig.oidcInitUrl, key: 'oidcInitUrl' },
    { label: 'JWKS URL (public key set)', value: ltiConfig.jwksUrl, key: 'jwksUrl' },
    { label: 'Deep linking URL', value: ltiConfig.deepLinkUrl, key: 'deepLinkUrl' },
    { label: 'Redirect URIs', value: ltiConfig.redirectUris.join(', '), key: 'redirectUris' },
  ];

  const tabs: { value: Tab; label: string }[] = [
    { value: 'platforms', label: 'Platforms' },
    { value: 'config', label: 'Configuration' },
    { value: 'dynamic', label: 'Dynamic registration' },
    { value: 'guides', label: 'Setup guides' },
  ];

  const healthWord =
    health.status === 'ok'
      ? 'Systems operational'
      : health.status === 'degraded'
        ? 'Degraded'
        : 'Checking…';

  /* ── Render ───────────────────────────────────────────────────────── */

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6 sm:space-y-8"
    >
      {/* Four KPIs: the observability tiles and the old stat strip, merged. */}
      <HubKpiRow>
        <HubKpi
          accent
          label="Connected platforms"
          value={String(connectedCount)}
          verdict={
            connectedCount > 0
              ? 'Launching from the LMS'
              : rows.length > 0
                ? 'Verify a platform to connect it'
                : 'No VLE connected yet'
          }
          context={[
            `${rows.length} registered`,
            pendingCount > 0 ? `${pendingCount} pending` : null,
            linkedUsers > 0 ? `${linkedUsers} linked account${linkedUsers === 1 ? '' : 's'}` : null,
          ]
            .filter(Boolean)
            .join(' · ')}
          onClick={() => setTab('platforms')}
        />
        <HubKpi
          label="Launches"
          value={String(globalStats.total)}
          verdict={globalStats.total > 0 ? 'In the last 50 recorded' : 'No launches yet'}
        />
        <HubKpi
          label="Success rate"
          value={globalStats.successRate === null ? '—' : `${globalStats.successRate}%`}
          verdict={
            globalStats.successRate === null
              ? 'Nothing to measure yet'
              : globalStats.successRate >= 99
                ? 'Healthy'
                : globalStats.successRate >= 95
                  ? 'Worth a look at the failures'
                  : 'Check the top errors below'
          }
          sentiment={
            globalStats.successRate === null
              ? 'neutral'
              : globalStats.successRate >= 99
                ? 'good'
                : 'bad'
          }
        />
        <HubKpi
          label="Failed"
          value={String(globalStats.failed)}
          verdict={globalStats.failed > 0 ? 'See the launch log' : 'No failures'}
          sentiment={globalStats.failed > 0 ? 'bad' : 'neutral'}
        />
      </HubKpiRow>

      {/* The one solid volt action on the page. */}
      <motion.div
        variants={itemVariants}
        className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between"
      >
        <button type="button" onClick={() => setIsAddDialogOpen(true)} className={PRIMARY}>
          Add platform
        </button>
        <div className="-mx-2 flex items-center gap-1 sm:mx-0">
          <button type="button" onClick={() => setTab('dynamic')} className={TEXT_ACTION}>
            Install with one URL
          </button>
        </div>
      </motion.div>

      {/* Chips in place of the pill tabs. */}
      <motion.div variants={itemVariants} className="flex flex-wrap gap-2">
        {tabs.map((t) => (
          <button
            key={t.value}
            type="button"
            onClick={() => setTab(t.value)}
            className={cn(CHIP, tab === t.value ? CHIP_ON : CHIP_OFF)}
          >
            {t.label}
          </button>
        ))}
      </motion.div>

      {/* ── Platforms ─────────────────────────────────────────────────── */}
      {tab === 'platforms' && (
        <motion.section variants={itemVariants} className="space-y-3">
          <div className="flex items-end justify-between gap-4">
            <HubSectionHeading>Platforms</HubSectionHeading>
            <span className="text-[11px] font-semibold tabular-nums text-white">
              {rows.length} registered
            </span>
          </div>

          {platforms.length === 0 ? (
            <div className={LIST_CARD}>
              <div className={CARD_PAD}>
                <p className="text-[14px] font-semibold text-white">No VLE connected yet</p>
                <p className="mt-1 text-[12.5px] leading-snug text-white">
                  Link Canvas, Moodle or Blackboard over LTI 1.3 for single sign-on, grade sync
                  and roster import. Add a platform above, or paste one URL into an LMS that
                  supports dynamic registration.
                </p>
              </div>
              <div className="flex border-t border-white/[0.10] px-2 sm:px-3">
                <button type="button" onClick={() => openSetupGuide('canvas')} className={TEXT_ACTION}>
                  Read the Canvas guide
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              {platforms.map((platform) => {
                const result = verifyResult[platform.id];
                return (
                  <div key={platform.id} className={CARD}>
                    <div className="flex items-start gap-3 px-4 pt-4 sm:px-5 sm:pt-5">
                      <span
                        aria-hidden
                        className={cn(
                          'mt-1 h-8 w-[3px] shrink-0 rounded-full',
                          platform.status === 'Disconnected'
                            ? 'bg-red-400'
                            : platform.status === 'Pending'
                              ? 'bg-elec-yellow'
                              : 'bg-white/[0.25]'
                        )}
                      />
                      <div className="min-w-0 flex-1">
                        <h3 className="truncate text-[15px] font-semibold tracking-tight text-white">
                          {platform.name}
                        </h3>
                        <p className="mt-0.5 truncate text-[12px] leading-tight text-white">
                          {platformTypeLabel(platform.type)} · {platform.url}
                        </p>
                      </div>
                      <span
                        className={cn(
                          'shrink-0 pt-0.5 text-[12.5px] font-semibold',
                          platform.status === 'Disconnected'
                            ? 'text-red-300'
                            : platform.status === 'Pending'
                              ? 'text-elec-yellow'
                              : 'text-white'
                        )}
                      >
                        {platform.status}
                      </span>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <button
                            type="button"
                            aria-label={`Options for ${platform.name}`}
                            className="-mr-2 -mt-2 flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-white transition-colors touch-manipulation hover:bg-white/[0.06]"
                          >
                            <span className="text-[15px] font-semibold tracking-[0.12em]">⋯</span>
                          </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="min-w-[190px]">
                          <DropdownMenuItem
                            className="h-11 touch-manipulation"
                            onClick={() => handleVerify(platform.id)}
                            disabled={verifyingId === platform.id}
                          >
                            {verifyingId === platform.id ? 'Verifying…' : 'Verify config'}
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="h-11 touch-manipulation"
                            onClick={() => handleStartEdit(platform)}
                          >
                            Edit details
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="h-11 touch-manipulation"
                            onClick={() => openConfigure(platform)}
                          >
                            Configure features
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="h-11 touch-manipulation"
                            onClick={() => openExternalUrl(platform.url)}
                          >
                            Open LMS
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            className="h-11 text-red-300 touch-manipulation focus:text-red-200"
                            onClick={() => handleDisconnect(platform.id)}
                          >
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>

                    {/* Verify result — shows after "Verify config" runs */}
                    {result && (
                      <div className="mx-4 mt-4 border-t border-white/[0.10] pt-3 sm:mx-5">
                        <p
                          className={cn(
                            'text-[12.5px] font-semibold',
                            result.ok ? 'text-white' : 'text-red-300'
                          )}
                        >
                          {result.ok
                            ? 'All checks passed'
                            : `${result.checks.filter((c) => !c.ok).length} check(s) failed`}
                        </p>
                        <ul className="mt-1.5 space-y-1">
                          {result.checks.map((c) => (
                            <li key={c.name} className="flex items-start gap-2 text-[12px]">
                              <span
                                className={cn(
                                  'mt-px w-3 shrink-0 font-mono',
                                  c.ok ? 'text-emerald-300' : 'text-red-300'
                                )}
                              >
                                {c.ok ? '✓' : '✗'}
                              </span>
                              <span className="min-w-0 text-white">
                                <span className="font-semibold">{c.name}</span> · {c.message}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Feature toggles — three h-11 rows, On in volt */}
                    <ul className="mt-4 divide-y divide-white/[0.10] border-t border-white/[0.10]">
                      {(
                        [
                          { key: 'deepLinking', label: 'Deep linking' },
                          { key: 'gradeSync', label: 'Grade sync' },
                          { key: 'rosterSync', label: 'Roster sync' },
                        ] as const
                      ).map((feat) => {
                        const enabled = platform.features[feat.key];
                        return (
                          <li key={feat.key}>
                            <button
                              type="button"
                              onClick={() => handleToggleFeature(platform.id, feat.key)}
                              aria-pressed={enabled}
                              className="flex h-11 w-full items-center justify-between gap-3 px-4 text-left transition-colors touch-manipulation hover:bg-white/[0.06] active:bg-white/[0.09] sm:px-5"
                            >
                              <span className="text-[13px] font-medium text-white">{feat.label}</span>
                              <span
                                className={cn(
                                  'text-[12px] font-bold',
                                  enabled ? 'text-elec-yellow' : 'text-white'
                                )}
                              >
                                {enabled ? 'On' : 'Off'}
                              </span>
                            </button>
                          </li>
                        );
                      })}
                    </ul>

                    {/* Stats */}
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 border-t border-white/[0.10] px-4 py-3 text-[11.5px] tabular-nums text-white sm:px-5">
                      <span>{platform.stats.launches.toLocaleString()} launches</span>
                      <span>{platform.stats.courses} courses</span>
                      <span>{platform.stats.users} users</span>
                      {platform.lastSync && (
                        <span>
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
                );
              })}
            </div>
          )}
        </motion.section>
      )}

      {/* ── Configuration ─────────────────────────────────────────────── */}
      {tab === 'config' && (
        <motion.section variants={itemVariants} className="space-y-3">
          <HubSectionHeading>Tool configuration</HubSectionHeading>

          <div className={CARD}>
            <div className={CARD_PAD}>
              <h3 className={CARD_TITLE}>Give these to your LMS admin</h3>
              <p className="mt-1 text-[12.5px] leading-snug text-white">
                Fixed for your Elec-Mate instance. Paste them into the LMS’s LTI 1.3 tool
                registration.
              </p>
            </div>
            <ul className="divide-y divide-white/[0.10] border-t border-white/[0.10]">
              {toolUrls.map((item) => (
                <li key={item.key} className={cn(ROW_STATIC, 'py-2.5')}>
                  <div className="min-w-0 flex-1">
                    <div className="text-[11.5px] font-medium text-white">{item.label}</div>
                    <input
                      value={item.value}
                      readOnly
                      aria-label={item.label}
                      onFocus={(e) => e.currentTarget.select()}
                      className="h-11 w-full rounded-none border-0 bg-transparent px-0 font-mono text-[12px] text-white focus:outline-none focus:ring-0 touch-manipulation"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => handleCopyToClipboard(item.value, item.key)}
                    className={TEXT_ACTION}
                  >
                    {copiedField === item.key ? 'Copied' : 'Copy'}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className={CARD}>
            <div className={CARD_PAD}>
              <h3 className={CARD_TITLE}>Security settings</h3>
              <p className="mt-1 text-[12.5px] leading-snug text-white">
                Enforced by the platform — not configurable per college yet.
              </p>
            </div>
            <ul className="divide-y divide-white/[0.10] border-t border-white/[0.10]">
              {[
                {
                  label: 'Require state parameter',
                  desc: 'Enforce state validation for the OIDC flow.',
                  on: true,
                },
                {
                  label: 'Validate nonce',
                  desc: 'Prevents replay attacks on authentication tokens.',
                  on: true,
                },
                {
                  label: 'Auto-provision users',
                  desc: 'Create accounts automatically on first LTI launch.',
                  on: true,
                },
                {
                  label: 'Sync grades automatically',
                  desc: 'Push grades to the LMS when recorded in Elec-Mate.',
                  on: false,
                },
              ].map((setting) => (
                <li key={setting.label} className={ROW_STATIC}>
                  <div className="min-w-0 flex-1">
                    <div className="text-[13.5px] font-medium text-white">{setting.label}</div>
                    <div className="mt-0.5 text-[11.5px] leading-snug text-white">{setting.desc}</div>
                  </div>
                  <span className="shrink-0 text-[12px] font-bold text-white">
                    {setting.on ? 'Enforced' : 'Off'}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </motion.section>
      )}

      {/* ── Dynamic registration ──────────────────────────────────────── */}
      {tab === 'dynamic' && (
        <motion.section variants={itemVariants} className="space-y-3">
          <HubSectionHeading>Dynamic registration</HubSectionHeading>
          <div className={CARD}>
            <div className={CARD_PAD}>
              <h3 className={CARD_TITLE}>Install with one URL</h3>
              <p className="mt-1 text-[12.5px] leading-snug text-white">
                Modern LMSs (Canvas, Moodle 4+, D2L, Schoology) support the 1EdTech LTI Dynamic
                Registration flow. Paste the URL below into your LMS’s “Register external tool”
                field — it handshakes with Elec-Mate automatically, no eight-field form required.
              </p>
            </div>

            {!collegeId ? (
              <p className="border-t border-white/[0.10] px-4 py-4 text-[12.5px] leading-snug text-red-300 sm:px-5">
                You must be a member of a college to use dynamic registration. Speak to your
                Elec-Mate admin.
              </p>
            ) : (
              <>
                <div className={cn(ROW_STATIC, 'border-t border-white/[0.10] py-2.5')}>
                  <div className="min-w-0 flex-1">
                    <div className="text-[11.5px] font-medium text-white">
                      Dynamic registration URL
                    </div>
                    <div className="mt-0.5 break-all font-mono text-[12px] text-white">
                      {dynamicUrl}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleCopyToClipboard(dynamicUrl, 'dynamic-reg')}
                    className={TEXT_ACTION}
                  >
                    {copiedField === 'dynamic-reg' ? 'Copied' : 'Copy URL'}
                  </button>
                </div>
                <ul className="divide-y divide-white/[0.10] border-t border-white/[0.10]">
                  {[
                    {
                      title: 'Copy the URL above',
                      desc: 'Your college id is already baked in.',
                    },
                    {
                      title: 'Paste it into your LMS',
                      desc: 'Canvas → Admin → Developer Keys → LTI Advantage Tool Registration. Moodle → External Tools → LTI Advantage.',
                    },
                    {
                      title: 'Follow the LMS’s prompts',
                      desc: 'Your LMS redirects to Elec-Mate, the handshake saves the config, and you see a success page.',
                    },
                  ].map((s, i) => (
                    <li key={s.title} className={cn(ROW_STATIC, 'items-start')}>
                      <StepNumber n={i + 1} />
                      <div className="min-w-0 flex-1">
                        <div className="text-[14px] font-semibold leading-tight text-white">
                          {s.title}
                        </div>
                        <div className="mt-0.5 text-[12px] leading-snug text-white">{s.desc}</div>
                      </div>
                    </li>
                  ))}
                </ul>
                <div className="flex items-center justify-between gap-3 border-t border-white/[0.10] py-1 pl-4 pr-2 sm:pl-5 sm:pr-3">
                  <span className="text-[12px] leading-snug text-white">
                    LMS doesn’t support dynamic registration?
                  </span>
                  <button type="button" onClick={() => setIsAddDialogOpen(true)} className={TEXT_ACTION}>
                    Use the manual form
                  </button>
                </div>
              </>
            )}
          </div>
        </motion.section>
      )}

      {/* ── Setup guides ──────────────────────────────────────────────── */}
      {tab === 'guides' && (
        <motion.section variants={itemVariants} className="space-y-3">
          <HubSectionHeading>Setup guides</HubSectionHeading>
          <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 sm:gap-3 [&>*:last-child]:col-span-2 sm:[&>*:last-child]:col-span-1">
            {(
              [
                { type: 'canvas', name: 'Canvas', desc: 'Instructure Canvas' },
                { type: 'moodle', name: 'Moodle', desc: 'Moodle LMS 4.x' },
                { type: 'blackboard', name: 'Blackboard', desc: 'Blackboard Learn' },
              ] as { type: GuideType; name: string; desc: string }[]
            ).map((guide) => (
              <button
                key={guide.type}
                type="button"
                onClick={() => openSetupGuide(guide.type)}
                className={cn(CARD_BASE, CARD_NEUTRAL, 'min-h-[104px] p-4 lg:hover:-translate-y-0.5')}
              >
                <span className="flex items-center justify-between gap-2 text-[16px] font-bold leading-tight tracking-tight text-white transition-colors group-hover:text-elec-yellow">
                  {guide.name}
                  <ChevronRight className="h-3.5 w-3.5 shrink-0 text-white" aria-hidden />
                </span>
                <span className="mt-1 text-[11.5px] leading-snug text-white">{guide.desc}</span>
              </button>
            ))}
          </div>

          <div className={CARD}>
            <div className={CARD_PAD}>
              <h3 className={CARD_TITLE}>Four steps to connect</h3>
            </div>
            <ul className="divide-y divide-white/[0.10] border-t border-white/[0.10]">
              {[
                { title: 'Register the tool', desc: 'Add Elec-Mate as an LTI tool in your LMS admin panel.' },
                { title: 'Copy the config', desc: 'Use the values under Configuration.' },
                { title: 'Add the platform', desc: 'Enter your LMS details under Platforms.' },
                { title: 'Test a launch', desc: 'Create a test assignment and run Verify config.' },
              ].map((item, i) => (
                <li key={item.title} className={cn(ROW_STATIC, 'items-start')}>
                  <StepNumber n={i + 1} />
                  <div className="min-w-0 flex-1">
                    <div className="text-[14px] font-semibold leading-tight text-white">{item.title}</div>
                    <div className="mt-0.5 text-[12px] leading-snug text-white">{item.desc}</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </motion.section>
      )}

      {/* ── Observability (Sprint 2 / ELE-831) ────────────────────────── */}
      <motion.section variants={itemVariants} className="space-y-3">
        <div className="flex items-end justify-between gap-4">
          <HubSectionHeading>Health and launches</HubSectionHeading>
          <button type="button" onClick={refreshHealth} className={cn(TEXT_ACTION, '-my-2')}>
            Refresh
          </button>
        </div>

        <div className={CARD}>
          <div className={cn(ROW_STATIC, 'justify-between')}>
            <span
              className={cn(
                'text-[13px] font-semibold',
                health.status === 'degraded' ? 'text-red-300' : 'text-white'
              )}
            >
              {healthWord}
            </span>
            <span className="text-[11.5px] tabular-nums text-white">
              {health.total_ms ? `${health.total_ms}ms` : ''}
              {health.version ? ` · v${health.version}` : ''}
            </span>
          </div>

          {/* 7-day sparkline. Tap a bar to reveal its figures. */}
          <div className="border-t border-white/[0.10] px-4 py-4 sm:px-5">
            <div className="mb-3 flex items-baseline justify-between gap-3">
              <span className="text-[11.5px] font-medium text-white">Launches per day, last 7 days</span>
              {sparkTapped && (
                <span className="text-[11px] tabular-nums text-white">
                  {sparkTapped.date}: {sparkTapped.total} launches
                  {sparkTapped.failed > 0 ? ` · ${sparkTapped.failed} failed` : ''}
                </span>
              )}
            </div>
            <div className="flex h-20 items-end gap-2">
              {globalStats.days.map((d) => {
                const max = Math.max(1, ...globalStats.days.map((x) => x.total));
                const h = Math.round((d.total / max) * 100);
                const fh = d.total ? Math.round((d.failed / d.total) * h) : 0;
                const isTapped = sparkTapped?.date === d.date;
                return (
                  <button
                    key={d.date}
                    type="button"
                    onClick={() => setSparkTapped((s) => (s?.date === d.date ? null : d))}
                    aria-label={`${d.total} launches, ${d.failed} failed on ${d.date}`}
                    className="flex min-h-[44px] flex-1 flex-col items-center justify-end gap-1 touch-manipulation"
                  >
                    <div className="flex w-full flex-1 items-end">
                      <div
                        className={cn(
                          'relative w-full rounded-t transition-opacity',
                          isTapped ? 'bg-white' : 'bg-white/[0.35]',
                          sparkTapped && !isTapped && 'opacity-50'
                        )}
                        style={{ height: `${Math.max(2, h)}%` }}
                      >
                        {fh > 0 && (
                          <div
                            className="absolute inset-x-0 top-0 rounded-t bg-red-400"
                            style={{ height: `${fh}%` }}
                          />
                        )}
                      </div>
                    </div>
                    <span
                      className={cn('text-[10px] tabular-nums text-white', !isTapped && 'opacity-70')}
                    >
                      {d.date.slice(-2)}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {globalStats.topErrors.length > 0 && (
            <ul className="divide-y divide-white/[0.10] border-t border-white/[0.10]">
              {globalStats.topErrors.map((e) => (
                <li key={e.code} className={cn(ROW_STATIC, 'py-2.5')}>
                  <span aria-hidden className="h-6 w-[3px] shrink-0 rounded-full bg-red-400" />
                  <span className="min-w-0 flex-1 truncate font-mono text-[12px] text-white">{e.code}</span>
                  <span className="shrink-0 text-[13px] font-semibold tabular-nums text-white">{e.count}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </motion.section>

      {/* ── Recent launches (H8 / ELE-823) ────────────────────────────── */}
      <motion.section variants={itemVariants} className="space-y-3">
        <div className="flex items-end justify-between gap-4">
          <HubSectionHeading>Recent launches</HubSectionHeading>
          <span className="text-[11px] font-semibold tabular-nums text-white">
            {loading ? 'Loading…' : `${launches.length} in the last 50`}
          </span>
        </div>
        {error && (
          <p className="text-[12.5px] leading-snug text-red-300">{error}</p>
        )}
        <div className={LIST_CARD}>
          {launches.length === 0 ? (
            <div className={CARD_PAD}>
              <p className="text-[14px] font-semibold text-white">No launches recorded yet</p>
              <p className="mt-1 text-[12.5px] leading-snug text-white">
                Register a platform and launch from the LMS to see entries here.
              </p>
            </div>
          ) : (
            <ul className="max-h-[440px] divide-y divide-white/[0.10] overflow-y-auto">
              {launches.slice(0, 50).map((l) => {
                const platform = rows.find((p) => p.id === l.platform_id);
                const errorCode = (l.launch_data as Record<string, unknown> | null)?.error as
                  | string
                  | undefined;
                const cid = (l.launch_data as Record<string, unknown> | null)?.cid as
                  | string
                  | undefined;
                const roles =
                  l.roles && l.roles.length > 0
                    ? l.roles.map((r) => r.split('#').pop() ?? r).slice(0, 2).join(', ')
                    : null;
                const reason = [
                  l.validated ? 'OK' : 'Failed',
                  errorCode ?? null,
                  l.lti_user_id,
                  roles,
                  cid ?? null,
                ]
                  .filter(Boolean)
                  .join(' · ');
                return (
                  <li key={l.id} className={ROW_STATIC}>
                    <span
                      aria-hidden
                      className={cn(
                        'h-8 w-[3px] shrink-0 rounded-full',
                        l.validated ? 'bg-white/[0.25]' : 'bg-red-400'
                      )}
                    />
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-[14px] font-semibold leading-tight text-white">
                        {platform?.name ?? 'Unknown platform'}
                        {l.context_title ? ` · ${l.context_title}` : ''}
                      </span>
                      <span
                        className={cn(
                          'mt-0.5 block truncate font-mono text-[11.5px] leading-tight',
                          l.validated ? 'text-white' : 'text-red-300'
                        )}
                      >
                        {reason}
                      </span>
                    </span>
                    <span className="shrink-0 text-[11.5px] tabular-nums text-white">
                      {new Date(l.created_at).toLocaleString('en-GB', {
                        day: '2-digit',
                        month: 'short',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </motion.section>

      {/* ── Add / edit platform dialog ────────────────────────────────── */}
      <ResponsiveDialog
        open={isAddDialogOpen}
        onOpenChange={(open) => {
          setIsAddDialogOpen(open);
          if (!open) {
            setEditingPlatformId(null);
            setNewPlatform({ ...EMPTY_FORM });
          }
        }}
      >
        <ResponsiveDialogContent hideCloseButton className={cn('w-[min(100vw-2rem,640px)]', DIALOG)}>
          <div className="shrink-0 border-b border-white/[0.10] px-5 py-4 sm:px-6">
            <ResponsiveDialogTitle className="text-[17px] font-semibold tracking-tight text-white">
              {editingPlatformId ? 'Edit LTI platform' : 'Add LTI platform'}
            </ResponsiveDialogTitle>
            <ResponsiveDialogDescription className="mt-1 text-[12.5px] leading-snug text-white">
              {editingPlatformId
                ? 'Update the LMS configuration. Changes take effect on the next launch.'
                : 'Register an LMS over LTI 1.3. If your LMS supports dynamic registration it only needs one URL — see that chip instead.'}
            </ResponsiveDialogDescription>
          </div>

          <div className="flex-1 space-y-6 overflow-y-auto px-5 py-5 sm:px-6">
            {/* Platform identity */}
            <div className="space-y-4">
              <h3 className="text-[15px] font-semibold tracking-tight text-elec-yellow">
                Platform identity
              </h3>

              <Field label="Display name" required>
                <input
                  placeholder="Canvas — Production"
                  value={newPlatform.name}
                  onChange={(e) => setNewPlatform({ ...newPlatform, name: e.target.value })}
                  className={FIELD}
                />
              </Field>

              <div>
                <span className={LABEL}>
                  LMS type<span className="ml-1 text-elec-yellow">*</span>
                </span>
                <div className="flex flex-wrap gap-2">
                  {PLATFORM_TYPES.map((t) => (
                    <button
                      key={t.value}
                      type="button"
                      onClick={() => setNewPlatform({ ...newPlatform, type: t.value })}
                      className={cn(CHIP, newPlatform.type === t.value ? CHIP_ON : CHIP_OFF)}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>

              <Field
                label="Issuer URL (iss)"
                required
                error={formErrors.issuer && newPlatform.issuer ? formErrors.issuer : null}
                hint="The canonical URL your LMS uses as its OpenID issuer."
              >
                <input
                  placeholder="https://canvas.instructure.com"
                  value={newPlatform.issuer}
                  onChange={(e) => setNewPlatform({ ...newPlatform, issuer: e.target.value })}
                  className={cn(
                    FIELD,
                    formErrors.issuer && newPlatform.issuer && 'border-red-400'
                  )}
                />
              </Field>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field label="Client ID" required>
                  <input
                    placeholder="From LMS tool settings"
                    value={newPlatform.clientId}
                    onChange={(e) => setNewPlatform({ ...newPlatform, clientId: e.target.value })}
                    className={cn(FIELD, 'font-mono')}
                  />
                </Field>
                <Field label="Deployment ID (optional)">
                  <input
                    placeholder="Optional"
                    value={newPlatform.deploymentId}
                    onChange={(e) =>
                      setNewPlatform({ ...newPlatform, deploymentId: e.target.value })
                    }
                    className={cn(FIELD, 'font-mono')}
                  />
                </Field>
              </div>
            </div>

            {/* LMS endpoints */}
            <div className="space-y-4 border-t border-white/[0.10] pt-5">
              <div className="flex items-baseline justify-between gap-3">
                <h3 className="text-[15px] font-semibold tracking-tight text-elec-yellow">
                  LMS endpoints
                </h3>
                <span className="text-[11px] text-white">All three are required</span>
              </div>

              <Field
                label="Authorisation login URL"
                required
                error={
                  formErrors.authLoginUrl && newPlatform.authLoginUrl
                    ? formErrors.authLoginUrl
                    : null
                }
              >
                <input
                  placeholder="https://canvas.../api/lti/authorize_redirect"
                  value={newPlatform.authLoginUrl}
                  onChange={(e) =>
                    setNewPlatform({ ...newPlatform, authLoginUrl: e.target.value })
                  }
                  className={cn(
                    FIELD,
                    'font-mono',
                    formErrors.authLoginUrl && newPlatform.authLoginUrl && 'border-red-400'
                  )}
                />
              </Field>

              <Field
                label="Authorisation token URL"
                required
                error={
                  formErrors.authTokenUrl && newPlatform.authTokenUrl
                    ? formErrors.authTokenUrl
                    : null
                }
              >
                <input
                  placeholder="https://canvas.../login/oauth2/token"
                  value={newPlatform.authTokenUrl}
                  onChange={(e) =>
                    setNewPlatform({ ...newPlatform, authTokenUrl: e.target.value })
                  }
                  className={cn(
                    FIELD,
                    'font-mono',
                    formErrors.authTokenUrl && newPlatform.authTokenUrl && 'border-red-400'
                  )}
                />
              </Field>

              <Field
                label="LMS JWKS URL"
                required
                error={formErrors.jwksUrl && newPlatform.jwksUrl ? formErrors.jwksUrl : null}
                hint="We fetch the LMS’s public keys from here to verify signed launches."
              >
                <input
                  placeholder="https://canvas.../api/lti/security/jwks"
                  value={newPlatform.jwksUrl}
                  onChange={(e) => setNewPlatform({ ...newPlatform, jwksUrl: e.target.value })}
                  className={cn(
                    FIELD,
                    'font-mono',
                    formErrors.jwksUrl && newPlatform.jwksUrl && 'border-red-400'
                  )}
                />
              </Field>
            </div>

            {!collegeId && (
              <p className="text-[12.5px] leading-snug text-red-300">
                You must belong to a college to register a platform. Ask your Elec-Mate admin to
                add you to a college first.
              </p>
            )}
          </div>

          <ResponsiveDialogFooter className="gap-2 border-t border-white/[0.10] px-5 py-4 sm:px-6">
            <button
              type="button"
              onClick={() => setIsAddDialogOpen(false)}
              disabled={isSubmittingAdd}
              className={NEUTRAL}
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSavePlatform}
              disabled={isSubmittingAdd || !collegeId || !formValid}
              className={PRIMARY}
            >
              {isSubmittingAdd
                ? editingPlatformId
                  ? 'Saving…'
                  : 'Adding…'
                : editingPlatformId
                  ? 'Save changes'
                  : 'Add platform'}
            </button>
          </ResponsiveDialogFooter>
        </ResponsiveDialogContent>
      </ResponsiveDialog>

      {/* ── Setup guide dialog ────────────────────────────────────────── */}
      <ResponsiveDialog open={isSetupGuideOpen} onOpenChange={setIsSetupGuideOpen}>
        <ResponsiveDialogContent hideCloseButton className={cn('max-w-2xl', DIALOG)}>
          <div className="shrink-0 border-b border-white/[0.10] px-5 py-4 sm:px-6">
            <ResponsiveDialogTitle className="text-[17px] font-semibold tracking-tight text-white">
              {selectedGuide === 'canvas' && 'Canvas setup guide'}
              {selectedGuide === 'moodle' && 'Moodle setup guide'}
              {selectedGuide === 'blackboard' && 'Blackboard Learn setup guide'}
            </ResponsiveDialogTitle>
            <ResponsiveDialogDescription className="mt-1 text-[12.5px] leading-snug text-white">
              Follow these steps to connect your LMS to Elec-Mate.
            </ResponsiveDialogDescription>
          </div>

          <div className="flex-1 overflow-y-auto px-5 py-2 text-[13px] text-white sm:px-6">
            {selectedGuide === 'canvas' && (
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="step1">
                  <AccordionTrigger className="min-h-11 text-left text-white">
                    <span className="flex items-center gap-3">
                      <StepNumber n={1} />
                      Access Developer Keys
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="space-y-2 pl-8 text-white">
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
                  <AccordionTrigger className="min-h-11 text-left text-white">
                    <span className="flex items-center gap-3">
                      <StepNumber n={2} />
                      Configure the LTI key
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="space-y-2 pl-8 text-white">
                    <p>Enter the following values:</p>
                    <ul className="list-disc space-y-1 pl-4">
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
                  <AccordionTrigger className="min-h-11 text-left text-white">
                    <span className="flex items-center gap-3">
                      <StepNumber n={3} />
                      Enable additional features
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="space-y-2 pl-8 text-white">
                    <p>Under LTI Advantage Services, enable:</p>
                    <ul className="list-disc space-y-1 pl-4">
                      <li>Can create and view assignment data in the gradebook</li>
                      <li>Can view assignment data in the gradebook</li>
                      <li>Can view submission data for assignments</li>
                      <li>Can access Names and Roles Provisioning</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="step4">
                  <AccordionTrigger className="min-h-11 text-left text-white">
                    <span className="flex items-center gap-3">
                      <StepNumber n={4} />
                      Save and copy the Client ID
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="space-y-2 pl-8 text-white">
                    <p>
                      1. Click <strong>Save</strong>
                    </p>
                    <p>
                      2. Set the key state to <strong>ON</strong>
                    </p>
                    <p>
                      3. Copy the <strong>Client ID</strong> (shown in the Details column)
                    </p>
                    <p>4. Add this platform in Elec-Mate using the Client ID</p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            )}

            {selectedGuide === 'moodle' && (
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="step1">
                  <AccordionTrigger className="min-h-11 text-left text-white">
                    <span className="flex items-center gap-3">
                      <StepNumber n={1} />
                      Access External Tools
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="space-y-2 pl-8 text-white">
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
                  <AccordionTrigger className="min-h-11 text-left text-white">
                    <span className="flex items-center gap-3">
                      <StepNumber n={2} />
                      Configure tool settings
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="space-y-2 pl-8 text-white">
                    <p>Enter the following values:</p>
                    <ul className="list-disc space-y-1 pl-4">
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
                  <AccordionTrigger className="min-h-11 text-left text-white">
                    <span className="flex items-center gap-3">
                      <StepNumber n={3} />
                      Enable services
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="space-y-2 pl-8 text-white">
                    <p>Under Services, set these to “Use this service”:</p>
                    <ul className="list-disc space-y-1 pl-4">
                      <li>IMS LTI Assignment and Grade Services</li>
                      <li>IMS LTI Names and Role Provisioning Services</li>
                    </ul>
                    <p className="mt-2">Under Privacy, set:</p>
                    <ul className="list-disc space-y-1 pl-4">
                      <li>Share launcher’s name: Always</li>
                      <li>Share launcher’s email: Always</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="step4">
                  <AccordionTrigger className="min-h-11 text-left text-white">
                    <span className="flex items-center gap-3">
                      <StepNumber n={4} />
                      Save and get credentials
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="space-y-2 pl-8 text-white">
                    <p>
                      1. Click <strong>Save changes</strong>
                    </p>
                    <p>
                      2. Click <strong>View configuration details</strong>
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
                  <AccordionTrigger className="min-h-11 text-left text-white">
                    <span className="flex items-center gap-3">
                      <StepNumber n={1} />
                      Access LTI Tool Providers
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="space-y-2 pl-8 text-white">
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
                  <AccordionTrigger className="min-h-11 text-left text-white">
                    <span className="flex items-center gap-3">
                      <StepNumber n={2} />
                      Register the tool
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="space-y-2 pl-8 text-white">
                    <p>Enter the following values:</p>
                    <ul className="list-disc space-y-1 pl-4">
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
                  <AccordionTrigger className="min-h-11 text-left text-white">
                    <span className="flex items-center gap-3">
                      <StepNumber n={3} />
                      Configure LTI 1.3 settings
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="space-y-2 pl-8 text-white">
                    <p>In the LTI 1.3 configuration:</p>
                    <ul className="list-disc space-y-1 pl-4">
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
                  <AccordionTrigger className="min-h-11 text-left text-white">
                    <span className="flex items-center gap-3">
                      <StepNumber n={4} />
                      Complete registration
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="space-y-2 pl-8 text-white">
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

          <ResponsiveDialogFooter className="gap-2 border-t border-white/[0.10] px-5 py-4 sm:px-6">
            <button type="button" onClick={() => setIsSetupGuideOpen(false)} className={NEUTRAL}>
              Close
            </button>
            <button
              type="button"
              onClick={() => {
                setIsSetupGuideOpen(false);
                setIsAddDialogOpen(true);
              }}
              className={PRIMARY}
            >
              Add platform
            </button>
          </ResponsiveDialogFooter>
        </ResponsiveDialogContent>
      </ResponsiveDialog>

      {/* ── Configure platform dialog — controlled, and actually saved ─── */}
      <ResponsiveDialog open={isConfigureDialogOpen} onOpenChange={setIsConfigureDialogOpen}>
        <ResponsiveDialogContent hideCloseButton className={cn('max-w-lg', DIALOG)}>
          <div className="shrink-0 border-b border-white/[0.10] px-5 py-4 sm:px-6">
            <ResponsiveDialogTitle className="text-[17px] font-semibold tracking-tight text-white">
              Configure {selectedPlatform?.name}
            </ResponsiveDialogTitle>
            <ResponsiveDialogDescription className="mt-1 text-[12.5px] leading-snug text-white">
              Update the platform’s details and which LTI Advantage features it uses.
            </ResponsiveDialogDescription>
          </div>
          {selectedPlatform && (
            <div className="flex-1 space-y-4 overflow-y-auto px-5 py-5 sm:px-6">
              <Field label="Platform name">
                <input
                  value={configForm.name}
                  onChange={(e) => setConfigForm({ ...configForm, name: e.target.value })}
                  className={FIELD}
                />
              </Field>
              <Field label="Issuer URL">
                <input
                  value={configForm.url}
                  onChange={(e) => setConfigForm({ ...configForm, url: e.target.value })}
                  className={cn(FIELD, 'font-mono')}
                />
              </Field>
              <Field label="Client ID">
                <input
                  value={configForm.clientId}
                  onChange={(e) => setConfigForm({ ...configForm, clientId: e.target.value })}
                  className={cn(FIELD, 'font-mono')}
                />
              </Field>
              <div className="border-t border-white/[0.10] pt-4">
                <h4 className="text-[15px] font-semibold tracking-tight text-elec-yellow">Features</h4>
                <ul className="-mx-2 mt-1 divide-y divide-white/[0.10]">
                  {(
                    [
                      { key: 'deepLinking', label: 'Deep linking' },
                      { key: 'gradeSync', label: 'Grade sync' },
                      { key: 'rosterSync', label: 'Roster sync' },
                    ] as const
                  ).map((feat) => {
                    const on = configForm[feat.key];
                    return (
                      <li key={feat.key}>
                        <button
                          type="button"
                          aria-pressed={on}
                          onClick={() => setConfigForm({ ...configForm, [feat.key]: !on })}
                          className="flex h-11 w-full items-center justify-between gap-3 px-2 text-left transition-colors touch-manipulation hover:bg-white/[0.06]"
                        >
                          <span className="text-[13px] font-medium text-white">{feat.label}</span>
                          <span
                            className={cn('text-[12px] font-bold', on ? 'text-elec-yellow' : 'text-white')}
                          >
                            {on ? 'On' : 'Off'}
                          </span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          )}
          <ResponsiveDialogFooter className="gap-2 border-t border-white/[0.10] px-5 py-4 sm:px-6">
            <button
              type="button"
              onClick={() => setIsConfigureDialogOpen(false)}
              disabled={isSavingConfig}
              className={NEUTRAL}
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSaveConfigure}
              disabled={isSavingConfig || !selectedPlatform}
              className={PRIMARY}
            >
              {isSavingConfig ? 'Saving…' : 'Save changes'}
            </button>
          </ResponsiveDialogFooter>
        </ResponsiveDialogContent>
      </ResponsiveDialog>
    </motion.div>
  );
}
