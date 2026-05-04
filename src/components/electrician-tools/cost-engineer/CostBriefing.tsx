import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Eyebrow } from '@/components/college/primitives';
import { cn } from '@/lib/utils';
import {
  CostEstimateInputs,
  ProjectType,
  Region,
  REGION_OPTIONS,
} from '@/types/cost-estimate-inputs';
import { IOSInput } from '@/components/ui/ios-input';
import ClientSelector from '@/components/ClientSelector';
import { Customer } from '@/hooks/inspection/useCustomers';
import { AttachmentZone } from './AttachmentZone';
import { useCostAttachments } from '@/hooks/useCostAttachments';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

interface CostBriefingProps {
  /** Source-of-truth state owned by the parent. */
  inputs: CostEstimateInputs;
  /** Patch update — only the keys that change. */
  onPatch: (patch: Partial<CostEstimateInputs>) => void;
  onGenerate: () => Promise<void>;
  isProcessing: boolean;
}

const MIN_DESCRIPTION = 50;

const PROJECT_TYPES: { value: ProjectType; label: string }[] = [
  { value: 'domestic', label: 'Domestic' },
  { value: 'commercial', label: 'Commercial' },
  { value: 'industrial', label: 'Industrial' },
];

const PercentField = ({
  label,
  value,
  onChange,
  min,
  max,
  disabled,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  min: number;
  max: number;
  disabled?: boolean;
}) => (
  <div className="sm:bg-[hsl(0_0%_10%)] sm:border sm:border-white/[0.10] sm:rounded-2xl sm:p-4 space-y-3">
    <div className="flex items-baseline justify-between gap-3">
      <span className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-white/55">
        {label}
      </span>
      <span className="text-[18px] font-semibold tabular-nums text-elec-yellow">{value}%</span>
    </div>
    <input
      type="range"
      min={min}
      max={max}
      step={1}
      value={value}
      disabled={disabled}
      onChange={(e) => onChange(Number(e.target.value))}
      className="w-full accent-elec-yellow touch-manipulation disabled:opacity-50"
    />
    <div className="flex justify-between text-[10px] text-white/40 tabular-nums">
      <span>{min}%</span>
      <span>{max}%</span>
    </div>
  </div>
);

