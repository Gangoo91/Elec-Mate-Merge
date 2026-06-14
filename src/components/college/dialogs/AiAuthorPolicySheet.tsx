import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles } from 'lucide-react';
import { Sheet, SheetContent, SheetTitle } from '@/components/ui/sheet';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { cn } from '@/lib/utils';
import { FilePolicyDraftSheet } from './FilePolicyDraftSheet';

/* ==========================================================================
   AiAuthorPolicySheet — Compliance Phase 5.

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

  return (
    <>
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent
          side="right"
          className="w-full sm:max-w-[600px] p-0 bg-[hsl(0_0%_8%)] border-white/[0.06]"
        >
          <SheetTitle className="sr-only">Draft a policy with AI</SheetTitle>
          <div className="flex flex-col h-full">
            {/* Header */}
            <div className="px-5 py-4 border-b border-white/[0.06]">
              <div className="flex items-center justify-between gap-3">
                <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-elec-yellow">
                  AI policy author
                </div>
                <button
                  onClick={() => onOpenChange(false)}
                  className="text-[12px] font-medium text-white/65 hover:text-white touch-manipulation"
                >
                  Close
                </button>
              </div>
              <h2 className="mt-2 text-[20px] font-semibold text-white tracking-tight">
                {proposal ? proposal.title : 'Draft a policy from a topic'}
              </h2>
              <p className="mt-1 text-[12.5px] text-white/85 leading-snug">
                {proposal
                  ? 'Review the draft below. Re-prompt or file as a draft — the DSL still has to publish.'
                  : 'Type the topic, AI drafts it grounded in UK FE statutory frameworks. You review and edit before filing.'}
              </p>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
              {!proposal ? (
                /* PROMPT STEP */
                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-[11.5px] font-medium uppercase tracking-[0.16em] text-white/85">
                      Topic
                    </label>
                    <textarea
                      value={topic}
                      onChange={(e) => setTopic(e.target.value)}
                      rows={3}
                      placeholder='e.g. "Lone working policy for evening apprentice tutors" — or just "GDPR" / "AI use in assessment"'
                      disabled={drafting}
                      className="w-full px-3 py-2 rounded-lg bg-white/[0.03] border border-white/[0.10] text-[13px] text-white placeholder:text-white/45 focus:outline-none focus:border-elec-yellow/50 focus:ring-1 focus:ring-elec-yellow/25 touch-manipulation resize-none disabled:opacity-60"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[11.5px] font-medium uppercase tracking-[0.16em] text-white/85">
                      Category hint (optional)
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      disabled={drafting}
                      className="w-full h-10 px-3 rounded-lg bg-white/[0.03] border border-white/[0.10] text-[13px] text-white focus:outline-none focus:border-elec-yellow/50 touch-manipulation disabled:opacity-60"
                    >
                      {CATEGORIES.map((c) => (
                        <option key={c.value} value={c.value}>
                          {c.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="rounded-lg border border-elec-yellow/15 bg-elec-yellow/[0.04] p-3">
                    <div className="text-[10.5px] font-semibold uppercase tracking-[0.16em] text-elec-yellow">
                      What you'll get
                    </div>
                    <p className="mt-1 text-[12px] text-white/85 leading-snug">
                      A 800–2000 word markdown policy with Purpose &amp; Scope, Roles, Procedure,
                      Records, and Review sections. Grounded in UK statutory frameworks (KCSIE,
                      Prevent duty, UK GDPR, etc). Placeholders for college-specific details. AI
                      doesn't fabricate case law — anything it can't be sure of is left for you to
                      fill.
                    </p>
                  </div>
                </div>
              ) : (
                /* PREVIEW STEP */
                <div className="space-y-4">
                  <div className="rounded-lg border border-white/[0.10] bg-white/[0.02] p-3 space-y-1.5">
                    <div className="flex items-baseline justify-between gap-3 flex-wrap">
                      <div className="text-[10.5px] font-semibold uppercase tracking-[0.16em] text-white/85">
                        Proposal
                      </div>
                      <div className="flex items-center gap-2 flex-wrap text-[10.5px]">
                        <span className="inline-flex h-5 px-1.5 items-center rounded-md border border-white/[0.10] text-white/85 capitalize">
                          {proposal.category.replace(/_/g, ' ')}
                        </span>
                        {proposal.owner_role && (
                          <span className="inline-flex h-5 px-1.5 items-center rounded-md border border-elec-yellow/30 bg-elec-yellow/[0.06] text-elec-yellow">
                            {proposal.owner_role}
                          </span>
                        )}
                        {proposal.requires_acknowledgement && (
                          <span className="inline-flex h-5 px-1.5 items-center rounded-md border border-amber-400/30 bg-amber-500/[0.06] text-amber-200">
                            Sign-off required
                          </span>
                        )}
                      </div>
                    </div>
                    {proposal.summary && (
                      <p className="text-[12.5px] text-white leading-snug">{proposal.summary}</p>
                    )}
                  </div>
                  <pre className="rounded-lg border border-white/[0.06] bg-[hsl(0_0%_5%)] p-4 text-[12px] text-white/95 leading-relaxed overflow-x-auto whitespace-pre-wrap font-sans">
                    {proposal.content_md}
                  </pre>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="px-5 py-4 border-t border-white/[0.06] flex items-center gap-2">
              {!proposal ? (
                <>
                  <button
                    type="button"
                    onClick={() => onOpenChange(false)}
                    disabled={drafting}
                    className="h-10 px-4 rounded-lg border border-white/[0.10] bg-white/[0.02] text-[12.5px] font-medium text-white/95 hover:text-white hover:border-white/[0.22] transition-colors touch-manipulation disabled:opacity-50"
                  >
                    Cancel
                  </button>
                  <div className="flex-grow" />
                  <button
                    type="button"
                    onClick={() => void handleGenerate()}
                    disabled={drafting || topic.trim().length < 4}
                    className={cn(
                      'inline-flex items-center gap-1.5 h-10 px-4 rounded-lg text-[12.5px] font-semibold transition-colors touch-manipulation',
                      drafting
                        ? 'bg-elec-yellow/40 text-black/70'
                        : topic.trim().length < 4
                          ? 'bg-white/[0.05] text-white/70'
                          : 'bg-elec-yellow text-black hover:bg-elec-yellow/90'
                    )}
                  >
                    <Sparkles className="h-3.5 w-3.5" />
                    {drafting ? 'Drafting…' : 'Generate draft'}
                  </button>
                </>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={handleStartOver}
                    className="h-10 px-4 rounded-lg border border-white/[0.10] bg-white/[0.02] text-[12.5px] font-medium text-white/95 hover:text-white hover:border-white/[0.22] transition-colors touch-manipulation"
                  >
                    Re-prompt
                  </button>
                  <div className="flex-grow" />
                  <button
                    type="button"
                    onClick={handleFile}
                    className="h-10 px-4 rounded-lg bg-elec-yellow text-black text-[12.5px] font-semibold hover:bg-elec-yellow/90 transition-colors touch-manipulation"
                  >
                    File as draft →
                  </button>
                </>
              )}
            </div>
          </div>
        </SheetContent>
      </Sheet>

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
