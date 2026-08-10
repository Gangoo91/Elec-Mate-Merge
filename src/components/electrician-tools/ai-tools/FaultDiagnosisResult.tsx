/**
 * FaultDiagnosisResult — the answer, in the order an electrician needs it.
 *
 * Replaces `VisualAnalysisResults` on this screen. That component was built
 * for the full-width Visual Analysis page and, dropped into a 470px rail or a
 * 390px sheet, it printed "UNSATISFACTORY" twice, gave half the width to a
 * radial gauge and left the reasoning in a thirty-character ragged column.
 *
 * Two things it got wrong beyond layout:
 *
 *   The EICR code was nowhere on screen. "1 Potentially Dangerous" implies C2
 *   to someone who already knows the scheme; the code itself — the thing that
 *   gets written on the certificate — was not shown.
 *
 *   "40% SAFETY · 4/10" is a number this tool cannot know. It is derived from
 *   the code by a lookup, so it adds a decimal point of authority to
 *   something that is really one of five discrete answers. The code carries
 *   the meaning; the gauge only dresses it up.
 *
 * Order here is triage order: what it is → why → what to do first → how to put
 * it right → what would confirm it → what it rests on.
 */

import { AlertTriangle, Check, Copy, Download, RotateCcw } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { useHaptic } from '@/hooks/useHaptic';
import { useToast } from '@/hooks/use-toast';
import { copyToClipboard } from '@/utils/clipboard';

export type EicrCode = 'C1' | 'C2' | 'C3' | 'FI' | 'PASS';

export interface DiagnosisCitation {
  /** Null when the source couldn't back a clause number up — see the edge function. */
  number: string | null;
  section: string;
  /** 'bs7671' | 'gn3' | 'osg' */
  source: string;
}

export interface FaultDiagnosisData {
  code: EicrCode;
  /** Why this code, in prose. */
  reasoning: string;
  /** Before anything else — isolation, making safe. */
  immediateAction?: string;
  /** The remedial work, in order. */
  fixSteps?: string[];
  /** Tests or readings that would confirm or change the classification. */
  furtherChecks?: string[];
  citations?: DiagnosisCitation[];
  confidence?: number;
  /** False when no clause could be cited — the answer is a lead, not a verdict. */
  grounded?: boolean;
}

/**
 * Tone per code. Red for the two that mean "unsafe", amber for the two that
 * mean "look again", green for a pass — the same vocabulary the rest of the
 * app uses for alerts, and the only place colour is spent on this panel.
 */
const CODE_META: Record<
  EicrCode,
  { title: string; line: string; ring: string; text: string; fill: string }
> = {
  C1: {
    title: 'C1',
    line: 'Danger present — action required immediately',
    ring: 'border-red-500/60',
    text: 'text-red-300',
    fill: 'bg-red-500/15',
  },
  C2: {
    title: 'C2',
    line: 'Potentially dangerous — urgent remedial action',
    ring: 'border-red-500/50',
    text: 'text-red-300',
    fill: 'bg-red-500/12',
  },
  C3: {
    title: 'C3',
    line: 'Improvement recommended',
    ring: 'border-orange-500/50',
    text: 'text-orange-300',
    fill: 'bg-orange-500/12',
  },
  FI: {
    title: 'FI',
    line: 'Further investigation required',
    ring: 'border-orange-500/50',
    text: 'text-orange-300',
    fill: 'bg-orange-500/12',
  },
  PASS: {
    title: 'OK',
    line: 'Nothing requiring remedial work',
    ring: 'border-emerald-500/50',
    text: 'text-emerald-300',
    fill: 'bg-emerald-500/12',
  },
};

const SOURCE_LABEL: Record<string, string> = {
  bs7671: 'BS 7671',
  gn3: 'GN3',
  osg: 'On-Site Guide',
};

/** Plain type, a rule above it. No icons, no coloured dots. */
const Block = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <section className="border-t border-white/[0.10] pt-4">
    <h3 className="mb-2 text-[12px] font-semibold uppercase tracking-[0.12em] text-white">
      {title}
    </h3>
    {children}
  </section>
);

const asPlainText = (d: FaultDiagnosisData) =>
  [
    `EICR classification: ${d.code} — ${CODE_META[d.code].line}`,
    '',
    d.reasoning,
    d.immediateAction ? `\nDo first: ${d.immediateAction}` : '',
    d.fixSteps?.length ? `\nPutting it right:\n${d.fixSteps.map((s, i) => `${i + 1}. ${s}`).join('\n')}` : '',
    d.furtherChecks?.length ? `\nWorth checking:\n${d.furtherChecks.map((s) => `- ${s}`).join('\n')}` : '',
    d.citations?.length
      ? `\nBased on:\n${d.citations
          .map((c) => `- ${SOURCE_LABEL[c.source] ?? c.source}${c.number ? ` ${c.number}` : ''}${c.section ? ` — ${c.section}` : ''}`)
          .join('\n')}`
      : '',
  ]
    .filter(Boolean)
    .join('\n');

