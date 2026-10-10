/**
 * ObservationPanel — the learner's view of an observation or professional
 * discussion their assessor recorded (ELE-1873): who, when, the outcome, what
 * went well, what to work on, the action points, the recording and its
 * transcript, and the acknowledgement.
 *
 * Acknowledging says "I have read this", nothing more: it never passes a
 * criterion (only the assessor's decision does) and the learner cannot edit
 * what was recorded. A comment is optional and goes to the assessor.
 */
import { useState } from 'react';
import { Check, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { shortHash } from '@/lib/portfolio/contentHash';
import { DictateButton } from '@/components/worker-tools/DictateButton';
import type { EvidenceFile, ItemObservation } from '@/hooks/portfolio/usePortfolio';
import { textareaCn } from '@/components/forms/fieldStyles';
import { P_BTN_PRIMARY, fmtDate, fmtDateTime } from './ui';

const OUTCOME: Record<NonNullable<ItemObservation['outcome']>, { label: string; cn: string }> = {
  passed: {
    label: 'Competent',
    cn: 'border-emerald-400/40 bg-emerald-500/[0.12] text-emerald-300',
  },
  partial: { label: 'Partly there', cn: 'border-sky-400/40 bg-sky-500/[0.12] text-sky-200' },
  referred: { label: 'Not yet', cn: 'border-orange-500/40 bg-orange-500/10 text-orange-300' },
  not_yet: { label: 'Not yet', cn: 'border-orange-500/40 bg-orange-500/10 text-orange-300' },
};
const SETTING: Record<string, string> = {
  workshop: 'Workshop',
  employer_site: 'On site',
  classroom: 'Classroom',
  remote: 'Online',
  other: 'Other',
};

export function ObservationPanel({
  obs,
  files,
  comment,
  onComment,
  onAcknowledge,
  busy,
}: {
  obs: ItemObservation;
  files: EvidenceFile[];
  comment: string;
  onComment: (v: string) => void;
  onAcknowledge: () => void;
  busy: boolean;
}) {
  const [showTranscript, setShowTranscript] = useState(false);
  const discussion = obs.kind === 'professional_discussion';
  // Batch 2: questioning, with the questions asked and the answers given.
  const questioning = obs.kind === 'questioning';
  const questionMeta = questioning
    ? [
        obs.question_mode === 'written' ? 'Written' : 'Oral',
        obs.question_delivery === 'remote' ? 'remote' : 'face to face',
      ].join(', ')
    : null;
  const first = obs.observer_name.split(' ')[0] || 'Your assessor';
  const media = files.filter((f) => f.type.startsWith('audio/') || f.type.startsWith('video/'));
  const meta = [
    obs.observed_at ? fmtDate(obs.observed_at) : null,
    obs.observed_time ? obs.observed_time.slice(0, 5) : null,
    obs.duration_minutes ? `${obs.duration_minutes} min` : null,
    obs.location_type ? (SETTING[obs.location_type] ?? null) : null,
    obs.location,
    questionMeta,
  ].filter(Boolean);

  return (
    <section className="space-y-5 rounded-2xl border border-white/[0.12] bg-white/[0.04] p-4 sm:p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-[12px] font-medium text-elec-yellow">
            {questioning ? 'Questioning' : discussion ? 'Professional discussion' : 'Observation'}
          </p>
          <p className="mt-0.5 text-[16px] font-semibold text-white">
            {questioning ? 'Questioned by' : discussion ? 'Discussed with' : 'Observed by'}{' '}
            {obs.observer_name}
          </p>
          {meta.length > 0 && <p className="mt-0.5 text-[13px] text-white">{meta.join(' · ')}</p>}
        </div>
        {obs.outcome && (
          <span
            className={cn(
              'rounded-full border px-2.5 py-1 text-[12px] font-semibold',
              OUTCOME[obs.outcome].cn
            )}
          >
            {OUTCOME[obs.outcome].label}
          </span>
        )}
      </div>

      {media.length > 0 && (
        <div className="space-y-2">
          {media.map((f) =>
            f.type.startsWith('audio/') ? (
              <div key={f.url}>
                <p className="mb-1 text-[12px] font-medium text-white">{f.name}</p>
                <audio controls preload="none" src={f.url} className="h-11 w-full" />
              </div>
            ) : (
              <video
                key={f.url}
                controls
                playsInline
                preload="metadata"
                src={f.url}
                className="w-full rounded-xl"
              />
            )
          )}
        </div>
      )}

      {questioning && (obs.questions ?? []).length > 0 && (
        <div data-testid="questioning-answers">
          <h4 className="text-[13px] font-semibold text-white">
            {(obs.questions ?? []).length === 1
              ? 'The question and your answer'
              : `${(obs.questions ?? []).length} questions and your answers`}
          </h4>
          <ol className="mt-2 space-y-3">
            {(obs.questions ?? []).map((q, i) => (
              <li key={i} className="border-l border-white/[0.18] pl-3">
                <p className="text-[14px] font-semibold leading-snug text-white">
                  {i + 1}. {q.question}
                </p>
                <p className="mt-1 whitespace-pre-line text-[14px] leading-relaxed text-white">
                  {q.answer || 'No answer recorded.'}
                </p>
              </li>
            ))}
          </ol>
        </div>
      )}

      {(obs.strengths || obs.areas) && (
        <div className="grid gap-4 sm:grid-cols-2">
          {obs.strengths && (
            <div>
              <h4 className="text-[13px] font-semibold text-white">What went well</h4>
              <p className="mt-1 whitespace-pre-line text-[14px] leading-relaxed text-white">
                {obs.strengths}
              </p>
            </div>
          )}
          {obs.areas && (
            <div>
              <h4 className="text-[13px] font-semibold text-white">To work on</h4>
              <p className="mt-1 whitespace-pre-line text-[14px] leading-relaxed text-white">
                {obs.areas}
              </p>
            </div>
          )}
        </div>
      )}

      {obs.action_points.length > 0 && (
        <div>
          <h4 className="text-[13px] font-semibold text-white">Your action points</h4>
          <ul className="mt-1.5 space-y-1.5">
            {obs.action_points.map((a, i) => (
              <li key={i} className="relative pl-4 text-[14px] leading-snug text-white">
                <span
                  aria-hidden
                  className="absolute left-0 top-[8px] h-1.5 w-1.5 rounded-full bg-elec-yellow"
                />
                {a}
              </li>
            ))}
          </ul>
          {obs.follow_up_date && (
            <p className="mt-2 text-[13px] text-white">
              Follow-up booked for {fmtDate(obs.follow_up_date)}.
            </p>
          )}
        </div>
      )}

      {obs.transcript && (
        <div>
          <button
            type="button"
            onClick={() => setShowTranscript((v) => !v)}
            aria-expanded={showTranscript}
            className="flex h-11 items-center text-[13px] font-semibold text-elec-yellow touch-manipulation"
          >
            {showTranscript ? 'Hide the transcript' : 'Read the transcript'}
          </button>
          {showTranscript && (
            <p className="whitespace-pre-line text-[14px] leading-relaxed text-white">
              {obs.transcript}
            </p>
          )}
        </div>
      )}

      {obs.content_hash && (
        <p className="font-mono text-[12px] text-white" title={obs.content_hash}>
          Recorded fingerprint {shortHash(obs.content_hash)}
        </p>
      )}

      <div className="border-t border-white/[0.1] pt-4">
        {obs.acknowledged_at ? (
          <div className="flex items-start gap-3">
            <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-black">
              <Check className="h-4 w-4" strokeWidth={3} aria-hidden />
            </span>
            <div className="min-w-0">
              <p className="text-[14px] font-semibold text-white">
                You acknowledged this {fmtDateTime(obs.acknowledged_at)}
              </p>
              {obs.learner_comment && (
                <p className="mt-1 text-[14px] leading-relaxed text-white">
                  "{obs.learner_comment}"
                </p>
              )}
              <p className="mt-1 text-[13px] text-white">
                {first} decides the criteria from it. You will see the decision here.
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            <div>
              <p className="text-[14px] font-semibold text-white">Read it, then acknowledge it</p>
              <p className="mt-0.5 text-[13px] leading-relaxed text-white">
                Acknowledging tells {first} you have read this. If something is not right, say so
                below and {first} will see it.
              </p>
            </div>
            <label htmlFor="obs-ack-comment" className="sr-only">
              Comment for {first}
            </label>
            <textarea
              id="obs-ack-comment"
              value={comment}
              onChange={(e) => onComment(e.target.value)}
              rows={2}
              placeholder="Add a comment (optional)"
              className={cn(textareaCn, 'min-h-[72px]')}
            />
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-[auto_1fr]">
              <DictateButton
                className="h-11 text-[14px]"
                onText={(t) => onComment(comment.trim() ? `${comment.trimEnd()} ${t}` : t)}
              />
              <button
                type="button"
                className={cn(P_BTN_PRIMARY, 'w-full')}
                onClick={onAcknowledge}
                disabled={busy}
              >
                {busy && <Loader2 className="h-4 w-4 animate-spin" aria-hidden />}
                Acknowledge
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
