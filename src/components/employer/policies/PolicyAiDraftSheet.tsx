/**
 * Draft a company policy with AI (ELE-1946).
 *
 * The College Hub's AI policy author, reused as an approach: one topic in, a
 * structured draft out, never filed until someone reads it. It calls the
 * firm's own drafting function (ai-author-firm-policy), which writes for an
 * electrical contractor under UK health, safety and employment law.
 */
import { useState } from 'react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { FormSheet } from '@/components/forms/FormSheet';
import { policyProseClass, sanitizePolicyHtml } from '@/utils/policyHtml';
import { useCreatePolicy, type UserPolicy } from '@/hooks/usePolicies';
import { cn } from '@/lib/utils';

const IDEAS = [
  'Health and safety',
  'Safe isolation and working dead',
  'Working at height',
  'Lone working',
  'Drugs and alcohol',
  'Company vehicles and driving',
  'Asbestos awareness',
  'Data protection for customer details',
];

interface Draft {
  title: string;
  summary: string;
  category: string;
  content_html: string;
}

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** The saved draft, so the page can open it. */
  onCreated: (policy: UserPolicy) => void;
}

const inputCn =
  'input-underline h-11 w-full rounded-none border-0 border-b border-white/[0.15] bg-transparent px-1 text-base font-medium text-white placeholder:text-white/25 caret-elec-yellow transition-colors hover:border-white/[0.3] focus:border-elec-yellow focus-visible:ring-0 focus:ring-0 focus:outline-none touch-manipulation';

export function PolicyAiDraftSheet({ open, onOpenChange, onCreated }: Props) {
  const [topic, setTopic] = useState('');
  const [drafting, setDrafting] = useState(false);
  const [draft, setDraft] = useState<Draft | null>(null);
  const create = useCreatePolicy();

  const reset = () => {
    setTopic('');
    setDraft(null);
  };

  const run = async () => {
    const t = topic.trim();
    if (t.length < 4) return;
    setDrafting(true);
    try {
      let companyName: string | undefined;
      try {
        const { data } = await supabase.rpc('get_my_company_profile');
        const profile = Array.isArray(data) ? data[0] : data;
        companyName = (profile as { company_name?: string } | null)?.company_name || undefined;
      } catch {
        /* the draft uses a placeholder instead */
      }
      const { data, error } = await supabase.functions.invoke('ai-author-firm-policy', {
        body: { topic: t, company_name: companyName },
      });
      if (error) throw error;
      const d = data as Partial<Draft> & { error?: string };
      if (d?.error || !d?.content_html) throw new Error(d?.error || 'No draft came back.');
      setDraft({
        title: d.title || t,
        summary: d.summary || '',
        category: d.category || 'Safety',
        content_html: d.content_html,
      });
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'Could not draft it. Try again.');
    } finally {
      setDrafting(false);
    }
  };

  const save = async () => {
    if (!draft) return;
    try {
      const policy = await create.mutateAsync({
        name: draft.title,
        content: draft.content_html,
        category: draft.category,
        ai_generated: true,
      });
      toast.success('Saved as a draft. Read it through, then publish it to the team.');
      onOpenChange(false);
      reset();
      onCreated(policy);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'Could not save the draft.');
    }
  };

  return (
    <FormSheet
      open={open}
      onOpenChange={(o) => {
        onOpenChange(o);
        if (!o) reset();
      }}
      eyebrow="Policies"
      title={draft ? draft.title : 'Draft a policy with AI'}
      description={
        draft
          ? 'A starting point. Fill in the parts in square brackets and check it says what your firm does.'
          : 'Say what the policy is about. You read and edit the draft before anyone sees it.'
      }
      width="wide"
      footer={
        draft ? (
          <div className="flex flex-col-reverse gap-2 sm:flex-row">
            <button
              type="button"
              onClick={() => setDraft(null)}
              className="h-11 rounded-full border border-white/[0.14] bg-white/[0.06] px-5 text-[14px] font-semibold text-white touch-manipulation"
            >
              Start again
            </button>
            <button
              type="button"
              disabled={create.isPending}
              onClick={save}
              className="h-11 rounded-full sm:flex-1 bg-elec-yellow px-5 text-[14px] font-semibold text-black touch-manipulation disabled:opacity-50"
            >
              {create.isPending ? 'Saving…' : 'Save as draft'}
            </button>
          </div>
        ) : (
          <button
            type="button"
            disabled={drafting || topic.trim().length < 4}
            onClick={run}
            className="h-11 w-full rounded-full bg-elec-yellow px-5 text-[14px] font-semibold text-black touch-manipulation disabled:opacity-50"
          >
            {drafting ? 'Drafting… this takes about half a minute' : 'Draft it'}
          </button>
        )
      }
    >
      {!draft ? (
        <div className="space-y-5">
          <div className="space-y-1">
            <label htmlFor="policy-topic" className="block text-[12px] font-medium text-white">
              What is the policy about?
            </label>
            <input
              id="policy-topic"
              value={topic}
              maxLength={200}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g. Working at height on domestic jobs"
              className={inputCn}
            />
          </div>
          <div className="space-y-2">
            <p className="text-[12px] font-medium text-white">Or start from one of these</p>
            <div className="flex flex-wrap gap-2">
              {IDEAS.map((i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setTopic(i)}
                  className={cn(
                    'h-11 rounded-full border px-4 text-[13.5px] touch-manipulation',
                    topic === i
                      ? 'border-elec-yellow bg-elec-yellow font-semibold text-black'
                      : 'border-white/[0.12] bg-white/[0.06] font-medium text-white'
                  )}
                >
                  {i}
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {draft.summary && <p className="text-[14px] text-white">{draft.summary}</p>}
          <div
            className={policyProseClass}
            dangerouslySetInnerHTML={{ __html: sanitizePolicyHtml(draft.content_html) }}
          />
        </div>
      )}
    </FormSheet>
  );
}

export default PolicyAiDraftSheet;
