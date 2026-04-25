import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import {
  PageFrame,
  LoadingState,
  Pill,
  itemVariants,
  inputClass,
  textareaClass,
  selectTriggerClass,
  selectContentClass,
} from '@/components/college/primitives';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { usePolicy, type PolicyDetail, type PolicyVersion } from '@/hooks/usePolicy';
import { AcknowledgementLogPanel } from '@/components/college/policy/AcknowledgementLogPanel';

/* ==========================================================================
   PolicyDetailPage — /college/policies/:id
   Read mode + edit mode (markdown + live preview), action rail, version
   history sidebar, ack progress, settings panel.
   ========================================================================== */

const STATUS_TONE = {
  draft: 'amber',
  live: 'green',
  archived: 'blue',
} as const;

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
  }, [data.policy?.id, data.policy?.version, data.policy?.updated_at]);

  if (!id) {
    return (
      <PageFrame>
        <div className="text-white">No policy id.</div>
      </PageFrame>
    );
  }

  if (data.loading && !data.policy) {
    return (
      <PageFrame>
        <LoadingState />
      </PageFrame>
    );
  }

  if (!data.policy) {
    return (
      <PageFrame>
        <div className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl px-6 py-6">
          <div className="text-[10px] font-medium uppercase tracking-[0.22em] text-red-300 mb-2">
            Not found
          </div>
          <p className="text-[13.5px] text-white">This policy couldn't be loaded.</p>
        </div>
      </PageFrame>
    );
  }

  const { policy, versions, acksForCurrent, ackTarget } = data;

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

  const handlePublish = async () => {
    const isFirstPublish = policy.status !== 'live';
    // Validate against the form draft when editing, otherwise the persisted policy
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
          'Add the policy body before publishing — staff will be asked to acknowledge whatever is here.',
        variant: 'destructive',
      });
      return;
    }
    const summary = window.prompt(
      isFirstPublish
        ? 'One-line summary of this version (optional):'
        : `What changed in v${policy.version + 1}? (one-line summary)`
    );
    if (summary === null) return; // cancelled
    setSaving(true);
    try {
      // Save any pending edits first
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
      await data.publishVersion(summary.trim() || null);
      toast({
        title: isFirstPublish ? 'Published v1' : `Published v${policy.version + 1}`,
        description: 'Staff will be asked to re-acknowledge.',
      });
      setEditing(false);
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
    const ok = window.confirm(
      'Archive this policy? It stays in version history but no longer requires acknowledgement.'
    );
    if (!ok) return;
    setSaving(true);
    try {
      await data.archive();
      toast({ title: 'Policy archived' });
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

  return (
    <PageFrame className="max-w-[1400px] pb-16">
      <motion.div variants={itemVariants}>
        <button
          onClick={() => navigate(-1)}
          className="text-[12px] font-medium text-white/65 hover:text-white transition-colors"
        >
          ← Back
        </button>
      </motion.div>

      {/* Sticky action rail */}
      <motion.div variants={itemVariants}>
        <div className="sticky top-0 z-20 -mx-4 sm:-mx-6 mb-4 bg-[hsl(0_0%_8%)]/90 backdrop-blur-md border-b border-white/[0.06]">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-3 flex items-center gap-3 flex-wrap">
            <div className="mr-auto text-[11.5px] text-white truncate min-w-0">
              <span className="uppercase tracking-[0.18em] font-medium">Policy</span>
              <span className="mx-2 text-white/25">·</span>
              <span className="truncate">{policy.title}</span>
            </div>
            {!editing ? (
              <button
                onClick={() => setEditing(true)}
                className="h-9 px-3.5 rounded-full text-[12.5px] font-medium border border-white/[0.12] text-white hover:bg-white/[0.06] transition-colors touch-manipulation"
              >
                Edit
              </button>
            ) : (
              <button
                onClick={() => {
                  setEditing(false);
                  // Reset draft from policy
                  if (policy) {
                    setDraft({
                      title: policy.title,
                      code: policy.code ?? '',
                      content_md: policy.content_md ?? '',
                      review_due_at: policy.review_due_at ?? '',
                      owner_role: policy.owner_role ?? '',
                      requires_acknowledgement: policy.requires_acknowledgement,
                    });
                  }
                }}
                disabled={saving}
                className="h-9 px-3.5 rounded-full text-[12.5px] font-medium border border-white/[0.12] text-white/65 hover:text-white transition-colors touch-manipulation disabled:opacity-40"
              >
                Discard
              </button>
            )}
            {editing && (
              <button
                onClick={handleSaveDraft}
                disabled={saving}
                className="h-9 px-3.5 rounded-full text-[12.5px] font-medium border border-white/[0.12] text-white hover:bg-white/[0.06] transition-colors touch-manipulation disabled:opacity-40"
              >
                {saving ? 'Saving…' : 'Save draft'}
              </button>
            )}
            {policy.status !== 'archived' && (
              <button
                onClick={handlePublish}
                disabled={saving}
                className="h-9 px-3.5 rounded-full bg-elec-yellow text-black text-[12.5px] font-semibold hover:bg-elec-yellow/90 transition-colors touch-manipulation disabled:opacity-40"
              >
                {policy.status === 'live' ? `Publish v${policy.version + 1} →` : 'Publish v1 →'}
              </button>
            )}
            {policy.status === 'archived' ? (
              <button
                onClick={handleUnarchive}
                disabled={saving}
                className="h-9 px-3.5 rounded-full text-[12.5px] font-medium border border-emerald-500/25 text-emerald-300 hover:bg-emerald-500/[0.08] transition-colors touch-manipulation disabled:opacity-40"
              >
                Restore
              </button>
            ) : (
              <button
                onClick={handleArchive}
                disabled={saving}
                className="h-9 px-3.5 rounded-full text-[12.5px] font-medium border border-red-500/25 text-red-300 hover:bg-red-500/[0.08] transition-colors touch-manipulation disabled:opacity-40"
              >
                Archive
              </button>
            )}
          </div>
        </div>
      </motion.div>

      <motion.div variants={itemVariants}>
        <Header policy={policy} />
      </motion.div>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_300px] gap-8">
        {/* Body */}
        <div className="min-w-0">
          {editing ? (
            <EditPanel draft={draft} onChange={setDraft} />
          ) : (
            <ReadPanel content={policy.content_md ?? ''} status={policy.status} />
          )}
        </div>

        {/* Sidebar */}
        <aside className="space-y-5">
          <SettingsPanel policy={policy} editing={editing} draft={draft} onChange={setDraft} />
          <AckPanel
            target={ackTarget}
            count={acksForCurrent.length}
            requires={policy.requires_acknowledgement}
            status={policy.status}
            version={policy.version}
          />
          <VersionsPanel versions={versions} currentVersion={policy.version} />
        </aside>
      </div>

      {/* Sign-off log — full-width audit panel */}
      <AcknowledgementLogPanel
        policyId={policy.id}
        currentVersion={policy.version}
        requiresAcknowledgement={policy.requires_acknowledgement}
        status={policy.status}
      />
    </PageFrame>
  );
}

