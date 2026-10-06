/**
 * CredentialsPage — the worker's own credentials (ELE-1950).
 *
 * Reads and writes THE credentials store: the worker's Elec-ID qualifications
 * (employer_elec_id_qualifications), the same records their employer's
 * competence matrix reads. Before this the page read employer_certifications
 * (0 rows), so a worker never saw their own Elec-ID qualifications.
 *
 * Each item shows how it was checked — self-declared, document seen, or
 * verified at source — and by whom. A worker can add, correct and remove their
 * own items; the database keeps anything they write self-declared, and editing
 * an item someone checked clears that check.
 */

import { useEffect, useMemo, useState } from 'react';
import { ExternalLink, Loader2, Plus } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';
import {
  useAddMyCredential,
  useDeleteMyCredential,
  useMyCredentialStore,
  useUpdateMyCredential,
  MY_CREDENTIALS_KEY,
} from '@/hooks/useCredentialStore';
import { useRealtimeInvalidate } from '@/hooks/useRealtimeInvalidate';
import { WorkerToolPage } from '@/pages/electrician/worker-tools/WorkerToolPage';
import { Sheet, SheetContent, SheetTitle, SheetDescription } from '@/components/ui/sheet';
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
  SheetShell,
  Field,
  type Tone,
} from '@/components/employer/editorial';
import { VerificationBadge, ElecMateApprovalBadge } from '@/components/credentials/VerificationBadge';
import {
  ELEC_MATE_APPROVAL_EXPLAINER,
  isHeld,
  verificationSentence,
  type CredentialItem,
} from '@/services/credentialsService';
import { getQualificationLabel, getEcsCardLabel } from '@/data/uk-electrician-constants';

type ExpiryStatus = 'expired' | 'expiring' | 'valid' | 'none';
type FilterValue = 'all' | 'attention' | 'unchecked';

const daysUntil = (iso: string) => Math.ceil((new Date(iso).getTime() - Date.now()) / 86_400_000);

function expiryOf(expiry: string | null): { status: ExpiryStatus; label: string; tone: Tone } {
  if (!expiry) return { status: 'none', label: 'No expiry', tone: 'emerald' };
  const d = daysUntil(expiry);
  if (d < 0) return { status: 'expired', label: 'Expired', tone: 'red' };
  if (d <= 90) return { status: 'expiring', label: `${d}d left`, tone: 'amber' };
  return { status: 'valid', label: 'Valid', tone: 'emerald' };
}

const fmtDate = (iso: string | null) =>
  iso
    ? new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
    : '—';

const CATEGORIES = [
  { value: 'certification', label: 'Qualification' },
  { value: 'cards', label: 'Card' },
  { value: 'training', label: 'Training' },
] as const;

const inputCn =
  'input-underline h-11 w-full rounded-none border-0 border-b border-white/[0.15] bg-transparent px-1 text-base font-medium text-white placeholder:text-white caret-elec-yellow transition-colors hover:border-white/[0.3] focus:border-elec-yellow focus-visible:ring-0 focus:ring-0 focus:outline-none [color-scheme:dark] touch-manipulation';

interface Draft {
  qualification_name: string;
  category: string;
  awarding_body: string;
  certificate_number: string;
  date_achieved: string;
  expiry_date: string;
}

const EMPTY_DRAFT: Draft = {
  qualification_name: '',
  category: 'certification',
  awarding_body: '',
  certificate_number: '',
  date_achieved: '',
  expiry_date: '',
};

