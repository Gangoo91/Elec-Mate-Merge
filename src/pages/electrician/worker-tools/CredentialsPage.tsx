/**
 * CredentialsPage — the worker's own credentials (ELE-1950, ELE-2006).
 *
 * Reads and writes THE credentials store: the worker's Elec-ID qualifications
 * (employer_elec_id_qualifications), the same records their employer's
 * competence matrix reads. The worker controls it: add from a quick-pick of
 * the usual tickets (stored as CODES, always shown through
 * getQualificationLabel) or type anything else, attach a photo of the
 * certificate (private bucket, signed URLs), correct dates, remove.
 *
 * Each item shows how it was checked: self-declared, document seen, or
 * verified at source, and by whom. The database keeps anything the worker
 * writes self-declared, and editing an item someone checked clears that check.
 *
 * Reminders come from the daily expiry job (notify_my_credential_expiries):
 * the worker at 60 days, 14 days and on expiry; the firm 30 days before.
 * What the firm needs comes from its competence requirement set
 * (get_my_firm_requirements), judged with the same matrix code the office uses.
 */

import { useEffect, useMemo, useState } from 'react';
import {
  AlertTriangle,
  BellRing,
  Camera,
  CheckCircle2,
  ExternalLink,
  GraduationCap,
  Loader2,
  Plus,
} from 'lucide-react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';
import {
  useAddMyCredential,
  useDeleteMyCredential,
  useMyCredentialStore,
  useMyFirmRequirements,
  useUpdateMyCredential,
  MY_CREDENTIALS_KEY,
} from '@/hooks/useCredentialStore';
import { useRealtimeInvalidate } from '@/hooks/useRealtimeInvalidate';
import { WorkerToolPage } from '@/pages/electrician/worker-tools/WorkerToolPage';
import { FormSheet } from '@/components/forms/FormSheet';
import {
  Eyebrow,
  Pill,
  StatStrip,
  FilterBar,
  EmptyState,
  LoadingBlocks,
  PrimaryButton,
  SecondaryButton,
  DestructiveButton,
  Field,
  type Tone,
} from '@/components/employer/editorial';
import { VerificationBadge, ElecMateApprovalBadge } from '@/components/credentials/VerificationBadge';
import { CredentialPhotoField } from '@/components/credentials/CredentialPhoto';
import {
  ELEC_MATE_APPROVAL_EXPLAINER,
  emptyPhotoDraft,
  type PhotoDraft,
  isHeld,
  removeCredentialPhoto,
  uploadCredentialPhoto,
  verificationSentence,
  type CredentialItem,
  type CredentialProfile,
  type FirmRequirementSet,
} from '@/services/credentialsService';
import type { ElecIdProfile } from '@/services/elecIdService';
import {
  buildCompetenceMatrix,
  assessSiteReadiness,
  canonicalKeyFor,
  requirementLabel,
  type CellStatus,
} from '@/utils/competenceMatrix';
import { getQualificationLabel, getEcsCardLabel } from '@/data/uk-electrician-constants';
import { WT_CREDENTIALS_HELP } from '@/components/worker-tools/help/worker-help-2';
import { PageHelpButton, HowItWorks, type HelpBlocker } from '@/components/hub/PageHelp';

type ExpiryStatus = 'expired' | 'expiring' | 'valid' | 'none';
type FilterValue = 'all' | 'attention' | 'unchecked';

/** Matches the worker reminders: the first one goes 60 days out. */
const DUE_SOON_DAYS = 60;

const daysUntil = (iso: string) => Math.ceil((new Date(iso).getTime() - Date.now()) / 86_400_000);

function expiryOf(expiry: string | null): { status: ExpiryStatus; label: string; tone: Tone } {
  if (!expiry) return { status: 'none', label: 'No expiry', tone: 'emerald' };
  const d = daysUntil(expiry);
  if (d < 0) return { status: 'expired', label: 'Expired', tone: 'red' };
  if (d <= DUE_SOON_DAYS) return { status: 'expiring', label: d === 0 ? 'Today' : `${d}d left`, tone: 'orange' };
  return { status: 'valid', label: 'Valid', tone: 'emerald' };
}

const fmtDate = (iso: string | null) =>
  iso
    ? new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
    : 'Not set';

const CATEGORIES = [
  { value: 'certification', label: 'Qualification' },
  { value: 'cards', label: 'Card' },
  { value: 'training', label: 'Training' },
] as const;