const FaultDiagnosisResult = ({
  data,
  onExport,
  onReset,
}: {
  data: FaultDiagnosisData;
  onExport?: () => void;
  /** Rendered in the same action row rather than a second footer beneath it. */
  onReset?: () => void;
}) => {
  const meta = CODE_META[data.code] ?? CODE_META.FI;
  const haptic = useHaptic();
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await copyToClipboard(asPlainText(data));
      haptic.success();
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      toast({ title: 'Diagnosis copied', description: 'Ready to paste.', variant: 'success' });
    } catch {
      toast({ title: 'Could not copy', description: 'Select and copy manually.', variant: 'destructive' });
    }
  };

  return (
    <div className="flex h-full min-h-0 flex-col">
      <div className="min-h-0 flex-1 space-y-4 overflow-y-auto px-4 py-4 sm:px-5">
        {/* The answer. Code first, at a size you can read at arm's length on a
            board, with the sentence that says what it means beside it. */}
        <div className={cn('flex items-center gap-3 rounded-xl border p-3', meta.ring, meta.fill)}>
          <span
            className={cn(
              'flex h-14 w-14 shrink-0 items-center justify-center rounded-lg border text-[24px] font-bold tabular-nums',
              meta.ring,
              meta.text
            )}
          >
            {meta.title}
          </span>
          <span className={cn('text-[13.5px] font-semibold leading-snug', meta.text)}>
            {meta.line}
          </span>
        </div>

        {data.grounded === false && (
          <p className="rounded-lg border border-orange-500/40 bg-orange-500/10 px-3 py-2 text-[12px] leading-snug text-orange-200">
            No regulation could be cited for this. Treat it as a lead to investigate, not a
            classification.
          </p>
        )}

        {data.reasoning && (
          <p className="text-[13.5px] leading-relaxed text-white">{data.reasoning}</p>
        )}

        {data.immediateAction && (
          <div className="flex gap-2.5 rounded-xl border border-red-500/40 bg-red-500/10 p-3">
            <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-red-300" aria-hidden />
            <div className="min-w-0">
              <p className="text-[12px] font-semibold uppercase tracking-[0.12em] text-red-300">
                Do this first
              </p>
              <p className="mt-1 text-[13px] leading-snug text-white">{data.immediateAction}</p>
            </div>
          </div>
        )}

        {data.fixSteps && data.fixSteps.length > 0 && (
          <Block title="Putting it right">
            <ol className="space-y-2">
              {data.fixSteps.map((step, i) => (
                <li key={step} className="flex gap-2.5">
                  <span className="mt-px w-4 shrink-0 text-[12.5px] font-semibold tabular-nums text-elec-yellow">
                    {i + 1}
                  </span>
                  <span className="min-w-0 flex-1 text-[13px] leading-snug text-white">{step}</span>
                </li>
              ))}
            </ol>
          </Block>
        )}

        {data.furtherChecks && data.furtherChecks.length > 0 && (
          <Block title="Worth checking">
            <ul className="space-y-2">
              {data.furtherChecks.map((check) => (
                <li key={check} className="flex gap-2.5">
                  <span
                    aria-hidden
                    className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-elec-yellow"
                  />
                  <span className="min-w-0 flex-1 text-[13px] leading-snug text-white">{check}</span>
                </li>
              ))}
            </ul>
          </Block>
        )}

        {data.citations && data.citations.length > 0 && (
          <Block title="What this rests on">
            <ul className="space-y-1.5">
              {data.citations.map((c, i) => (
                <li
                  key={`${c.source}-${c.number ?? i}`}
                  className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5"
                >
                  <span
                    className={cn(
                      'shrink-0 rounded border px-1.5 py-0.5 text-[11px] font-semibold tabular-nums',
                      c.number
                        ? 'border-elec-yellow/40 text-elec-yellow'
                        : 'border-white/[0.18] text-white'
                    )}
                  >
                    {SOURCE_LABEL[c.source] ?? c.source}
                    {c.number ? ` ${c.number}` : ''}
                  </span>
                  {c.section && (
                    <span className="min-w-0 flex-1 text-[12px] leading-snug text-white">
                      {c.section}
                    </span>
                  )}
                </li>
              ))}
            </ul>
            {/* Said plainly rather than hidden, because a source without a
                clause number is weaker evidence and the reader should know. */}
            {data.citations.some((c) => !c.number) && (
              <p className="mt-2 text-[11px] leading-snug text-white">
                Entries without a number are supporting guidance — the source didn't state a clause
                we could verify.
              </p>
            )}
          </Block>
        )}

        {typeof data.confidence === 'number' && (
          <p className="border-t border-white/[0.10] pt-3 text-[11.5px] text-white">
            Confidence {Math.round(data.confidence * 100)}% · BS 7671:2018+A4:2026
          </p>
        )}
      </div>

      <div className="shrink-0 border-t border-white/[0.10] p-2.5">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-xl border border-white/[0.14] bg-white/[0.06] text-[12.5px] font-semibold text-white transition-colors touch-manipulation hover:border-white/[0.28] active:bg-white/[0.10]"
          >
            {copied ? (
              <Check className="h-4 w-4 text-emerald-300" aria-hidden />
            ) : (
              <Copy className="h-4 w-4" aria-hidden />
            )}
            {copied ? 'Copied' : 'Copy'}
          </button>
          {onExport && (
            <button
              type="button"
              onClick={onExport}
              className="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-xl border border-white/[0.14] bg-white/[0.06] text-[12.5px] font-semibold text-white transition-colors touch-manipulation hover:border-white/[0.28] active:bg-white/[0.10]"
            >
              <Download className="h-4 w-4" aria-hidden />
              Save
            </button>
          )}
          {onReset && (
            <button
              type="button"
              onClick={onReset}
              className="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-xl border border-white/[0.14] bg-white/[0.06] text-[12.5px] font-semibold text-white transition-colors touch-manipulation hover:border-white/[0.28] active:bg-white/[0.10]"
            >
              <RotateCcw className="h-4 w-4" aria-hidden />
              New
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default FaultDiagnosisResult;
