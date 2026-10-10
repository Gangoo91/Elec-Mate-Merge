import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { FormSheet } from '@/components/forms/FormSheet';
import {
  buttonPrimaryCn,
  buttonSecondaryCn,
  labelCn,
  selectTriggerCn,
  textareaCn,
} from '@/components/forms/fieldStyles';
import { MobileSelectPicker } from '@/components/ui/mobile-select-picker';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { cn } from '@/lib/utils';
import { FilePolicyDraftSheet } from './FilePolicyDraftSheet';
import { keyLabel } from '@/lib/college/labels';

/* ==========================================================================
   AiAuthorPolicySheet — Compliance Phase 5. "Write a policy draft from a
   topic" (ELE-1929). Wide bottom sheet (7 Oct 2026 redesign).
   NOTE (ELE-1926): college_policies has no provenance column, so a policy
   filed from here is not marked AI-drafted in the database.

   Tutor types a policy topic + optional category, AI drafts the doc, the
   tutor reviews and either re-prompts or files it as a v1 draft via the
   existing FilePolicyDraftSheet (which is unchanged). The DSL/Verifier
   then publishes from PolicyDetailPage. Nothing is auto-filed.

   Two-step UI:
     1. Prompt step — topic input + category hint + Generate button
     2. Preview step — read-only markdown preview + "File as draft" + "Re-prompt"
   ========================================================================== */

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** Optional category seed from the calling surface (e.g. tap "Add
      Safeguarding policy" — we pre-select that category). */
  initialCategory?: string;
}

interface Proposal {
  title: string;
  code: string | null;
  category: string;
  owner_role: string;
  requires_acknowledgement: boolean;
  summary: string;
  content_md: string;
}

const CATEGORIES: Array<{ value: string; label: string }> = [
  { value: '', label: 'Let AI choose' },
  { value: 'safeguarding', label: 'Safeguarding' },
  { value: 'prevent', label: 'Prevent' },
  { value: 'edi', label: 'EDI' },
  { value: 'whistleblowing', label: 'Whistleblowing' },
  { value: 'complaints', label: 'Complaints' },
  { value: 'code_of_conduct', label: 'Code of Conduct' },
  { value: 'acceptable_use', label: 'Acceptable Use / IT' },
  { value: 'disciplinary', label: 'Disciplinary' },
  { value: 'health_safety', label: 'Health & Safety' },
  { value: 'gdpr', label: 'GDPR' },
  { value: 'send', label: 'SEND' },
  { value: 'assessment', label: 'Assessment' },
  { value: 'iqa', label: 'IQA' },
  { value: 'appeals', label: 'Appeals' },
  { value: 'rarpa', label: 'RARPA' },
  { value: 'apprenticeship', label: 'Apprenticeship' },
  { value: 'quality', label: 'Quality' },
  { value: 'other', label: 'Other' },
];