/** The usual tickets, stored as their codes (see UK_QUALIFICATIONS). */
const QUICK_PICKS: { code: string; category: string; short: string }[] = [
  { code: 'ecs_gold', category: 'cards', short: 'ECS Gold' },
  { code: 'ecs_blue', category: 'cards', short: 'ECS Blue' },
  { code: 'ecs_yellow', category: 'cards', short: 'ECS Apprentice' },
  { code: '18th_edition', category: 'certification', short: '18th Edition' },
  { code: '2391_52', category: 'certification', short: '2391-52' },
  { code: 'am2', category: 'certification', short: 'AM2' },
  { code: 'first_aid', category: 'certification', short: 'First Aid at Work' },
  { code: 'cscs_green', category: 'cards', short: 'CSCS Green' },
  { code: 'ipaf_3a', category: 'cards', short: 'IPAF' },
  { code: 'pasma', category: 'cards', short: 'PASMA' },
  { code: 'asbestos', category: 'certification', short: 'Asbestos Awareness' },
  { code: 'working_at_height', category: 'training', short: 'Working at Height' },
];

/** Requirement key (competence matrix column) → the code we add for it. */
const REQUIREMENT_CODE: Record<string, { code: string | null; category: string }> = {
  ecs: { code: 'ecs_gold', category: 'cards' },
  '18th': { code: '18th_edition', category: 'certification' },
  '2391': { code: '2391_52', category: 'certification' },
  am2: { code: 'am2', category: 'certification' },
  pat: { code: 'cg_2377', category: 'certification' },
  firstaid: { code: 'first_aid', category: 'certification' },
  ipaf: { code: 'ipaf_3a', category: 'cards' },
  pasma: { code: 'pasma', category: 'cards' },
  asbestos: { code: 'asbestos', category: 'certification' },
  height: { code: 'working_at_height', category: 'training' },
  manual: { code: 'manual_handling', category: 'training' },
  ssts: { code: 'sssts', category: 'certification' },
  ev: { code: 'ev_2919', category: 'certification' },
  solar: { code: 'solar_pv', category: 'certification' },
};

/** Study Centre courses that help with a renewal, by matrix column. */
const RENEW_COURSE: Record<string, string> = {
  '18th': '/study-centre/upskilling/bs7671-course',
  '2391': '/study-centre/upskilling/inspection-testing',
  firstaid: '/study-centre/general-upskilling/first-aid-course',
  ipaf: '/study-centre/general-upskilling/ipaf-course',
  pasma: '/study-centre/general-upskilling/pasma-course',
  asbestos: '/study-centre/general-upskilling/asbestos-awareness-course',
  height: '/study-centre/general-upskilling/working-at-height-course',
};

const inputCn =
  'input-underline h-11 w-full rounded-none border-0 border-b border-white/[0.15] bg-transparent px-1 text-base font-medium text-white placeholder:text-white caret-elec-yellow transition-colors hover:border-white/[0.3] focus:border-elec-yellow focus-visible:ring-0 focus:ring-0 focus:outline-none [color-scheme:dark] touch-manipulation';

const cardCn = 'rounded-2xl border border-white/[0.1] bg-white/[0.04]';

interface Draft {
  /** A quick-pick code, kept while the name still reads as its label. */
  code: string | null;
  qualification_name: string;
  category: string;
  awarding_body: string;
  certificate_number: string;
  date_achieved: string;
  expiry_date: string;
}

const EMPTY_DRAFT: Draft = {
  code: null,
  qualification_name: '',
  category: 'certification',
  awarding_body: '',
  certificate_number: '',
  date_achieved: '',
  expiry_date: '',
};

/** What the editor opens on: an item, a blank add, or an add prefilled from a gap. */
type EditorTarget =
  | { kind: 'edit'; item: CredentialItem }
  | { kind: 'new'; prefill?: Partial<Draft> };

/** The worker's store in the shape the office's competence matrix reads. */
const asMatrixProfile = (store: CredentialProfile): ElecIdProfile =>
  ({
    ...store,
    employee_id: store.owner_employee_id,
    employee: { id: store.owner_employee_id, name: 'You', role: '', photo_url: null, email: null, phone: null },
  }) as unknown as ElecIdProfile;

