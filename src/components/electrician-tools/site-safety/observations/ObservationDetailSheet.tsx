/**
 * ObservationDetailSheet — editorial detail view for a single safety observation.
 * Monochrome with one colour dimension (type / severity) carried by a thin
 * accent line and small uppercase pills. SheetShell layout, sticky footer.
 *
 * ⚠️ WHY THERE IS NO OPEN / IN-PROGRESS / CLOSED WORKFLOW HERE
 *
 * This sheet used to render a "Follow-up" panel — Status, Assigned to, Due,
 * Completed — plus "Start action" / "Close" / "Reopen" buttons wired to
 * `useUpdateObservation`. None of it could ever work, for two independent
 * reasons, both verified against the live database:
 *
 *   1. `public.safety_observations` has no `status`, `follow_up_required`,
 *      `assigned_to`, `due_date` or `completed_date` column. The panel was
 *      reading `undefined` on every row and defaulting to "Open", and the
 *      update would have failed with 42703 (undefined_column).
 *   2. The table carries SELECT and INSERT policies only — there is no UPDATE
 *      policy — so even a valid column list matches zero rows under RLS, and
 *      the hook's `.single()` then errors. Every press produced the red
 *      "Could not update observation" toast.
 *
 * Closing the loop is already handled properly by CorrectiveActionsPanel
 * below: `safety_corrective_actions` has the columns AND the full CRUD policy
 * set, and it is the mechanism the rest of Site Safety uses. Rather than show
 * a second, broken tracker beside a working one, the record is presented as
 * what it is — a dated observation — and the action lives in one place.
 */

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import type { SafetyObservation } from '@/hooks/useSafetyObservations';
import { useSafetyPDFExport } from '@/hooks/useSafetyPDFExport';
import { useSparkProjects } from '@/hooks/useSparkProjects';
import { AuditTimeline } from '../common/AuditTimeline';
import { SafetyDocumentShare } from '../common/SafetyDocumentShare';
import { CorrectiveActionsPanel } from '../common/CorrectiveActionsPanel';
import { storageSetJSONSync } from '@/utils/storage';
import {
  SheetShell,
  Eyebrow,
  PrimaryButton,
  SecondaryButton,
  toneAccent,
  type Tone,
} from '@/components/college/primitives';
import { SafetyListCard } from '../common/SafetyList';

// ─── Type / severity colour (the single colour dimension) ───

/** Neutral surface, coloured text — see ObservationFeed for the reasoning. */
const PILL: Record<'amber' | 'green' | 'red' | 'neutral', string> = {
  amber: 'bg-white/[0.05] text-amber-400 border-white/10',
  green: 'bg-white/[0.05] text-emerald-400 border-white/10',
  red: 'bg-white/[0.05] text-red-400 border-white/10',
  neutral: 'bg-white/[0.05] text-white border-white/10',
};

const PILL_BASE =
  'inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium uppercase tracking-[0.12em] border whitespace-nowrap';

/**
 * Observation category → near-miss category.
 *
 * The escalation handed the observation's category straight over, but the two
 * modules do not share a vocabulary: observations use display labels ("PPE
 * Usage", "Working at Height") and Near Miss Reporting uses snake_case values
 * ('ppe_failure', 'fall_hazard') in a Radix Select. A value that is not one of
 * the Select's items renders as the placeholder, so the category silently
 * arrived blank on every escalation and the reporter had to re-pick it.
 * Anything without a clear counterpart lands on 'other' rather than nothing.
 */
const NEAR_MISS_CATEGORY: Record<string, string> = {
  'PPE Usage': 'ppe_failure',
  Housekeeping: 'worksite_hazard',
  'Safe Working Practice': 'worksite_hazard',
  'Tool Handling': 'tool_equipment',
  Communication: 'other',
  'Risk Awareness': 'other',
  'Manual Handling': 'manual_handling',
  'Working at Height': 'fall_hazard',
  'Electrical Safety': 'electrical_hazard',
  Other: 'other',
};

function severityTone(sev: SafetyObservation['severity']): Tone | undefined {
  if (sev === 'high') return 'red';
  if (sev === 'medium') return 'amber';
  if (sev === 'low') return 'green';
  return undefined;
}

interface ObservationDetailSheetProps {
  observation: SafetyObservation | null;
  open: boolean;
  onClose: () => void;
}

