/* ==========================================================================
   TeamsNotificationsCard: College settings, "Microsoft Teams" (ELE-2056).

   A college admin or head of department pastes the link from a Teams
   Workflows webhook ("Send webhook alerts to a channel"). Every 10 minutes
   the college-teams-notify function posts what is NEW in the tutor inbox to
   that channel as one card, each line a link back into the hub. It follows
   the same groups as the staff notification switches, holds posts during
   quiet hours (21:00 to 07:00 UK) and never posts the text of a learner's
   messages, portfolio replies or submission notes.

   The link is a secret. It is sent once, stored in Vault, and never comes
   back: this card only ever sees the host it points at.
   ========================================================================== */

import { useCallback, useEffect, useState } from 'react';
import { Switch } from '@/components/ui/switch';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useCollegeCan } from '@/hooks/useCollegeCan';
import { FormSheet } from '@/components/forms/FormSheet';
import { PEOPLE_LIST, StatusChip } from '@/components/college/people/peopleKit';
import { COLLEGE_BTN, COLLEGE_BTN_PRIMARY } from '@/components/college/ui/CollegeUi';
import { inputCn, labelCn } from '@/components/forms/fieldStyles';

type Group = 'college_marking' | 'college_hours' | 'college_messages' | 'college_reviews';

const GROUPS: Array<{ key: Group; label: string; body: string }> = [
  {
    key: 'college_marking',
    label: 'Marking and evidence',
    body: 'Evidence to assess, portfolio replies to answer, IQA verdicts due.',
  },
  {
    key: 'college_hours',
    label: 'Off-the-job hours',
    body: 'Hours to verify and app learning to approve.',
  },
  {
    key: 'college_messages',
    label: 'Messages',
    body: 'A learner has messaged. The message itself is never posted.',
  },
  {
    key: 'college_reviews',
    label: 'Reviews, check-ins and deadlines',
    body: 'Progress reviews to book or sign, learners flagged for a check-in, EPA organisation deadlines.',
  },
];

interface TeamsSettings {
  connected: boolean;
  can_manage: boolean;
  url_host?: string;
  enabled?: boolean;
  categories?: Group[];
  quiet_hours?: boolean;
  include_names?: boolean;
  connected_at?: string;
  connected_by_name?: string | null;
  last_run_at?: string | null;
  last_posted_at?: string | null;
  last_status?: number | null;
  last_error?: string | null;
  posted_total?: number;
}

interface PreviewResult {
  baseline?: boolean;
  in_quiet_hours?: boolean;
  inbox_items?: number;
  would_post?: number;
  card?: {
    attachments: Array<{ content: { body: Array<{ text?: string }> } }>;
  } | null;
}

const ROW = 'flex min-h-[64px] items-center gap-4 px-5 py-4 sm:px-6';

const when = (iso?: string | null) =>
  iso
    ? new Date(iso).toLocaleString('en-GB', {
        day: 'numeric',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit',
      })
    : null;

