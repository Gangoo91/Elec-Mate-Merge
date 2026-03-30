/**
 * FiveWhysAnalysis
 *
 * Root cause analysis using the 5 Whys technique.
 * Drop-in component for Near Miss and Accident detail views.
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, Plus, X, ChevronDown, ChevronUp, Target, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

const ROOT_CAUSE_CATEGORIES = [
  { id: 'human_error', label: 'Human Error', colour: 'text-red-400' },
  { id: 'equipment_failure', label: 'Equipment Failure', colour: 'text-amber-400' },
  { id: 'procedural', label: 'Procedural Gap', colour: 'text-blue-400' },
  { id: 'environmental', label: 'Environmental', colour: 'text-green-400' },
  { id: 'training', label: 'Training / Competence', colour: 'text-purple-400' },
  { id: 'communication', label: 'Communication', colour: 'text-cyan-400' },
  { id: 'design', label: 'Design / Engineering', colour: 'text-pink-400' },
  { id: 'other', label: 'Other', colour: 'text-white' },
];

interface FiveWhysEntry {
  why: string;
  answer: string;
}

interface FiveWhysAnalysisProps {
  /** Table name: 'near_miss_reports' or 'accident_records' */
  table: string;
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
    const lastAnswer = whys[whys.length - 1]?.answer || '';
    setWhys([
      ...whys,
      {
        why: lastAnswer ? `Why ${lastAnswer.toLowerCase()}?` : `Why? (${whys.length + 1})`,
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

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const { error } = await supabase
        .from(table)
        .update({
          five_whys: whys,
          root_cause_category: category || null,
          root_cause_analysis: summary || null,
        })
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

  const hasContent = whys.some((w) => w.answer.trim());

  return (
    <div className="rounded-xl border border-white/[0.08] bg-gradient-to-br from-white/[0.04] to-white/[0.01] overflow-hidden">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between px-4 py-3 touch-manipulation"
      >
        <div className="flex items-center gap-2">
          <HelpCircle className="h-4 w-4 text-purple-400" />
          <h3 className="text-sm font-semibold text-white">Root Cause Analysis (5 Whys)</h3>
          {hasContent && (
            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-purple-500/15 text-purple-400">
              {whys.filter((w) => w.answer.trim()).length}/{whys.length}
            </span>
          )}
        </div>
        {expanded ? (
          <ChevronUp className="h-4 w-4 text-white" />
        ) : (
          <ChevronDown className="h-4 w-4 text-white" />
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
            <div className="px-4 pb-4 space-y-3">
              {/* 5 Whys chain */}
              {whys.map((entry, index) => (
                <div key={index} className="relative">
                  {/* Connector line */}
                  {index > 0 && (
                    <div className="absolute -top-2 left-5 w-px h-2 bg-purple-500/30" />
                  )}
                  <div className="p-3 rounded-xl border border-purple-500/15 bg-purple-500/[0.03] space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold text-purple-400 uppercase tracking-wide">
                        Why #{index + 1}
                      </span>
                      {whys.length > 1 && (
                        <button
                          onClick={() => removeWhy(index)}
                          className="h-6 w-6 flex items-center justify-center rounded text-white/40 hover:text-red-400 touch-manipulation"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      )}
                    </div>
                    <Input
                      value={entry.why}
                      onChange={(e) => updateWhy(index, 'why', e.target.value)}
                      placeholder="Why did this happen?"
                      className="h-10 text-sm bg-white/[0.03] border-white/[0.08] text-white focus:border-purple-500"
                    />
                    <Input
                      value={entry.answer}
                      onChange={(e) => updateWhy(index, 'answer', e.target.value)}
                      placeholder="Because..."
                      className="h-10 text-sm bg-white/[0.03] border-white/[0.08] text-white focus:border-purple-500"
                    />
                  </div>
                </div>
              ))}

              {/* Add why button */}
              {whys.length < 5 && (
                <button
                  onClick={addWhy}
                  className="w-full h-9 flex items-center justify-center gap-1.5 rounded-lg border border-dashed border-purple-500/20 text-xs text-purple-400 touch-manipulation active:scale-[0.98] hover:border-purple-500/40"
                >
                  <Plus className="h-3 w-3" /> Add Why #{whys.length + 1}
                </button>
              )}

              {/* Root cause category */}
              <div>
                <span className="text-[10px] text-white uppercase tracking-wide font-semibold mb-2 block">
                  Root Cause Category
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {ROOT_CAUSE_CATEGORIES.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setCategory(cat.id)}
                      className={cn(
                        'px-2.5 py-1 rounded-lg text-[11px] font-medium border touch-manipulation active:scale-[0.97] transition-all',
                        category === cat.id
                          ? 'bg-purple-500/15 border-purple-500/40 text-purple-400'
                          : 'bg-white/[0.03] border-white/[0.06] text-white'
                      )}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Root cause summary */}
              <div>
                <span className="text-[10px] text-white uppercase tracking-wide font-semibold mb-1.5 block">
                  Root Cause Summary
                </span>
                <Input
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                  placeholder="Summarise the root cause in one sentence..."
                  className="h-11 text-sm bg-white/[0.03] border-white/[0.08] text-white focus:border-purple-500 touch-manipulation"
                />
              </div>

              {/* Save button */}
              <button
                onClick={handleSave}
                disabled={isSaving}
                className="w-full h-11 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-400 text-sm font-bold touch-manipulation active:scale-[0.97] disabled:opacity-40 flex items-center justify-center gap-2"
              >
                {isSaving ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Target className="h-4 w-4" />
                )}
                {isSaving ? 'Saving...' : 'Save Root Cause Analysis'}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