export default function CredentialsPage() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { data: store, isLoading } = useMyCredentialStore();
  const { data: firmRequirements = [] } = useMyFirmRequirements(Boolean(store));
  const [filter, setFilter] = useState<FilterValue>('all');
  const [editing, setEditing] = useState<EditorTarget | null>(null);

  // Live: an employer recording a check (or adding training) for this worker
  // updates the page without a reload.
  useRealtimeInvalidate(
    'worker-credentials',
    [{ table: 'employer_elec_id_qualifications', filter: `profile_id=eq.${store?.id}` }],
    [[...MY_CREDENTIALS_KEY]],
    Boolean(store?.id)
  );

  const items = useMemo(() => store?.qualifications ?? [], [store]);

  // Deep link from the expiry reminder: ?item=<id> opens that item.
  const itemParam = searchParams.get('item');
  useEffect(() => {
    if (!itemParam || isLoading) return;
    const match = items.find((q) => q.id === itemParam);
    if (match) setEditing({ kind: 'edit', item: match });
    const next = new URLSearchParams(searchParams);
    next.delete('item');
    setSearchParams(next, { replace: true });
  }, [itemParam, isLoading, items, searchParams, setSearchParams]);

  const summary = useMemo(() => {
    let held = 0;
    let dueSoon = 0;
    let expired = 0;
    let checked = 0;
    for (const q of items) {
      if (!isHeld(q)) continue;
      held += 1;
      const e = expiryOf(q.expiry_date);
      if (e.status === 'expired') expired += 1;
      else if (e.status === 'expiring') dueSoon += 1;
      if (q.verification_level !== 'self_declared') checked += 1;
    }
    return { held, dueSoon, expired, checked };
  }, [items]);

  const sorted = useMemo(() => {
    const rank: Record<ExpiryStatus, number> = { expired: 0, expiring: 1, valid: 2, none: 3 };
    return [...items]
      .map((q) => ({ q, expiry: isHeld(q) ? expiryOf(q.expiry_date) : expiryOf(null) }))
      .sort((a, b) => {
        const r = rank[a.expiry.status] - rank[b.expiry.status];
        if (r !== 0) return r;
        return (a.q.expiry_date ?? '9999') < (b.q.expiry_date ?? '9999') ? -1 : 1;
      });
  }, [items]);

  const visible = useMemo(() => {
    if (filter === 'attention')
      return sorted.filter(
        ({ expiry }) => expiry.status === 'expired' || expiry.status === 'expiring'
      );
    if (filter === 'unchecked')
      return sorted.filter(({ q }) => q.verification_level === 'self_declared');
    return sorted;
  }, [sorted, filter]);

  const needsAttention = summary.expired + summary.dueSoon;
  const hasEcs = Boolean(store?.ecs_card_number || store?.ecs_card_type);

  const description = isLoading
    ? 'Loading your Elec-ID…'
    : !store
      ? 'Set up your Elec-ID to keep your tickets in one place'
      : needsAttention > 0
        ? `${needsAttention} ${needsAttention === 1 ? 'ticket needs' : 'tickets need'} attention`
        : 'Your qualifications, cards and training';

  // Live "Before you start": nothing can be added until there is an Elec-ID.
  const helpBlockers: HelpBlocker[] =
    !isLoading && !store
      ? [
          {
            text: 'You need an Elec-ID before you can add anything.',
            fixLabel: 'Set up Elec-ID',
            onFix: () => navigate('/elec-id'),
          },
        ]
      : [];

  const openNew = (prefill?: Partial<Draft>) => setEditing({ kind: 'new', prefill });

  return (
    <WorkerToolPage
      eyebrow="Identity"
      title="Credentials"
      description={description}
      maxWidth="7xl"
      actions={
        <>
          {store ? (
            <PrimaryButton
              data-help="wt-credentials.add"
              onClick={() => openNew()}
              className="hidden sm:inline-flex"
            >
              <Plus className="h-4 w-4 mr-2" aria-hidden />
              Add
            </PrimaryButton>
          ) : null}
          <PageHelpButton help={WT_CREDENTIALS_HELP} blockers={helpBlockers} />
        </>
      }
    >
      <HowItWorks help={WT_CREDENTIALS_HELP} blockers={helpBlockers} />
      {isLoading ? (
        <LoadingBlocks />
      ) : !store ? (
        <EmptyState
          title="No Elec-ID yet"
          description="Your Elec-ID holds your qualifications, cards and training. Your employer's competence matrix reads it, so you only keep it up to date once."
          action="Set up Elec-ID"
          onAction={() => navigate('/elec-id')}
        />
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:gap-8 lg:grid-cols-[2fr_3fr]">
          <div className="space-y-6 sm:space-y-8 min-w-0">
            <section>
              <Eyebrow className="mb-2">Digital identity</Eyebrow>
              <div className={`${cardCn} p-4 sm:p-5 space-y-4`}>
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-[15px] font-semibold text-white leading-tight">Elec-ID</p>
                    <p className="mt-1 text-[18px] font-semibold text-white font-mono tracking-wide tabular-nums">
                      {store.elec_id_number}
                    </p>
                  </div>
                  {store.is_verified && <ElecMateApprovalBadge className="shrink-0" />}
                </div>
                {store.is_verified && (
                  <p className="text-[12px] text-white leading-snug">
                    {ELEC_MATE_APPROVAL_EXPLAINER}
                  </p>
                )}

                <div className="border-t border-white/[0.1] pt-4 space-y-2">
                  <h3 className="text-sm font-semibold text-white">ECS card</h3>
                  {hasEcs ? (
                    <>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-[14px] text-white">
                          {store.ecs_card_type ? getEcsCardLabel(store.ecs_card_type) : 'ECS card'}
                        </span>
                        <VerificationBadge level={store.ecs_verification_level} />
                      </div>
                      <p className="text-[12.5px] text-white font-mono tabular-nums">
                        {store.ecs_card_number || 'Number not recorded'}
                        {store.ecs_expiry_date ? ` · expires ${fmtDate(store.ecs_expiry_date)}` : ''}
                      </p>
                      <p className="text-[12px] text-white leading-snug">
                        {verificationSentence({
                          verification_level: store.ecs_verification_level,
                          verifier_firm: store.ecs_verifier_firm,
                          verifier_name: store.ecs_verifier_name,
                          verified_at: store.ecs_verified_at,
                          verification_method: store.ecs_verification_method,
                        })}
                      </p>
                    </>
                  ) : (
                    <p className="text-[12.5px] text-white">
                      No ECS card on your Elec-ID. Add it in Elec-ID settings.
                    </p>
                  )}
                </div>

                <Link to="/elec-id" className="block" data-help="wt-credentials.elec-id">
                  <SecondaryButton fullWidth>
                    <ExternalLink className="h-4 w-4 mr-2" aria-hidden />
                    Open Elec-ID
                  </SecondaryButton>
                </Link>
              </div>
            </section>

            <StatStrip
              columns={4}
              stats={[
                { label: 'Held', value: summary.held },
                {
                  label: 'Due soon',
                  value: summary.dueSoon,
                  tone: summary.dueSoon > 0 ? 'orange' : undefined,
                },
                {
                  label: 'Expired',
                  value: summary.expired,
                  tone: summary.expired > 0 ? 'red' : undefined,
                },
                { label: 'Checked', value: summary.checked, tone: 'emerald' },
              ]}
            />

            {firmRequirements.length > 0 && (
              <FirmRequirements
                store={store}
                sets={firmRequirements}
                onAdd={(key) => {
                  const map = REQUIREMENT_CODE[key];
                  openNew(
                    map
                      ? {
                          code: map.code,
                          category: map.category,
                          qualification_name: map.code ? getQualificationLabel(map.code) : '',
                        }
                      : { qualification_name: requirementLabel(key, []), category: 'certification' }
                  );
                }}
                onOpenEcs={() => navigate('/elec-id')}
                onOpenItem={(id) => {
                  const match = items.find((q) => q.id === id);
                  if (match) setEditing({ kind: 'edit', item: match });
                }}
              />
            )}

            <section
              className={`${cardCn} p-4 sm:p-5`}
              data-help="wt-credentials.reminders"
              aria-label="Expiry reminders"
            >
              <div className="flex items-start gap-3">
                <BellRing className="h-5 w-5 shrink-0 text-white" aria-hidden />
                <div className="min-w-0 space-y-1">
                  <h3 className="text-[14px] font-semibold text-white">Expiry reminders are on</h3>
                  <p className="text-[12.5px] text-white leading-snug">
                    We remind you 60 days and 14 days before anything with an expiry date runs
                    out, and on the day. Your firm is told 30 days before. Keep the Expires date
                    right and the reminders look after themselves.
                  </p>
                </div>
              </div>
            </section>
          </div>

          <div className="space-y-4 min-w-0">
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-[15px] font-semibold tracking-tight text-white">
                Qualifications, cards and training
              </h2>
              <span className="text-[12px] text-white tabular-nums">{items.length} on file</span>
            </div>

            <PrimaryButton
              data-help="wt-credentials.add"
              fullWidth
              onClick={() => openNew()}
              className="sm:hidden"
            >
              <Plus className="h-4 w-4 mr-2" aria-hidden />
              Add a qualification or card
            </PrimaryButton>

            {items.length === 0 ? (
              <EmptyState
                title="Nothing on your Elec-ID yet"
                description="Add your qualifications, cards and training, with a photo of each. Your employer sees the same list in their competence matrix."
              />
            ) : (
              <>
                <div data-help="wt-credentials.filters">
                  <FilterBar
                    tabs={[
                      { value: 'all', label: 'All', count: items.length },
                      { value: 'attention', label: 'Needs attention', count: needsAttention },
                      {
                        value: 'unchecked',
                        label: 'Not checked',
                        count: items.filter((q) => q.verification_level === 'self_declared').length,
                      },
                    ]}
                    activeTab={filter}
                    onTabChange={(v) => setFilter(v as FilterValue)}
                  />
                </div>

                {visible.length === 0 ? (
                  <EmptyState title="Nothing here" description="No items match this filter." />
                ) : (
                  <div className="space-y-2.5" data-help="wt-credentials.list">
                    {visible.map(({ q, expiry }) => (
                      <button
                        key={q.id}
                        type="button"
                        onClick={() => setEditing({ kind: 'edit', item: q })}
                        className="block text-left -mx-4 w-[calc(100%+2rem)] sm:mx-0 sm:w-full rounded-none sm:rounded-xl border-y sm:border border-white/[0.1] bg-white/[0.04] p-4 touch-manipulation active:bg-white/[0.08]"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0 flex-1">
                            <p className="text-[14px] font-semibold text-white leading-snug">
                              {getQualificationLabel(q.qualification_name)}
                            </p>
                            <p className="mt-0.5 text-[12px] text-white">
                              {[
                                q.awarding_body,
                                q.certificate_number ? `No. ${q.certificate_number}` : null,
                                !isHeld(q) ? (q.training_status ?? 'Planned') : null,
                              ]
                                .filter(Boolean)
                                .join(' · ') || 'No awarding body recorded'}
                            </p>
                          </div>
                          {isHeld(q) && q.expiry_date && expiry.status !== 'valid' && (
                            <Pill tone={expiry.tone} className="shrink-0">
                              {expiry.label}
                            </Pill>
                          )}
                        </div>
                        <div className="mt-3 pt-3 border-t border-white/[0.08] flex flex-wrap items-center justify-between gap-2">
                          <div className="flex flex-wrap items-center gap-1.5">
                            <VerificationBadge level={q.verification_level} />
                            {q.document_url ? (
                              <Pill tone="blue">
                                <Camera className="h-3 w-3 mr-1" aria-hidden />
                                Photo
                              </Pill>
                            ) : (
                              <Pill tone="purple">No photo</Pill>
                            )}
                          </div>
                          <span className="text-[12px] text-white tabular-nums">
                            {q.expiry_date ? `Expires ${fmtDate(q.expiry_date)}` : 'No expiry'}
                          </span>
                        </div>
                        {q.verification_level !== 'self_declared' && (
                          <p className="mt-2 text-[11.5px] text-white leading-snug">
                            {verificationSentence(q)}
                          </p>
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      )}

      {store && (
        <CredentialEditorSheet
          profileId={store.id}
          target={editing}
          onClose={() => setEditing(null)}
        />
      )}
    </WorkerToolPage>
  );
}

/* ── What the firm needs vs what you hold ──────────────────────────────── */

const CELL_LABEL: Record<CellStatus, { text: string; tone: Tone }> = {
  valid: { text: 'Held', tone: 'emerald' },
  expiring: { text: 'Expiring', tone: 'orange' },
  expired: { text: 'Expired', tone: 'red' },
  none: { text: 'Missing', tone: 'red' },
};

function FirmRequirements({
  store,
  sets,
  onAdd,
  onOpenItem,
  onOpenEcs,
}: {
  store: CredentialProfile;
  sets: FirmRequirementSet[];
  onAdd: (key: string) => void;
  onOpenItem: (id: string) => void;
  onOpenEcs: () => void;
}) {
  return (
    <section className="space-y-3" data-help="wt-credentials.requirements">
      {sets.map((set) => {
        const matrix = buildCompetenceMatrix([asMatrixProfile(store)], [], {
          horizonDays: set.horizon_days ?? DUE_SOON_DAYS,
        });
        const me = matrix.workers[0];
        const readiness = assessSiteReadiness(matrix, set.credential_keys);
        const gaps = readiness.workers[0]?.gaps.length ?? 0;
        return (
          <div key={set.employer_id} className={`${cardCn} overflow-hidden`}>
            <div className="flex items-start justify-between gap-3 border-b border-white/[0.08] px-4 py-3 sm:px-5">
              <div className="min-w-0">
                <h3 className="text-[14px] font-semibold text-white leading-snug">
                  What {set.company_name} needs
                </h3>
                <p className="mt-0.5 text-[12px] text-white">
                  {gaps === 0
                    ? 'You have everything on their list.'
                    : `${gaps} ${gaps === 1 ? 'gap' : 'gaps'} to sort before you are sent to site.`}
                </p>
              </div>
              {gaps === 0 ? (
                <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-400" aria-hidden />
              ) : (
                <AlertTriangle className="h-5 w-5 shrink-0 text-red-400" aria-hidden />
              )}
            </div>
            <ul>
              {set.credential_keys.map((key) => {
                const cell = me?.cells[key];
                const status: CellStatus = cell?.status ?? 'none';
                const label = requirementLabel(key, matrix.columns);
                const badge = CELL_LABEL[status];
                const actionLabel =
                  status === 'none' ? 'Add it' : status === 'valid' ? null : 'Update';
                return (
                  <li
                    key={key}
                    className="flex min-h-[56px] items-center justify-between gap-3 border-b border-white/[0.06] px-4 py-2 last:border-b-0 sm:px-5"
                  >
                    <div className="min-w-0">
                      <p className="text-[13.5px] font-medium text-white leading-snug">{label}</p>
                      {cell?.expiry && status !== 'none' && (
                        <p className="text-[12px] text-white tabular-nums">
                          {status === 'expired' ? 'Expired' : 'Expires'} {fmtDate(cell.expiry)}
                        </p>
                      )}
                    </div>
                    <div className="flex shrink-0 items-center gap-2">
                      <Pill tone={badge.tone}>{badge.text}</Pill>
                      {actionLabel && (
                        <button
                          type="button"
                          onClick={() => {
                            if (status !== 'none' && cell?.recordId) onOpenItem(cell.recordId);
                            // The ECS card itself lives on the Elec-ID profile.
                            else if (key === 'ecs' && status !== 'none') onOpenEcs();
                            else onAdd(key);
                          }}
                          className="h-11 rounded-full border border-white/[0.14] bg-white/[0.06] px-4 text-[13px] font-medium text-white touch-manipulation"
                        >
                          {actionLabel}
                        </button>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        );
      })}
    </section>
  );
}

/* ── Add / edit sheet ─────────────────────────────────────────────────── */

function CredentialEditorSheet({
  profileId,
  target,
  onClose,
}: {
  profileId: string;
  target: EditorTarget | null;
  onClose: () => void;
}) {
  const add = useAddMyCredential();
  const update = useUpdateMyCredential();
  const remove = useDeleteMyCredential();
  const [draft, setDraft] = useState<Draft>(EMPTY_DRAFT);
  const [photo, setPhoto] = useState<PhotoDraft>(emptyPhotoDraft());
  const [uploading, setUploading] = useState(false);
  const [confirmRemove, setConfirmRemove] = useState(false);
  const isNew = target?.kind === 'new';
  const existing = target?.kind === 'edit' ? target.item : null;

  useEffect(() => {
    if (!target) return;
    setConfirmRemove(false);
    if (target.kind === 'new') {
      setDraft({ ...EMPTY_DRAFT, ...(target.prefill ?? {}) });
      setPhoto(emptyPhotoDraft());
    } else {
      const item = target.item;
      setDraft({
        code: getQualificationLabel(item.qualification_name) !== item.qualification_name
          ? item.qualification_name
          : null,
        qualification_name: getQualificationLabel(item.qualification_name),
        category: item.category ?? 'certification',
        awarding_body: item.awarding_body ?? '',
        certificate_number: item.certificate_number ?? '',
        date_achieved: item.date_achieved ?? '',
        expiry_date: item.expiry_date ?? '',
      });
      setPhoto(emptyPhotoDraft(item.document_url ?? null));
    }
  }, [target]);

  const set = (k: keyof Draft) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setDraft((d) => ({ ...d, [k]: e.target.value }));

  const busy = uploading || add.isPending || update.isPending || remove.isPending;

  /** Store the code while the name still reads as the picked label. */
  const nameToStore = () => {
    const typed = draft.qualification_name.trim();
    if (draft.code && typed === getQualificationLabel(draft.code)) return draft.code;
    return typed;
  };

  const save = async () => {
    if (!draft.qualification_name.trim()) {
      toast({ title: 'Give it a name', description: 'Pick one above or type it in.', variant: 'destructive' });
      return;
    }
    if (draft.date_achieved && draft.expiry_date && draft.expiry_date < draft.date_achieved) {
      toast({ title: 'Check the dates', description: 'It expires before it was achieved.', variant: 'destructive' });
      return;
    }
    let newPath: string | null = null;
    try {
      if (photo.file) {
        setUploading(true);
        newPath = await uploadCredentialPhoto(photo.file);
        setUploading(false);
      }
      const documentUrl = newPath ?? (photo.removed ? null : photo.existingPath);
      if (existing) {
        await update.mutateAsync({
          id: existing.id,
          input: {
            qualification_name: nameToStore(),
            awarding_body: draft.awarding_body.trim() || null,
            certificate_number: draft.certificate_number.trim() || null,
            date_achieved: draft.date_achieved || null,
            expiry_date: draft.expiry_date || null,
            document_url: documentUrl,
          },
        });
        // The replaced or removed photo goes too.
        if (photo.existingPath && photo.existingPath !== documentUrl) {
          void removeCredentialPhoto(photo.existingPath).catch(() => undefined);
        }
        toast({ title: 'Saved' });
      } else {
        await add.mutateAsync({
          profileId,
          input: {
            qualification_name: nameToStore(),
            category: draft.category,
            awarding_body: draft.awarding_body.trim() || null,
            certificate_number: draft.certificate_number.trim() || null,
            date_achieved: draft.date_achieved || null,
            expiry_date: draft.expiry_date || null,
            document_url: documentUrl,
          },
        });
        toast({ title: 'Added to your Elec-ID' });
      }
      onClose();
    } catch (e) {
      setUploading(false);
      // An uploaded file with no row behind it is clutter; take it back off.
      if (newPath) void removeCredentialPhoto(newPath).catch(() => undefined);
      toast({
        title: 'Not saved',
        description: e instanceof Error ? e.message : 'Try again',
        variant: 'destructive',
      });
    }
  };

  const del = async () => {
    if (!existing) return;
    if (!confirmRemove) {
      setConfirmRemove(true);
      return;
    }
    try {
      await remove.mutateAsync({ id: existing.id, documentPath: existing.document_url });
      toast({ title: 'Removed from your Elec-ID' });
      onClose();
    } catch (e) {
      toast({
        title: 'Not removed',
        description: e instanceof Error ? e.message : 'Try again',
        variant: 'destructive',
      });
    }
  };

  const expiry = existing && isHeld(existing) ? expiryOf(existing.expiry_date) : null;
  const courseKey = canonicalKeyFor(draft.code ?? draft.qualification_name);
  const course = courseKey ? RENEW_COURSE[courseKey] : undefined;
  const wasChecked = existing && existing.verification_level !== 'self_declared';

  return (
    <FormSheet
      open={Boolean(target)}
      onOpenChange={(o) => !o && onClose()}
      width="wide"
      eyebrow="Your Elec-ID"
      title={isNew ? 'Add a qualification or card' : getQualificationLabel(existing?.qualification_name ?? '')}
      description={
        existing
          ? verificationSentence(existing)
          : 'Saved as self-declared. Your employer can record that they have checked it.'
      }
      bodyClassName="lg:grid lg:grid-cols-2 lg:gap-10 lg:space-y-0 space-y-5"
      footer={
        <div className="grid grid-cols-2 gap-2">
          <SecondaryButton fullWidth onClick={onClose}>
            Cancel
          </SecondaryButton>
          <PrimaryButton data-help="wt-credentials.save" fullWidth onClick={save} disabled={busy}>
            {uploading || add.isPending || update.isPending ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              'Save'
            )}
          </PrimaryButton>
        </div>
      }
    >
      <div className="space-y-5 min-w-0">
        {isNew && (
          <div className="space-y-2" data-help="wt-credentials.quick">
            <div className="text-[13px] font-semibold text-white">Pick one, or type your own below</div>
            <div className="flex flex-wrap gap-2">
              {QUICK_PICKS.map((p) => {
                const on = draft.code === p.code;
                return (
                  <button
                    key={p.code}
                    type="button"
                    aria-pressed={on}
                    onClick={() =>
                      setDraft((d) => ({
                        ...d,
                        code: p.code,
                        category: p.category,
                        qualification_name: getQualificationLabel(p.code),
                      }))
                    }
                    className={`h-11 rounded-full border px-4 text-[13px] touch-manipulation ${
                      on
                        ? 'bg-elec-yellow border-elec-yellow text-black font-semibold'
                        : 'bg-white/[0.06] border-white/[0.12] text-white font-medium'
                    }`}
                  >
                    {p.short}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {isNew && (
          <div className="grid grid-cols-3 gap-2" data-help="wt-credentials.type">
            {CATEGORIES.map((c) => (
              <button
                key={c.value}
                type="button"
                onClick={() => setDraft((d) => ({ ...d, category: c.value }))}
                aria-pressed={draft.category === c.value}
                className={`h-11 rounded-full border text-[13px] touch-manipulation ${
                  draft.category === c.value
                    ? 'bg-elec-yellow border-elec-yellow text-black font-semibold'
                    : 'bg-white/[0.06] border-white/[0.12] text-white font-medium'
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
        )}

        <Field label="Name" required>
          <input
            value={draft.qualification_name}
            onChange={set('qualification_name')}
            placeholder="e.g. 18th Edition (BS 7671)"
            className={inputCn}
          />
        </Field>
        <Field label="Awarding body or card scheme">
          <input
            value={draft.awarding_body}
            onChange={set('awarding_body')}
            placeholder="e.g. City & Guilds, JIB"
            className={inputCn}
          />
        </Field>
        <Field label="Certificate or card number">
          <input
            value={draft.certificate_number}
            onChange={set('certificate_number')}
            className={inputCn}
          />
        </Field>
        <div className="grid grid-cols-2 gap-4" data-help="wt-credentials.dates">
          <Field label="Achieved">
            <input
              type="date"
              value={draft.date_achieved}
              onChange={set('date_achieved')}
              className={inputCn}
            />
          </Field>
          <Field label="Expires" hint="We remind you before this date">
            <input
              type="date"
              value={draft.expiry_date}
              onChange={set('expiry_date')}
              className={inputCn}
            />
          </Field>
        </div>
      </div>

      <div className="space-y-5 min-w-0">
        <CredentialPhotoField value={photo} onChange={setPhoto} disabled={busy} />

        {expiry && (expiry.status === 'expired' || expiry.status === 'expiring') && (
          <div className="rounded-xl border border-orange-500/30 bg-orange-500/10 px-3 py-3 space-y-2">
            <p className="text-[12.5px] text-white">
              {expiry.status === 'expired'
                ? `This expired on ${fmtDate(existing?.expiry_date ?? null)}. Once it is renewed, change the Expires date and add a photo of the new one.`
                : `This expires on ${fmtDate(existing?.expiry_date ?? null)}. Book the renewal, then update the date here.`}
            </p>
            {course && (
              <Link
                to={course}
                className="inline-flex h-11 items-center gap-2 rounded-full border border-white/[0.14] bg-white/[0.06] px-4 text-[13px] font-medium text-white touch-manipulation"
              >
                <GraduationCap className="h-4 w-4" aria-hidden />
                Brush up in the Study Centre
              </Link>
            )}
          </div>
        )}

        {wasChecked && (
          <p className="rounded-xl border border-orange-500/30 bg-orange-500/10 px-3 py-2 text-[12.5px] text-white">
            This was checked. Changing the details or the photo clears the check, and it shows as
            self-declared until someone checks it again.
          </p>
        )}

        {existing && (
          <DestructiveButton fullWidth onClick={del} disabled={busy}>
            {remove.isPending ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : confirmRemove ? (
              'Tap again to remove it'
            ) : (
              'Remove from my Elec-ID'
            )}
          </DestructiveButton>
        )}
      </div>
    </FormSheet>
  );
}