/** Card markdown back to plain words for the preview: "[Verify](url) text" → "Verify: text". */
function plainLine(t: string): string {
  return t
    .replace(/\*\*Urgent\*\* /, 'Urgent. ')
    .replace(/^(Urgent\. )?\[([^\]]+)\]\([^)]+\)\s*/, (_m, u, verb) => `${u ?? ''}${verb}: `)
    .replace(/\\([\\[\]()*_`>#])/g, '$1');
}

export function TeamsNotificationsCard() {
  const { toast } = useToast();
  const { collegeId } = useCollegeCan();
  const [s, setS] = useState<TeamsSettings | null>(null);
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState<string | null>(null);
  const [preview, setPreview] = useState<PreviewResult | null>(null);
  const [armed, setArmed] = useState(false);

  // Form state (the sheet).
  const [url, setUrl] = useState('');
  const [groups, setGroups] = useState<Group[]>(GROUPS.map((g) => g.key));
  const [quiet, setQuiet] = useState(true);
  const [names, setNames] = useState(true);
  const [enabled, setEnabled] = useState(true);

  const load = useCallback(async () => {
    if (!collegeId) return;
    const { data, error } = await supabase.rpc(
      'college_teams_settings' as never,
      { p_college: collegeId } as never
    );
    if (!error) setS(data as unknown as TeamsSettings);
  }, [collegeId]);

  useEffect(() => {
    void load();
  }, [load]);

  const openSheet = () => {
    setUrl('');
    setGroups((s?.categories as Group[] | undefined) ?? GROUPS.map((g) => g.key));
    setQuiet(s?.quiet_hours ?? true);
    setNames(s?.include_names ?? true);
    setEnabled(s?.enabled ?? true);
    setOpen(true);
  };

  const urlLooksRight =
    !url ||
    /^https:\/\/([a-z0-9-]+\.)+(logic\.azure\.com|powerplatform\.com|webhook\.office\.com)(:443)?\//i.test(
      url.trim()
    );

  const save = async () => {
    if (!collegeId) return;
    setBusy('save');
    const { data, error } = await supabase.rpc(
      'college_teams_save' as never,
      {
        p_college: collegeId,
        p_url: url.trim() || null,
        p_enabled: enabled,
        p_categories: groups,
        p_quiet_hours: quiet,
        p_include_names: names,
      } as never
    );
    setBusy(null);
    if (error) {
      toast({ title: 'Not saved', description: error.message, variant: 'destructive' });
      return;
    }
    setUrl('');
    setS(data as unknown as TeamsSettings);
    setOpen(false);
    setPreview(null);
    toast({
      title: url.trim() ? 'Teams connected' : 'Teams settings saved',
      description: url.trim()
        ? 'New inbox items will post to the channel from the next run, within 10 minutes. Send a test to check it now.'
        : undefined,
    });
  };

  const call = async (action: 'test' | 'preview') => {
    if (!collegeId) return null;
    const { data, error } = await supabase.functions.invoke('college-teams-notify', {
      body: { action, college_id: collegeId },
    });
    if (error) {
      let message = error.message;
      try {
        const ctx = (error as { context?: Response }).context;
        const j = ctx ? ((await ctx.json()) as { message?: string }) : null;
        if (j?.message) message = j.message;
      } catch {
        /* keep the generic message */
      }
      throw new Error(message);
    }
    return data as Record<string, unknown>;
  };

  const sendTest = async () => {
    setBusy('test');
    try {
      await call('test');
      toast({ title: 'Test sent', description: 'Check the channel in Teams.' });
    } catch (e) {
      toast({
        title: 'Teams did not take the test',
        description: (e as Error).message,
        variant: 'destructive',
      });
    }
    setBusy(null);
    void load();
  };

  const runPreview = async () => {
    setBusy('preview');
    try {
      setPreview((await call('preview')) as PreviewResult);
    } catch (e) {
      toast({
        title: 'Preview failed',
        description: (e as Error).message,
        variant: 'destructive',
      });
    }
    setBusy(null);
  };

  const disconnect = async () => {
    if (!collegeId) return;
    // Two taps, no modal: the first arms it for five seconds.
    if (!armed) {
      setArmed(true);
      setTimeout(() => setArmed(false), 5000);
      return;
    }
    setArmed(false);
    setBusy('disconnect');
    const { error } = await supabase.rpc(
      'college_teams_disconnect' as never,
      { p_college: collegeId } as never
    );
    setBusy(null);
    if (error) {
      toast({ title: 'Not disconnected', description: error.message, variant: 'destructive' });
      return;
    }
    setPreview(null);
    toast({ title: 'Teams disconnected', description: 'The saved link has been deleted.' });
    void load();
  };

  if (!collegeId || !s) return null;
  const manage = s.can_manage;
  const problem = s.connected && !!s.last_error;
  const lines = (preview?.card?.attachments?.[0]?.content?.body ?? [])
    .map((b) => b.text ?? '')
    .slice(2);

  return (
    <div className="space-y-3" data-testid="teams-card">
      <div className={PEOPLE_LIST}>
        <div className="px-5 py-4 sm:px-6">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[14.5px] font-semibold text-white">Microsoft Teams</span>
            {s.connected ? (
              s.enabled ? (
                <StatusChip tone={problem ? 'action' : 'done'}>
                  {problem ? 'Needs attention' : 'Connected'}
                </StatusChip>
              ) : (
                <StatusChip>Paused</StatusChip>
              )
            ) : (
              <StatusChip>Not connected</StatusChip>
            )}
          </div>
          <p className="mt-1 text-[13px] leading-relaxed text-white" data-testid="teams-summary">
            {s.connected
              ? `Posting new inbox items to a channel through ${s.url_host}. ${s.posted_total ?? 0} posted so far${
                  s.last_posted_at ? `, last on ${when(s.last_posted_at)}` : ''
                }. Connected by ${s.connected_by_name ?? 'a college admin'} on ${when(s.connected_at)}.`
              : 'Post new tutor inbox items to one Teams channel, each with a link that opens it in the hub. Held overnight, and the text of learners’ messages and replies is never posted.'}
          </p>
          {problem && (
            <p className="mt-2 text-[13px] leading-relaxed text-white" data-testid="teams-error">
              Last attempt: {s.last_error}
            </p>
          )}
          {!manage && (
            <p className="mt-2 text-[12.5px] leading-relaxed text-white">
              Only a college admin or head of department can connect or change Teams.
            </p>
          )}
          <div className="mt-3 flex flex-wrap gap-2">
            {manage && (
              <button
                type="button"
                className={s.connected ? COLLEGE_BTN : COLLEGE_BTN_PRIMARY}
                onClick={openSheet}
                data-testid="teams-open"
              >
                {s.connected ? 'Change' : 'Connect Teams'}
              </button>
            )}
            {s.connected && manage && (
              <button
                type="button"
                className={COLLEGE_BTN}
                disabled={!!busy}
                onClick={() => void sendTest()}
                data-testid="teams-test"
              >
                {busy === 'test' ? 'Sending…' : 'Send a test'}
              </button>
            )}
            {s.connected && (
              <button
                type="button"
                className={COLLEGE_BTN}
                disabled={!!busy}
                onClick={() => void runPreview()}
                data-testid="teams-preview"
              >
                {busy === 'preview' ? 'Checking…' : 'Preview the next post'}
              </button>
            )}
            {s.connected && manage && (
              <button
                type="button"
                className={COLLEGE_BTN}
                disabled={!!busy}
                onClick={() => void disconnect()}
                data-testid="teams-disconnect"
              >
                {armed ? 'Tap again to disconnect' : 'Disconnect'}
              </button>
            )}
          </div>
        </div>

        {s.connected && (
          <div className={ROW}>
            <div className="min-w-0 flex-1 text-[13px] leading-relaxed text-white">
              Posts:{' '}
              {GROUPS.filter((g) => s.categories?.includes(g.key))
                .map((g) => g.label.toLowerCase())
                .join(', ') || 'nothing (no groups chosen)'}
              . {s.quiet_hours ? 'Held from 21:00 to 07:00.' : 'Posts at any hour.'}{' '}
              {s.include_names ? 'Learner names shown.' : 'Learner names hidden.'}
            </div>
          </div>
        )}

        {preview && (
          <div className="px-5 py-4 sm:px-6" data-testid="teams-preview-result">
            <p className="text-[13.5px] font-semibold text-white">
              {preview.baseline
                ? `The first run records the ${preview.inbox_items ?? 0} items already in the inbox without posting them. After that, only new ones post.`
                : preview.would_post
                  ? `The next run would post ${preview.would_post} new ${preview.would_post === 1 ? 'item' : 'items'}${preview.in_quiet_hours ? ' at 07:00, after quiet hours' : ''}:`
                  : 'Nothing new to post right now.'}
            </p>
            {lines.length > 0 && (
              <ul className="mt-2 space-y-1.5">
                {lines.map((t, i) => (
                  <li
                    key={i}
                    className="text-[13px] leading-snug text-white"
                    data-testid="teams-preview-line"
                  >
                    {plainLine(t)}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>

      <FormSheet
        open={open}
        onOpenChange={setOpen}
        width="wide"
        eyebrow="Microsoft Teams"
        title={s.connected ? 'Teams posting' : 'Connect a Teams channel'}
        description="Uses a Teams Workflows webhook, Microsoft's replacement for the retiring Office 365 connectors."
        footer={
          <div className="flex w-full gap-2">
            <button type="button" className={COLLEGE_BTN} onClick={() => setOpen(false)}>
              Cancel
            </button>
            <button
              type="button"
              className={`${COLLEGE_BTN_PRIMARY} flex-1`}
              disabled={busy === 'save' || (!s.connected && !url.trim()) || !urlLooksRight}
              onClick={() => void save()}
              data-testid="teams-save"
            >
              {busy === 'save' ? 'Saving…' : s.connected ? 'Save' : 'Connect'}
            </button>
          </div>
        }
      >
        <div className="grid gap-6 lg:grid-cols-2">
          <section className="space-y-3">
            <h3 className="text-[14px] font-semibold text-white">In Teams, once</h3>
            <ol className="list-decimal space-y-2 pl-5 text-[13px] leading-relaxed text-white">
              <li>Open the channel your tutors use, select More options (…) and then Workflows.</li>
              <li>
                Pick the template{' '}
                <span className="font-semibold">Send webhook alerts to a channel</span>, choose the
                team and channel, and save.
              </li>
              <li>Copy the webhook link it shows and paste it here.</li>
            </ol>
            <p className="text-[12.5px] leading-relaxed text-white">
              A workflow belongs to the person who made it. Add a co-owner in the Workflows app so
              posting carries on if they leave. Anyone holding the link can post to the channel, so
              treat it like a password: we store it encrypted and never show it again.
            </p>
          </section>
          <section className="space-y-4">
            <div>
              <label className={labelCn} htmlFor="teams-url">
                {s.connected
                  ? 'New webhook link (leave empty to keep the current one)'
                  : 'Webhook link'}
              </label>
              <input
                id="teams-url"
                className={inputCn}
                type="url"
                inputMode="url"
                autoComplete="off"
                spellCheck={false}
                placeholder="https://…logic.azure.com/… or …powerplatform.com/…"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                data-testid="teams-url"
              />
              {!urlLooksRight && (
                <p className="mt-1.5 text-[12.5px] text-white" data-testid="teams-url-hint">
                  That does not look like a Teams link. It should start https:// and end in
                  logic.azure.com, powerplatform.com or webhook.office.com before the first /.
                </p>
              )}
            </div>
            <div className="space-y-1">
              <p className="text-[13px] font-semibold text-white">What to post</p>
              {GROUPS.map((g) => (
                <div key={g.key} className="flex min-h-[56px] items-center gap-4 py-1.5">
                  <div className="min-w-0 flex-1">
                    <label
                      htmlFor={`teams-${g.key}`}
                      className="text-[13.5px] font-semibold text-white"
                    >
                      {g.label}
                    </label>
                    <p className="text-[12.5px] leading-snug text-white">{g.body}</p>
                  </div>
                  <Switch
                    id={`teams-${g.key}`}
                    checked={groups.includes(g.key)}
                    onCheckedChange={(v) =>
                      setGroups((cur) => (v ? [...cur, g.key] : cur.filter((k) => k !== g.key)))
                    }
                    className="relative touch-manipulation after:absolute after:-inset-x-2 after:-inset-y-2.5 after:content-['']"
                  />
                </div>
              ))}
              <p className="text-[12.5px] leading-snug text-white">
                Safeguarding is never posted to a channel; it stays with your safeguarding leads.
              </p>
            </div>
            <div className="flex min-h-[56px] items-center gap-4">
              <div className="min-w-0 flex-1">
                <label htmlFor="teams-quiet" className="text-[13.5px] font-semibold text-white">
                  Quiet hours, 21:00 to 07:00
                </label>
                <p className="text-[12.5px] leading-snug text-white">
                  Holds posts overnight and sends what came in as one card in the morning.
                </p>
              </div>
              <Switch
                id="teams-quiet"
                checked={quiet}
                onCheckedChange={setQuiet}
                className="relative touch-manipulation after:absolute after:-inset-x-2 after:-inset-y-2.5 after:content-['']"
              />
            </div>
            <div className="flex min-h-[56px] items-center gap-4">
              <div className="min-w-0 flex-1">
                <label htmlFor="teams-names" className="text-[13.5px] font-semibold text-white">
                  Show learner names
                </label>
                <p className="text-[12.5px] leading-snug text-white">
                  First name and initial, with the cohort. Off posts &ldquo;A learner&rdquo;; the
                  link still opens the right record for staff who can see it.
                </p>
              </div>
              <Switch
                id="teams-names"
                checked={names}
                onCheckedChange={setNames}
                className="relative touch-manipulation after:absolute after:-inset-x-2 after:-inset-y-2.5 after:content-['']"
              />
            </div>
            {s.connected && (
              <div className="flex min-h-[56px] items-center gap-4">
                <div className="min-w-0 flex-1">
                  <label htmlFor="teams-enabled" className="text-[13.5px] font-semibold text-white">
                    Posting on
                  </label>
                  <p className="text-[12.5px] leading-snug text-white">
                    Pause without losing the link.
                  </p>
                </div>
                <Switch
                  id="teams-enabled"
                  checked={enabled}
                  onCheckedChange={setEnabled}
                  className="relative touch-manipulation after:absolute after:-inset-x-2 after:-inset-y-2.5 after:content-['']"
                />
              </div>
            )}
          </section>
        </div>
      </FormSheet>
    </div>
  );
}