export default function CredentialsPage() {
  const navigate = useNavigate();
  const { data: store, isLoading } = useMyCredentialStore();
  const [filter, setFilter] = useState<FilterValue>('all');
  const [editing, setEditing] = useState<CredentialItem | 'new' | null>(null);

  // Live: an employer recording a check (or adding training) for this worker
  // updates the page without a reload.
  useRealtimeInvalidate(
    'worker-credentials',
    [{ table: 'employer_elec_id_qualifications', filter: `profile_id=eq.${store?.id}` }],
    [[...MY_CREDENTIALS_KEY]],
    Boolean(store?.id)
  );

  const items = useMemo(() => store?.qualifications ?? [], [store]);

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
      .map((q) => ({ q, expiry: expiryOf(q.expiry_date) }))
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
        : 'Your Elec-ID qualifications, cards and training';

  return (
    <WorkerToolPage
      eyebrow="Identity"
      title="Credentials"
      description={description}
      maxWidth="7xl"
      actions={
        store ? (
          <PrimaryButton onClick={() => setEditing('new')} className="hidden sm:inline-flex">
            <Plus className="h-4 w-4 mr-2" aria-hidden />
            Add
          </PrimaryButton>
        ) : undefined
      }
    >
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
              <div className="-mx-4 rounded-none border-y border-white/[0.14] sm:mx-0 sm:rounded-2xl sm:border-x bg-gradient-to-b from-white/[0.08] to-white/[0.04] p-4 sm:p-5 space-y-4">
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

                <Link to="/elec-id" className="block">
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
                  tone: summary.dueSoon > 0 ? 'amber' : undefined,
                },
                {
                  label: 'Expired',
                  value: summary.expired,
                  tone: summary.expired > 0 ? 'red' : undefined,
                },
                { label: 'Checked', value: summary.checked, tone: 'emerald' },
              ]}
            />
          </div>

          <div className="space-y-4 min-w-0">
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-[15px] font-semibold tracking-tight text-white">
                Qualifications, cards and training
              </h2>
              <span className="text-[12px] text-white tabular-nums">{items.length} on file</span>
            </div>

            <PrimaryButton fullWidth onClick={() => setEditing('new')} className="sm:hidden">
              <Plus className="h-4 w-4 mr-2" aria-hidden />
              Add a qualification
            </PrimaryButton>

            {items.length === 0 ? (
              <EmptyState
                title="Nothing on your Elec-ID yet"
                description="Add your qualifications, cards and training. Your employer sees the same list in their competence matrix."
              />
            ) : (
              <>
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

                {visible.length === 0 ? (
                  <EmptyState title="Nothing here" description="No items match this filter." />
                ) : (
                  <div className="space-y-2.5">
                    {visible.map(({ q, expiry }) => (
                      <button
                        key={q.id}
                        type="button"
                        onClick={() => setEditing(q)}
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
                          <VerificationBadge level={q.verification_level} />
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
          item={editing}
          onClose={() => setEditing(null)}
        />
      )}
    </WorkerToolPage>
  );
}

function CredentialEditorSheet({
  profileId,
  item,
  onClose,
}: {
  profileId: string;
  item: CredentialItem | 'new' | null;
  onClose: () => void;
}) {
  const add = useAddMyCredential();
  const update = useUpdateMyCredential();
  const remove = useDeleteMyCredential();
  const [draft, setDraft] = useState<Draft>(EMPTY_DRAFT);
  const isNew = item === 'new';
  const existing = item && item !== 'new' ? item : null;

  useEffect(() => {
    if (!item) return;
    if (item === 'new') setDraft(EMPTY_DRAFT);
    else
      setDraft({
        qualification_name: getQualificationLabel(item.qualification_name),
        category: item.category ?? 'certification',
        awarding_body: item.awarding_body ?? '',
        certificate_number: item.certificate_number ?? '',
        date_achieved: item.date_achieved ?? '',
        expiry_date: item.expiry_date ?? '',
      });
  }, [item]);

  const set = (k: keyof Draft) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setDraft((d) => ({ ...d, [k]: e.target.value }));

  const busy = add.isPending || update.isPending || remove.isPending;

  const save = async () => {
    if (!draft.qualification_name.trim()) {
      toast({ title: 'Give it a name', variant: 'destructive' });
      return;
    }
    try {
      if (existing) {
        await update.mutateAsync({
          id: existing.id,
          input: {
            // Keep the stored slug when the label was not changed
            qualification_name:
              draft.qualification_name.trim() === getQualificationLabel(existing.qualification_name)
                ? existing.qualification_name
                : draft.qualification_name.trim(),
            awarding_body: draft.awarding_body.trim() || null,
            certificate_number: draft.certificate_number.trim() || null,
            date_achieved: draft.date_achieved || null,
            expiry_date: draft.expiry_date || null,
          },
        });
        toast({ title: 'Saved' });
      } else {
        await add.mutateAsync({
          profileId,
          input: {
            qualification_name: draft.qualification_name.trim(),
            category: draft.category,
            awarding_body: draft.awarding_body.trim() || null,
            certificate_number: draft.certificate_number.trim() || null,
            date_achieved: draft.date_achieved || null,
            expiry_date: draft.expiry_date || null,
          },
        });
        toast({ title: 'Added to your Elec-ID' });
      }
      onClose();
    } catch (e) {
      toast({
        title: 'Not saved',
        description: e instanceof Error ? e.message : 'Try again',
        variant: 'destructive',
      });
    }
  };

  const del = async () => {
    if (!existing) return;
    try {
      await remove.mutateAsync(existing.id);
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

  return (
    <Sheet open={Boolean(item)} onOpenChange={(o) => !o && onClose()}>
      <SheetContent side="bottom" className="h-[85vh] p-0 rounded-t-2xl overflow-hidden border-0">
        <SheetTitle className="sr-only">{isNew ? 'Add a qualification' : 'Edit qualification'}</SheetTitle>
        <SheetDescription className="sr-only">Your Elec-ID credentials</SheetDescription>
        <SheetShell
          eyebrow="Your Elec-ID"
          title={isNew ? 'Add a qualification' : getQualificationLabel(existing?.qualification_name ?? '')}
          description={
            existing
              ? verificationSentence(existing)
              : 'Saved as self-declared. Your employer can record that they have checked it.'
          }
          footer={
            <>
              <SecondaryButton fullWidth onClick={onClose}>
                Cancel
              </SecondaryButton>
              <PrimaryButton fullWidth onClick={save} disabled={busy}>
                {add.isPending || update.isPending ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  'Save'
                )}
              </PrimaryButton>
            </>
          }
        >
          {isNew && (
            <div className="grid grid-cols-3 gap-2">
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
          <Field label="Awarding body or provider">
            <input
              value={draft.awarding_body}
              onChange={set('awarding_body')}
              placeholder="e.g. City & Guilds"
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
          <div className="grid grid-cols-2 gap-4">
            <Field label="Achieved">
              <input
                type="date"
                value={draft.date_achieved}
                onChange={set('date_achieved')}
                className={inputCn}
              />
            </Field>
            <Field label="Expires">
              <input
                type="date"
                value={draft.expiry_date}
                onChange={set('expiry_date')}
                className={inputCn}
              />
            </Field>
          </div>

          {existing && existing.verification_level !== 'self_declared' && (
            <p className="rounded-xl border border-orange-500/30 bg-orange-500/10 px-3 py-2 text-[12.5px] text-orange-300">
              This was checked. Changing the details clears the check, and it shows as
              self-declared until someone checks it again.
            </p>
          )}

          {existing && (
            <DestructiveButton fullWidth onClick={del} disabled={busy}>
              {remove.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Remove from my Elec-ID'}
            </DestructiveButton>
          )}
        </SheetShell>
      </SheetContent>
    </Sheet>
  );
}
