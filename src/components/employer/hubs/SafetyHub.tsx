import { useMemo, type ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { format, parseISO } from 'date-fns';
import { cn } from '@/lib/utils';
import type { Section } from '@/pages/employer/EmployerDashboard';
import {
  INCIDENT_TYPE_LABEL,
  incidentNextStep,
  isIncidentClosed,
  useIncidents,
  useIncidentStats,
} from '@/hooks/useIncidents';
import { usePolicyStats } from '@/hooks/usePolicies';
import { useTrainingRecords, useTrainingStats } from '@/hooks/useTrainingRecords';
import { useContractStats } from '@/hooks/useContracts';
import { useFirmSafetyOverview } from '@/hooks/useFirmSafetyOverview';
import { useComplianceDocuments, useComplianceStats } from '@/hooks/useComplianceDocuments';
import { useFirmCredentials } from '@/hooks/useFirmCredentials';
import { useCompanyTools } from '@/hooks/useCompanyTools';
import { useBriefings } from '@/hooks/useBriefings';
import { useEmployerHubCounts } from '@/hooks/useFinanceModel';
import { useEmployerHome } from '@/hooks/useEmployerHome';
import { useFirmChecklistOverview } from '@/hooks/usePrestartChecklists';
import {
  SETTINGS_INSURANCE_ID,
  SETTINGS_SCHEME_ID,
  accreditationLabel,
} from '@/components/employer/compliance/credentials';
import { PageFrame, PageHero, LoadingBlocks } from '@/components/employer/editorial';
import {
  frameClass,
  HeroActions,
  HeroPrimary,
  HeroSecondary,
  plural,
} from '@/components/employer/pageParts/PageParts';
import { PageHelpButton, HowItWorks } from '@/components/hub/PageHelp';
import { SAFETY_HUB_HELP } from '@/components/employer/help/safety-hub';
import {
  SectionHead,
  StatCards,
  ListPanel,
  PageTiles,
  areaCard,
  type IndexLink,
  type ListItem,
} from '@/components/employer/hubs/AreaPage';
import { matePad, daysFromToday, ymd } from '@/components/employer/hubs/HubPanels';

interface SafetyHubProps {
  onNavigate: (section: Section) => void;
}

const shortDay = (d: string | null | undefined) =>
  d ? format(parseISO(d.slice(0, 10)), 'd MMM') : '';

/* ── A dated list: the ListPanel row with the month shown ──────────────
 * Renewals run across three months and recent records further back, so the
 * date column reads "Nov 14" rather than ListPanel's weekday. Same container,
 * same row, same type.
 */
interface DatedRow extends ListItem {
  date: string;
}

function DatedList({
  items,
  empty,
  footer,
  className,
}: {
  items: DatedRow[];
  empty: ReactNode;
  footer?: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn(areaCard, 'flex flex-col overflow-hidden', className)}>
      {items.length === 0 ? (
        <p className="px-4 py-4 text-[14px] leading-relaxed text-white sm:px-5">{empty}</p>
      ) : (
        <ul className="divide-y divide-white/[0.08]">
          {items.map((it) => {
            const dt = parseISO(it.date);
            const Tag = it.onOpen ? 'button' : 'div';
            return (
              <li key={it.key}>
                <Tag
                  {...(it.onOpen ? { type: 'button' as const, onClick: it.onOpen } : {})}
                  className="flex min-h-[60px] w-full items-center gap-4 px-4 py-3 text-left touch-manipulation transition-colors hover:bg-white/[0.04] sm:px-5"
                >
                  <span className="w-11 shrink-0 text-center">
                    <span className="block text-[11.5px] font-medium text-white">
                      {format(dt, 'MMM')}
                    </span>
                    <span className="block text-[17px] font-semibold leading-tight tabular-nums text-white">
                      {format(dt, 'd')}
                    </span>
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-[14.5px] font-semibold leading-snug text-white">
                      {it.title}
                    </span>
                    {it.detail && (
                      <span className="mt-0.5 block text-[13px] leading-snug text-white">
                        {it.detail}
                      </span>
                    )}
                  </span>
                  {it.status && (
                    <span
                      className={cn(
                        'shrink-0 text-right text-[13px] font-semibold',
                        it.tone === 'red'
                          ? 'text-red-400'
                          : it.tone === 'yellow'
                            ? 'text-elec-yellow'
                            : 'text-white'
                      )}
                    >
                      {it.status}
                    </span>
                  )}
                </Tag>
              </li>
            );
          })}
        </ul>
      )}
      {footer && (
        <div className="mt-auto border-t border-white/[0.08] px-4 py-3 sm:px-5">{footer}</div>
      )}
    </div>
  );
}

