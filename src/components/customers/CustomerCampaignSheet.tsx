/**
 * ELE-1554 — send a "keep in touch" email to a batch of your own customers.
 *
 * Three steps, because the three decisions are genuinely separate: what you're
 * saying, who gets it, and whether you're happy to send. Cramming them into
 * one scroll on a phone put the send button next to a half-written message.
 *
 * The recipient list shows WHY someone can't be emailed rather than hiding
 * them. "No email address" is a prompt to go and add one; silently dropping
 * them from the list looks like the app has lost customers.
 *
 * Every limit shown here is advisory. The edge function re-checks ownership,
 * suppression, opt-out, the dedupe window and the daily cap on the way
 * through — this UI cannot be the thing that protects the sending domain.
 */

import { useEffect, useMemo, useRef, useState } from 'react';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { supabase } from '@/integrations/supabase/client';
import { inputCn, labelCn, textareaCn } from '@/components/forms/fieldStyles';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { useHaptic } from '@/hooks/useHaptic';
import {
  useCustomerCampaign,
  MERGE_FIELDS,
  DEFAULT_TEMPLATE,
  type CampaignResult,
} from '@/hooks/useCustomerCampaign';

/** Mirrors DEDUPE_DAYS and DEFAULT_DAILY_CAP in the edge function. */
const DEDUPE_DAYS = 30;
const DAILY_CAP = 10;

type Step = 'message' | 'recipients' | 'review';

const STEPS: { key: Step; label: string }[] = [
  { key: 'message', label: 'Message' },
  { key: 'recipients', label: 'Who' },
  { key: 'review', label: 'Send' },
];

interface Blocker {
  reason: string;
}

/**
 * Preview substitution. Deliberately mirrors applyMergeFields + firstName in
 * supabase/functions/send-customer-campaign — if these two ever disagree, the
 * preview is lying about what the customer receives, which is worse than
 * having no preview at all. Change both together.
 */
function mergePreview(
  template: string,
  vars: Record<string, string>
): string {
  return template.replace(/\{\{\s*([a-z_]+)\s*\}\}/gi, (whole, rawKey: string) => {
    const key = rawKey.toLowerCase();
    return key in vars ? (vars[key] ?? '') : whole;
  });
}

function firstName(full: string): string {
  return (full || '').trim().split(/\s+/)[0] || 'there';
}

/** Just enough of a customer to pick recipients — this list can be long. */
interface Recipient {
  id: string;
  name: string;
  email: string | null;
  companyName: string | null;
  campaignOptedOutAt: string | null;
  lastActivityAt: string | null;
}

/**
 * Ceiling on the picker. Nobody can send more than 10 a day, so a list beyond
 * this is unusable by hand anyway — but it is surfaced rather than silently
 * truncated, because "my customer isn't in the list" is a bug report.
 */
const MAX_PICKER_ROWS = 1000;

