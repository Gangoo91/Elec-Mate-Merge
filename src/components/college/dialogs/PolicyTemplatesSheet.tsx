import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormSheet } from '@/components/forms/FormSheet';
import { buttonPrimaryCn, buttonSecondaryCn } from '@/components/forms/fieldStyles';
import { cn } from '@/lib/utils';
import { usePolicyTemplates, type PolicyTemplate } from '@/hooks/usePolicyTemplates';

/* ==========================================================================
   PolicyTemplatesSheet — Compliance Phase 6.

   Browse the platform-shared template catalogue and clone one as a draft
   into your college's policies. Tutor lands on PolicyDetailPage to
   review + publish — the DSL/Verifier still has to sign off.

   Wide FormSheet (7 Oct redesign): on desktop the list sits left and the
   selected template's preview right; on a phone the preview replaces the
   list, with a "Back to list" link. Clone lives in the footer.
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
  code_of_conduct: 'Code of conduct',
  acceptable_use: 'Acceptable use',
  disciplinary: 'Disciplinary',
  health_safety: 'Health and safety',
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

  useEffect(() => {
    if (!open) setSelectedId(null);
  }, [open]);

  const selected: PolicyTemplate | null = items.find((t) => t.id === selectedId) ?? null;

  const handleClone = async (t: PolicyTemplate) => {
    const newId = await clone(t);
    if (newId) {
      onOpenChange(false);
      navigate(`/college/policies/${newId}`);
    }
  };

  const isCloning = !!selected && cloning === selected.id;

  return (
    <FormSheet
      open={open}
      onOpenChange={onOpenChange}
      width="wide"
      eyebrow="Templates library"
      title="Start from a template"
      description="Starting points written against UK FE statutory frameworks. Cloning saves the template as a version 1 draft in your college to review and publish when ready. Templates are starters, not legal advice; your DSL still has to sign off."
      bodyClassName="grid items-start gap-x-10 gap-y-6 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]"
      footer={
        <div className="grid grid-cols-2 gap-2.5">
          <button type="button" onClick={() => onOpenChange(false)} className={buttonSecondaryCn}>
            Close
          </button>
          <button
            type="button"
            onClick={() => selected && void handleClone(selected)}
            disabled={!selected || isCloning}
            className={buttonPrimaryCn}
          >
            {isCloning ? 'Cloning…' : selected ? 'Clone as draft' : 'Pick a template'}
          </button>
        </div>
      }
    >
      {/* List */}
      <div className={cn('min-w-0', selected ? 'hidden lg:block' : 'block')}>
        <h3 className="text-[15px] font-semibold text-white">Templates</h3>
        {loading ? (
          <p className="mt-3 text-[13px] text-white">Loading templates…</p>
        ) : error ? (
          <p className="mt-3 text-[13px] text-rose-300">{error}</p>
        ) : items.length === 0 ? (
          <p className="mt-3 text-[13px] leading-relaxed text-white">
            No templates available yet. Apply the <code>policy_templates</code> migration to seed the catalogue.
          </p>
        ) : (
          <ul className="mt-2 divide-y divide-white/[0.08] border-y border-white/[0.08]">
            {items.map((t) => {
              const active = t.id === selectedId;
              return (
                <li key={t.id}>
                  <button
                    type="button"
                    onClick={() => setSelectedId(t.id)}
                    aria-pressed={active}
                    className={cn(
                      'relative w-full px-1 py-3.5 text-left transition-colors touch-manipulation hover:bg-white/[0.03]',
                      active && 'bg-white/[0.05]'
                    )}
                  >
                    {active && <span className="absolute inset-y-2 left-0 w-0.5 rounded-full bg-elec-yellow" aria-hidden />}
                    <div className="flex items-baseline justify-between gap-3 pl-2">
                      <span className="text-[14px] font-semibold leading-snug text-white">{t.title}</span>
                      <span className="shrink-0 text-[11.5px] font-medium text-white">
                        {CATEGORY_LABEL[t.category] ?? t.category}
                      </span>
                    </div>
                    <p className="mt-1 line-clamp-2 pl-2 text-[12.5px] leading-snug text-white">{t.summary}</p>
                    {t.ofsted_areas.length > 0 && (
                      <p className="mt-1 pl-2 text-[11.5px] text-white" title="Ofsted EIF judgement areas this template addresses">
                        Ofsted: {t.ofsted_areas.slice(0, 3).join(' · ')}
                      </p>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      {/* Preview */}
      <div className={cn('min-w-0', selected ? 'block' : 'hidden lg:block')}>
        {!selected ? (
          <div className="rounded-2xl border border-dashed border-white/[0.12] px-6 py-12 text-center text-[13px] text-white">
            Pick a template to preview it, then clone it as a draft.
          </div>
        ) : (
          <div className="space-y-5">
            <button
              type="button"
              onClick={() => setSelectedId(null)}
              className="inline-flex h-11 items-center text-[13px] font-semibold text-elec-yellow touch-manipulation lg:hidden"
            >
              ← Back to list
            </button>

            <div>
              <h3 className="text-[18px] font-semibold leading-snug text-white">{selected.title}</h3>
              <p className="mt-1 text-[13px] leading-relaxed text-white">{selected.summary}</p>
              <dl className="mt-3 grid grid-cols-1 gap-x-6 gap-y-2 text-[13px] sm:grid-cols-2">
                <div>
                  <dt className="text-[12px] font-medium text-white">Category</dt>
                  <dd className="font-semibold text-white">{CATEGORY_LABEL[selected.category] ?? selected.category}</dd>
                </div>
                {selected.suggested_owner_role && (
                  <div>
                    <dt className="text-[12px] font-medium text-white">Suggested owner</dt>
                    <dd className="font-semibold text-white">{selected.suggested_owner_role}</dd>
                  </div>
                )}
                {selected.requires_acknowledgement && (
                  <div>
                    <dt className="text-[12px] font-medium text-white">Sign-off</dt>
                    <dd className="font-semibold text-orange-300">Staff must acknowledge it</dd>
                  </div>
                )}
                {selected.ofsted_areas.length > 0 && (
                  <div>
                    <dt className="text-[12px] font-medium text-white">Ofsted areas</dt>
                    <dd className="font-semibold text-white">{selected.ofsted_areas.join(' · ')}</dd>
                  </div>
                )}
              </dl>
              {selected.framework_citations.length > 0 && (
                <div className="mt-4 border-t border-white/[0.08] pt-3">
                  <p className="text-[12px] font-medium text-white">Grounded in</p>
                  <ul className="mt-1 list-inside list-disc text-[12.5px] leading-snug text-white">
                    {selected.framework_citations.map((c) => (
                      <li key={c}>{c}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Pre-formatted to preserve the scaffold's structure. Real markdown
                rendering is the policy detail page's job. */}
            <pre className="overflow-x-auto whitespace-pre-wrap rounded-2xl border border-white/[0.08] bg-white/[0.03] p-4 font-sans text-[12.5px] leading-relaxed text-white">
              {selected.content_md}
            </pre>

            <p className="text-[12.5px] leading-relaxed text-white">
              Cloning saves a draft you can edit. Nothing is published until your DSL or verifier signs off.
            </p>
          </div>
        )}
      </div>
    </FormSheet>
  );
}
