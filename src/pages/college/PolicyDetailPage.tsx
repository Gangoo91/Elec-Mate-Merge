import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { itemVariants } from '@/components/college/primitives';
import { HubBody, HubMasthead, HubPage } from '@/components/hub/HubPrimitives';
import type { PageHelpContent } from '@/components/hub/PageHelp';
import {
  COLLEGE_BTN,
  COLLEGE_BTN_PRIMARY,
  COLLEGE_CARD,
  CollegeEmpty,
  CollegePageHeader,
} from '@/components/college/ui/CollegeUi';
import { StatusPill, type Tone } from '@/components/college/quality/QualityKit';
import { Ring } from '@/components/college/student360/Student360Visuals';
import { FormSheet } from '@/components/forms/FormSheet';
import { inputCn, labelCn, textareaCn } from '@/components/forms/fieldStyles';
import { MobileSelectPicker } from '@/components/ui/mobile-select-picker';
import { usePolicy, type PolicyDetail, type PolicyVersion } from '@/hooks/usePolicy';
import { AcknowledgementLogPanel } from '@/components/college/policy/AcknowledgementLogPanel';

/* ==========================================================================
   PolicyDetailPage: /college/policies/:id
   Read mode and edit mode (markdown with live preview), the page's actions
   in the header, settings, acknowledgement progress, version history, and
   the full sign-off log. Redesigned to the College Hub kit on 7 Oct 2026:
   publish and archive confirm in a bottom sheet instead of browser pop-ups.
   ========================================================================== */

const STATUS_TONE: Record<'draft' | 'live' | 'archived', Tone> = {
  draft: 'warn',
  live: 'good',
  archived: 'neutral',
};

const STATUS_LABEL = {
  draft: 'Draft',
  live: 'Live',
  archived: 'Archived',
} as const;

const OWNER_ROLES = [
  { value: '__none', label: 'No specific owner' },
  { value: 'DSL', label: 'DSL' },
  { value: 'Prevent Lead', label: 'Prevent Lead' },
  { value: 'H&S Lead', label: 'H&S Lead' },
  { value: 'Quality Nominee', label: 'Quality Nominee' },
  { value: 'Mental Health Lead', label: 'Mental Health Lead' },
  { value: 'Principal', label: 'Principal' },
  { value: 'HR', label: 'HR' },
];

const HELP: PageHelpContent = {
  id: 'college-policy-detail',
  title: 'A college policy',
  what: 'One policy: what it says, who owns it, when it is next reviewed, and which staff have read and signed the current version.',
  steps: [
    { title: 'Edit the draft', body: 'Tap Edit to change the wording. The preview shows how staff will see it. Editing a live policy turns it back into a draft; the live version stays in the history untouched.' },
    { title: 'Publish a version', body: 'Publishing freezes this wording as a new version and asks every member of staff to acknowledge it again.' },
    { title: 'Chase signatures', body: 'The sign-off log shows who has acknowledged the current version and who has not.' },
  ],
  notes: [
    { title: 'Archiving', body: 'An archived policy stays in the version history but nobody is asked to sign it. You can restore it at any time.' },
  ],
};

const BACK = '/college?section=compliancedocs';

function Frame({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <HubPage ground="landing">
      <HubMasthead section="College" title={title} backTo={BACK} />
      <HubBody hidePushPrompt>{children}</HubBody>
    </HubPage>
  );
}

const fmt = (iso: string) =>
  new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });

