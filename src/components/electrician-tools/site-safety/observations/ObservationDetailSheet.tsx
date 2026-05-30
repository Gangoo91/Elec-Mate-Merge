/**
 * ObservationDetailSheet — editorial detail view for a single safety observation.
 * Monochrome with one colour dimension (type / severity / status) carried by a
 * thin accent line and small uppercase pills. SheetShell layout, sticky footer.
 */

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import type { SafetyObservation, ObservationStatus } from '@/hooks/useSafetyObservations';
import { useUpdateObservation } from '@/hooks/useSafetyObservations';
import { useSafetyPDFExport } from '@/hooks/useSafetyPDFExport';
import { useSparkProjects } from '@/hooks/useSparkProjects';
import { AuditTimeline } from '../common/AuditTimeline';
import { SafetyDocumentShare } from '../common/SafetyDocumentShare';
import { CorrectiveActionsPanel } from '../common/CorrectiveActionsPanel';
import { storageSetJSONSync } from '@/utils/storage';
import {
  SheetShell,
  Eyebrow,
  ListCard,
  PrimaryButton,
  SecondaryButton,
  toneAccent,
  type Tone,
} from '@/components/college/primitives';

// ─── Status / type / severity colour (the single colour dimension) ───

const STATUS_LABEL: Record<ObservationStatus, string> = {
  open: 'Open',
  in_progress: 'In Progress',
  closed: 'Closed',
};

const PILL: Record<'amber' | 'green' | 'red' | 'blue' | 'neutral', string> = {
  amber: 'bg-amber-500/10 text-amber-400 border-amber-500/25',
  green: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/25',
  red: 'bg-red-500/10 text-red-400 border-red-500/25',
  blue: 'bg-blue-500/10 text-blue-400 border-blue-500/25',
  neutral: 'bg-white/[0.05] text-white/55 border-white/10',
};

function StatusPill({ status }: { status: ObservationStatus }) {
  const key = status === 'open' ? 'amber' : status === 'in_progress' ? 'blue' : 'green';
  return (
    <span
      className={cn(
        'inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium uppercase tracking-[0.12em] border whitespace-nowrap',
        PILL[key]
      )}
    >
      {STATUS_LABEL[status]}
    </span>
  );
}

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