export function ObservationDetailSheet({
  observation,
  open,
  onClose,
}: ObservationDetailSheetProps) {
  const { exportPDF, isExporting, exportingId } = useSafetyPDFExport();
  const [showShare, setShowShare] = useState(false);
  const { projects: jobs = [] } = useSparkProjects('active');
  const linkedJobTitle = observation?.job_id
    ? (jobs.find((j) => j.id === observation.job_id)?.title ?? 'Linked project')
    : null;

  return (
    <Sheet open={open} onOpenChange={(v) => !v && onClose()}>
      <SheetContent
        side="bottom"
        className="h-[85vh] p-0 rounded-t-2xl overflow-hidden border-white/[0.08]"
      >
        {observation &&
          (() => {
            const isPositive = observation.observation_type === 'positive';
            const showFollowUp = !isPositive;
            const sevTone = severityTone(observation.severity);
            const accentTone: Tone = isPositive ? 'green' : (sevTone ?? 'amber');

            const formattedDate = new Date(observation.created_at).toLocaleDateString('en-GB', {
              weekday: 'long',
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            });
            const formattedTime = new Date(observation.created_at).toLocaleTimeString('en-GB', {
              hour: '2-digit',
              minute: '2-digit',
            });

            return (
              <SheetShell
                eyebrow={`${isPositive ? 'Positive observation' : 'Improvement needed'} · ${observation.category}`}
                title={
                  observation.description.length > 64
                    ? `${observation.description.slice(0, 64)}…`
                    : observation.description
                }
                description={
                  <span className="inline-flex items-center gap-2 flex-wrap">
                    <span className={cn(PILL_BASE, PILL[isPositive ? 'green' : 'amber'])}>
                      {isPositive ? 'Positive' : 'Improvement'}
                    </span>
                    {observation.severity && (
                      <span
                        className={cn(
                          PILL_BASE,
                          PILL[
                            (severityTone(observation.severity) as 'amber' | 'green' | 'red') ??
                              'neutral'
                          ]
                        )}
                      >
                        {observation.severity} severity
                      </span>
                    )}
                  </span>
                }
                footer={
                  <>
                    {/* Quieter action first, primary on the right where the
                        thumb rests — the same order as the log sheet. */}
                    <SecondaryButton onClick={() => setShowShare(true)}>Share</SecondaryButton>
                    <PrimaryButton
                      fullWidth
                      disabled={isExporting && exportingId === observation.id}
                      onClick={() => exportPDF('observation', observation.id)}
                    >
                      {isExporting && exportingId === observation.id ? 'Exporting…' : 'Export PDF'}
                    </PrimaryButton>
                  </>
                }
              >
                {/* Status accent line — bleeds to the sheet edges */}
                <div
                  className={cn('-mx-5 -mt-5 mb-1 h-0.5 bg-gradient-to-r', toneAccent[accentTone])}
                />

                {/* Full description */}
                <div>
                  <Eyebrow className="mb-1.5">Description</Eyebrow>
                  <p className="text-[13.5px] text-white leading-relaxed">
                    {observation.description}
                  </p>
                </div>

                {/* Details */}
                <div>
                  <Eyebrow className="mb-2">Details</Eyebrow>
                  <SafetyListCard>
                    {observation.person_observed && (
                      <div className="flex items-center justify-between gap-3 px-5 py-3">
                        <span className="text-[12px] text-white">Person observed</span>
                        <span className="text-[13px] text-white text-right">
                          {observation.person_observed}
                        </span>
                      </div>
                    )}
                    {observation.location && (
                      <div className="flex items-center justify-between gap-3 px-5 py-3">
                        <span className="text-[12px] text-white">Location</span>
                        <span className="text-[13px] text-white text-right">
                          {observation.location}
                        </span>
                      </div>
                    )}
                    <div className="flex items-center justify-between gap-3 px-5 py-3">
                      <span className="text-[12px] text-white">Recorded</span>
                      <span className="text-[13px] text-white text-right">
                        {formattedDate} at {formattedTime}
                      </span>
                    </div>
                    {linkedJobTitle && (
                      <div className="flex items-center justify-between gap-3 px-5 py-3">
                        <span className="text-[12px] text-white">Project</span>
                        <span className="text-[13px] text-white text-right">{linkedJobTitle}</span>
                      </div>
                    )}
                  </SafetyListCard>
                </div>

                {/* Corrective actions — the real, persisted follow-up tracker
                    (see the file header for why there is no second one). */}
                <CorrectiveActionsPanel sourceType="observation" sourceId={observation.id} />

                {/* Photos */}
                {observation.photos && observation.photos.length > 0 && (
                  <div>
                    <Eyebrow className="mb-2">Photos</Eyebrow>
                    <div className="grid grid-cols-2 gap-2">
                      {observation.photos.map((url, index) => (
                        <div
                          key={index}
                          className="rounded-xl overflow-hidden border border-white/[0.06]"
                        >
                          <img
                            src={url}
                            alt={`Observation photo ${index + 1}`}
                            className="w-full h-auto object-cover max-h-[300px]"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Escalate to Near Miss — improvement_needed only */}
                {showFollowUp && (
                  <SecondaryButton
                    fullWidth
                    onClick={() => {
                      const escalationData = {
                        category: NEAR_MISS_CATEGORY[observation.category] ?? 'other',
                        description: observation.description,
                        location: observation.location || '',
                        severity:
                          observation.severity === 'high'
                            ? 'critical'
                            : observation.severity === 'medium'
                              ? 'medium'
                              : 'low',
                        source_observation_id: observation.id,
                      };
                      storageSetJSONSync('escalate-to-near-miss', escalationData);
                      onClose();
                      window.dispatchEvent(
                        new CustomEvent('navigate-safety-tool', { detail: 'near-miss' })
                      );
                    }}
                  >
                    Escalate to near miss report →
                  </SecondaryButton>
                )}

                {/* Audit trail */}
                <AuditTimeline recordType="observation" recordId={observation.id} />

                <SafetyDocumentShare
                  open={showShare}
                  onClose={() => setShowShare(false)}
                  pdfType="observation"
                  recordId={observation.id}
                  documentTitle={`Safety Observation — ${observation.location || 'Site'}`}
                />
              </SheetShell>
            );
          })()}
      </SheetContent>
    </Sheet>
  );
}

export default ObservationDetailSheet;