const FootLink = ({ onClick, children }: { onClick: () => void; children: ReactNode }) => (
  <button
    type="button"
    onClick={onClick}
    className="-my-3 h-11 text-left text-[13.5px] font-semibold text-elec-yellow touch-manipulation"
  >
    {children}
  </button>
);

type Kind = 'credential' | 'kit';
interface Renewal {
  id: string;
  title: string;
  detail: string;
  date: string;
  kind: Kind;
  open: () => void;
}

/**
 * Safety landing, on the area page template (10 Oct): one live line, four
 * figures, the renewals due in the next 90 days, what needs you beside what
 * happened on site lately, then every Safety page as a tile with its figure.
 */
export function SafetyHub({ onNavigate }: SafetyHubProps) {
  const navigate = useNavigate();
  const { data: incidentStats, isLoading: incidentsLoading } = useIncidentStats();
  // Same query and key as the stats, so the list costs no extra call.
  const { data: incidents = [] } = useIncidents();
  const { data: hubCounts, isLoading: ramsLoading } = useEmployerHubCounts();
  const { data: policyStats, isLoading: policiesLoading } = usePolicyStats();
  const { data: trainingStats, isLoading: trainingLoading } = useTrainingStats();
  // Same key as the stats ('elec-id-profiles'): the records with their dates.
  const { data: trainingRecords = [] } = useTrainingRecords();
  const { data: contractStats } = useContractStats();
  // Site Safety's firm picture: permits, RIDDOR, countersigning (ELE-2031).
  const { data: safetyOverview } = useFirmSafetyOverview();
  const { data: complianceStats } = useComplianceStats();
  // The register itself (the Compliance page's cache) for the renewals.
  const { data: complianceDocs } = useComplianceDocuments();
  // Insurance and scheme from the one source, Settings (Gap #10).
  const { data: credentials } = useFirmCredentials();
  // The kit register (shared with Jobs): PAT and calibration dates.
  const { data: tools = [] } = useCompanyTools();
  // The Toolbox briefings page's own list, with sign-off counts.
  const { data: briefings = [] } = useBriefings();
  // The Overview's one round trip (cached): packs, RIDDOR, vehicle defects.
  const { data: home } = useEmployerHome();
  // Pre-start checks (ELE-1826): live jobs with a required check still open.
  const { data: checkJobs } = useFirmChecklistOverview(false);

  const today = ymd(new Date());
  const openIncidents = incidentStats?.open ?? 0;
  // Submitted and AI-generated RAMS across the firm; drafts are not pending.
  const pendingRams = hubCounts?.safety.rams_pending ?? 0;
  const policiesCount = policyStats?.total ?? 0;
  const trainingExpired = trainingStats?.expired ?? 0;
  const trainingDue = (trainingStats?.expiringsSoon ?? 0) + trainingExpired;
  const checksGaps = (checkJobs ?? []).filter((j) => j.open_count > 0).length;
  const docsExpired = complianceStats?.expired ?? 0;
  const docsExpiring = complianceStats?.expiring ?? 0;
  const permitsLive = safetyOverview?.permits_live ?? 0;
  const toCountersign = safetyOverview?.to_countersign ?? 0;
  const s = home?.safety;
  const riddorDue = Math.max(s?.riddor_due ?? 0, safetyOverview?.riddor_pending ?? 0);

  /* ── Renewals: register, Settings, training and kit ─────────────── */

  const renewals = useMemo(() => {
    const rows: Renewal[] = [];
    const settingsAreas = new Set(
      (credentials ?? []).filter((c) => c.source === 'settings' && c.expiry).map((c) => c.area)
    );
    for (const d of complianceDocs ?? []) {
      if (!d.expiry_date) continue;
      // A Settings record's certificate file: the Settings row carries the date.
      if (d.certificate_for === 'settings_insurance' && settingsAreas.has('insurance')) continue;
      if (d.certificate_for === 'settings_scheme' && settingsAreas.has('accreditation')) continue;
      rows.push({
        id: d.id,
        title: d.title,
        detail: [
          d.category,
          d.insurer ||
            (d.accreditation ? accreditationLabel(d.accreditation) : null) ||
            d.site_name,
        ]
          .filter(Boolean)
          .join(' · '),
        date: d.expiry_date.slice(0, 10),
        kind: 'credential',
        open: () => navigate(`/employer?section=compliance&doc=${encodeURIComponent(d.id)}`),
      });
    }
    for (const c of credentials ?? []) {
      if (c.source !== 'settings' || !c.expiry) continue;
      const id = c.area === 'insurance' ? SETTINGS_INSURANCE_ID : SETTINGS_SCHEME_ID;
      rows.push({
        id,
        title: c.title || (c.area === 'insurance' ? 'Insurance' : 'Scheme membership'),
        detail: [c.area === 'insurance' ? 'Insurance' : 'Scheme', c.provider]
          .filter(Boolean)
          .join(' · '),
        date: c.expiry.slice(0, 10),
        kind: 'credential',
        open: () => navigate(`/employer?section=compliance&doc=${encodeURIComponent(id)}`),
      });
    }
    for (const t of trainingRecords) {
      if (!t.expiry_date) continue;
      rows.push({
        id: `training-${t.id}`,
        title: t.training_name,
        detail: ['Training', t.employee?.name, t.provider].filter(Boolean).join(' · '),
        date: t.expiry_date.slice(0, 10),
        kind: 'credential',
        open: () => onNavigate('training'),
      });
    }
    for (const k of tools) {
      if (k.status === 'Lost' || k.status === 'Written Off') continue;
      if (k.pat_due)
        rows.push({
          id: `pat-${k.id}`,
          title: k.name,
          detail: 'PAT test',
          date: k.pat_due.slice(0, 10),
          kind: 'kit',
          open: () => onNavigate('kit'),
        });
      if (k.next_calibration)
        rows.push({
          id: `cal-${k.id}`,
          title: k.name,
          detail: 'Calibration',
          date: k.next_calibration.slice(0, 10),
          kind: 'kit',
          open: () => onNavigate('kit'),
        });
    }
    return rows.sort((a, b) => (a.date < b.date ? -1 : a.date > b.date ? 1 : 0));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [complianceDocs, credentials, trainingRecords, tools]);

  const creds = renewals.filter((r) => r.kind === 'credential');
  const credsInDate = creds.filter((r) => r.date >= today).length;
  const nextRenewal = renewals.find((r) => r.date >= today);
  const window90 = renewals.filter((r) => daysFromToday(r.date) <= 90);
  const overdueCount = window90.filter((r) => r.date < today).length;
  const shown = window90.slice(0, 8);
  const moreIn90 = window90.length - shown.length;
  const laterCount = renewals.length - window90.length;

  const renewalRows: DatedRow[] = shown.map((r) => {
    const n = daysFromToday(r.date);
    return {
      key: r.id,
      date: r.date,
      title: r.title,
      detail: r.detail || undefined,
      status:
        n < 0
          ? `${plural(-n, 'day')} overdue`
          : n === 0
            ? 'Today'
            : n <= 30
              ? `In ${plural(n, 'day')}`
              : `In ${plural(Math.round(n / 7), 'week')}`,
      tone: n < 0 ? 'red' : n <= 30 ? 'yellow' : undefined,
      onOpen: r.open,
    };
  });

  /* ── Needs you ─────────────────────────────────────────────────── */

  const openList = incidents
    .filter((i) => !isIncidentClosed(i))
    .sort((a, b) => ((a.date_occurred ?? '') < (b.date_occurred ?? '') ? 1 : -1));

  // Delivered talks in the last 30 days that someone listed has not signed.
  const since30 = ymd(new Date(Date.now() - 30 * 864e5));
  const unsignedBriefings = briefings.filter(
    (b) =>
      b.status === 'Completed' &&
      b.date >= since30 &&
      (b.attendee_count ?? 0) > (b.acknowledged_count ?? 0)
  );
  const signaturesOwed = unsignedBriefings.reduce(
    (n, b) => n + (b.attendee_count ?? 0) - (b.acknowledged_count ?? 0),
    0
  );

  const work: ListItem[] = [];
  for (const i of openList.slice(0, 3)) {
    const next = incidentNextStep(i);
    work.push({
      key: `inc-${i.id}`,
      title: i.title,
      detail: [shortDay(i.date_occurred) || null, i.job_title, next.label]
        .filter(Boolean)
        .join(' · '),
      status:
        next.tone === 'red' ? 'Act now' : next.tone === 'amber' ? 'Follow up' : 'Ready to close',
      tone: next.tone === 'red' ? 'red' : next.tone === 'amber' ? 'yellow' : undefined,
      onOpen: () => navigate(`/employer?section=incidents&incident=${i.id}`),
    });
  }
  if (pendingRams > 0)
    work.push({
      key: 'rams',
      title: `${plural(pendingRams, 'RAMS', 'RAMS')} to sign off`,
      detail: 'Check them before the crew goes to site',
      status: 'Review',
      tone: 'yellow',
      onOpen: () => onNavigate('rams'),
    });
  if (unsignedBriefings.length > 0)
    work.push({
      key: 'briefings',
      title: `${plural(unsignedBriefings.length, 'toolbox talk')} not fully signed`,
      detail: `${unsignedBriefings[0].title} · ${plural(signaturesOwed, 'signature')} owed`,
      status: 'Chase',
      tone: 'yellow',
      onOpen: () => onNavigate('briefings'),
    });
  if (s && s.packs_unsigned > 0)
    work.push({
      key: 'packs',
      title: `${plural(s.packs_unsigned, 'job pack')} not signed by the crew`,
      detail: s.pack_first
        ? `${s.pack_first.title} · ${plural(s.pack_first.waiting, 'signature')} waiting`
        : 'Waiting on crew signatures',
      status: 'Chase',
      tone: 'yellow',
      onOpen: () => onNavigate('jobpacks'),
    });
  if (checksGaps > 0)
    work.push({
      key: 'checks',
      title: `${plural(checksGaps, 'live job')} with checks missing`,
      detail: 'Pre-start checks not ticked and signed',
      status: `${checksGaps} missing`,
      tone: 'yellow',
      onOpen: () => onNavigate('checklists'),
    });
  if (toCountersign > 0)
    work.push({
      key: 'countersign',
      title: `${plural(toCountersign, 'record')} to countersign`,
      detail: 'Site Safety records the team made',
      status: 'Sign',
      tone: 'yellow',
      onOpen: () => onNavigate('sitesafety'),
    });
  if (s && (s.vehicle_defects ?? 0) > 0)
    work.push({
      key: 'vehicles',
      title: `${plural(s.vehicle_defects ?? 0, 'vehicle defect')} not fixed`,
      detail: s.vehicle_defect_first?.off_road
        ? `${s.vehicle_defect_first.registration ?? 'A vehicle'} is off the road`
        : 'Reported by a driver',
      status: s.vehicle_defect_first?.off_road ? 'Off the road' : 'Defect',
      tone: s.vehicle_defect_first?.off_road ? 'red' : 'yellow',
      onOpen: () => onNavigate('fleet'),
    });

  /* ── Recent on site: incidents, near misses and talks, newest first ── */

  const recent: DatedRow[] = useMemo(() => {
    const rows: (DatedRow & { sort: string })[] = [];
    for (const i of incidents) {
      if (!i.date_occurred) continue;
      const closed = isIncidentClosed(i);
      rows.push({
        key: `inc-${i.id}`,
        sort: i.date_occurred,
        date: i.date_occurred.slice(0, 10),
        title: i.title,
        detail:
          [
            (INCIDENT_TYPE_LABEL[i.incident_type] ?? 'Incident') === i.title
              ? null
              : (INCIDENT_TYPE_LABEL[i.incident_type] ?? 'Incident'),
            i.job_title,
            i.location,
          ]
            .filter(Boolean)
            .join(' · ') || undefined,
        status: closed ? 'Closed' : 'Open',
        tone: closed ? undefined : i.incident_type === 'near_miss' ? 'yellow' : 'red',
        onOpen: () => navigate(`/employer?section=incidents&incident=${i.id}`),
      });
    }
    for (const b of briefings) {
      if (b.status === 'Cancelled' || !b.date || b.date.slice(0, 10) > today) continue;
      const total = b.attendee_count ?? 0;
      const signed = b.acknowledged_count ?? 0;
      const done = b.status === 'Completed';
      rows.push({
        key: `brief-${b.id}`,
        sort: `${b.date.slice(0, 10)}T${b.time ?? '00:00'}`,
        date: b.date.slice(0, 10),
        title: b.title,
        detail: [
          'Toolbox talk',
          b.job?.title ?? b.location,
          total > 0 ? `${signed} of ${total} signed` : null,
        ]
          .filter(Boolean)
          .join(' · '),
        status: done ? (total > signed ? `${total - signed} to sign` : 'Delivered') : 'To complete',
        tone: !done || total > signed ? 'yellow' : undefined,
        onOpen: () => onNavigate('briefings'),
      });
    }
    return rows.sort((a, b) => (a.sort < b.sort ? 1 : -1)).slice(0, 6);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [incidents, briefings, today]);

  /* ── The live line ─────────────────────────────────────────────── */

  const todo: string[] = [];
  if (openIncidents > 0) todo.push(plural(openIncidents, 'open incident'));
  if (riddorDue > 0) todo.push(`${plural(riddorDue, 'RIDDOR report')} due`);
  if (pendingRams > 0) todo.push(`${plural(pendingRams, 'RAMS', 'RAMS')} to sign off`);
  if (checksGaps > 0) todo.push(`${plural(checksGaps, 'live job')} with checks missing`);
  if (toCountersign > 0) todo.push(`${plural(toCountersign, 'record')} to countersign`);
  if (overdueCount > 0) todo.push(`${plural(overdueCount, 'renewal')} overdue`);
  const standing = permitsLive > 0 ? `${plural(permitsLive, 'permit')} live` : 'No permits live';
  const liveLine =
    todo.length > 0 ? `${todo.join(', ')}. ${standing}.` : `Nothing waiting on you. ${standing}.`;

  if (incidentsLoading || ramsLoading || policiesLoading || trainingLoading) {
    return (
      <PageFrame className={frameClass}>
        <PageHero title="Safety" description="Loading RAMS, incidents, training and compliance." />
        <LoadingBlocks />
      </PageFrame>
    );
  }

  /* ── Every page in Safety ──────────────────────────────────────── */

  const val = (n: number | undefined, sub: string) =>
    n && n > 0 ? `${n.toLocaleString('en-GB')} ${sub}` : undefined;
  const alertsCount = openIncidents + pendingRams;

  const beforeLinks: IndexLink[] = [
    {
      title: 'Job packs',
      detail:
        s && s.packs_unsigned > 0
          ? 'Waiting on crew signatures'
          : 'Scope, RAMS and briefing your crew signs',
      value: val(s?.packs_unsigned, 'to sign'),
      onClick: () => onNavigate('jobpacks'),
    },
    {
      title: 'Checklists',
      detail: !checkJobs
        ? 'What must be signed before anyone starts'
        : checkJobs.length === 0
          ? 'No job has checks yet'
          : checksGaps > 0
            ? 'Checks missing on live jobs'
            : 'All checks in',
      value: checksGaps > 0 ? `${checksGaps} missing` : val(checkJobs?.length, 'live'),
      onClick: () => onNavigate('checklists'),
    },
    {
      title: 'Site Safety',
      detail: 'Permits, hazards, recalls and HSE guidance',
      value: val(permitsLive, permitsLive === 1 ? 'permit live' : 'permits live'),
      onClick: () => onNavigate('sitesafety'),
    },
    {
      title: 'RAMS',
      detail: pendingRams > 0 ? 'Waiting for your sign-off' : 'None awaiting sign-off',
      value: val(pendingRams, 'to sign off'),
      onClick: () => onNavigate('rams'),
    },
    {
      title: 'Toolbox briefings',
      detail:
        unsignedBriefings.length > 0
          ? `${plural(signaturesOwed, 'signature')} owed`
          : !safetyOverview
            ? 'Pre-job safety talks and sign-offs'
            : safetyOverview.briefings_30d === 0
              ? 'None in the last 30 days'
              : `${plural(safetyOverview.briefing_signatures_30d, 'signature')} in 30 days`,
      value: val(safetyOverview?.briefings_30d, 'in 30 days'),
      onClick: () => onNavigate('briefings'),
    },
  ];

  const whenLinks: IndexLink[] = [
    {
      title: 'Incidents',
      detail:
        riddorDue > 0
          ? `${plural(riddorDue, 'RIDDOR report')} due`
          : openIncidents > 0
            ? 'Follow up and close'
            : 'Log accidents and near misses',
      problem: openIncidents > 0,
      value: val(openIncidents, 'open'),
      onClick: () => onNavigate('incidents'),
    },
    {
      title: 'Safety alerts',
      detail: alertsCount > 0 ? 'Need attention, newest first' : 'Nothing needs attention',
      value: val(alertsCount, 'to check'),
      onClick: () => onNavigate('safety'),
    },
  ];

  const paperLinks: IndexLink[] = [
    {
      title: 'Compliance',
      detail: !complianceStats
        ? 'Insurance, PAT, calibration, audits and permits'
        : complianceStats.total === 0
          ? 'No documents yet'
          : docsExpired + docsExpiring > 0
            ? `${docsExpired} expired, ${docsExpiring} expiring`
            : 'All in date',
      problem: docsExpired > 0,
      value: val(complianceStats?.total, 'documents'),
      onClick: () => onNavigate('compliance'),
    },
    {
      title: 'Training records',
      detail: !trainingStats
        ? 'Certifications, courses and renewals'
        : trainingStats.total === 0
          ? 'No records yet'
          : trainingDue > 0
            ? `${trainingDue} expired or due in 30 days`
            : 'None due',
      problem: trainingExpired > 0,
      value: val(trainingStats?.total, 'records'),
      onClick: () => onNavigate('training'),
    },
    {
      title: 'Policies',
      detail: policiesCount > 0 ? 'Live and shared with the team' : 'Build your library',
      value: val(policiesCount, 'live'),
      onClick: () => onNavigate('policies'),
    },
    {
      title: 'Contracts',
      detail: !contractStats
        ? 'Every agreement, with end dates'
        : contractStats.total === 0
          ? 'No contracts yet'
          : contractStats.expiringSoon > 0
            ? `${plural(contractStats.expiringSoon, 'contract')} ending within 30 days`
            : 'None ending soon',
      value: val(contractStats?.active, 'active'),
      onClick: () => onNavigate('contracts'),
    },
  ];

  const nextIn = nextRenewal ? daysFromToday(nextRenewal.date) : null;

  return (
    <PageFrame className={cn(frameClass, matePad)}>
      <PageHero
        title="Safety"
        description={liveLine}
        actions={
          <HeroActions>
            <HeroPrimary onClick={() => navigate('/employer?section=incidents&new=incident')}>
              Report an incident
            </HeroPrimary>
            <HeroSecondary onClick={() => onNavigate('rams')}>RAMS</HeroSecondary>
            <PageHelpButton help={SAFETY_HUB_HELP} askContext={{ page: 'safetyhub' }} />
          </HeroActions>
        }
      />

      <HowItWorks help={SAFETY_HUB_HELP} askContext={{ page: 'safetyhub' }} />

      <StatCards
        stats={[
          {
            label: 'Open incidents',
            value: openIncidents,
            sub:
              riddorDue > 0
                ? `${plural(riddorDue, 'RIDDOR report')} due`
                : openIncidents > 0
                  ? 'Follow up and close'
                  : 'None open',
            tone: openIncidents > 0 ? 'red' : undefined,
            onOpen: () => onNavigate('incidents'),
          },
          {
            label: 'RAMS to sign off',
            value: pendingRams,
            sub: pendingRams > 0 ? 'Waiting on you' : 'None waiting',
            onOpen: () => onNavigate('rams'),
          },
          {
            label: 'Credentials in date',
            value: creds.length > 0 ? `${credsInDate} of ${creds.length}` : 'None',
            sub:
              creds.length === 0
                ? 'Add insurance, scheme and training dates'
                : credsInDate < creds.length
                  ? `${plural(creds.length - credsInDate, 'expired', 'expired')}`
                  : 'Insurance, scheme, documents and training',
            tone: creds.length > credsInDate ? 'red' : undefined,
            progress: creds.length > 0 ? credsInDate / creds.length : undefined,
            onOpen: () => onNavigate('compliance'),
          },
          {
            label: 'Next renewal',
            value: nextRenewal ? shortDay(nextRenewal.date) : 'None',
            sub: nextRenewal
              ? `${nextRenewal.title}${nextIn !== null ? `, ${nextIn === 0 ? 'today' : `in ${plural(nextIn, 'day')}`}` : ''}`
              : 'No renewal dates yet',
            onOpen: nextRenewal ? nextRenewal.open : () => onNavigate('compliance'),
          },
        ]}
      />

      <section>
        <SectionHead
          title="Renewals"
          meta={
            window90.length > 0
              ? `${window90.length} in 90 days${overdueCount > 0 ? `, ${overdueCount} overdue` : ''}`
              : 'Next 90 days'
          }
          action="Compliance"
          onAction={() => onNavigate('compliance')}
        />
        <DatedList
          items={renewalRows}
          empty={
            renewals.length > 0
              ? `Nothing renews in the next 90 days. ${plural(renewals.length, 'date')} on record, the next on ${shortDay(nextRenewal?.date ?? renewals[0].date)}.`
              : 'No renewal dates yet. Add your insurance, scheme membership and documents in Compliance, training on each person, and PAT and calibration dates in the Kit register. Everything due in the next 90 days shows here.'
          }
          footer={
            moreIn90 > 0 || (shown.length > 0 && laterCount > 0) ? (
              <FootLink onClick={() => onNavigate('compliance')}>
                {[
                  moreIn90 > 0 ? `${plural(moreIn90, 'more')} in the next 90 days` : null,
                  laterCount > 0 ? `${plural(laterCount, 'more')} renewing after that` : null,
                ]
                  .filter(Boolean)
                  .join(', ')}
              </FootLink>
            ) : undefined
          }
        />
      </section>

      <div className="grid gap-8 lg:grid-cols-2 lg:items-stretch">
        <section className="flex flex-col">
          <SectionHead title="Needs you" meta={work.length > 0 ? `${work.length}` : undefined} />
          <ListPanel
            className="flex-1"
            items={work}
            empty="Nothing needs you. Open incidents, RAMS to sign off, unsigned toolbox talks and job packs, and missing checks appear here."
            footer={
              openList.length > 3 ? (
                <FootLink onClick={() => onNavigate('incidents')}>
                  {plural(openList.length - 3, 'more open incident')}
                </FootLink>
              ) : undefined
            }
          />
        </section>
        <section className="flex flex-col">
          <SectionHead
            title="Recent on site"
            meta="Newest first"
            action="Incidents"
            onAction={() => onNavigate('incidents')}
          />
          <DatedList
            className="flex-1"
            items={recent}
            empty="Nothing logged yet. Incidents, near misses and toolbox talks show here as they happen, newest first."
          />
        </section>
      </div>

      <section>
        <SectionHead title="Everything in Safety" />
        <PageTiles
          groups={[
            { title: 'Before work starts', links: beforeLinks },
            { title: 'When something happens', links: whenLinks },
            { title: 'Paperwork', links: paperLinks },
          ]}
        />
      </section>
    </PageFrame>
  );
}
