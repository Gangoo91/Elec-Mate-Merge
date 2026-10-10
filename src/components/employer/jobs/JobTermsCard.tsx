/**
 * Customer terms on a firm job (ELE-1982), on the job sheet's Planning panel.
 *
 * The firm's terms (Contracts → Customer terms) print on every quote. Here the
 * office can give one job its own terms: extra clauses on top of the firm's,
 * or a set that replaces them for this job. The job's quote PDF and the
 * customer's accept page print the result (server: _effective_quote_terms).
 * Owners and admins edit; everyone else in the firm can read them.
 */
import { useEffect, useMemo, useState } from 'react';
import { Check, FileText, Loader2, Plus, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';
import { PlanRow, planBtn } from '@/components/employer/jobs/PlanRow';
import { FormSheet } from '@/components/forms/FormSheet';
import { buttonPrimaryCn, buttonSecondaryCn } from '@/components/forms/fieldStyles';
import { buildTermsList } from '@/utils/quoteTerms';
import {
  useJobCustomerTerms,
  useSetJobCustomerTerms,
  type JobTermsMode,
} from '@/hooks/useJobCustomerTerms';
import { JOB_TERMS_TEMPLATES } from '@/components/employer/jobs/jobTermsTemplates';

const inputCn =
  'input-underline h-11 w-full rounded-none border-0 border-b border-white/[0.15] ' +
  'bg-transparent px-1 text-base font-medium text-white placeholder:text-white/25 ' +
  'caret-elec-yellow transition-colors hover:border-white/[0.3] focus:border-elec-yellow ' +
  'focus-visible:ring-0 focus:ring-0 focus:outline-none [color-scheme:dark] touch-manipulation';

const chipOn = 'border-elec-yellow bg-elec-yellow text-black font-semibold';
const chipOff = 'border-white/[0.12] bg-white/[0.06] text-white font-medium';

const MODES: Array<{ id: JobTermsMode; label: string; hint: string }> = [
  {
    id: 'add',
    label: 'Add to our terms',
    hint: 'Your firm terms print first, then these.',
  },
  {
    id: 'replace',
    label: 'Use instead of our terms',
    hint: 'Only these print on this job. Useful when a main contractor has its own.',
  },
];

export function JobTermsCard({ jobId }: { jobId: string }) {
  const { data, isLoading, error } = useJobCustomerTerms(jobId);
  const save = useSetJobCustomerTerms();
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<JobTermsMode>('add');
  const [terms, setTerms] = useState<string[]>([]);
  const [keys, setKeys] = useState<string[]>([]);
  const [draft, setDraft] = useState('');

  const firmTerms = useMemo(() => buildTermsList(data?.firm_terms ?? null), [data?.firm_terms]);

  useEffect(() => {
    if (!open || !data) return;
    setMode(data.mode ?? 'add');
    setTerms(data.terms);
    setKeys(data.template_keys);
    setDraft('');
    // Only when the sheet opens.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  if (isLoading || error || !data || data.error) return null;

  const canEdit = data.can_edit;
  const jobCount = data.terms.length;
  const printed =
    data.has_job_terms && data.mode === 'replace'
      ? jobCount
      : firmTerms.length + (data.has_job_terms ? jobCount : 0);

  const status = !data.has_job_terms
    ? `Your firm terms (${firmTerms.length})`
    : data.mode === 'replace'
      ? `This job's own terms (${jobCount}), instead of your firm terms`
      : `Your firm terms plus ${jobCount} for this job`;

  const quotesLine =
    data.quote_count > 0
      ? `They print on this job's ${data.quote_count === 1 ? 'quote' : `${data.quote_count} quotes`} and the customer's accept page.`
      : "They print on this job's quotes and the customer's accept page.";

  // ----- editing
  const templateOn = (key: string) => keys.includes(key);
  const toggleTemplate = (key: string, text: string) => {
    if (templateOn(key)) {
      setKeys((k) => k.filter((x) => x !== key));
      setTerms((t) => t.filter((x) => x !== text));
    } else {
      setKeys((k) => [...k, key]);
      setTerms((t) => (t.includes(text) ? t : [...t, text]));
    }
  };
  const addDraft = () => {
    const v = draft.trim();
    if (!v) return;
    setTerms((t) => [...t, v.slice(0, 600)]);
    setDraft('');
  };
  const removeAt = (i: number) => {
    const text = terms[i];
    setTerms((t) => t.filter((_, n) => n !== i));
    const tpl = JOB_TERMS_TEMPLATES.find((x) => x.text === text);
    if (tpl) setKeys((k) => k.filter((x) => x !== tpl.key));
  };

  const persist = async (next: { mode: JobTermsMode; terms: string[]; keys: string[] }) => {
    try {
      await save.mutateAsync({
        jobId,
        mode: next.mode,
        terms: next.terms,
        templateKeys: next.keys,
      });
      toast({
        title: next.terms.length ? 'Terms saved for this job' : 'Back to your firm terms',
        description: "This job's quotes and accept page now print them.",
      });
      setOpen(false);
    } catch (e) {
      toast({
        title: 'Not saved',
        description: e instanceof Error ? e.message : 'Please try again.',
        variant: 'destructive',
      });
    }
  };

  const preview = mode === 'replace' ? terms : [...firmTerms, ...terms];

  return (
    <>
      <PlanRow
        icon={FileText}
        tone={data.has_job_terms ? 'ok' : 'neutral'}
        title="Customer terms"
        status={status}
        detail={
          <>
            <p>{quotesLine}</p>
            {!canEdit && <p>Owners and admins can change them.</p>}
          </>
        }
        actions={
          <button type="button" className={planBtn} onClick={() => setOpen(true)}>
            {!canEdit ? 'See terms' : data.has_job_terms ? 'Edit terms' : 'Terms for this job'}
          </button>
        }
      />

      <FormSheet
        open={open}
        onOpenChange={setOpen}
        width="wide"
        title="Customer terms for this job"
        description={
          canEdit
            ? 'Your firm terms are the default. Add clauses for this job, or use a different set.'
            : `What this job's quotes print. ${printed} terms.`
        }
        footer={
          canEdit ? (
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                className={cn(buttonSecondaryCn, 'h-12 flex-1 sm:min-w-[120px] sm:flex-none')}
                onClick={() => setOpen(false)}
              >
                Cancel
              </button>
              {data.has_job_terms && (
                <button
                  type="button"
                  disabled={save.isPending}
                  className={cn(buttonSecondaryCn, 'h-12 flex-1 sm:flex-none')}
                  onClick={() => persist({ mode: 'add', terms: [], keys: [] })}
                >
                  Use firm terms only
                </button>
              )}
              <button
                type="button"
                disabled={save.isPending || terms.length === 0}
                className={cn(buttonPrimaryCn, 'h-12 flex-1 sm:min-w-[180px] sm:flex-none')}
                onClick={() => persist({ mode, terms, keys })}
              >
                {save.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {terms.length === 0
                  ? 'Add a term to save'
                  : `Save ${terms.length} ${terms.length === 1 ? 'term' : 'terms'}`}
              </button>
            </div>
          ) : (
            <button
              type="button"
              className={cn(buttonSecondaryCn, 'h-12 w-full sm:w-auto sm:min-w-[120px]')}
              onClick={() => setOpen(false)}
            >
              Close
            </button>
          )
        }
      >
        {!canEdit ? (
          <TermsList
            items={
              data.has_job_terms
                ? data.mode === 'replace'
                  ? data.terms
                  : [...firmTerms, ...data.terms]
                : firmTerms
            }
          />
        ) : (
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:gap-8">
            <div className="min-w-0 space-y-6">
              <section>
                <h3 className="mb-2 text-[15px] font-semibold tracking-tight text-white">
                  How they apply
                </h3>
                <div className="grid gap-2 sm:grid-cols-2">
                  {MODES.map((m) => (
                    <button
                      key={m.id}
                      type="button"
                      aria-pressed={mode === m.id}
                      onClick={() => setMode(m.id)}
                      className={cn(
                        'h-11 rounded-xl border px-3 text-[13.5px] touch-manipulation',
                        mode === m.id ? chipOn : chipOff
                      )}
                    >
                      {m.label}
                    </button>
                  ))}
                </div>
                <p className="mt-2 text-[12.5px] text-white">
                  {MODES.find((m) => m.id === mode)?.hint}
                </p>
              </section>

              <section>
                <h3 className="mb-2 text-[15px] font-semibold tracking-tight text-white">
                  Terms for this job
                </h3>
                {terms.length === 0 ? (
                  <p className="text-[13.5px] text-white">
                    None yet. Pick a clause on the right or write your own.
                  </p>
                ) : (
                  <ol className="divide-y divide-white/[0.07] overflow-hidden rounded-2xl border border-white/[0.1] bg-white/[0.04]">
                    {terms.map((t, i) => (
                      <li
                        key={`${i}-${t.slice(0, 12)}`}
                        className="flex items-start gap-2 py-1 pl-4 pr-1"
                      >
                        <span className="w-5 shrink-0 pt-3 text-right text-[13px] font-semibold tabular-nums text-white">
                          {i + 1}.
                        </span>
                        <textarea
                          value={t}
                          rows={Math.min(6, Math.max(1, Math.ceil(t.length / 55)))}
                          onChange={(e) =>
                            setTerms((list) =>
                              list.map((x, n) => (n === i ? e.target.value.slice(0, 600) : x))
                            )
                          }
                          aria-label={`Term ${i + 1}`}
                          className="min-h-[44px] flex-1 resize-none [field-sizing:content] bg-transparent px-1 py-2.5 text-[14px] leading-snug text-white caret-elec-yellow focus:outline-none touch-manipulation"
                        />
                        <button
                          type="button"
                          aria-label={`Remove term ${i + 1}`}
                          onClick={() => removeAt(i)}
                          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-white touch-manipulation hover:bg-white/[0.06]"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </li>
                    ))}
                  </ol>
                )}
                <div className="mt-3 flex items-end gap-2">
                  <input
                    value={draft}
                    onChange={(e) => setDraft(e.target.value.slice(0, 600))}
                    onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addDraft())}
                    placeholder="Write a term of your own"
                    className={inputCn}
                  />
                  <button
                    type="button"
                    onClick={addDraft}
                    disabled={!draft.trim()}
                    aria-label="Add term"
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-elec-yellow text-black touch-manipulation disabled:bg-white/[0.08] disabled:text-white"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </section>

              <section>
                <h3 className="mb-2 text-[15px] font-semibold tracking-tight text-white">
                  What the customer sees ({preview.length})
                </h3>
                <TermsList items={preview} />
              </section>
            </div>

            <section className="min-w-0">
              <h3 className="text-[15px] font-semibold tracking-tight text-white">
                Clauses for commercial work
              </h3>
              <p className="mb-3 mt-1 text-[12.5px] leading-snug text-white">
                Plain-English starting points. They are not a JCT contract or legal advice, so read
                them and edit them to suit the job.
              </p>
              <div className="space-y-2">
                {JOB_TERMS_TEMPLATES.map((tpl) => {
                  const on = templateOn(tpl.key);
                  return (
                    <button
                      key={tpl.key}
                      type="button"
                      aria-pressed={on}
                      onClick={() => toggleTemplate(tpl.key, tpl.text)}
                      className={cn(
                        'flex min-h-[48px] w-full items-start gap-3 rounded-xl border p-3 text-left touch-manipulation',
                        on
                          ? 'border-elec-yellow bg-white/[0.06]'
                          : 'border-white/[0.1] bg-white/[0.04] hover:bg-white/[0.07]'
                      )}
                    >
                      <span
                        aria-hidden
                        className={cn(
                          'mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border-2',
                          on ? 'border-elec-yellow bg-elec-yellow' : 'border-white/30'
                        )}
                      >
                        {on && <Check className="h-3 w-3 text-black" />}
                      </span>
                      <span className="min-w-0">
                        <span className="block text-[14px] font-semibold text-white">
                          {tpl.title}
                        </span>
                        <span className="mt-0.5 block text-[13px] leading-snug text-white">
                          {sentence(tpl.text.replace(/^[^:]+:\s*/, ''))}
                        </span>
                      </span>
                    </button>
                  );
                })}
              </div>
            </section>
          </div>
        )}
      </FormSheet>
    </>
  );
}

/** "any change…" → "Any change…" once the clause name is dropped. */
const sentence = (t: string) => t.charAt(0).toUpperCase() + t.slice(1);

function TermsList({ items }: { items: string[] }) {
  if (items.length === 0) {
    return <p className="text-[13.5px] text-white">No terms.</p>;
  }
  return (
    <ol className="grid gap-x-8 gap-y-2 md:grid-cols-2">
      {items.map((t, i) => (
        <li key={i} className="flex gap-2.5 text-[13.5px] leading-snug text-white">
          <span className="w-5 shrink-0 text-right font-semibold tabular-nums">{i + 1}.</span>
          <span>{t}</span>
        </li>
      ))}
    </ol>
  );
}

export default JobTermsCard;
