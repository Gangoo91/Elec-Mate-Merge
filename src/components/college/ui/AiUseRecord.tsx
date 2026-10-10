/**
 * AiUseRecord — the AI-use record on a piece of evidence (ELE-2048).
 *
 * Shown to the assessor (decision sheet, submission drawer), the IQA (who
 * samples through the same sheets) and the learner (before they sign). Says
 * what AI drafted, with which tool and when, how much the learner changed, and
 * on a tap what the tool was given and what it wrote, as it wrote it (JCQ AI
 * Use in Assessments, Apr 2025). Renders nothing when no AI was recorded.
 */
import { useState } from 'react';
import { Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  AI_FIELD_LABEL,
  AI_TOOL_NAME,
  asAiUse,
  describeField,
  describePrompt,
  describeTools,
  summariseAiUse,
} from '@/lib/portfolio/aiUseRecord';

interface Props {
  aiAssisted?: boolean | null;
  aiUse?: unknown;
  /** assessor: adds the line on how to judge it. learner: second person. */
  audience?: 'assessor' | 'learner';
  className?: string;
}

export function AiUseRecord({ aiAssisted, aiUse, audience = 'assessor', className }: Props) {
  const [open, setOpen] = useState(false);
  const rec = asAiUse(aiUse);
  const summary = summariseAiUse(rec, !!aiAssisted);
  if (!summary) return null;
  const assisted = !!aiAssisted || !!rec?.assisted;
  const tools = rec ? describeTools(rec) : [];

  return (
    <div
      className={cn('space-y-2 rounded-xl border border-white/[0.14] p-3', className)}
      data-testid="ai-use-record"
    >
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-[13px] font-semibold text-white">AI use</span>
        <span
          className={cn(
            'inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[12px] font-semibold text-white',
            assisted ? 'border-elec-yellow' : 'border-white/[0.2]'
          )}
          data-testid="ai-use-chip"
        >
          <Sparkles className="h-3 w-3 text-elec-yellow" aria-hidden />
          {assisted ? 'AI assisted' : 'AI ran, not used'}
        </span>
      </div>
      <p className="text-[13px] leading-snug text-white">{summary}</p>
      {rec && rec.fields.length > 0 && (
        <ul className="space-y-1">
          {rec.fields.map((f) => (
            <li key={f.field} className="text-[12.5px] leading-snug text-white">
              {describeField(f)}
            </li>
          ))}
        </ul>
      )}
      {tools.length > 0 && (
        <p className="text-[12px] leading-snug text-white">Tools: {tools.join('; ')}.</p>
      )}
      {audience === 'assessor' && assisted && (
        <p className="text-[12px] leading-snug text-white">
          Judge what the learner showed independently. If you are unsure they understand it, ask
          them about it before you decide.
        </p>
      )}
      {rec && (rec.tools.length > 0 || rec.fields.length > 0) && (
        <>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            className="h-11 touch-manipulation text-[13px] font-semibold text-elec-yellow"
          >
            {open ? 'Hide what the AI was given and wrote' : 'Show what the AI was given and wrote'}
          </button>
          {open && (
            <div className="space-y-3 border-t border-white/[0.1] pt-3" data-testid="ai-use-detail">
              {rec.tools.map((t, i) => (
                <div key={`${t.tool}-${i}`} className="space-y-1">
                  <p className="text-[12px] font-semibold text-white">
                    {AI_TOOL_NAME[t.tool] ?? t.tool} was given
                  </p>
                  <p className="whitespace-pre-line text-[12.5px] leading-snug text-white">
                    {describePrompt(t)}
                  </p>
                </div>
              ))}
              {rec.fields.map((f) => (
                <div key={`out-${f.field}`} className="space-y-1">
                  <p className="text-[12px] font-semibold text-white">
                    {AI_FIELD_LABEL[f.field] ?? f.field}, as the AI wrote it
                  </p>
                  <p className="whitespace-pre-line rounded-lg border border-white/[0.1] p-2.5 text-[12.5px] leading-relaxed text-white">
                    {f.ai_text}
                  </p>
                </div>
              ))}
              {audience === 'learner' && (
                <p className="text-[12px] text-white">
                  This record is kept with your evidence and cannot be removed.
                </p>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default AiUseRecord;
