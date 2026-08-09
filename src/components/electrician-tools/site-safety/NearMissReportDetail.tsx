import React, { useState, type ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { Download, Loader2, Share2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { CARD_SURFACE } from '@/components/ui/card-recipe';
import { Eyebrow } from '@/components/college/primitives';
import { NearMissReport, Witness } from './types';
import { useSparkProjects } from '@/hooks/useSparkProjects';
import { useSafetyPDFExport } from '@/hooks/useSafetyPDFExport';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { SafetyMasthead } from './common/SafetyModuleShell';
import { AuditTimeline } from './common/AuditTimeline';
import { SafetyDocumentShare } from './common/SafetyDocumentShare';
import { CorrectiveActionsPanel } from './common/CorrectiveActionsPanel';
import { FiveWhysAnalysis, type FiveWhysEntry } from './common/FiveWhysAnalysis';

interface NearMissReportDetailProps {
  report: NearMissReport;
  onBack: () => void;
  onUpdate?: (updated: Partial<NearMissReport>) => void;
}

/**
 * The root-cause columns live on `near_miss_reports` but are not on the shared
 * `NearMissReport` interface (types.ts is used by several modules and is not
 * this component's to change). Declaring the shape here beats the previous
 * `(report as Record<string, unknown>).five_whys as []` — three casts that
 * TypeScript rejected outright, and which typed the whys array as `never[]`.
 */
type NearMissWithRootCause = NearMissReport & {
  five_whys?: FiveWhysEntry[] | null;
  root_cause_category?: string | null;
  root_cause_analysis?: string | null;
};

const CATEGORY_LABELS: Record<string, string> = {
  electrical_hazard: 'Electrical hazard',
  fire_risk: 'Fire risk',
  fall_hazard: 'Fall hazard',
  ppe_failure: 'PPE failure / issue',
  worksite_hazard: 'Worksite hazard',
  tool_equipment: 'Tool / equipment issue',
  chemical_exposure: 'Chemical exposure',
  manual_handling: 'Manual handling',
  vehicle_incident: 'Vehicle incident',
  other: 'Other',
};

/**
 * Severity and status are labels on a read-only record, so they get the
 * house pill: a neutral chip carrying a coloured word. The old version filled
 * each badge with its own tint (`bg-red-500/20 border-red-500/30` and so on),
 * which put four differently-coloured blocks in one row and left nothing for
 * the eye to rank.
 */
const SEVERITY_LABELS: Record<string, { label: string; text: string }> = {
  low: { label: 'Low', text: 'text-emerald-400' },
  medium: { label: 'Medium', text: 'text-amber-400' },
  high: { label: 'High', text: 'text-orange-400' },
  critical: { label: 'Critical', text: 'text-red-400' },
};

const SEVERITY_EDGE: Record<string, string> = {
  low: 'bg-emerald-400',
  medium: 'bg-amber-400',
  high: 'bg-orange-400',
  critical: 'bg-red-400',
};

const WEATHER_LABELS: Record<string, string> = {
  clear: 'Clear / sunny',
  overcast: 'Overcast',
  rain: 'Rain',
  wind: 'High wind',
  cold: 'Cold / frost',
  hot: 'Hot',
  dark: 'Dark / night',
};

const LIGHTING_LABELS: Record<string, string> = {
  good: 'Good natural light',
  adequate: 'Adequate',
  poor: 'Poor',
  artificial: 'Artificial only',
  dark: 'Very dark / no light',
};

type StatusKey = 'open' | 'in_progress' | 'closed';

const STATUS_CONFIG: Record<StatusKey, { label: string; text: string }> = {
  open: { label: 'Open', text: 'text-amber-400' },
  in_progress: { label: 'In progress', text: 'text-white' },
  closed: { label: 'Closed', text: 'text-emerald-400' },
};

/** The one status move that advances the record from where it is now. */
const NEXT_STATUS: Record<StatusKey, { to: StatusKey; label: string }> = {
  open: { to: 'in_progress', label: 'Start investigation' },
  in_progress: { to: 'closed', label: 'Close out' },
  // A closed report had NO control at all before — the whole action row was
  // hidden behind `currentStatus !== 'closed'`, so closing was a one-way door
  // and a report closed by mistake could never be corrected.
  closed: { to: 'in_progress', label: 'Reopen' },
};

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

function Pill({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex items-center whitespace-nowrap rounded-full border border-white/10 bg-white/[0.05] px-2.5 py-1 text-[11px] font-semibold tracking-[0.04em]',
        className
      )}
    >
      {children}
    </span>
  );
}