export const CostBriefing = ({
  inputs,
  onPatch,
  onGenerate,
  isProcessing,
}: CostBriefingProps) => {
  const { attachments, uploading, uploadMany, remove } = useCostAttachments();
  const { user } = useAuth();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Saved templates — pulled once on mount, no realtime needed.
  // Templates surface as a quiet picker only if the user actually has any.
  const [templates, setTemplates] = useState<
    Array<{ id: string; name: string; inputs: any }>
  >([]);
  useEffect(() => {
    if (!user?.id) return;
    let cancelled = false;
    (async () => {
      const { data } = await supabase
        .from('cost_engineer_templates')
        .select('id, name, inputs')
        .eq('user_id', user.id)
        .order('last_used_at', { ascending: false, nullsFirst: false })
        .order('created_at', { ascending: false })
        .limit(8);
      if (!cancelled) setTemplates(data ?? []);
    })();
    return () => {
      cancelled = true;
    };
  }, [user?.id]);

  const applyTemplate = async (templateId: string) => {
    const tpl = templates.find((t) => t.id === templateId);
    if (!tpl) return;
    // Patch the parent's inputs with everything from the template
    // EXCEPT attachments and customerId — those are job-specific.
    const { attachments: _a, customerId: _c, ...rest } = (tpl.inputs ?? {}) as any;
    void _a;
    void _c;
    Object.entries(rest).forEach(([key, value]) => {
      onPatch({ [key]: value } as Partial<CostEstimateInputs>);
    });
    // Bump last_used_at + use_count so the picker prioritises recent.
    await supabase
      .from('cost_engineer_templates')
      .update({
        last_used_at: new Date().toISOString(),
        use_count: ((tpl as any).use_count ?? 0) + 1,
      })
      .eq('id', templateId);
    toast.success(`Loaded "${tpl.name}"`);
  };

  const isUploading = uploading.length > 0;
  const hasDescription = inputs.description.trim().length >= MIN_DESCRIPTION;
  const hasAttachment = attachments.length > 0;
  // Either a typed brief OR at least one attachment is enough — a scope-
  // of-works PDF carries the brief, so we don't need text on top.
  const canGenerate = (hasDescription || hasAttachment) && !isUploading;

  const handleGenerate = async () => {
    if (!canGenerate || isProcessing) return;
    // Sync the latest attachments into parent state right before submit so
    // the parent's payload sees them. We don't keep them in parent during
    // editing because the hook owns upload lifecycle.
    onPatch({ attachments });
    await onGenerate();
  };

  return (
    <div className="space-y-7 sm:space-y-9 pb-32 sm:pb-12">
      {/* Templates — only shown if the user has saved any. Tap to
          pre-fill the briefing with a previous job's setup. */}
      {templates.length > 0 && (
        <section className="space-y-2">
          <div className="flex items-baseline justify-between gap-3">
            <span className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-white/55">
              Quick start from a template
            </span>
            <span className="text-[11px] text-white/45 tabular-nums">
              {templates.length} saved
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {templates.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => applyTemplate(t.id)}
                disabled={isProcessing}
                className={cn(
                  'h-9 px-3 rounded-xl text-[12.5px] font-medium border transition-colors touch-manipulation',
                  'bg-[hsl(0_0%_10%)] border-white/[0.10] text-white/80 hover:border-elec-yellow/40 hover:text-elec-yellow active:scale-[0.99]',
                  'disabled:opacity-50'
                )}
              >
                {t.name}
              </button>
            ))}
          </div>
        </section>
      )}

      {/* 01 — DESCRIPTION (hero) */}
      <section className="space-y-3">
        <div className="flex items-baseline justify-between gap-3">
          <Eyebrow>01 · BRIEFING</Eyebrow>
          <span
            className={cn(
              'text-[11px] tabular-nums',
              inputs.description.length >= MIN_DESCRIPTION ? 'text-emerald-400/70' : 'text-white/45'
            )}
          >
            {inputs.description.length} chars
          </span>
        </div>
        <h2 className="text-[24px] sm:text-[30px] font-semibold tracking-tight leading-[1.1] text-white">
          Describe the job.
        </h2>
        <p className="text-[13.5px] text-white/75 leading-relaxed max-w-2xl">
          Brief the engineer in your own words — the more context, the better. Add floor plans
          and spec sheets below so the AI can read them too.
        </p>

        <div
          className={cn(
            'relative -mx-4 sm:mx-0 bg-[hsl(0_0%_10%)] border-y sm:border sm:rounded-2xl py-4 px-4 sm:p-5 transition-colors',
            inputs.description.length >= MIN_DESCRIPTION
              ? 'border-elec-yellow/40'
              : 'border-white/[0.10] hover:border-white/15'
          )}
        >
          <textarea
            ref={textareaRef}
            value={inputs.description}
            onChange={(e) => onPatch({ description: e.target.value })}
            placeholder="e.g., 3-bed Victorian terrace rewire. Existing 60s wiring, no earth on lighting. Replace with high-integrity CU, AFDDs on socket circuits, new kitchen circuits, dedicated EV-ready 32A in garage. Customer wants brushed brass plates throughout. Two-storey, loft access tight..."
            disabled={isProcessing}
            rows={7}
            className="w-full bg-transparent border-0 ring-0 focus:ring-0 focus:outline-none text-[15px] sm:text-[16px] text-white placeholder:text-white/35 resize-none touch-manipulation leading-relaxed"
            style={{ fontSize: '16px' }}
          />
          <div className="pt-3 mt-3 border-t border-white/[0.06] flex items-baseline justify-between text-[11px]">
            <span className="text-white/55">
              {hasAttachment
                ? 'Attachment counts as the brief — extra detail still helps'
                : `${MIN_DESCRIPTION} chars minimum, or upload a scope of works below`}
            </span>
            {(hasDescription || hasAttachment) && (
              <span className="text-emerald-400/80 uppercase tracking-[0.18em] font-semibold text-[10px]">
                Ready
              </span>
            )}
          </div>
        </div>
      </section>

      {/* 02 — ATTACHMENTS */}
      <section>
        <AttachmentZone
          attachments={attachments}
          uploading={uploading}
          onAdd={uploadMany}
          onRemove={remove}
          disabled={isProcessing}
        />
      </section>

      {/* 03 — DETAILS (inline, not collapsed) */}
      <section className="space-y-5">
        <div className="space-y-2">
          <Eyebrow>03 · DETAILS</Eyebrow>
          <h3 className="text-[20px] sm:text-[24px] font-semibold tracking-tight leading-tight text-white">
            A few more details.
          </h3>
          <p className="text-[12.5px] text-white/65 leading-snug max-w-2xl">
            Optional but useful. Skip what you don't know.
          </p>
        </div>

        {/* Project type */}
        <div className="space-y-2">
          <span className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-white/55">
            Project type
          </span>
          <div className="grid grid-cols-3 gap-2">
            {PROJECT_TYPES.map((opt) => {
              const isActive = inputs.projectType === opt.value;
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => onPatch({ projectType: opt.value })}
                  disabled={isProcessing}
                  className={cn(
                    'h-11 px-3 rounded-xl text-[13px] font-medium border transition-colors touch-manipulation disabled:opacity-50',
                    isActive
                      ? 'bg-elec-yellow/10 border-elec-yellow/50 text-elec-yellow'
                      : 'bg-[hsl(0_0%_10%)] border-white/[0.10] text-white/75 hover:border-white/20'
                  )}
                >
                  {opt.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Project name + location */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <IOSInput
            label="Project name"
            value={inputs.projectName}
            onChange={(e) => onPatch({ projectName: e.target.value })}
            placeholder="e.g., 24 Maple Drive Rewire"
            disabled={isProcessing}
          />
          <IOSInput
            label="Site address"
            value={inputs.location}
            onChange={(e) => onPatch({ location: e.target.value })}
            placeholder="e.g., Manchester, M1 1AA"
            disabled={isProcessing}
          />
        </div>

        {/* Client selector + manual entry */}
        <div className="space-y-2">
          <span className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-white/55">
            Client
          </span>
          <ClientSelector
            onSelectCustomer={(customer: Customer | null) => {
              if (customer) {
                onPatch({
                  clientName: customer.name,
                  clientContact: customer.phone ?? inputs.clientContact,
                  location: customer.address ?? inputs.location,
                  customerId: customer.id,
                });
              } else {
                onPatch({ customerId: undefined });
              }
            }}
            selectedCustomerId={inputs.customerId}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <IOSInput
              label="Client name"
              value={inputs.clientName}
              onChange={(e) => onPatch({ clientName: e.target.value })}
              placeholder="e.g., John Smith"
              disabled={isProcessing}
            />
            <IOSInput
              label="Contact"
              value={inputs.clientContact ?? ''}
              onChange={(e) => onPatch({ clientContact: e.target.value })}
              placeholder="07700 900000"
              disabled={isProcessing}
            />
          </div>
        </div>

        {/* Region */}
        <div className="space-y-2">
          <span className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-white/55">
            Region
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {REGION_OPTIONS.map((opt) => {
              const isActive = inputs.region === opt.value;
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => onPatch({ region: opt.value as Region })}
                  disabled={isProcessing}
                  className={cn(
                    'h-12 px-3 rounded-xl text-left border transition-colors touch-manipulation flex flex-col justify-center disabled:opacity-50',
                    isActive
                      ? 'bg-elec-yellow/10 border-elec-yellow/50'
                      : 'bg-[hsl(0_0%_10%)] border-white/[0.10] hover:border-white/20'
                  )}
                >
                  <span
                    className={cn(
                      'text-[12.5px] font-medium leading-tight',
                      isActive ? 'text-elec-yellow' : 'text-white/80'
                    )}
                  >
                    {opt.label}
                  </span>
                  <span className="text-[10px] text-white/45 tabular-nums">
                    ×{opt.multiplier.toFixed(2)}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Markup + Contingency */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <PercentField
            label="Markup"
            value={inputs.markupPercent}
            onChange={(v) => onPatch({ markupPercent: v })}
            min={0}
            max={60}
            disabled={isProcessing}
          />
          <PercentField
            label="Contingency"
            value={inputs.contingencyPercent}
            onChange={(v) => onPatch({ contingencyPercent: v })}
            min={0}
            max={25}
            disabled={isProcessing}
          />
        </div>

        {/* Notes */}
        <div className="space-y-2">
          <span className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-white/55">
            Notes (optional)
          </span>
          <textarea
            value={inputs.notes ?? ''}
            onChange={(e) => onPatch({ notes: e.target.value })}
            placeholder="Deadline, access constraints, certs required, anything else worth flagging..."
            rows={3}
            disabled={isProcessing}
            className="w-full bg-[hsl(0_0%_10%)] border border-white/[0.10] rounded-xl p-3 text-[13.5px] text-white placeholder:text-white/35 focus:border-elec-yellow/50 focus:outline-none resize-none touch-manipulation disabled:opacity-50"
            style={{ fontSize: '16px' }}
          />
        </div>
      </section>

      {/* Sticky generate */}
      <div className="pb-safe">
        <div className="sticky bottom-0 z-30 -mx-4 px-4 sm:mx-0 sm:px-0 py-3 sm:py-0 bg-elec-dark/95 backdrop-blur-sm border-t border-white/[0.06] sm:border-t-0 sm:bg-transparent">
          <motion.button
            type="button"
            onClick={handleGenerate}
            disabled={!canGenerate || isProcessing}
            whileTap={canGenerate && !isProcessing ? { scale: 0.98 } : undefined}
            className={cn(
              'w-full h-12 rounded-xl text-[14px] font-semibold inline-flex items-center justify-center gap-2 transition-colors touch-manipulation',
              canGenerate && !isProcessing
                ? 'bg-elec-yellow text-black hover:bg-elec-yellow/90'
                : 'bg-white/[0.05] text-white/40 cursor-not-allowed'
            )}
          >
            {isProcessing ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-black/20 border-t-black" />
                <span>Generating</span>
              </>
            ) : isUploading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white/20 border-t-white/60" />
                <span>Uploading attachments…</span>
              </>
            ) : (
              <>
                <span>Generate Estimate</span>
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </motion.button>
        </div>
      </div>
    </div>
  );
};
