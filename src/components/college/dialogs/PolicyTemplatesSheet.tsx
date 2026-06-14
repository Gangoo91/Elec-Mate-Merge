import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sheet, SheetContent, SheetTitle } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { usePolicyTemplates, type PolicyTemplate } from '@/hooks/usePolicyTemplates';

/* ==========================================================================
   PolicyTemplatesSheet — Compliance Phase 6.

   Browse the platform-shared template catalogue and clone one as a draft
   into your college's policies. Tutor lands on PolicyDetailPage to
   review + publish — the DSL/Verifier still has to sign off.

   Two-pane layout:
     - Left: list of templates with category + Ofsted areas
     - Right: selected template's markdown preview + Clone button

   On mobile, the preview slides over the list.
   ========================================================================== */

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const CATEGORY_LABEL: Record<string, string> = {
  safeguarding: 'Safeguarding',
  prevent: 'Prevent',
  edi: 'EDI',
  whistleblowing: 'Whistleblowing',
  complaints: 'Complaints',
  code_of_conduct: 'Code of Conduct',
  acceptable_use: 'Acceptable Use',
  disciplinary: 'Disciplinary',
  health_safety: 'Health & Safety',
  gdpr: 'GDPR',
  send: 'SEND',
  assessment: 'Assessment',
  iqa: 'IQA',
  appeals: 'Appeals',
  rarpa: 'RARPA',
  apprenticeship: 'Apprenticeship',
  quality: 'Quality',
  other: 'Other',
};