function DetailCard({
  eyebrow,
  children,
  className,
}: {
  eyebrow?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'space-y-4 rounded-2xl border border-elec-yellow/35 p-5',
        CARD_SURFACE,
        className
      )}
    >
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      {children}
    </div>
  );
}

/** Label above, value below — no icon. An icon here just restates the label. */
function DataRow({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="space-y-1">
      <div className="text-[11px] font-medium uppercase tracking-[0.14em] text-white">{label}</div>
      <div className="text-[14px] leading-relaxed text-white">{children}</div>
    </div>
  );
}

export const NearMissReportDetail: React.FC<NearMissReportDetailProps> = ({
  report,
  onBack,
  onUpdate,
}) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { exportPDF, isExporting, exportingId } = useSafetyPDFExport();
  const [showShare, setShowShare] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const rootCause = report as NearMissWithRootCause;
  const categoryLabel = CATEGORY_LABELS[report.category] || CATEGORY_LABELS.other;
  const severity = SEVERITY_LABELS[report.severity] || SEVERITY_LABELS.low;

  const currentStatus: StatusKey = (
    STATUS_CONFIG[report.status as StatusKey] ? report.status : 'open'
  ) as StatusKey;
  const statusConf = STATUS_CONFIG[currentStatus];
  const nextStatus = NEXT_STATUS[currentStatus];

  const { projects: jobs = [] } = useSparkProjects('active');
  const linkedJobTitle = report.job_id
    ? (jobs.find((j) => j.id === report.job_id)?.title ?? null)
    : null;

  const handleStatusChange = async (newStatus: StatusKey) => {
    setIsUpdating(true);
    try {
      const completedDate = newStatus === 'closed' ? new Date().toISOString().split('T')[0] : null;

      // Typed against the generated Update shape rather than
      // `Record<string, unknown>` — the loose record defeated the column check
      // entirely, which is how a phantom column in the sibling insert survived.
      //
      // completed_date is cleared for ANY non-closed status. The old code only
      // cleared it on open → in_progress, a transition that can never have set
      // it, so a reopened report kept a completion date and the card showed
      // "Completed: <date>" next to a status of In progress.
      const updates: { status: string; completed_date: string | null } = {
        status: newStatus,
        completed_date: completedDate,
      };

      const { error } = await supabase
        .from('near_miss_reports')
        .update(updates)
        .eq('id', report.id);

      if (error) throw error;

      onUpdate?.({
        // `id` is load-bearing: the list owner matches on `r.id === updated.id`,
        // so a patch without it silently updates nothing in the list behind.
        id: report.id,
        status: newStatus,
        // null, not undefined — the parent spreads this over the existing row,
        // and `undefined` would leave a stale completion date sitting on a
        // report that has just been reopened.
        completed_date: completedDate as string | undefined,
      });

      toast({
        title: 'Status updated',
        description: `Near miss marked as ${STATUS_CONFIG[newStatus].label.toLowerCase()}.`,
      });
    } catch {
      toast({ title: 'Error', description: 'Could not update status.', variant: 'destructive' });
    } finally {
      setIsUpdating(false);
    }
  };

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString('en-GB', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });

  // 24-hour. `incident_time` is a UK site record and the form captures it from
  // a 24-hour <input type="time">; rendering it back as "3:45 PM" changed the
  // notation between entry and review.
  const formatTime = (timeStr: string) => (timeStr || '').slice(0, 5);

  const handleCreateTeamBriefing = () => {
    const sessionId = `near-miss-${Date.now()}`;
    const nearMissData = {
      id: report.id,
      category: report.category,
      categoryLabel,
      severity: report.severity,
      severityLabel: severity.label,
      description: report.description,
      location: report.location,
      incident_date: report.incident_date,
      incident_time: report.incident_time,
      reporter_name: report.reporter_name,
      potential_consequences: report.potential_consequences,
      immediate_actions: report.immediate_actions,
      preventive_measures: report.preventive_measures,
      photo_urls: report.photos,
      witnesses: report.witnesses,
      third_party_involved: report.third_party_involved,
      third_party_details: report.third_party_details,
      weather_conditions: report.weather_conditions,
      lighting_conditions: report.lighting_conditions,
      equipment_involved: report.equipment_involved,
      equipment_faulty: report.equipment_faulty,
      equipment_fault_details: report.equipment_fault_details,
      supervisor_notified: report.supervisor_notified,
      supervisor_name: report.supervisor_name,
      previous_similar_incidents: report.previous_similar_incidents,
    };

    sessionStorage.setItem(`nearMissData_${sessionId}`, JSON.stringify(nearMissData));
    navigate(`/electrician/site-safety?tab=briefings&nearMissSessionId=${sessionId}`);
  };

  const witnesses = Array.isArray(report.witnesses) ? (report.witnesses as Witness[]) : [];
  const hasPeopleInfo = witnesses.length > 0 || report.third_party_involved;
  const hasEnvironmentInfo =
    report.weather_conditions ||
    report.lighting_conditions ||
    report.equipment_involved ||
    report.equipment_faulty;
  const hasInvestigationInfo = report.supervisor_notified || report.previous_similar_incidents;

  // `assigned_to` is a uuid column. Nothing in Site Safety writes it yet, and
  // printing a raw uuid at a user is worse than printing nothing — so only
  // show it once it holds something a person could read.
  const assignedToLabel =
    report.assigned_to && !UUID_RE.test(report.assigned_to) ? report.assigned_to : null;

  const isOverdue =
    !!report.due_date && new Date(report.due_date) < new Date() && currentStatus !== 'closed';

  const secondaryBtn =
    'flex h-11 flex-1 touch-manipulation items-center justify-center gap-2 rounded-xl border border-white/[0.10] bg-white/[0.05] text-[13px] font-medium text-white transition-all duration-150 active:scale-[0.98] active:brightness-125 disabled:opacity-50';

  return (
    <div className="min-h-screen bg-[hsl(0_0%_7%)] pb-44">
      <SafetyMasthead
        onBack={onBack}
        backLabel="Reports"
        moduleName="Near miss report"
        trailing={
          report.incident_number ? (
            <span className="font-mono text-[11px] text-white">{report.incident_number}</span>
          ) : undefined
        }
      />

      <div className="mx-auto max-w-3xl space-y-4 px-4 py-4">
        {/* Summary — the record's identity, and the only place severity is
            allowed to carry a coloured edge. */}
        <DetailCard className="relative overflow-hidden">
          <span
            aria-hidden
            className={cn(
              'absolute inset-y-0 left-0 w-[3px]',
              SEVERITY_EDGE[report.severity] || 'bg-white/20'
            )}
          />
          <div className="flex flex-wrap items-center gap-2">
            <Pill className={severity.text}>{severity.label} severity</Pill>
            <Pill className="text-white">{categoryLabel}</Pill>
            <Pill className={statusConf.text}>{statusConf.label}</Pill>
            {/* Populates once a risk_rating column exists — see the note in
                NearMissReporting.submitReport. */}
            {report.risk_rating != null && (
              <Pill className="text-white">Risk {report.risk_rating}</Pill>
            )}
          </div>

          <p className="text-[15px] leading-relaxed text-white">{report.description}</p>

          <div className="grid gap-4 border-t border-white/[0.08] pt-4 sm:grid-cols-2">
            <DataRow label="Location">{report.location}</DataRow>
            <DataRow label="Date and time">
              {formatDate(report.incident_date)} at {formatTime(report.incident_time)}
            </DataRow>
            <DataRow label="Reported by">{report.reporter_name || 'Anonymous'}</DataRow>
            <DataRow label="Submitted">
              {new Date(report.created_at).toLocaleDateString('en-GB')}
            </DataRow>
            {report.job_id && (
              <DataRow label="Linked project">{linkedJobTitle || 'Linked project'}</DataRow>
            )}
          </div>
        </DetailCard>

        {(report.potential_consequences ||
          report.immediate_actions ||
          report.preventive_measures) && (
          <DetailCard eyebrow="Actions and analysis">
            {report.potential_consequences && (
              <DataRow label="Potential consequences">{report.potential_consequences}</DataRow>
            )}
            {report.immediate_actions && (
              <DataRow label="Immediate actions taken">{report.immediate_actions}</DataRow>
            )}
            {report.preventive_measures && (
              <DataRow label="Preventive measures">{report.preventive_measures}</DataRow>
            )}
          </DetailCard>
        )}

        {hasPeopleInfo && (
          <DetailCard eyebrow="People involved">
            {witnesses.length > 0 && (
              <div className="space-y-2">
                <div className="text-[11px] font-medium uppercase tracking-[0.14em] text-white">
                  Witnesses
                </div>
                {witnesses.map((witness, index) => (
                  <div
                    key={index}
                    className="rounded-xl border border-white/[0.08] bg-white/[0.03] p-3"
                  >
                    <p className="text-[14px] font-medium text-white">{witness.name}</p>
                    {witness.contact && <p className="text-[12px] text-white">{witness.contact}</p>}
                  </div>
                ))}
              </div>
            )}
            {report.third_party_involved && (
              <DataRow label="Third party involved">
                {report.third_party_details || 'Yes (no details provided)'}
              </DataRow>
            )}
          </DetailCard>
        )}

        {hasEnvironmentInfo && (
          <DetailCard eyebrow="Environment and equipment">
            <div className="grid gap-4 sm:grid-cols-2">
              {report.weather_conditions && (
                <DataRow label="Weather">
                  {WEATHER_LABELS[report.weather_conditions] || report.weather_conditions}
                </DataRow>
              )}
              {report.lighting_conditions && (
                <DataRow label="Lighting">
                  {LIGHTING_LABELS[report.lighting_conditions] || report.lighting_conditions}
                </DataRow>
              )}
            </div>
            {report.equipment_involved && (
              <DataRow label="Equipment involved">{report.equipment_involved}</DataRow>
            )}
            {report.equipment_faulty && (
              <div className="rounded-xl border border-orange-500/40 bg-orange-500/15 p-3">
                {/* A binary safety verdict — faulty kit is exactly the case the
                    tinted fill is for. */}
                <p className="text-[13px] font-semibold text-orange-400">
                  Faulty equipment reported
                </p>
                {report.equipment_fault_details && (
                  <p className="mt-1 text-[13px] text-white">{report.equipment_fault_details}</p>
                )}
              </div>
            )}
          </DetailCard>
        )}

        {hasInvestigationInfo && (
          <DetailCard eyebrow="Investigation">
            {report.supervisor_notified && (
              <DataRow label="Supervisor notified">
                Yes{report.supervisor_name ? ` — ${report.supervisor_name}` : ''}
              </DataRow>
            )}
            {report.previous_similar_incidents && (
              <DataRow label="Previous similar incidents">
                <span className="capitalize">{report.previous_similar_incidents}</span>
              </DataRow>
            )}
          </DetailCard>
        )}

        {/* Follow-up state only. The action that changes it is the single
            primary in the bar below, rather than a third button competing
            with Export and Share halfway down the page. */}
        <DetailCard eyebrow="Follow-up">
          <div className="flex flex-wrap items-center gap-2">
            <Pill className={statusConf.text}>{statusConf.label}</Pill>
            {report.follow_up_required && (
              <Pill className="text-amber-400">Follow-up required</Pill>
            )}
            {isOverdue && <Pill className="text-red-400">Overdue</Pill>}
          </div>
          {(assignedToLabel || report.due_date || report.completed_date) && (
            <div className="grid gap-4 border-t border-white/[0.08] pt-4 sm:grid-cols-2">
              {assignedToLabel && <DataRow label="Assigned to">{assignedToLabel}</DataRow>}
              {report.due_date && (
                <DataRow label="Due">
                  {new Date(report.due_date).toLocaleDateString('en-GB')}
                </DataRow>
              )}
              {report.completed_date && (
                <DataRow label="Completed">
                  {new Date(report.completed_date).toLocaleDateString('en-GB')}
                </DataRow>
              )}
            </div>
          )}
        </DetailCard>

        <FiveWhysAnalysis
          table="near_miss_reports"
          recordId={report.id}
          existingWhys={rootCause.five_whys ?? []}
          existingCategory={rootCause.root_cause_category ?? ''}
          existingSummary={rootCause.root_cause_analysis ?? ''}
        />

        <CorrectiveActionsPanel sourceType="near_miss" sourceId={report.id} />

        {report.photos && report.photos.length > 0 && (
          <DetailCard eyebrow="Photos">
            <div className="grid grid-cols-2 gap-2">
              {report.photos.map((url, index) => (
                <div
                  key={index}
                  className="aspect-square overflow-hidden rounded-xl border border-white/[0.08] bg-white/[0.03]"
                >
                  <img
                    src={url}
                    alt={`Evidence photo ${index + 1}`}
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                </div>
              ))}
            </div>
          </DetailCard>
        )}

        <AuditTimeline recordType="near_miss" recordId={report.id} />
      </div>

      {/* Sticky actions. One primary — the move that advances the record — over
          a quieter row of three. Previously all four buttons sat at the same
          weight and the status change was somewhere up the page.
          The bar also had no safe-area inset, so on a notched iPhone the
          bottom row sat under the home indicator. */}
      <div
        className="fixed inset-x-0 bottom-0 border-t border-white/[0.08] bg-[hsl(0_0%_7%)]/95 px-4 py-3 backdrop-blur-sm"
        style={{ paddingBottom: 'max(0.75rem, env(safe-area-inset-bottom))' }}
      >
        <div className="mx-auto max-w-3xl space-y-2">
          <button
            type="button"
            onClick={() => handleStatusChange(nextStatus.to)}
            disabled={isUpdating}
            className="flex h-12 w-full touch-manipulation items-center justify-center gap-2 rounded-xl bg-elec-yellow text-[15px] font-semibold text-black transition-all duration-150 active:scale-[0.99] active:brightness-125 disabled:opacity-50"
          >
            {isUpdating && <Loader2 className="h-4 w-4 animate-spin" aria-hidden />}
            {nextStatus.label}
          </button>
          <div className="flex gap-2">
            <button type="button" onClick={handleCreateTeamBriefing} className={secondaryBtn}>
              Team briefing
            </button>
            <button
              type="button"
              onClick={() => exportPDF('near-miss', report.id)}
              disabled={isExporting && exportingId === report.id}
              className={secondaryBtn}
            >
              {isExporting && exportingId === report.id ? (
                <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
              ) : (
                <Download className="h-4 w-4" aria-hidden />
              )}
              PDF
            </button>
            <button type="button" onClick={() => setShowShare(true)} className={secondaryBtn}>
              <Share2 className="h-4 w-4" aria-hidden />
              Share
            </button>
          </div>
        </div>
      </div>

      <SafetyDocumentShare
        open={showShare}
        onClose={() => setShowShare(false)}
        pdfType="near-miss"
        recordId={report.id}
        documentTitle={`Near Miss Report — ${report.location}`}
      />
    </div>
  );
};