/* ──────────────────────────────────────────────────────── */

function Header({ policy }: { policy: PolicyDetail }) {
  return (
    <div>
      <div className="text-[10px] font-medium uppercase tracking-[0.22em] text-white/55">
        {policy.category.replace(/_/g, ' ')}
        {policy.code && (
          <>
            <span className="mx-2 text-white/25">·</span>
            <span className="font-mono">{policy.code}</span>
          </>
        )}
      </div>
      <h1 className="mt-2 text-[28px] sm:text-[36px] font-semibold text-white tracking-tight leading-[1.1]">
        {policy.title}
      </h1>
      <div className="mt-3 flex items-center flex-wrap gap-x-3 gap-y-1.5 text-[12px]">
        <Pill tone={STATUS_TONE[policy.status]}>{STATUS_LABEL[policy.status]}</Pill>
        <span className="text-white/65 tabular-nums">v{policy.version}</span>
        {policy.effective_from && (
          <>
            <span className="text-white/25">·</span>
            <span className="text-white/65">
              Effective from{' '}
              {new Date(policy.effective_from).toLocaleDateString('en-GB', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
              })}
            </span>
          </>
        )}
        {policy.owner_role && (
          <>
            <span className="text-white/25">·</span>
            <span className="text-white/65">
              Owned by <span className="text-white">{policy.owner_role}</span>
            </span>
          </>
        )}
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────── */

function ReadPanel({
  content,
  status,
}: {
  content: string;
  status: 'draft' | 'live' | 'archived';
}) {
  if (!content.trim()) {
    return (
      <div className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl px-6 py-12 text-center">
        <p className="text-[13px] text-white/65 max-w-md mx-auto leading-relaxed">
          {status === 'draft'
            ? 'No content yet. Tap Edit to start drafting your policy.'
            : 'This policy has no body yet.'}
        </p>
      </div>
    );
  }
  return (
    <div className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl px-6 sm:px-10 py-8 sm:py-10">
      <article className="prose prose-invert max-w-none prose-headings:text-white prose-headings:font-semibold prose-headings:tracking-tight prose-h1:text-[26px] prose-h2:text-[20px] prose-h3:text-[16px] prose-p:text-[13.5px] prose-p:leading-relaxed prose-p:text-white/85 prose-li:text-[13.5px] prose-li:text-white/85 prose-strong:text-white prose-a:text-elec-yellow">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
      </article>
    </div>
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

function EditPanel({
  draft,
  onChange,
}: {
  draft: DraftState;
  onChange: (next: DraftState) => void;
}) {
  return (
    <div className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl overflow-hidden">
      <div className="px-5 sm:px-6 py-4 border-b border-white/[0.06]">
        <input
          value={draft.title}
          onChange={(e) => onChange({ ...draft, title: e.target.value })}
          className="w-full bg-transparent text-[20px] sm:text-[22px] font-semibold text-white tracking-tight focus:outline-none placeholder:text-white/35"
          placeholder="Policy title"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="md:border-r border-white/[0.06]">
          <div className="px-5 sm:px-6 py-3 border-b border-white/[0.06] flex items-center justify-between">
            <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
              Markdown
            </span>
            <span className="text-[10.5px] text-white/45 tabular-nums">
              {draft.content_md.length} chars
            </span>
          </div>
          <textarea
            value={draft.content_md}
            onChange={(e) => onChange({ ...draft, content_md: e.target.value })}
            rows={28}
            className={cn(
              textareaClass,
              'rounded-none border-0 min-h-[480px] font-mono text-[12.5px] leading-relaxed bg-[hsl(0_0%_10%)]'
            )}
            placeholder={
              '# Heading\n\nWrite your policy content. **Bold**, _italic_, lists, headings — full markdown.'
            }
          />
        </div>
        <div className="border-t md:border-t-0 border-white/[0.06]">
          <div className="px-5 sm:px-6 py-3 border-b border-white/[0.06]">
            <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
              Live preview
            </span>
          </div>
          <div className="px-5 sm:px-6 py-5 max-h-[480px] overflow-y-auto">
            {draft.content_md.trim() ? (
              <article className="prose prose-invert max-w-none prose-headings:text-white prose-h1:text-[22px] prose-h2:text-[18px] prose-h3:text-[15px] prose-p:text-[13px] prose-li:text-[13px] prose-strong:text-white prose-a:text-elec-yellow">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{draft.content_md}</ReactMarkdown>
              </article>
            ) : (
              <p className="text-[12px] text-white/45 italic">Preview shows here as you type.</p>
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
    <div className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl px-5 py-4">
      <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55 mb-3">
        Settings
      </div>
      <div className="space-y-3">
        <SettingRow label="Code">
          {editing ? (
            <input
              value={draft.code}
              onChange={(e) => onChange({ ...draft, code: e.target.value })}
              className={cn(inputClass, 'h-9 text-[12px]')}
              placeholder="—"
            />
          ) : (
            <span className="text-[12px] font-mono text-white/85">{policy.code ?? '—'}</span>
          )}
        </SettingRow>
        <SettingRow label="Owner">
          {editing ? (
            <Select
              value={draft.owner_role || '__none'}
              onValueChange={(v) => onChange({ ...draft, owner_role: v })}
            >
              <SelectTrigger className={cn(selectTriggerClass, 'h-9 text-[12px]')}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent className={selectContentClass}>
                {OWNER_ROLES.map((r) => (
                  <SelectItem key={r.value} value={r.value}>
                    {r.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          ) : (
            <span className="text-[12px] text-white/85">{policy.owner_role ?? '—'}</span>
          )}
        </SettingRow>
        <SettingRow label="Next review">
          {editing ? (
            <input
              type="date"
              value={draft.review_due_at}
              onChange={(e) => onChange({ ...draft, review_due_at: e.target.value })}
              className={cn(inputClass, 'h-9 text-[12px]')}
            />
          ) : (
            <span className="text-[12px] text-white/85">
              {policy.review_due_at
                ? new Date(policy.review_due_at).toLocaleDateString('en-GB', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  })
                : '—'}
            </span>
          )}
        </SettingRow>
        <SettingRow label="Acknowledgement">
          {editing ? (
            <label className="flex items-center gap-2 cursor-pointer touch-manipulation">
              <input
                type="checkbox"
                checked={draft.requires_acknowledgement}
                onChange={(e) =>
                  onChange({
                    ...draft,
                    requires_acknowledgement: e.target.checked,
                  })
                }
                className="h-4 w-4 rounded border-white/20 bg-[hsl(0_0%_9%)] checked:bg-elec-yellow"
              />
              <span className="text-[12px] text-white">Required</span>
            </label>
          ) : (
            <span className="text-[12px] text-white/85">
              {policy.requires_acknowledgement ? 'Required' : 'Optional'}
            </span>
          )}
        </SettingRow>
      </div>
    </div>
  );
}

function SettingRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-start justify-between gap-3">
      <span className="text-[11px] text-white/55 mt-1.5 shrink-0">{label}</span>
      <div className="flex-1 min-w-0 max-w-[200px] text-right">{children}</div>
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
  if (!requires) {
    return (
      <div className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl px-5 py-4">
        <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
          Acknowledgement
        </div>
        <p className="mt-2 text-[12px] text-white/65 leading-snug">Not required for this policy.</p>
      </div>
    );
  }
  if (status !== 'live') {
    return (
      <div className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl px-5 py-4">
        <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
          Acknowledgement
        </div>
        <p className="mt-2 text-[12px] text-white/65 leading-snug">
          {status === 'draft'
            ? 'Staff acknowledgement starts after publication.'
            : 'Archived — acknowledgements paused.'}
        </p>
      </div>
    );
  }
  const pct = target > 0 ? Math.round((count / target) * 100) : 0;
  return (
    <div className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl px-5 py-4">
      <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
        Acknowledged · v{version}
      </div>
      <div className="mt-2 text-[20px] font-semibold tabular-nums text-white">
        {count}
        <span className="text-white/40 text-[14px]"> / {target}</span>
        <span className="ml-2 text-[12px] font-medium text-white/55">{pct}%</span>
      </div>
      <div className="mt-3 h-1.5 w-full bg-white/[0.06] rounded-full overflow-hidden">
        <div
          className={cn(
            'h-full transition-all',
            pct >= 100 ? 'bg-emerald-400' : pct >= 60 ? 'bg-elec-yellow' : 'bg-amber-400'
          )}
          style={{ width: `${Math.min(100, pct)}%` }}
        />
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────── */

function VersionsPanel({
  versions,
  currentVersion,
}: {
  versions: PolicyVersion[];
  currentVersion: number;
}) {
  return (
    <div className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl overflow-hidden">
      <div className="px-5 py-3 border-b border-white/[0.06]">
        <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
          Version history
        </div>
      </div>
      {versions.length === 0 ? (
        <div className="px-5 py-4">
          <p className="text-[12px] text-white/55 leading-snug">
            No published versions yet. Publish v1 to start the trail.
          </p>
        </div>
      ) : (
        <div className="divide-y divide-white/[0.04]">
          {versions.map((v) => (
            <div key={v.id} className="px-5 py-3">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[13px] font-medium tabular-nums text-white">
                  v{v.version}
                </span>
                {v.version === currentVersion && (
                  <span className="text-[9.5px] uppercase tracking-[0.06em] text-emerald-300 font-semibold">
                    Current
                  </span>
                )}
              </div>
              <div className="mt-0.5 text-[10.5px] text-white/55 tabular-nums">
                {new Date(v.published_at).toLocaleDateString('en-GB', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                })}
              </div>
              {v.change_summary && (
                <div className="mt-1 text-[11px] text-white/75 leading-snug">
                  {v.change_summary}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