export function PolicyTemplatesSheet({ open, onOpenChange }: Props) {
  const navigate = useNavigate();
  const { items, loading, error, clone, cloning } = usePolicyTemplates();
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const selected: PolicyTemplate | null = items.find((t) => t.id === selectedId) ?? null;

  const handleClone = async (t: PolicyTemplate) => {
    const newId = await clone(t);
    if (newId) {
      onOpenChange(false);
      navigate(`/college/policies/${newId}`);
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent hideCloseButton
        side="right"
        className="w-full sm:max-w-[900px] p-0 bg-[hsl(0_0%_8%)] border-white/[0.06]"
      >
        <SheetTitle className="sr-only">Policy templates library</SheetTitle>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="px-5 py-4 border-b border-white/[0.06]">
            <div className="flex items-center justify-between gap-3">
              <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-elec-yellow">
                Templates library
              </div>
              <button
                onClick={() => onOpenChange(false)}
                className="text-[12px] font-medium text-white/65 hover:text-white touch-manipulation"
              >
                Close
              </button>
            </div>
            <h2 className="mt-2 text-[20px] font-semibold text-white tracking-tight">
              Start from a template
            </h2>
            <p className="mt-1 text-[12.5px] text-white/85 leading-snug max-w-prose">
              Platform-shared scaffolds grounded in UK FE statutory frameworks. Cloning lands the
              markdown as a v1 draft in your college; review and publish when ready. Templates are
              starters, not legal advice — the DSL still has to sign off.
            </p>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-hidden flex flex-col md:flex-row min-h-0">
            {/* List */}
            <div
              className={cn(
                'border-b md:border-b-0 md:border-r border-white/[0.06] overflow-y-auto',
                'md:w-[42%] md:flex-shrink-0',
                selected ? 'hidden md:block' : 'block'
              )}
            >
              {loading ? (
                <div className="p-6 text-[13px] text-white/65">Loading templates…</div>
              ) : error ? (
                <div className="p-6 text-[13px] text-rose-200">{error}</div>
              ) : items.length === 0 ? (
                <div className="p-6 text-[13px] text-white/65">
                  No templates available yet. Apply the <code>policy_templates</code> migration to
                  seed the catalogue.
                </div>
              ) : (
                <ul className="divide-y divide-white/[0.06]">
                  {items.map((t) => {
                    const active = t.id === selectedId;
                    return (
                      <li key={t.id}>
                        <button
                          type="button"
                          onClick={() => setSelectedId(t.id)}
                          className={cn(
                            'w-full text-left px-5 py-4 hover:bg-white/[0.02] transition-colors touch-manipulation',
                            active && 'bg-white/[0.04]'
                          )}
                        >
                          <div className="flex items-baseline justify-between gap-3">
                            <div className="text-[14px] font-semibold text-white leading-snug">
                              {t.title}
                            </div>
                            <span className="shrink-0 inline-flex h-5 px-1.5 items-center rounded-md border border-white/[0.10] text-[10px] font-semibold uppercase tracking-[0.14em] text-white/85">
                              {CATEGORY_LABEL[t.category] ?? t.category}
                            </span>
                          </div>
                          <p className="mt-1 text-[12px] text-white/85 leading-snug line-clamp-2">
                            {t.summary}
                          </p>
                          {t.ofsted_areas.length > 0 && (
                            <div className="mt-1.5 flex items-center gap-1 flex-wrap">
                              {t.ofsted_areas.slice(0, 3).map((o) => (
                                <span
                                  key={o}
                                  className="inline-flex h-4 px-1.5 items-center rounded text-[9.5px] font-medium uppercase tracking-[0.10em] text-elec-yellow/85"
                                  title="Ofsted EIF judgement area this template addresses"
                                >
                                  {o}
                                </span>
                              ))}
                            </div>
                          )}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>

            {/* Preview */}
            <div
              className={cn(
                'flex-1 overflow-y-auto min-h-0',
                selected ? 'block' : 'hidden md:block'
              )}
            >
              {!selected ? (
                <div className="p-8 text-center text-[13px] text-white/65">
                  Tap a template to preview it, then clone it as a draft.
                </div>
              ) : (
                <div className="p-5 space-y-4">
                  {/* Mobile back-to-list */}
                  <button
                    type="button"
                    onClick={() => setSelectedId(null)}
                    className="md:hidden text-[12px] font-medium text-white/85 hover:text-white touch-manipulation"
                  >
                    ← Back to list
                  </button>

                  {/* Meta block */}
                  <div className="rounded-lg border border-white/[0.10] bg-white/[0.02] p-3">
                    <div className="text-[16px] font-semibold text-white leading-snug">
                      {selected.title}
                    </div>
                    <p className="mt-1 text-[12.5px] text-white/85 leading-snug">
                      {selected.summary}
                    </p>
                    <div className="mt-2.5 flex items-center gap-1.5 flex-wrap text-[10.5px]">
                      <span className="inline-flex h-5 px-1.5 items-center rounded-md border border-white/[0.10] text-white/85">
                        {CATEGORY_LABEL[selected.category] ?? selected.category}
                      </span>
                      {selected.suggested_owner_role && (
                        <span className="inline-flex h-5 px-1.5 items-center rounded-md border border-elec-yellow/30 bg-elec-yellow/[0.06] text-elec-yellow">
                          Owner: {selected.suggested_owner_role}
                        </span>
                      )}
                      {selected.requires_acknowledgement && (
                        <span className="inline-flex h-5 px-1.5 items-center rounded-md border border-amber-400/30 bg-amber-500/[0.06] text-amber-200">
                          Sign-off required
                        </span>
                      )}
                    </div>
                    {selected.framework_citations.length > 0 && (
                      <div className="mt-2.5">
                        <div className="text-[9.5px] font-semibold uppercase tracking-[0.14em] text-white/70">
                          Grounded in
                        </div>
                        <ul className="mt-1 text-[11.5px] text-white/85 leading-snug list-disc list-inside">
                          {selected.framework_citations.map((c) => (
                            <li key={c}>{c}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  {/* Markdown preview — pre-formatted to preserve scaffold
                      structure. Real markdown rendering is the policy
                      detail page's job. */}
                  <pre className="rounded-lg border border-white/[0.06] bg-[hsl(0_0%_5%)] p-4 text-[12px] text-white/95 leading-relaxed overflow-x-auto whitespace-pre-wrap font-sans">
                    {selected.content_md}
                  </pre>

                  {/* Clone CTA */}
                  <div className="sticky bottom-0 -mx-5 px-5 py-3 bg-[hsl(0_0%_8%)] border-t border-white/[0.06] flex items-center gap-2">
                    <p className="text-[10.5px] text-white/65 leading-snug flex-1">
                      Cloning saves a draft you can edit. Nothing is published until your DSL or
                      Verifier signs off.
                    </p>
                    <button
                      type="button"
                      onClick={() => void handleClone(selected)}
                      disabled={cloning === selected.id}
                      className={cn(
                        'shrink-0 h-10 px-4 rounded-lg text-[12.5px] font-semibold transition-colors touch-manipulation',
                        cloning === selected.id
                          ? 'bg-elec-yellow/40 text-black/70'
                          : 'bg-elec-yellow text-black hover:bg-elec-yellow/90'
                      )}
                    >
                      {cloning === selected.id ? 'Cloning…' : 'Clone as draft →'}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