export function AiAuthorPolicySheet({ open, onOpenChange, initialCategory }: Props) {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [topic, setTopic] = useState('');
  const [category, setCategory] = useState(initialCategory ?? '');
  const [drafting, setDrafting] = useState(false);
  const [proposal, setProposal] = useState<Proposal | null>(null);
  const [filingOpen, setFilingOpen] = useState(false);

  // Reset on open. We don't auto-clear the topic on close because the
  // tutor may have closed by accident — preserve their input until they
  // commit (file) or explicitly start fresh.
  useEffect(() => {
    if (open) {
      setCategory(initialCategory ?? '');
    } else {
      // Closing the sheet wipes the proposal so the next open starts at
      // the prompt step. But keep `topic` so a re-open keeps their input.
      setProposal(null);
      setDrafting(false);
    }
  }, [open, initialCategory]);

  const handleGenerate = async () => {
    const trimmed = topic.trim();
    if (trimmed.length < 4) {
      toast({
        title: 'Tell me a topic',
        description:
          'A few words about the policy you need (e.g. "lone working", "AI use in assessment").',
      });
      return;
    }
    setDrafting(true);
    try {
      const { data, error: fnErr } = await supabase.functions.invoke('ai-author-policy', {
        body: { topic: trimmed, category: category || undefined },
      });
      if (fnErr) throw new Error(fnErr.message ?? 'request_failed');
      const out = (data ?? {}) as Partial<Proposal> & { error?: string };
      if (out.error) throw new Error(out.error);
      if (!out.title || !out.content_md) {
        throw new Error('AI returned an empty draft');
      }
      setProposal({
        title: out.title,
        code: out.code ?? null,
        category: out.category ?? 'other',
        owner_role: out.owner_role ?? '',
        requires_acknowledgement: out.requires_acknowledgement ?? true,
        summary: out.summary ?? '',
        content_md: out.content_md,
      });
    } catch (e) {
      toast({
        title: 'Could not draft policy',
        description: (e as Error).message,
        variant: 'destructive',
      });
    } finally {
      setDrafting(false);
    }
  };

  const handleStartOver = () => {
    setProposal(null);
  };

  const handleFile = () => {
    // Hand the proposal to FilePolicyDraftSheet. Closing this sheet first
    // avoids a stacked-sheet UX glitch on iOS.
    setFilingOpen(true);
  };

  const topicOk = topic.trim().length >= 4;

  return (
    <>
      <FormSheet
        width="wide"
        bodyClassName={
          proposal
            ? 'grid items-start gap-x-10 gap-y-6 lg:grid-cols-[minmax(0,1fr)_22rem]'
            : 'grid items-start gap-x-10 gap-y-6 lg:grid-cols-2'
        }
        open={open}
        onOpenChange={onOpenChange}
        eyebrow={proposal ? 'AI draft · not yet filed' : 'Policies · AI drafting'}
        title={proposal ? proposal.title : 'Write a policy draft from a topic'}
        description={
          proposal
            ? 'AI wrote this from your topic. Read it, then try again or file it as a draft you edit. Nothing is published until your DSL or verifier publishes it.'
            : 'Type the topic and AI writes a first draft grounded in UK FE statutory frameworks. You review and edit it before filing.'
        }
        footer={
          !proposal ? (
            <div className="grid grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={() => onOpenChange(false)}
                disabled={drafting}
                className={buttonSecondaryCn}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => void handleGenerate()}
                disabled={drafting || !topicOk}
                className={buttonPrimaryCn}
              >
                {drafting ? 'Writing the draft…' : 'Write the draft'}
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-2.5">
              <button type="button" onClick={handleStartOver} className={buttonSecondaryCn}>
                Change the topic
              </button>
              <button type="button" onClick={handleFile} className={buttonPrimaryCn}>
                File as a draft
              </button>
            </div>
          )
        }
      >
        {!proposal ? (
          <>
            <div className="space-y-5">
              <div>
                <label className={labelCn} htmlFor="aap-topic">
                  Topic
                </label>
                <textarea
                  id="aap-topic"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  rows={4}
                  placeholder='e.g. "Lone working policy for evening apprentice tutors", or just "GDPR" or "AI use in assessment"'
                  disabled={drafting}
                  className={cn(textareaCn, 'disabled:opacity-60')}
                />
              </div>
              <div>
                <label className={labelCn} htmlFor="aap-category">
                  Category (optional)
                </label>
                <MobileSelectPicker
                  value={category}
                  onValueChange={setCategory}
                  options={CATEGORIES}
                  title="Category"
                  placeholder="Let AI choose"
                  disabled={drafting}
                  triggerClassName={selectTriggerCn}
                />
              </div>
            </div>
            <div className="border-t border-white/[0.1] pt-4 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
              <h3 className="text-sm font-semibold text-white">What you get</h3>
              <p className="mt-2 text-[13.5px] leading-relaxed text-white">
                An 800 to 2,000 word policy with Purpose and scope, Roles, Procedure, Records and
                Review sections, grounded in UK statutory frameworks (KCSIE, the Prevent duty, UK
                GDPR and so on), with placeholders for your college&apos;s own details.
              </p>
              <p className="mt-3 text-[13.5px] leading-relaxed text-white">
                It is an AI draft, not legal advice. Anything it cannot be sure of is left for you
                to fill, and it does not cite case law. A person reads, edits and publishes every
                policy.
              </p>
            </div>
          </>
        ) : (
          <>
            <article className="prose prose-invert max-w-none rounded-2xl border border-white/[0.08] bg-gradient-to-b from-white/[0.06] to-white/[0.02] px-5 py-5 prose-headings:text-white prose-h1:text-[22px] prose-h2:text-[18px] prose-h3:text-[15.5px] prose-p:text-[14px] prose-p:leading-relaxed prose-p:text-white prose-li:text-[14px] prose-li:text-white prose-strong:text-white sm:px-7">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{proposal.content_md}</ReactMarkdown>
            </article>
            <aside className="space-y-5 lg:sticky lg:top-0">
              <p className="rounded-xl border border-elec-yellow/40 px-3.5 py-3 text-[13px] leading-relaxed text-white">
                <span className="font-semibold">AI draft.</span> Check every section against your
                college&apos;s practice and the statutory guidance before it goes anywhere near
                staff.
              </p>
              {proposal.summary && (
                <div>
                  <h3 className="text-sm font-semibold text-white">Summary</h3>
                  <p className="mt-1.5 text-[13.5px] leading-relaxed text-white">
                    {proposal.summary}
                  </p>
                </div>
              )}
              <dl className="space-y-3 border-t border-white/[0.1] pt-4 text-[13px]">
                <div className="flex items-baseline justify-between gap-3">
                  <dt className="text-white">Category</dt>
                  <dd className="font-medium capitalize text-white">
                    {proposal.category.replace(/_/g, ' ')}
                  </dd>
                </div>
                {proposal.owner_role && (
                  <div className="flex items-baseline justify-between gap-3 border-t border-white/[0.08] pt-3">
                    <dt className="text-white">Owner</dt>
                    <dd className="font-medium text-white">{keyLabel(proposal.owner_role)}</dd>
                  </div>
                )}
                <div className="flex items-baseline justify-between gap-3 border-t border-white/[0.08] pt-3">
                  <dt className="text-white">Staff sign-off</dt>
                  <dd className="font-medium text-white">
                    {proposal.requires_acknowledgement ? 'Required' : 'Not required'}
                  </dd>
                </div>
              </dl>
            </aside>
          </>
        )}
      </FormSheet>

      {/* Filing sheet — receives the proposal as prefill. On successful
          insert we navigate to PolicyDetailPage so the tutor lands
          straight on the markdown editor (matches AddPolicyDialog
          behaviour). The filing sheet closes itself ~800ms after insert,
          then onOpenChange(false) tears down our parent state too. */}
      <FilePolicyDraftSheet
        open={filingOpen}
        onOpenChange={(o) => {
          setFilingOpen(o);
          if (!o) {
            // Reset author state so the next open starts fresh.
            setProposal(null);
            setTopic('');
            onOpenChange(false);
          }
        }}
        prefill={proposal ?? undefined}
        onSubmitted={(insertedId) => {
          if (insertedId) {
            // Navigate to the new policy's detail page — without this
            // the tutor is dumped back at the compliance section with
            // no idea where the AI-drafted policy went.
            navigate(`/college/policies/${insertedId}`);
          }
        }}
      />
    </>
  );
}
