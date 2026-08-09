import { Plus, Trash2, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { FIELD_CN, TEXTAREA_CN } from '../../common/fieldClasses';
import type { StepsSection as StepsSectionType, StepItem } from '@/types/safety-template';

interface Props {
  section: StepsSectionType;
  mode: 'preview' | 'edit';
  onChange?: (section: StepsSectionType) => void;
}

export function StepsSection({ section, mode, onChange }: Props) {
  const updateStep = (index: number, patch: Partial<StepItem>) => {
    const steps = [...section.steps];
    steps[index] = { ...steps[index], ...patch };
    onChange?.({ ...section, steps });
  };

  const removeStep = (index: number) => {
    const steps = section.steps
      .filter((_, i) => i !== index)
      .map((s, i) => ({ ...s, step_number: i + 1 }));
    onChange?.({ ...section, steps });
  };

  const addStep = () => {
    const newStep: StepItem = {
      step_number: section.steps.length + 1,
      title: '',
      description: '',
    };
    onChange?.({ ...section, steps: [...section.steps, newStep] });
  };

  if (mode === 'preview') {
    return (
      <div className="space-y-2">
        {section.steps.map((step, i) => (
          <div
            key={i}
            className="flex gap-3 p-3 rounded-lg border border-white/[0.06] bg-white/[0.02]"
          >
            <span className="text-[13px] font-bold text-elec-yellow border border-elec-yellow/35 rounded-lg w-8 h-8 flex items-center justify-center flex-shrink-0">
              {step.step_number}
            </span>
            <div className="flex-1 min-w-0">
              <p className="text-[13px] font-semibold text-white">{step.title}</p>
              <p className="text-[12px] text-white mt-0.5">{step.description}</p>
              {step.safety_notes && (
                <div className="flex items-start gap-1.5 mt-1.5 p-2 rounded bg-amber-500/10 border border-amber-500/20">
                  <AlertTriangle className="h-3 w-3 text-amber-400 flex-shrink-0 mt-0.5" />
                  <p className="text-[11px] text-amber-400">{step.safety_notes}</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {section.steps.map((step, i) => (
        <div
          key={i}
          className="rounded-lg border border-white/[0.08] bg-white/[0.02] p-3 space-y-2"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-elec-yellow border border-elec-yellow/35 rounded w-6 h-6 flex items-center justify-center">
              {step.step_number}
            </span>
            <button
              onClick={() => removeStep(i)}
              className="h-8 w-8 rounded-lg flex items-center justify-center text-red-400 active:bg-red-500/10 touch-manipulation"
            >
              <Trash2 className="h-3.5 w-3.5" />
            </button>
          </div>
          <input
            value={step.title}
            onChange={(e) => updateStep(i, { title: e.target.value })}
            placeholder="Step title"
            className={FIELD_CN}
          />
          <textarea
            value={step.description}
            onChange={(e) => updateStep(i, { description: e.target.value })}
            placeholder="Step description"
            className={TEXTAREA_CN}
          />
          <input
            value={step.safety_notes ?? ''}
            onChange={(e) => updateStep(i, { safety_notes: e.target.value || undefined })}
            placeholder="Safety notes (optional)"
            className={cn(FIELD_CN, 'border-b-amber-500/40')}
          />
        </div>
      ))}
      <button
        onClick={addStep}
        className="w-full h-11 rounded-xl border border-dashed border-white/[0.15] text-white text-sm font-semibold flex items-center justify-center gap-2 touch-manipulation active:bg-white/[0.03]"
      >
        <Plus className="h-4 w-4" /> Add Step
      </button>
    </div>
  );
}

export default StepsSection;
