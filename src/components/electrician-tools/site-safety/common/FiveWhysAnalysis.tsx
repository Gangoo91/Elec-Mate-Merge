/**
 * FiveWhysAnalysis
 *
 * Root cause analysis using the 5 Whys technique.
 * Drop-in component for Near Miss and Accident detail views.
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, X, ChevronDown, ChevronUp, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { CARD_SURFACE } from '@/components/ui/card-recipe';
import { supabase } from '@/integrations/supabase/client';
import type { Json } from '@/integrations/supabase/types';
import { toast } from 'sonner';
import { safetyInputCn } from './SafetyDocField';

const ROOT_CAUSE_CATEGORIES = [
  { id: 'human_error', label: 'Human error' },
  { id: 'equipment_failure', label: 'Equipment failure' },
  { id: 'procedural', label: 'Procedural gap' },
  { id: 'environmental', label: 'Environmental' },
  { id: 'training', label: 'Training / competence' },
  { id: 'communication', label: 'Communication' },
  { id: 'design', label: 'Design / engineering' },
  { id: 'other', label: 'Other' },
];

export interface FiveWhysEntry {
  why: string;
  answer: string;
}

/**
 * The two tables this panel writes to do NOT share a column name for the
 * summary sentence:
 *
 *   near_miss_reports → root_cause_analysis
 *   accident_records  → root_cause          (root_cause_analysis DOES NOT EXIST)
 *
 * The previous version hard-coded `root_cause_analysis` for both. PostgREST
 * rejects an unknown column outright (42703 / PGRST204) rather than ignoring
 * it, so every "Save root cause analysis" press from the Digital Accident Book
 * failed the whole update — the 5 Whys and the category were lost with it, and
 * the only feedback was a generic "Failed to save analysis" toast. Verified
 * against information_schema and a live PostgREST select on 2026-08-09.
 */
const SUPPORTED_TABLES = {
  near_miss_reports: 'root_cause_analysis',
  accident_records: 'root_cause',
} as const;

export type FiveWhysTable = keyof typeof SUPPORTED_TABLES;

interface FiveWhysAnalysisProps {
  /** Table name: 'near_miss_reports' or 'accident_records' */
  table: FiveWhysTable;
  /** Record ID */
  recordId: string;
  /** Existing 5 whys data */
  existingWhys?: FiveWhysEntry[];
  /** Existing root cause category */
  existingCategory?: string;
  /** Existing root cause summary */
  existingSummary?: string;
  /** Called after save */
  onSaved?: () => void;
}

