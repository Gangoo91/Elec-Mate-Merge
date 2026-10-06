import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { RefreshCw } from 'lucide-react';
import {
  PageFrame,
  PageHero,
  AlertRow,
  ListCard,
  ListCardHeader,
  ListBody,
  SectionHeader,
  Pill,
  IconButton,
  EmptyState,
  LoadingBlocks,
} from '@/components/employer/editorial';
import { useIncidents, useIncidentStats, type Incident } from '@/hooks/useIncidents';
import {
  useRAMSDocuments,
  useRAMSDocumentStats,
  type RAMSDocument,
} from '@/hooks/useRAMSDocuments';
import type { Tone } from '@/components/employer/editorial';

const incidentTypeLabels: Record<string, string> = {
  near_miss: 'Near miss',
  unsafe_practice: 'Unsafe practice',
  faulty_equipment: 'Faulty equipment',
  injury: 'Injury',
  property_damage: 'Property damage',
  environmental: 'Environmental',
  security: 'Security',
  other: 'Other',
};

const severityTone: Record<string, Tone> = {
  low: 'blue',
  medium: 'amber',
  high: 'orange',
  critical: 'red',
};

const statusTone: Record<string, Tone> = {
  draft: 'amber',
  submitted: 'blue',
  under_review: 'amber',
  investigating: 'orange',
  resolved: 'emerald',
  closed: 'emerald',
  approved: 'emerald',
  rejected: 'red',
  pending: 'amber',
};

export function SafetyHRSection() {
  const navigate = useNavigate();

  const {
    data: incidents,
    isLoading: incidentsLoading,
    error: incidentsError,
    refetch: refetchIncidents,
  } = useIncidents();
  const { data: incidentStats } = useIncidentStats();
  const {
    data: ramsDocuments,
    isLoading: ramsLoading,
    error: ramsError,
    refetch: refetchRams,
  } = useRAMSDocuments();
  const { data: ramsStats } = useRAMSDocumentStats();

  const isLoading = incidentsLoading || ramsLoading;
  const hasError = incidentsError || ramsError;

  const refresh = () => {
    refetchIncidents();
    refetchRams();
  };



  const recentIncidents = useMemo(() => {
    return (incidents ?? [])
      .slice()
      .sort(
        (a, b) =>
          new Date(b.date_occurred).getTime() - new Date(a.date_occurred).getTime()
      )
      .slice(0, 4);
  }, [incidents]);

  const pendingRamsList = useMemo(() => {
    return (ramsDocuments ?? [])
      .filter((r) => r.status === 'submitted' || (r.status as string) === 'generated')
      .slice(0, 3);
  }, [ramsDocuments]);

  const alertRows: {
    title: string;
    subtitle: string;
    tone: Tone;
    pillTone: Tone;
    pillLabel: string;
    onClick?: () => void;
  }[] = [
    ...recentIncidents.map((incident: Incident) => ({
      title: incident.title,
      subtitle: `${incidentTypeLabels[incident.incident_type] || incident.incident_type} · ${
        incident.location || 'No location'
      } · ${new Date(incident.date_occurred).toLocaleDateString('en-GB')}`,
      tone: severityTone[incident.severity] ?? 'orange',
      pillTone: statusTone[incident.status] ?? 'amber',
      pillLabel: incident.status.replace('_', ' '),
      onClick: () => navigate('/employer?section=incidents'),
    })),
    ...pendingRamsList.map((rams: RAMSDocument) => ({
      title: `RAMS: ${rams.project_name}`,
      subtitle: `${rams.location || 'No location'} · v${rams.version} · ${
        rams.assessor || 'Unassigned'
      }`,
      tone: 'amber' as Tone,
      pillTone: statusTone[rams.status] ?? 'amber',
      pillLabel: rams.status.replace('_', ' '),
      onClick: () => navigate('/employer?section=rams'),
    })),
  ].slice(0, 6);

  if (hasError) {
    return (
      <PageFrame>
        <PageHero
          eyebrow="HR & Safety"
          title="Safety alerts"
          description="Recent incidents and RAMS waiting for sign-off. The Safety hub has the headline numbers."
          tone="red"
          actions={
            <IconButton onClick={refresh} aria-label="Refresh safety data">
              <RefreshCw className="h-4 w-4" />
            </IconButton>
          }
        />
        <EmptyState
          title="Failed to load safety data"
          description="We could not reach incidents or RAMS. Try again in a moment."
          action="Retry"
          onAction={refresh}
        />
      </PageFrame>
    );
  }

  return (
    <PageFrame>
      <PageHero
        eyebrow="HR & Safety"
        title="Safety alerts"
        description="Recent incidents and RAMS waiting for sign-off. The Safety hub has the headline numbers."
        tone="red"
        actions={
          <IconButton onClick={refresh} aria-label="Refresh safety data">
            <RefreshCw className="h-4 w-4" />
          </IconButton>
        }
      />

      {isLoading ? (
        <LoadingBlocks />
      ) : (
        <>
          <div className="space-y-4">
            <SectionHeader
              eyebrow="Live"
              title="Recent alerts"
              meta={
                alertRows.length > 0 ? (
                  <Pill tone="red">{alertRows.length}</Pill>
                ) : undefined
              }
            />
            {alertRows.length === 0 ? (
              <EmptyState
                title="All clear"
                description="No open incidents or pending RAMS. Keep up the safe work."
              />
            ) : (
              <div className="space-y-3">
                {alertRows.map((alert, i) => (
                  <AlertRow
                    key={`${alert.title}-${i}`}
                    tone={alert.tone}
                    title={alert.title}
                    subtitle={alert.subtitle}
                    trailing={<Pill tone={alert.pillTone}>{alert.pillLabel}</Pill>}
                    onClick={alert.onClick}
                  />
                ))}
              </div>
            )}
          </div>

          <ListCard>
            <ListCardHeader
              tone="amber"
              title="Snapshot"
              meta={<Pill tone="yellow">Live</Pill>}
            />
            <ListBody>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-white/[0.06]">
                <div className="bg-[hsl(0_0%_12%)] px-5 py-5">
                  <div className="text-[10px] uppercase tracking-[0.18em] text-white font-medium">
                    Total incidents
                  </div>
                  <div className="mt-3 text-3xl font-semibold tabular-nums text-white">
                    {incidentStats?.total ?? 0}
                  </div>
                </div>
                <div className="bg-[hsl(0_0%_12%)] px-5 py-5">
                  <div className="text-[10px] uppercase tracking-[0.18em] text-white font-medium">
                    Critical
                  </div>
                  <div className="mt-3 text-3xl font-semibold tabular-nums text-red-400">
                    {incidentStats?.critical ?? 0}
                  </div>
                </div>
                <div className="bg-[hsl(0_0%_12%)] px-5 py-5">
                  <div className="text-[10px] uppercase tracking-[0.18em] text-white font-medium">
                    Total RAMS
                  </div>
                  <div className="mt-3 text-3xl font-semibold tabular-nums text-white">
                    {ramsStats?.total ?? 0}
                  </div>
                </div>
                <div className="bg-[hsl(0_0%_12%)] px-5 py-5">
                  <div className="text-[10px] uppercase tracking-[0.18em] text-white font-medium">
                    Approved RAMS
                  </div>
                  <div className="mt-3 text-3xl font-semibold tabular-nums text-emerald-400">
                    {ramsStats?.approved ?? 0}
                  </div>
                </div>
              </div>
            </ListBody>
          </ListCard>
        </>
      )}
    </PageFrame>
  );
}