export default function PolicyDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const data = usePolicy(id ?? null);

  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState({
    title: '',
    code: '',
    content_md: '',
    review_due_at: '',
    owner_role: '',
    requires_acknowledgement: false,
  });
  const [saving, setSaving] = useState(false);
  const [publishOpen, setPublishOpen] = useState(false);
  const [publishSummary, setPublishSummary] = useState('');
  const [archiveOpen, setArchiveOpen] = useState(false);

  // Sync draft when policy loads / changes externally
  useEffect(() => {
    if (data.policy) {
      setDraft({
        title: data.policy.title,
        code: data.policy.code ?? '',
        content_md: data.policy.content_md ?? '',
        review_due_at: data.policy.review_due_at ?? '',
        owner_role: data.policy.owner_role ?? '',
        requires_acknowledgement: data.policy.requires_acknowledgement,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.policy?.id, data.policy?.version, data.policy?.updated_at]);

  if (!id || (!data.loading && !data.policy)) {
    return (
      <Frame title="Policy">
        <CollegePageHeader eyebrow="Policies" title="Policy not found" help={HELP} />
        <CollegeEmpty
          title="This policy could not be opened"
          body="It may have been deleted, the link may be wrong, or it belongs to another college. Your college's policies are listed under Staff records and policies, where you can add one or start from a template."
          action={
            <button type="button" className={COLLEGE_BTN_PRIMARY} onClick={() => navigate(BACK)}>
              Go to policies
            </button>
          }
        />
      </Frame>
    );
  }

  if (data.loading && !data.policy) {
    return (
      <Frame title="Policy">
        <div className="flex items-center justify-center py-24">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-elec-yellow border-t-transparent" />
        </div>
      </Frame>
    );
  }

  const { policy, versions, acksForCurrent, ackTarget } = data;
  if (!policy) return null;

  const resetDraft = () =>
    setDraft({
      title: policy.title,
      code: policy.code ?? '',
      content_md: policy.content_md ?? '',
      review_due_at: policy.review_due_at ?? '',
      owner_role: policy.owner_role ?? '',
      requires_acknowledgement: policy.requires_acknowledgement,
    });

  const handleSaveDraft = async () => {
    if (!draft.title.trim()) {
      toast({
        title: 'Title required',
        variant: 'destructive',
      });
      return;
    }
    setSaving(true);
    try {
      // Editing a Live policy returns it to Draft. The published snapshot in
      // college_policy_versions stays frozen as audit evidence; staff seeing
      // the "v3 Live" banner won't be reading silently-edited content.
      const willRevertToDraft = policy.status === 'live';
      await data.saveDraft({
        title: draft.title.trim(),
        code: draft.code.trim() || null,
        content_md: draft.content_md,
        review_due_at: draft.review_due_at || null,
        owner_role: draft.owner_role && draft.owner_role !== '__none' ? draft.owner_role : null,
        requires_acknowledgement: draft.requires_acknowledgement,
        ...(willRevertToDraft ? { status: 'draft' } : {}),
      });
      toast({
        title: willRevertToDraft ? 'Saved as draft' : 'Draft saved',
        description: willRevertToDraft
          ? `Live v${policy.version} stays untouched in the audit trail. Re-publish when you're ready.`
          : undefined,
      });
      setEditing(false);
    } catch (e) {
      toast({
        title: 'Save failed',
        description: (e as Error).message ?? 'Try again.',
        variant: 'destructive',
      });
    } finally {
      setSaving(false);
    }
  };

  const isFirstPublish = policy.status !== 'live';

  // Step 1: validate, then ask for the one-line change summary in a sheet.
  const startPublish = () => {
    const effectiveTitle = (editing ? draft.title : policy.title).trim();
    const effectiveBody = (editing ? draft.content_md : (policy.content_md ?? '')).trim();
    if (!effectiveTitle) {
      toast({ title: 'Title required before publishing', variant: 'destructive' });
      return;
    }
    if (!effectiveBody) {
      toast({
        title: 'Empty body',
        description:
          'Add the policy body before publishing. Staff will be asked to acknowledge whatever is here.',
        variant: 'destructive',
      });
      return;
    }
    setPublishSummary('');
    setPublishOpen(true);
  };

  // Step 2: save pending edits, publish the version.
  const handlePublish = async () => {
    setSaving(true);
    try {
      if (editing) {
        await data.saveDraft({
          title: draft.title.trim(),
          code: draft.code.trim() || null,
          content_md: draft.content_md,
          review_due_at: draft.review_due_at || null,
          owner_role: draft.owner_role && draft.owner_role !== '__none' ? draft.owner_role : null,
          requires_acknowledgement: draft.requires_acknowledgement,
        });
      }
      await data.publishVersion(publishSummary.trim() || null);
      toast({
        title: isFirstPublish ? 'Published v1' : `Published v${policy.version + 1}`,
        description: 'Staff will be asked to re-acknowledge.',
      });
      setEditing(false);
      setPublishOpen(false);
    } catch (e) {
      toast({
        title: 'Publish failed',
        description: (e as Error).message ?? 'Try again.',
        variant: 'destructive',
      });
    } finally {
      setSaving(false);
    }
  };

  const handleArchive = async () => {
    setSaving(true);
    try {
      await data.archive();
      toast({ title: 'Policy archived' });
      setArchiveOpen(false);
    } catch (e) {
      toast({
        title: 'Archive failed',
        description: (e as Error).message ?? 'Try again.',
        variant: 'destructive',
      });
    } finally {
      setSaving(false);
    }
  };

  const handleUnarchive = async () => {
    setSaving(true);
    try {
      await data.unarchive();
      toast({ title: 'Policy restored' });
    } catch (e) {
      toast({
        title: 'Restore failed',
        description: (e as Error).message ?? 'Try again.',
        variant: 'destructive',
      });
    } finally {
      setSaving(false);
    }
  };

  const actions = (
    <>
      {!editing ? (
        <button type="button" onClick={() => setEditing(true)} className={COLLEGE_BTN}>
          Edit
        </button>
      ) : (
        <>
          <button
            type="button"
            onClick={() => {
              setEditing(false);
              resetDraft();
            }}
            disabled={saving}
            className={COLLEGE_BTN}
          >
            Discard
          </button>
          <button type="button" onClick={handleSaveDraft} disabled={saving} className={COLLEGE_BTN}>
            {saving ? 'Saving…' : 'Save draft'}
          </button>
        </>
      )}
      {policy.status === 'archived' ? (
        <button type="button" onClick={handleUnarchive} disabled={saving} className={COLLEGE_BTN}>
          Restore
        </button>
      ) : (
        <button
          type="button"
          onClick={() => setArchiveOpen(true)}
          disabled={saving}
          className={cn(COLLEGE_BTN, 'hover:border-red-400')}
        >
          Archive
        </button>
      )}
      {policy.status !== 'archived' && (
        <button type="button" onClick={startPublish} disabled={saving} className={COLLEGE_BTN_PRIMARY}>
          {policy.status === 'live' ? `Publish v${policy.version + 1}` : 'Publish v1'}
        </button>
      )}
    </>
  );

  return (
    <Frame title={policy.title}>
      <CollegePageHeader
        eyebrow={[policy.category.replace(/_/g, ' '), policy.code].filter(Boolean).join(' · ')}
        title={policy.title}
        description={<Meta policy={policy} />}
        help={HELP}
        actions={actions}
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
        <div className="min-w-0">
          {editing ? (
            <EditPanel draft={draft} onChange={setDraft} />
          ) : (
            <ReadPanel content={policy.content_md ?? ''} status={policy.status} onEdit={() => setEditing(true)} />
          )}
        </div>

        <aside className="space-y-4">
          <AckPanel
            target={ackTarget}
            count={acksForCurrent.length}
            requires={policy.requires_acknowledgement}
            status={policy.status}
            version={policy.version}
          />
          <SettingsPanel policy={policy} editing={editing} draft={draft} onChange={setDraft} />
          <VersionsPanel versions={versions} currentVersion={policy.version} />
        </aside>
      </div>

      {/* Sign-off log: full-width audit panel */}
      <div id="ack-log" className="scroll-mt-20">
        <AcknowledgementLogPanel
          policyId={policy.id}
          currentVersion={policy.version}
          requiresAcknowledgement={policy.requires_acknowledgement}
          status={policy.status}
        />
      </div>

      <FormSheet
        open={publishOpen}
        onOpenChange={setPublishOpen}
        eyebrow="Publish"
        title={isFirstPublish ? 'Publish version 1' : `Publish version ${policy.version + 1}`}
        description="This wording is frozen as a new version and every member of staff is asked to acknowledge it."
        width="wide"
        footer={
          <div className="flex w-full flex-col-reverse gap-2 sm:flex-row sm:justify-end">
            <button type="button" className={COLLEGE_BTN} onClick={() => setPublishOpen(false)} disabled={saving}>
              Cancel
            </button>
            <button type="button" className={COLLEGE_BTN_PRIMARY} onClick={handlePublish} disabled={saving}>
              {saving ? 'Publishing…' : 'Publish'}
            </button>
          </div>
        }
      >
        <div>
          <label className={labelCn} htmlFor="publish-summary">
            {isFirstPublish ? 'One-line summary of this version (optional)' : `What changed in v${policy.version + 1}? (optional)`}
          </label>
          <input
            id="publish-summary"
            value={publishSummary}
            onChange={(e) => setPublishSummary(e.target.value)}
            className={inputCn}
            placeholder={isFirstPublish ? 'First version approved by governors' : 'Updated DSL contact details'}
          />
        </div>
      </FormSheet>

      <FormSheet
        open={archiveOpen}
        onOpenChange={setArchiveOpen}
        eyebrow="Archive"
        title="Archive this policy?"
        description="It stays in the version history but staff are no longer asked to acknowledge it. You can restore it at any time."
        width="wide"
        footer={
          <div className="flex w-full flex-col-reverse gap-2 sm:flex-row sm:justify-end">
            <button type="button" className={COLLEGE_BTN} onClick={() => setArchiveOpen(false)} disabled={saving}>
              Keep it live
            </button>
            <button type="button" className={COLLEGE_BTN_PRIMARY} onClick={handleArchive} disabled={saving}>
              {saving ? 'Archiving…' : 'Archive'}
            </button>
          </div>
        }
      >
        <p className="text-[14px] text-white">{policy.title}</p>
      </FormSheet>
    </Frame>
  );
}

function Meta({ policy }: { policy: PolicyDetail }) {
  return (
    <span className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
      <StatusPill tone={STATUS_TONE[policy.status]}>{STATUS_LABEL[policy.status]}</StatusPill>
      <span className="tabular-nums">Version {policy.version}</span>
      {policy.effective_from && <span>Effective from {fmt(policy.effective_from)}</span>}
      {policy.owner_role && <span>Owned by {policy.owner_role}</span>}
      {policy.review_due_at && <span>Next review {fmt(policy.review_due_at)}</span>}
    </span>
  );
}

/* ──────────────────────────────────────────────────────── */

function ReadPanel({
  content,
  status,
  onEdit,
}: {
  content: string;
  status: 'draft' | 'live' | 'archived';
  onEdit: () => void;
}) {
  if (!content.trim()) {
    return (
      <CollegeEmpty
        title="Nothing written yet"
        body={
          status === 'draft'
            ? 'Write the policy here, or paste it from your existing document. Headings, bold and lists all work.'
            : 'This policy has no body yet.'
        }
        action={
          status !== 'archived' ? (
            <button type="button" className={COLLEGE_BTN_PRIMARY} onClick={onEdit}>
              Start writing
            </button>
          ) : undefined
        }
      />
    );
  }
  return (
    <motion.div variants={itemVariants} initial="hidden" animate="visible" className={cn(COLLEGE_CARD, 'sm:px-10 sm:py-10')}>
      <article className="prose prose-invert max-w-none prose-headings:font-semibold prose-headings:tracking-tight prose-headings:text-white prose-h1:text-[26px] prose-h2:text-[20px] prose-h3:text-[16px] prose-p:text-[14px] prose-p:leading-relaxed prose-p:text-white prose-a:text-elec-yellow prose-strong:text-white prose-li:text-[14px] prose-li:text-white">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
      </article>
    </motion.div>
  );
}

/* ──────────────────────────────────────────────────────── */

interface DraftState {
  title: string;
  code: string;
  content_md: string;
  review_due_at: string;
  owner_role: string;
  requires_acknowledgement: boolean;
}

function EditPanel({ draft, onChange }: { draft: DraftState; onChange: (next: DraftState) => void }) {
  return (
    <div className={cn(COLLEGE_CARD, 'space-y-5')}>
      <div>
        <label className={labelCn} htmlFor="policy-title">
          Title
        </label>
        <input
          id="policy-title"
          value={draft.title}
          onChange={(e) => onChange({ ...draft, title: e.target.value })}
          className={cn(inputCn, 'text-[18px] md:text-[18px] font-semibold')}
          placeholder="Policy title"
        />
      </div>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <div className="min-w-0">
          <div className="mb-1 flex items-center justify-between">
            <label className={cn(labelCn, 'mb-0')} htmlFor="policy-body">
              Policy text
            </label>
            <span className="text-[12px] tabular-nums text-white">{draft.content_md.length} characters</span>
          </div>
          <textarea
            id="policy-body"
            value={draft.content_md}
            onChange={(e) => onChange({ ...draft, content_md: e.target.value })}
            rows={24}
            className={cn(textareaCn, 'min-h-[420px] font-mono text-[13px] md:text-[13px] leading-relaxed')}
            placeholder={'# Heading\n\nWrite your policy. **Bold**, _italic_, lists and headings all work.'}
          />
        </div>
        <div className="min-w-0">
          <p className={labelCn}>How staff will see it</p>
          <div className="max-h-[480px] min-h-[420px] overflow-y-auto rounded-xl border border-white/[0.08] px-4 py-4">
            {draft.content_md.trim() ? (
              <article className="prose prose-invert max-w-none prose-headings:text-white prose-h1:text-[22px] prose-h2:text-[18px] prose-h3:text-[15px] prose-p:text-[13px] prose-p:text-white prose-a:text-elec-yellow prose-strong:text-white prose-li:text-[13px] prose-li:text-white">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{draft.content_md}</ReactMarkdown>
              </article>
            ) : (
              <p className="text-[13px] text-white">The preview shows here as you type.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────── */

function SettingsPanel({
  policy,
  editing,
  draft,
  onChange,
}: {
  policy: PolicyDetail;
  editing: boolean;
  draft: DraftState;
  onChange: (next: DraftState) => void;
}) {
  return (
    <section className={COLLEGE_CARD}>
      <h2 className="text-[15px] font-semibold text-white">Settings</h2>
      <div className="mt-3 space-y-3">
        <SettingRow label="Code">
          {editing ? (
            <input
              value={draft.code}
              onChange={(e) => onChange({ ...draft, code: e.target.value })}
              className={inputCn}
              placeholder="e.g. SG-01"
              aria-label="Policy code"
            />
          ) : (
            <span className="font-mono text-[13px] text-white">{policy.code ?? '—'}</span>
          )}
        </SettingRow>
        <SettingRow label="Owner">
          {editing ? (
            <MobileSelectPicker
              value={draft.owner_role || '__none'}
              onValueChange={(v) => onChange({ ...draft, owner_role: v })}
              options={OWNER_ROLES}
              title="Policy owner"
            />
          ) : (
            <span className="text-[13px] text-white">{policy.owner_role ?? '—'}</span>
          )}
        </SettingRow>
        <SettingRow label="Next review">
          {editing ? (
            <input
              type="date"
              value={draft.review_due_at}
              onChange={(e) => onChange({ ...draft, review_due_at: e.target.value })}
              className={inputCn}
              aria-label="Next review date"
            />
          ) : (
            <span className="text-[13px] text-white">{policy.review_due_at ? fmt(policy.review_due_at) : '—'}</span>
          )}
        </SettingRow>
        <SettingRow label="Staff must sign">
          {editing ? (
            <label className="flex h-11 cursor-pointer items-center justify-end gap-2 touch-manipulation">
              <input
                type="checkbox"
                checked={draft.requires_acknowledgement}
                onChange={(e) => onChange({ ...draft, requires_acknowledgement: e.target.checked })}
                className="h-5 w-5 rounded border-white/20 bg-transparent accent-elec-yellow"
              />
              <span className="text-[13px] text-white">Required</span>
            </label>
          ) : (
            <span className="text-[13px] text-white">{policy.requires_acknowledgement ? 'Required' : 'Optional'}</span>
          )}
        </SettingRow>
      </div>
    </section>
  );
}

function SettingRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex min-h-[44px] items-center justify-between gap-3 border-b border-white/[0.06] pb-2 last:border-0 last:pb-0">
      <span className="shrink-0 text-[13px] text-white">{label}</span>
      <div className="min-w-0 max-w-[200px] flex-1 text-right">{children}</div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────── */

function AckPanel({
  target,
  count,
  requires,
  status,
  version,
}: {
  target: number;
  count: number;
  requires: boolean;
  status: 'draft' | 'live' | 'archived';
  version: number;
}) {
  const pct = target > 0 ? Math.round((count / target) * 100) : 0;
  const message = !requires
    ? 'Staff are not asked to sign this policy.'
    : status === 'draft'
      ? 'Staff are asked to sign once you publish it.'
      : status === 'archived'
        ? 'Archived. Nobody is asked to sign it.'
        : null;
  return (
    <section className={COLLEGE_CARD}>
      <h2 className="text-[15px] font-semibold text-white">Signed by staff</h2>
      {message ? (
        <p className="mt-2 text-[13px] leading-snug text-white">{message}</p>
      ) : (
        <div className="mt-2 flex items-center gap-4">
          <Ring
            pct={pct}
            value={`${pct}%`}
            label={`${count} of ${target}`}
            sub={`have signed version ${version}`}
            warn={pct < 80}
            onClick={() => document.getElementById('ack-log')?.scrollIntoView({ behavior: 'smooth' })}
          />
          <p className="text-[12.5px] leading-snug text-white">
            {pct >= 100 ? 'Everyone has signed the current version.' : 'The sign-off log below shows who still has to sign.'}
          </p>
        </div>
      )}
    </section>
  );
}

/* ──────────────────────────────────────────────────────── */

function VersionsPanel({ versions, currentVersion }: { versions: PolicyVersion[]; currentVersion: number }) {
  return (
    <section className={cn(COLLEGE_CARD, 'p-0 sm:p-0')}>
      <h2 className="px-5 pt-5 text-[15px] font-semibold text-white sm:px-6">Version history</h2>
      {versions.length === 0 ? (
        <p className="px-5 pb-5 pt-2 text-[13px] leading-snug text-white sm:px-6">
          No published versions yet. Publish version 1 to start the trail.
        </p>
      ) : (
        <ul className="mt-2 divide-y divide-white/[0.06]">
          {versions.map((v) => (
            <li key={v.id} className="px-5 py-3 sm:px-6">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[13.5px] font-semibold tabular-nums text-white">Version {v.version}</span>
                {v.version === currentVersion && <StatusPill tone="good">Current</StatusPill>}
              </div>
              <div className="mt-0.5 text-[12px] tabular-nums text-white">{fmt(v.published_at)}</div>
              {v.change_summary && <div className="mt-1 text-[12.5px] leading-snug text-white">{v.change_summary}</div>}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