export function ObservationDetailSheet({ observation, open, onClose }: ObservationDetailSheetProps) {
  const { exportPDF, isExporting, exportingId } = useSafetyPDFExport();
  const [showShare, setShowShare] = useState(false);
  const updateObservation = useUpdateObservation();
  const { data: jobs = [] } = useSparkProjects('active');
  const linkedJobTitle = observation?.job_id
    ? jobs.find((j) => j.id === observation.job_id)?.title ?? 'Linked project'
    : null;

  const handleStatusChange = (newStatus: ObservationStatus) => {
    if (!observation) return;
    updateObservation.mutate({
      id: observation.id,
      status: newStatus,
      ...(newStatus === 'closed' ? { completed_date: new Date().toISOString().split('T')[0] } : {}),
    });
  };

  return (
    <Sheet open={open} onOpenChange={(v) => !v && onClose()}>
      <SheetContent side="bottom" className="h-[90vh] p-0 rounded-t-2xl overflow-hidden border-white/[0.08]">
        {observation &&
          (() => {
            const isPositive = observation.observation_type === 'positive';
            const currentStatus: ObservationStatus = observation.status || 'open';
            const showFollowUp = !isPositive;
            const sevTone = severityTone(observation.severity);
            const accentTone: Tone = isPositive
              ? 'green'
              : sevTone ?? (currentStatus === 'closed' ? 'green' : currentStatus === 'in_progress' ? 'blue' : 'amber');

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
            const overdue =
              !!observation.due_date &&
              new Date(observation.due_date) < new Date() &&
              currentStatus !== 'closed';

            return (
              <SheetShell
                eyebrow={`${isPositive ? 'Positive observation' : 'Improvement needed'} · ${observation.category}`}
                title={observation.description.length > 64 ? `${observation.description.slice(0, 64)}…` : observation.description}
                description={
                  <span className="inline-flex items-center gap-2 flex-wrap">
                    {showFollowUp && <StatusPill status={currentStatus} />}
                    {observation.severity && (
                      <span
                        className={cn(
                          'inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium uppercase tracking-[0.12em] border whitespace-nowrap',
                          PILL[(severityTone(observation.severity) as 'amber' | 'green' | 'red') ?? 'neutral']
                        )}
                      >
                        {observation.severity} severity
                      </span>
                    )}
                    {overdue && (
                      <span className={cn('inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium uppercase tracking-[0.12em] border whitespace-nowrap', PILL.red)}>
                        Overdue
                      </span>
                    )}
                  </span>
                }
                footer={
                  <>
                    <PrimaryButton
                      fullWidth
                      disabled={isExporting && exportingId === observation.id}
                      onClick={() => exportPDF('observation', observation.id)}
                    >
                      {isExporting && exportingId === observation.id ? 'Exporting…' : 'Export PDF'}
                    </PrimaryButton>
                    <SecondaryButton onClick={() => setShowShare(true)}>Share</SecondaryButton>
                  </>
                }
              >
                {/* Status accent line — bleeds to the sheet edges */}
                <div className={cn('-mx-5 -mt-5 mb-1 h-0.5 bg-gradient-to-r', toneAccent[accentTone])} />

                {/* Full description */}
                <div>
                  <Eyebrow className="mb-1.5">Description</Eyebrow>
                  <p className="text-[13.5px] text-white/90 leading-relaxed">{observation.description}</p>
                </div>

                {/* Details */}
                <div>
                  <Eyebrow className="mb-2">Details</Eyebrow>
                  <ListCard>
                    {observation.person_observed && (
                      <div className="flex items-center justify-between gap-3 px-5 py-3">
                        <span className="text-[12px] text-white/55">Person observed</span>
                        <span className="text-[13px] text-white text-right">{observation.person_observed}</span>
                      </div>
                    )}
                    {observation.location && (
                      <div className="flex items-center justify-between gap-3 px-5 py-3">
                        <span className="text-[12px] text-white/55">Location</span>
                        <span className="text-[13px] text-white text-right">{observation.location}</span>
                      </div>
                    )}
                    <div className="flex items-center justify-between gap-3 px-5 py-3">
                      <span className="text-[12px] text-white/55">Recorded</span>
                      <span className="text-[13px] text-white text-right">
                        {formattedDate} at {formattedTime}
                      </span>
                    </div>
                    {linkedJobTitle && (
                      <div className="flex items-center justify-between gap-3 px-5 py-3">
                        <span className="text-[12px] text-white/55">Project</span>
                        <span className="text-[13px] text-white text-right">{linkedJobTitle}</span>
                      </div>
                    )}
                  </ListCard>
                </div>

                {/* Follow-up — improvement_needed only */}
                {showFollowUp && (
                  <div>
                    <Eyebrow className="mb-2">Follow-up</Eyebrow>
                    <ListCard>
                      <div className="flex items-center justify-between gap-3 px-5 py-3">
                        <span className="text-[12px] text-white/55">Status</span>
                        <StatusPill status={currentStatus} />
                      </div>
                      {observation.follow_up_required && (
                        <div className="flex items-center justify-between gap-3 px-5 py-3">
                          <span className="text-[12px] text-white/55">Action</span>
                          <span className="text-[13px] text-amber-400 text-right">Follow-up required</span>
                        </div>
                      )}
                      {observation.assigned_to && (
                        <div className="flex items-center justify-between gap-3 px-5 py-3">
                          <span className="text-[12px] text-white/55">Assigned to</span>
                          <span className="text-[13px] text-white text-right">{observation.assigned_to}</span>
                        </div>
                      )}
                      {observation.due_date && (
                        <div className="flex items-center justify-between gap-3 px-5 py-3">
                          <span className="text-[12px] text-white/55">Due</span>
                          <span className={cn('text-[13px] text-right', overdue ? 'text-red-400' : 'text-white')}>
                            {new Date(observation.due_date).toLocaleDateString('en-GB')}
                          </span>
                        </div>
                      )}
                      {observation.completed_date && (
                        <div className="flex items-center justify-between gap-3 px-5 py-3">
                          <span className="text-[12px] text-white/55">Completed</span>
                          <span className="text-[13px] text-emerald-400 text-right">
                            {new Date(observation.completed_date).toLocaleDateString('en-GB')}
                          </span>
                        </div>
                      )}
                    </ListCard>

                    {/* Status actions */}
                    {currentStatus !== 'closed' && (
                      <div className="flex gap-2 pt-3">
                        {currentStatus === 'open' && (
                          <PrimaryButton
                            fullWidth
                            disabled={updateObservation.isPending}
                            onClick={() => handleStatusChange('in_progress')}
                          >
                            {updateObservation.isPending ? 'Saving…' : 'Start action'}
                          </PrimaryButton>
                        )}
                        {currentStatus === 'in_progress' && (
                          <>
                            <PrimaryButton
                              fullWidth
                              disabled={updateObservation.isPending}
                              onClick={() => handleStatusChange('closed')}
                            >
                              {updateObservation.isPending ? 'Saving…' : 'Close'}
                            </PrimaryButton>
                            <SecondaryButton
                              disabled={updateObservation.isPending}
                              onClick={() => handleStatusChange('open')}
                            >
                              Reopen
                            </SecondaryButton>
                          </>
                        )}
                      </div>
                    )}
                  </div>
                )}

                {/* Corrective actions */}
                <CorrectiveActionsPanel sourceType="observation" sourceId={observation.id} />

                {/* Photos */}
                {observation.photos && observation.photos.length > 0 && (
                  <div>
                    <Eyebrow className="mb-2">Photos</Eyebrow>
                    <div className="grid grid-cols-2 gap-2">
                      {observation.photos.map((url, index) => (
                        <div key={index} className="rounded-xl overflow-hidden border border-white/[0.06]">
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
                        category: observation.category,
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
                      window.dispatchEvent(new CustomEvent('navigate-safety-tool', { detail: 'near-miss' }));
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