export function FiveWhysAnalysis({
  table,
  recordId,
  existingWhys = [],
  existingCategory,
  existingSummary,
  onSaved,
}: FiveWhysAnalysisProps) {
  const [expanded, setExpanded] = useState(existingWhys.length > 0);
  const [whys, setWhys] = useState<FiveWhysEntry[]>(
    existingWhys.length > 0 ? existingWhys : [{ why: 'Why did this happen?', answer: '' }]
  );
  const [category, setCategory] = useState(existingCategory || '');
  const [summary, setSummary] = useState(existingSummary || '');
  const [isSaving, setIsSaving] = useState(false);

  const addWhy = () => {
    if (whys.length >= 5) return;
    const lastAnswer = whys[whys.length - 1]?.answer.trim() || '';
    setWhys([
      ...whys,
      {
        // Chain the next question off the previous answer — that is the whole
        // technique. Only do it when the previous answer is a usable phrase;
        // echoing a two-word fragment back produced questions like
        // "Why it broke?", which read as broken English on a legal record.
        why: lastAnswer.length >= 8 ? `Why — ${lastAnswer}?` : `Why did that happen?`,
        answer: '',
      },
    ]);
  };

  const updateWhy = (index: number, field: 'why' | 'answer', value: string) => {
    const updated = [...whys];
    updated[index] = { ...updated[index], [field]: value };
    setWhys(updated);
  };

  const removeWhy = (index: number) => {
    if (whys.length <= 1) return;
    setWhys(whys.filter((_, i) => i !== index));
  };

  const answered = whys.filter((w) => w.answer.trim()).length;
  const hasContent = answered > 0;
  const canSave = hasContent || !!category || !!summary.trim();

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // Only the answered links are worth keeping — a blank "Why #4" saved as
      // an empty object makes the chain look longer than the analysis is.
      const chain = whys.filter((w) => w.answer.trim()) as unknown as Json;
      const shared = { five_whys: chain, root_cause_category: category || null };
      const summaryValue = summary.trim() || null;

      // Branch on the literal table name rather than computing the column key:
      // the generated Insert/Update types differ per table, and a computed key
      // silently opts the payload out of that check — which is how the
      // accident_records mismatch above survived in the first place.
      const { error } =
        table === 'accident_records'
          ? await supabase
              .from('accident_records')
              .update({ ...shared, root_cause: summaryValue })
              .eq('id', recordId)
          : await supabase
              .from('near_miss_reports')
              .update({ ...shared, root_cause_analysis: summaryValue })
              .eq('id', recordId);

      if (error) throw error;
      toast.success('Root cause analysis saved');
      onSaved?.();
    } catch {
      toast.error('Failed to save analysis');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className={cn('overflow-hidden rounded-2xl border border-elec-yellow/35', CARD_SURFACE)}>
      <button
        type="button"
        onClick={() => setExpanded(!expanded)}
        className="flex h-12 w-full touch-manipulation items-center justify-between px-4 text-left transition-all duration-150 active:scale-[0.99] active:brightness-125 [-webkit-tap-highlight-color:transparent]"
      >
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-semibold text-white">Root cause analysis (5 Whys)</h3>
          {hasContent && (
            <span className="rounded-full border border-white/10 bg-white/[0.05] px-1.5 py-0.5 text-[10px] font-semibold tabular-nums text-white">
              {answered}/{whys.length}
            </span>
          )}
        </div>
        {expanded ? (
          <ChevronUp className="h-4 w-4 text-white" aria-hidden />
        ) : (
          <ChevronDown className="h-4 w-4 text-white" aria-hidden />
        )}
      </button>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="space-y-4 border-t border-white/[0.08] px-4 pb-4 pt-4">
              {/* 5 Whys chain */}
              <div className="space-y-3">
                {whys.map((entry, index) => (
                  <div key={index} className="relative">
                    {/* Connector — the chain is the point of the technique */}
                    {index > 0 && (
                      <span
                        aria-hidden
                        className="absolute -top-3 left-5 h-3 w-px bg-elec-yellow/35"
                      />
                    )}
                    <div className="space-y-2 rounded-xl border border-white/[0.08] bg-white/[0.03] p-3">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-elec-yellow">
                          Why #{index + 1}
                        </span>
                        {whys.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeWhy(index)}
                            aria-label={`Remove why ${index + 1}`}
                            className="-mr-1 flex h-11 w-11 touch-manipulation items-center justify-center rounded-lg text-white transition-all duration-150 active:scale-[0.97] active:brightness-125"
                          >
                            <X className="h-4 w-4" aria-hidden />
                          </button>
                        )}
                      </div>
                      <input
                        value={entry.why}
                        onChange={(e) => updateWhy(index, 'why', e.target.value)}
                        placeholder="Why did this happen?"
                        className={cn(safetyInputCn, 'text-sm')}
                      />
                      <input
                        value={entry.answer}
                        onChange={(e) => updateWhy(index, 'answer', e.target.value)}
                        placeholder="Because…"
                        className={cn(safetyInputCn, 'text-sm')}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {whys.length < 5 && (
                <button
                  type="button"
                  onClick={addWhy}
                  className="flex h-11 w-full touch-manipulation items-center justify-center gap-1.5 rounded-xl border border-dashed border-elec-yellow/35 text-[13px] font-medium text-elec-yellow transition-all duration-150 active:scale-[0.99] active:brightness-125"
                >
                  <Plus className="h-4 w-4" aria-hidden /> Add why #{whys.length + 1}
                </button>
              )}

              {/* Root cause category */}
              <div>
                <span className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.12em] text-white">
                  Root cause category
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {ROOT_CAUSE_CATEGORIES.map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      // Tapping a selected category again clears it — without
                      // this the field was write-once, because there is no
                      // "none" chip and the column is nullable.
                      onClick={() => setCategory((prev) => (prev === cat.id ? '' : cat.id))}
                      className={cn(
                        'h-11 touch-manipulation rounded-xl border px-3 text-[12.5px] font-medium transition-all duration-150 active:scale-[0.97] active:brightness-125',
                        category === cat.id
                          ? 'border-elec-yellow bg-elec-yellow text-black'
                          : 'border-white/[0.08] bg-white/[0.05] text-white'
                      )}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Root cause summary */}
              <div>
                <span className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.12em] text-white">
                  Root cause summary
                </span>
                <input
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                  placeholder="Summarise the root cause in one sentence…"
                  className={safetyInputCn}
                />
              </div>

              <button
                type="button"
                onClick={handleSave}
                disabled={isSaving || !canSave}
                className="flex h-11 w-full touch-manipulation items-center justify-center gap-2 rounded-xl bg-elec-yellow text-[14px] font-semibold text-black transition-all duration-150 active:scale-[0.99] active:brightness-125 disabled:bg-white/[0.08] disabled:text-white/70"
              >
                {isSaving && <Loader2 className="h-4 w-4 animate-spin" aria-hidden />}
                {isSaving ? 'Saving…' : 'Save root cause analysis'}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