export interface CustomerCampaignSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const CustomerCampaignSheet = ({
  open,
  onOpenChange,
}: CustomerCampaignSheetProps) => {
  const { templates, isSending, sentTodayCount, saveTemplate, send } = useCustomerCampaign();
  const { toast } = useToast();
  const { selection } = useHaptic();

  const [step, setStep] = useState<Step>('message');
  const [subject, setSubject] = useState(DEFAULT_TEMPLATE.subject);
  const [body, setBody] = useState(DEFAULT_TEMPLATE.body);
  const [templateId, setTemplateId] = useState<string | undefined>();
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [search, setSearch] = useState('');
  const [recentlyEmailed, setRecentlyEmailed] = useState<Set<string>>(new Set());
  const [recipients, setRecipients] = useState<Recipient[]>([]);
  const [loadingRecipients, setLoadingRecipients] = useState(false);
  const [companyName, setCompanyName] = useState('Your electrician');
  const [result, setResult] = useState<CampaignResult | null>(null);

  // Load the most recent template on open so the last thing they wrote is
  // what they see, rather than the stock copy every time.
  //
  // Seeded ONCE per open, guarded by a ref. Keying the effect on `templates`
  // alone would re-seed whenever that array changed identity — and it changes
  // on every save, which happens at send time. A user who edited the message
  // would have watched it revert to the stored copy under them.
  const bodyRef = useRef<HTMLTextAreaElement>(null);
  const seededForOpen = useRef(false);
  useEffect(() => {
    if (!open) {
      seededForOpen.current = false;
      return;
    }
    if (seededForOpen.current) return;
    seededForOpen.current = true;

    setStep('message');
    setResult(null);
    setSearch('');
    const latest = templates[0];
    if (latest) {
      setSubject(latest.subject);
      setBody(latest.body);
      setTemplateId(latest.id);
    }
  }, [open, templates]);

  /**
   * The picker loads its OWN customer list rather than taking one from the
   * page behind it. CustomersPage paginates at 50 and applies whatever search
   * and filters are active — handing that in meant an electrician with 300
   * customers could only ever email the first 50, with no indication the rest
   * existed.
   *
   * Ordered oldest-contact-first, because that is the actual job: the people
   * you haven't spoken to in longest are the ones a check-in is for. NULLS
   * FIRST puts customers with no recorded activity at the very top.
   */
  useEffect(() => {
    if (!open) return;
    let cancelled = false;

    const load = async () => {
      setLoadingRecipients(true);
      const cutoff = new Date(Date.now() - DEDUPE_DAYS * 86_400_000).toISOString();

      const [people, sends, profile] = await Promise.all([
        supabase
          .from('customers')
          .select('id, name, email, company_name, campaign_opted_out_at, last_activity_at')
          .order('last_activity_at', { ascending: true, nullsFirst: true })
          .limit(MAX_PICKER_ROWS),
        supabase
          .from('customer_campaign_sends')
          .select('customer_id')
          .eq('status', 'sent')
          .gte('sent_at', cutoff),
        // Needed for the preview: {{company_name}} is filled server-side from
        // company_profiles (NOT `profiles`, which has no such column), so the
        // preview must read the same place or it shows a name the recipient
        // never gets. RLS scopes this to the caller.
        supabase.from('company_profiles').select('company_name').maybeSingle(),
      ]);

      if (cancelled) return;

      setCompanyName(profile?.data?.company_name || 'Your electrician');

      setRecipients(
        (people.data ?? []).map((c) => ({
          id: c.id,
          name: c.name,
          email: c.email,
          companyName: c.company_name,
          campaignOptedOutAt: c.campaign_opted_out_at,
          lastActivityAt: c.last_activity_at,
        }))
      );
      setRecentlyEmailed(
        new Set((sends.data ?? []).map((r) => r.customer_id).filter(Boolean) as string[])
      );
      setLoadingRecipients(false);
    };

    load();
    return () => {
      cancelled = true;
    };
  }, [open]);

  /** Why this customer can't be included, or null if they can. */
  const blockerFor = useMemo(() => {
    return (c: Recipient): Blocker | null => {
      if (!c.email) return { reason: 'No email address' };
      if (c.campaignOptedOutAt) return { reason: 'Opted out' };
      if (recentlyEmailed.has(c.id)) return { reason: `Emailed in last ${DEDUPE_DAYS} days` };
      return null;
    };
  }, [recentlyEmailed]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return recipients;
    return recipients.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        (c.email || '').toLowerCase().includes(q) ||
        (c.companyName || '').toLowerCase().includes(q)
    );
  }, [recipients, search]);

  // Already ordered oldest-contact-first by the query, so "fill today's N"
  // picks the most overdue for a catch-up rather than an arbitrary 10.
  const eligible = useMemo(
    () => recipients.filter((c) => blockerFor(c) === null),
    [recipients, blockerFor]
  );

  const remainingToday = Math.max(0, DAILY_CAP - sentTodayCount);
  const selectedCount = selected.size;
  /** Whoever the preview is rendered for — a real recipient, not a stand-in. */
  const firstSelected = useMemo(
    () => recipients.find((c) => selected.has(c.id)) ?? null,
    [recipients, selected]
  );
  /** What will actually go out in this run once the cap bites. */
  const willSend = Math.min(selectedCount, remainingToday);

  const toggle = (id: string) => {
    selection();
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const selectAllEligible = () => {
    selection();
    // Cap the one-tap select so it can't queue 300 people for a 10/day limit —
    // the rest would just be reported as skipped, which reads like a failure.
    setSelected(new Set(eligible.slice(0, remainingToday).map((c) => c.id)));
  };

  /**
   * Insert at the caret, not at the end. "Insert a detail" appending to the
   * bottom of a nine-line message is worse than useless — you'd be dragging it
   * back up by hand every time. Falls back to appending only if the textarea
   * has never been focused (no selection to read).
   */
  const insertMergeField = (token: string) => {
    selection();
    const el = bodyRef.current;
    if (!el) {
      setBody((prev) => (prev ? `${prev} ${token}` : token));
      return;
    }
    const start = el.selectionStart ?? el.value.length;
    const end = el.selectionEnd ?? start;
    const next = `${el.value.slice(0, start)}${token}${el.value.slice(end)}`;
    setBody(next);
    // Restore the caret after React re-renders, sitting just past what was
    // inserted so you can keep typing.
    requestAnimationFrame(() => {
      el.focus();
      const caret = start + token.length;
      el.setSelectionRange(caret, caret);
    });
  };

  const handleSend = async () => {
    if (selectedCount === 0) return;
    const saved = await saveTemplate({
      id: templateId,
      name: DEFAULT_TEMPLATE.name,
      subject,
      body,
    });
    // Hold on to the id the first save minted. Without this, templateId stays
    // undefined and every send INSERTs another row — after a week you'd have
    // seven templates all called "Checking in".
    if (saved && !templateId) setTemplateId(saved);

    const res = await send({
      subject,
      body,
      customerIds: Array.from(selected),
      templateId: saved ?? templateId,
    });
    if (res) {
      setResult(res);
      setSelected(new Set());
      if (res.sent > 0) {
        toast({
          title: `Sent to ${res.sent} ${res.sent === 1 ? 'customer' : 'customers'}`,
          description: res.remainingToday > 0
            ? `${res.remainingToday} more you can send today.`
            : "That's your limit for today.",
        });
      }
    }
  };

  const messageValid = subject.trim().length > 0 && body.trim().length > 0;
  const canAdvance = step === 'message' ? messageValid : step === 'recipients' ? selectedCount > 0 : true;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="h-[85vh] overflow-hidden rounded-t-2xl p-0">
        <div className="flex h-full flex-col bg-background">
          {/* Header + step rail */}
          <div className="shrink-0 border-b border-white/[0.08] px-4 pb-3 pt-5">
            <h2 className="text-[17px] font-semibold tracking-tight text-white">
              Keep in touch
            </h2>
            <p className="mt-1 text-[13px] text-white">
              {remainingToday > 0
                ? `${remainingToday} of 10 sends left today`
                : 'Daily limit reached — try again tomorrow'}
            </p>

            {!result && (
              <div className="mt-3.5 flex gap-1.5">
                {STEPS.map((s, i) => {
                  const active = s.key === step;
                  const done = STEPS.findIndex((x) => x.key === step) > i;
                  return (
                    <button
                      key={s.key}
                      type="button"
                      onClick={() => setStep(s.key)}
                      className={cn(
                        'h-9 flex-1 rounded-lg border text-[12.5px] font-semibold transition-colors touch-manipulation',
                        active
                          ? 'border-elec-yellow bg-elec-yellow text-black'
                          : done
                            ? 'border-white/[0.18] bg-white/[0.08] text-white'
                            : 'border-white/[0.12] bg-white/[0.04] text-white'
                      )}
                    >
                      {s.label}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Body */}
          <div className="min-h-0 flex-1 overflow-y-auto px-4 py-5">
            {result ? (
              <ResultView result={result} />
            ) : step === 'message' ? (
              <div className="space-y-5">
                <div>
                  <label htmlFor="campaign-subject" className={labelCn}>
                    Subject
                  </label>
                  <Input
                    id="campaign-subject"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value.slice(0, 200))}
                    className={inputCn}
                    placeholder="Anything I can help with?"
                  />
                </div>

                <div>
                  <label htmlFor="campaign-body" className={labelCn}>
                    Message
                  </label>
                  <Textarea
                    id="campaign-body"
                    ref={bodyRef}
                    value={body}
                    onChange={(e) => setBody(e.target.value.slice(0, 8000))}
                    className={cn(textareaCn, 'min-h-[220px]')}
                    placeholder="Hi {{customer_name}}…"
                  />
                  <p className="mt-1.5 text-[11.5px] text-white">
                    Leave a blank line between paragraphs. An unsubscribe link is added
                    automatically — it has to be there by law.
                  </p>
                </div>

                <div>
                  <span className={labelCn}>Insert a detail</span>
                  <div className="flex flex-wrap gap-2">
                    {MERGE_FIELDS.map((f) => (
                      <button
                        key={f.token}
                        type="button"
                        onClick={() => insertMergeField(f.token)}
                        className="h-11 rounded-xl border border-white/[0.12] bg-white/[0.06] px-3.5 text-[13px] font-medium text-white transition-colors hover:bg-white/[0.1] touch-manipulation"
                      >
                        {f.label}
                      </button>
                    ))}
                  </div>
                  <p className="mt-2 text-[11.5px] text-white">
                    These are swapped for the real thing when each email goes out — e.g.
                    “{MERGE_FIELDS[0].token}” becomes “{MERGE_FIELDS[0].example}”.
                  </p>
                </div>
              </div>
            ) : step === 'recipients' ? (
              <div className="space-y-4">
                <Input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search customers"
                  className={inputCn}
                />

                <div className="flex items-center justify-between gap-3">
                  <span className="text-[13px] font-medium text-white">
                    {selectedCount} selected
                  </span>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={selectAllEligible}
                      disabled={remainingToday === 0}
                      className="h-9 rounded-lg border border-white/[0.12] bg-white/[0.06] px-3 text-[12.5px] font-semibold text-white transition-colors hover:bg-white/[0.1] disabled:opacity-40 touch-manipulation"
                    >
                      Fill today's {remainingToday}
                    </button>
                    {selectedCount > 0 && (
                      <button
                        type="button"
                        onClick={() => setSelected(new Set())}
                        className="h-9 rounded-lg border border-white/[0.12] bg-white/[0.06] px-3 text-[12.5px] font-semibold text-white transition-colors hover:bg-white/[0.1] touch-manipulation"
                      >
                        Clear
                      </button>
                    )}
                  </div>
                </div>

                {recipients.length >= MAX_PICKER_ROWS && (
                  <p className="rounded-xl border border-amber-500/25 bg-amber-500/[0.1] px-3.5 py-2.5 text-[12px] text-white">
                    Showing your {MAX_PICKER_ROWS} least recently contacted customers.
                    Use search to find anyone else.
                  </p>
                )}

                <div className="space-y-2">
                  {loadingRecipients && (
                    <p className="py-8 text-center text-[13px] text-white">
                      Loading customers…
                    </p>
                  )}
                  {!loadingRecipients && filtered.length === 0 && (
                    <p className="py-8 text-center text-[13px] text-white">
                      {search
                        ? `No customers match “${search}”.`
                        : 'No customers yet — add some first.'}
                    </p>
                  )}
                  {filtered.map((c) => {
                    const blocker = blockerFor(c);
                    const isSelected = selected.has(c.id);
                    return (
                      <button
                        key={c.id}
                        type="button"
                        disabled={!!blocker}
                        onClick={() => toggle(c.id)}
                        className={cn(
                          'flex min-h-[56px] w-full items-center gap-3 rounded-xl border px-3.5 py-2.5 text-left transition-colors touch-manipulation',
                          blocker
                            ? 'cursor-not-allowed border-white/[0.08] bg-white/[0.02] opacity-60'
                            : isSelected
                              ? 'border-elec-yellow bg-elec-yellow/[0.12]'
                              : 'border-white/[0.12] bg-white/[0.05] hover:bg-white/[0.08]'
                        )}
                      >
                        <span
                          className={cn(
                            'flex h-5 w-5 shrink-0 items-center justify-center rounded-md border-2',
                            isSelected
                              ? 'border-elec-yellow bg-elec-yellow'
                              : 'border-white/30 bg-transparent'
                          )}
                        >
                          {isSelected && (
                            <svg className="h-3 w-3 text-black" viewBox="0 0 16 16" fill="none">
                              <path
                                d="M3 8.5l3 3 6-7"
                                stroke="currentColor"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          )}
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block truncate text-[14px] font-semibold text-white">
                            {c.name}
                          </span>
                          <span className="mt-0.5 block truncate text-[11.5px] text-white">
                            {blocker ? blocker.reason : c.email}
                          </span>
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ) : (
              <ReviewView
                subject={subject}
                body={body}
                previewFor={firstSelected}
                companyName={companyName}
                selectedCount={selectedCount}
                willSend={willSend}
                remainingToday={remainingToday}
              />
            )}
          </div>

          {/* Footer */}
          <div
            className="shrink-0 border-t border-white/[0.08] bg-background px-4 pt-3"
            style={{ paddingBottom: 'max(0.75rem, env(safe-area-inset-bottom))' }}
          >
            {result ? (
              <Button
                onClick={() => onOpenChange(false)}
                className="h-11 w-full bg-elec-yellow font-semibold text-black touch-manipulation hover:bg-elec-yellow/90"
              >
                Done
              </Button>
            ) : (
              <div className="flex gap-2.5">
                {step !== 'message' && (
                  <Button
                    variant="outline"
                    onClick={() =>
                      setStep(step === 'review' ? 'recipients' : 'message')
                    }
                    className="h-11 flex-1 touch-manipulation"
                  >
                    Back
                  </Button>
                )}
                {step === 'review' ? (
                  <Button
                    onClick={handleSend}
                    disabled={isSending || willSend === 0}
                    className="h-11 flex-1 bg-elec-yellow font-semibold text-black touch-manipulation hover:bg-elec-yellow/90"
                  >
                    {isSending
                      ? 'Sending…'
                      : `Send to ${willSend} ${willSend === 1 ? 'customer' : 'customers'}`}
                  </Button>
                ) : (
                  <Button
                    onClick={() => setStep(step === 'message' ? 'recipients' : 'review')}
                    disabled={!canAdvance}
                    className="h-11 flex-1 bg-elec-yellow font-semibold text-black touch-manipulation hover:bg-elec-yellow/90"
                  >
                    Next
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

// ── Review ───────────────────────────────────────────────────────────

const ReviewView = ({
  subject,
  body,
  previewFor,
  companyName,
  selectedCount,
  willSend,
  remainingToday,
}: {
  subject: string;
  body: string;
  previewFor: Recipient | null;
  companyName: string;
  selectedCount: number;
  willSend: number;
  remainingToday: number;
}) => {
  // Rendered for a REAL recipient. Showing raw {{customer_name}} at the point
  // of sending is how a broken merge field reaches a customer unnoticed.
  const vars = {
    customer_name: firstName(previewFor?.name ?? ''),
    customer_full_name: previewFor?.name ?? '',
    company_name: companyName,
  };
  const mergedSubject = mergePreview(subject, vars);
  const mergedBody = mergePreview(body, vars);

  // Anything left in braces never got substituted — almost always a typo like
  // {{customer name}} or {{firstname}}, which would otherwise go out verbatim.
  const unresolved = Array.from(
    new Set([...mergedSubject.matchAll(/\{\{[^}]*\}\}/g), ...mergedBody.matchAll(/\{\{[^}]*\}\}/g)].map(
      (m) => m[0]
    ))
  );

  return (
    <div className="space-y-5">
      <div className="rounded-xl border border-white/[0.12] bg-white/[0.05] px-3.5 py-3">
        <p className="text-[13px] font-semibold text-white">
          Going to {willSend} {willSend === 1 ? 'customer' : 'customers'} now
        </p>
        {selectedCount > willSend && (
          <p className="mt-1.5 text-[12px] text-white">
            You picked {selectedCount}, but only {remainingToday} can go today. The rest
            stay unsent — come back tomorrow and pick them again.
          </p>
        )}
      </div>

      {unresolved.length > 0 && (
        <div className="rounded-xl border border-amber-500/30 bg-amber-500/[0.12] px-3.5 py-3">
          <p className="text-[13px] font-semibold text-white">
            Check these before sending
          </p>
          <p className="mt-1 text-[12px] leading-relaxed text-white">
            {unresolved.join(', ')} {unresolved.length === 1 ? "isn't" : "aren't"} a
            detail we can fill in, so {unresolved.length === 1 ? 'it' : 'they'} will go
            out exactly as written.
          </p>
        </div>
      )}

      <div>
        <span className={labelCn}>
          {previewFor ? `How it looks to ${previewFor.name}` : 'Preview'}
        </span>
        <div className="overflow-hidden rounded-xl border border-white/[0.12] bg-white/[0.05]">
          <div className="border-b border-white/[0.1] px-3.5 py-2.5">
            <p className="text-[11px] text-white">From</p>
            <p className="truncate text-[13px] font-medium text-white">{companyName}</p>
          </div>
          <div className="border-b border-white/[0.1] px-3.5 py-2.5">
            <p className="text-[11px] text-white">Subject</p>
            <p className="text-[13.5px] font-semibold text-white">{mergedSubject}</p>
          </div>
          <div className="whitespace-pre-wrap px-3.5 py-3 text-[13.5px] leading-relaxed text-white">
            {mergedBody}
          </div>
          <div className="border-t border-white/[0.1] px-3.5 py-2.5">
            <p className="text-[11px] leading-relaxed text-white">
              You&rsquo;re receiving this because you&rsquo;re a customer of {companyName}.
              <br />
              <span className="underline">Unsubscribe from these emails</span>
            </p>
          </div>
        </div>
        <p className="mt-2 text-[11.5px] text-white">
          Everyone else gets the same message with their own name in it.
        </p>
      </div>
    </div>
  );
};

// ── Result ───────────────────────────────────────────────────────────

const ResultView = ({ result }: { result: CampaignResult }) => {
  // Group the skips so ten "no email address" rows read as one fact.
  const grouped = useMemo(() => {
    const map = new Map<string, string[]>();
    for (const s of [...result.skipped, ...result.failed]) {
      const arr = map.get(s.reason) || [];
      arr.push(s.name);
      map.set(s.reason, arr);
    }
    return Array.from(map.entries());
  }, [result]);

  return (
    <div className="space-y-5">
      <div className="rounded-xl border border-emerald-500/25 bg-emerald-500/[0.1] px-3.5 py-3.5">
        <p className="text-[15px] font-semibold text-white">
          Sent to {result.sent} {result.sent === 1 ? 'customer' : 'customers'}
        </p>
        <p className="mt-1 text-[12.5px] text-white">
          {result.remainingToday > 0
            ? `${result.remainingToday} more you can send today.`
            : "That's your daily limit used up."}
        </p>
      </div>

      {result.message && (
        <p className="text-[13px] text-white">{result.message}</p>
      )}

      {grouped.length > 0 && (
        <div>
          <span className={labelCn}>Not sent</span>
          <div className="space-y-2">
            {grouped.map(([reason, names]) => (
              <div
                key={reason}
                className="rounded-xl border border-white/[0.12] bg-white/[0.05] px-3.5 py-3"
              >
                <p className="text-[13px] font-semibold text-white">
                  {reason} · {names.length}
                </p>
                <p className="mt-1 text-[11.5px] leading-relaxed text-white">
                  {names.slice(0, 6).join(', ')}
                  {names.length > 6 ? ` +${names.length - 6} more` : ''}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
