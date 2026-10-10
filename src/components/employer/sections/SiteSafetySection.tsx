/**
 * Site Safety in the Employer Hub — the same tools as the Electrical Hub's Site
 * Safety, on the same rows, in the firm's scope.
 *
 * Everything here runs inside <SafetyScopeProvider mode="firm">, so the shared
 * tools list and file the FIRM's records (employer_id), never the signed-in
 * person's own. Only tools whose data is firm-scoped, or that hold no data at
 * all, are open here; the rest say they are coming rather than showing someone's
 * personal records in a firm screen.
 *
 * URL: ?section=site-safety&tool=<id> opens a tool; tool=rams-result&id=<job>
 * opens a generated RAMS; tool=ai-rams&job=<firm job>[&pack=<job pack>] starts
 * the job's safety documents, filled in with the firm's people (ELE-1941).
 */
import { Suspense, useRef, type ReactNode } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import type { Section } from '@/pages/employer/EmployerDashboard';
import {
  SafetyScopeProvider,
  useSafetyScope,
  isFirmScope,
} from '@/components/electrician-tools/site-safety/common/SafetyScope';
import { SafetyToolRouter } from '@/components/electrician-tools/site-safety/SafetyToolRouter';
import { RAMSProvider } from '@/components/electrician-tools/site-safety/rams/RAMSContext';
import { useRecentGeneratedRams } from '@/hooks/useRecentGeneratedRams';
import { useFirmSafetyOverview } from '@/hooks/useFirmSafetyOverview';
import { useJobPacks } from '@/hooks/useJobPacks';
import { useJobSafetyPeople, peopleForLaunch } from '@/hooks/useFirmSafetyDocs';
import type { SafetyToolLaunch } from '@/utils/safety-launch';
import { PageFrame, PageHero, LoadingBlocks } from '@/components/employer/editorial';
import {
  frameClass,
  HeroActions,
  HeroPrimary,
  TwoColumn,
  FigureStrip,
  KeyValue,
  Row,
  PanelHead,
  PlainEmpty,
  Tag,
  panel,
  plural,
} from '@/components/employer/pageParts/PageParts';
import { PageHelpButton, HowItWorks, type PageHelpContent } from '@/components/hub/PageHelp';

interface SiteSafetySectionProps {
  onNavigate: (section: Section) => void;
}

/** A tool open in the firm's hub: its data is the firm's, or it holds none. */
interface FirmTool {
  id: string;
  title: string;
  detail: string;
  /** Opens another Employer Hub section instead of a Site Safety tool. */
  section?: Section;
}

const PLAN_TOOLS: FirmTool[] = [
  {
    id: 'ai-rams',
    title: 'Create RAMS',
    detail: 'Risk assessment and method statement, filed with the firm.',
  },
  {
    id: 'method-statement',
    title: 'Method statement builder',
    detail: 'Build a safe system of work step by step from a template.',
  },
  {
    id: 'safety-templates',
    title: 'Safety templates',
    detail: 'UK electrical safety documents to read and print.',
  },
  {
    id: 'hazard-database',
    title: 'Hazard database',
    detail: 'Electrical hazards and how to control them.',
  },
];

/** Toolbox talks with crew sign-off, and the incident record. */
const TEAM_TOOLS: FirmTool[] = [
  {
    id: 'team-briefing',
    title: 'Toolbox talks',
    detail:
      'Brief the crew, pick them from your team, and collect signatures in the app or by link.',
  },
  {
    id: 'near-miss',
    title: 'Near misses',
    detail: 'Near misses on the firm’s jobs, from the office and the team.',
  },
  {
    id: 'accident-book',
    title: 'Accident book',
    detail: 'Accidents, RIDDOR deadlines and investigations.',
  },
];

/** Records filed against a job: the firm's, and the team's shared ones. */
const SITE_TOOLS: FirmTool[] = [
  {
    id: 'permit-to-work',
    title: 'Permits to work',
    detail: 'Hot work, isolation, confined space, height and excavation permits.',
  },
  {
    id: 'safe-isolation',
    title: 'Safe isolation',
    detail: 'Lock off, prove dead and sign the isolation record.',
  },
  {
    id: 'coshh',
    title: 'COSHH assessments',
    detail: 'Hazardous substances used on the firm’s jobs.',
  },
  {
    id: 'fire-watch',
    title: 'Fire watch',
    detail: 'Fire watches after hot work, with the follow-up check.',
  },
  {
    id: 'pre-use-checks',
    title: 'Pre-use checks',
    detail: 'Ladders, tools, test kit and access equipment.',
  },
  {
    id: 'inspection-checklists',
    title: 'Inspections',
    detail: 'Site and workplace inspection checklists.',
  },
  {
    id: 'safety-observations',
    title: 'Safety observations',
    detail: 'Good practice and unsafe acts spotted on site.',
  },
  {
    id: 'site-diary',
    title: 'Site diary',
    detail: 'Daily safety diary entries for each job.',
  },
];

const REFERENCE_TOOLS: FirmTool[] = [
  {
    id: 'kit',
    title: 'Kit register',
    detail: 'The firm’s tools and test equipment, with checks and calibration.',
    section: 'kit',
  },
  {
    id: 'photos',
    title: 'Job photos',
    detail: 'Site photos from the office and the team, by job.',
    section: 'photogallery',
  },
  {
    id: 'emergency',
    title: 'Emergency procedures',
    detail: 'What to do, and who to call.',
  },
  {
    id: 'safety-alerts',
    title: 'Safety alerts',
    detail: 'Product recalls for electrical kit, PPE and tools, from GOV.UK.',
  },
  {
    id: 'safety-resources',
    title: 'Safety resources',
    detail: 'Guidance notes and HSE publications.',
  },
];

/** Every view this section will open. Anything else falls back to the home. */
const FIRM_VIEWS = new Set([
  ...PLAN_TOOLS.map((t) => t.id),
  ...SITE_TOOLS.map((t) => t.id),
  ...TEAM_TOOLS.map((t) => t.id),
  ...REFERENCE_TOOLS.filter((t) => !t.section).map((t) => t.id),
  'rams-result',
]);

const SITE_SAFETY_HELP: PageHelpContent = {
  id: 'employer-site-safety',
  title: 'Site Safety',
  what: 'The Site Safety tools from the Electrical Hub, working on your firm’s records. A RAMS, permit or check made here belongs to the firm, and your managers can open and edit it.',
  steps: [
    {
      title: 'Create a RAMS for a job',
      body: 'Tap Create RAMS, describe the work and generate. It is filed with the firm, not with you.',
    },
    {
      title: 'See your team’s records',
      body: 'When someone on your team files a RAMS, permit or check against one of your jobs, it shows in that tool. You can read it and countersign it; they keep the right to change it.',
    },
    {
      title: 'Look things up',
      body: 'Hazards, emergency procedures, product recalls and HSE guidance are here for everyone.',
    },
  ],
  notes: [
    {
      title: 'What stays private',
      body: 'A worker’s own records stay in their Electrical Hub. They reach the firm only when they file one against a firm job.',
    },
    {
      title: 'Kit and photos',
      body: 'The firm’s kit lives in the Kit register and job photos in Job photos, so there is one list of each.',
    },
    {
      title: 'The safety score',
      body: 'Built only from your records: toolbox talks signed, near misses closed, team records countersigned, COSHH in date and RAMS issued. With too little to go on it says Not started, never a perfect score.',
    },
  ],
};

const fmtDate = (iso: string) =>
  new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });

export function SiteSafetySection({ onNavigate }: SiteSafetySectionProps) {
  return (
    <SafetyScopeProvider
      mode="firm"
      fallback={
        <div className="mx-auto max-w-[1600px] pt-6">
          <LoadingBlocks />
        </div>
      }
    >
      <FirmSiteSafety onNavigate={onNavigate} />
    </SafetyScopeProvider>
  );
}

function FirmSiteSafety({ onNavigate }: SiteSafetySectionProps) {
  const [params, setParams] = useSearchParams();
  const navigate = useNavigate();
  const scope = useSafetyScope();
  const section = params.get('section') || 'site-safety';
  const requested = params.get('tool');
  const tool = requested && FIRM_VIEWS.has(requested) ? requested : null;
  const recordId = params.get('id');
  const packId = params.get('pack');
  const jobParam = params.get('job');

  // Opened from this page → Back pops history; arrived by link → strip the tool.
  const openedHere = useRef(false);
  const setActiveView = (view: string | null, id?: string) => {
    if (view) {
      openedHere.current = true;
      setParams(id ? { section, tool: view, id } : { section, tool: view });
      window.scrollTo(0, 0);
      return;
    }
    if (openedHere.current) {
      openedHere.current = false;
      navigate(-1);
      return;
    }
    setParams({ section }, { replace: true });
  };

  if (!isFirmScope(scope)) return null;

  if (tool) {
    return (
      <FirmToolView
        tool={tool}
        recordId={recordId}
        packId={packId}
        jobParam={jobParam}
        setActiveView={setActiveView}
      />
    );
  }

  return (
    <FirmSafetyHome
      onNavigate={onNavigate}
      openTool={(id) => {
        const link = REFERENCE_TOOLS.find((t) => t.id === id && t.section);
        if (link?.section) onNavigate(link.section);
        else setActiveView(id);
      }}
      openRams={(id) => setActiveView('rams-result', id)}
    />
  );
}

/** A shared Site Safety tool, full width, under its own masthead. */
function FirmToolView({
  tool,
  recordId,
  packId,
  jobParam,
  setActiveView,
}: {
  tool: string;
  recordId: string | null;
  packId: string | null;
  jobParam: string | null;
  setActiveView: (view: string | null) => void;
}) {
  const { data: packs, isLoading: packsLoading } = useJobPacks();
  const pack = packId ? (packs ?? []).find((p) => p.id === packId) : undefined;
  // The firm job this is for: the pack's job, or one picked in the hub.
  const employerJobId = pack?.job_id || jobParam || null;
  const wantsPeople = tool === 'ai-rams' && !!employerJobId;
  const { data: people, isLoading: peopleLoading } = useJobSafetyPeople(
    wantsPeople ? employerJobId : null
  );

  // A RAMS started from a job reads the job once, on mount — so wait for it.
  if ((packId && packsLoading) || (wantsPeople && peopleLoading))
    return (
      <ToolFrame>
        <LoadingBlocks />
      </ToolFrame>
    );

  const job = people?.job ?? null;
  // No pack picked: the job's latest pack, if it has one.
  const jobPack = pack ? null : (people?.pack ?? null);
  const scopeText = pack ? pack.scope : jobPack?.scope || job?.description;
  const hazards = pack ? pack.hazards : (jobPack?.hazards ?? null);
  const launch: SafetyToolLaunch =
    pack || employerJobId
      ? {
          siteName: pack?.title || job?.title || undefined,
          siteAddress: pack?.location || job?.location || undefined,
          description:
            [scopeText, hazards?.length ? `Identified hazards: ${hazards.join(', ')}` : '']
              .filter(Boolean)
              .join('\n\n') || undefined,
          employerJobId: employerJobId || undefined,
          // Started from a job: its latest pack is ticked and gets the issued PDF.
          jobPackId: pack?.id || jobPack?.id || undefined,
          people: wantsPeople ? peopleForLaunch(people) : undefined,
        }
      : {};

  return (
    <ToolFrame>
      <RAMSProvider>
        <Suspense fallback={<LoadingBlocks />}>
          <SafetyToolRouter
            activeView={tool}
            setActiveView={setActiveView}
            launch={launch}
            recordId={recordId}
          />
        </Suspense>
      </RAMSProvider>
    </ToolFrame>
  );
}

/** Bleed past the hub's page padding: the tools draw their own gutters. */
function ToolFrame({ children }: { children: ReactNode }) {
  return <div className="-mx-4 min-h-screen bg-elec-dark sm:-mx-6 lg:-mx-8">{children}</div>;
}

function FirmSafetyHome({
  onNavigate,
  openTool,
  openRams,
}: {
  onNavigate: (section: Section) => void;
  openTool: (id: string) => void;
  openRams: (generationJobId: string) => void;
}) {
  const { data: firmRams = [], isLoading } = useRecentGeneratedRams(6);
  const scope = useSafetyScope();
  const { data: overview, isLoading: overviewLoading } = useFirmSafetyOverview(
    isFirmScope(scope) ? scope.employerId : null
  );
  const statusLine = overviewLoading
    ? 'Loading the firm’s safety records'
    : !overview || overview.records_30d === 0
      ? 'Nothing filed in the last 30 days'
      : overview.to_countersign > 0
        ? `${plural(overview.records_30d, 'record')} in 30 days · ${overview.to_countersign} to countersign`
        : `${plural(overview.records_30d, 'record')} filed in the last 30 days`;

  const ramsPanel = (
    <section className={panel}>
      <PanelHead title="Firm RAMS" action="RAMS register" onAction={() => onNavigate('rams')} />
      {isLoading ? (
        <div className="px-4 py-4 sm:px-5">
          <LoadingBlocks />
        </div>
      ) : firmRams.length === 0 ? (
        <PlainEmpty
          bare
          text="RAMS made here, and RAMS your team files against one of your jobs, show here."
          action="Create RAMS"
          onAction={() => openTool('ai-rams')}
        />
      ) : (
        <div className="divide-y divide-white/[0.07]">
          {firmRams.map((r) => {
            const running = r.status === 'pending' || r.status === 'processing';
            return (
              <Row
                key={r.id}
                title={r.title}
                detail={`Generated ${fmtDate(r.createdAt)}`}
                status={
                  running ? (
                    <Tag tone="outline">Generating</Tag>
                  ) : r.issuedVersion ? (
                    <Tag tone="done">Issued v{r.issuedVersion}</Tag>
                  ) : (
                    <Tag tone="yellow">Not issued</Tag>
                  )
                }
                onClick={() => openRams(r.id)}
              />
            );
          })}
        </div>
      )}
    </section>
  );

  const toolRows = (title: string, tools: FirmTool[]) => (
    <section className={panel}>
      <PanelHead title={title} />
      <div className="divide-y divide-white/[0.07]">
        {tools.map((t) => (
          <Row key={t.id} title={t.title} detail={t.detail} onClick={() => openTool(t.id)} />
        ))}
      </div>
    </section>
  );

  const pct = (v: number | null | undefined) => (v == null ? 'No records yet' : `${v}%`);
  const scorePanel = (
    <section className={panel}>
      <PanelHead title="Safety score" />
      <div className="px-4 py-4 sm:px-5">
        {overviewLoading ? (
          <LoadingBlocks />
        ) : (
          <>
            <p className="text-[28px] font-semibold leading-none tracking-tight text-white tabular-nums">
              {overview?.score == null ? 'Not started' : `${overview.score} out of 100`}
            </p>
            <p className="mt-2 text-[13px] leading-snug text-white">
              {overview?.score == null
                ? 'There is not enough on record yet to score. It builds as the firm and the team use Site Safety.'
                : 'From the last 30 to 90 days of the firm’s own records.'}
            </p>
          </>
        )}
      </div>
      {!overviewLoading && overview && (
        <div className="divide-y divide-white/[0.07] border-t border-white/[0.07]">
          <KeyValue label="Toolbox talk signatures" value={pct(overview.parts?.briefings_signed)} />
          <KeyValue label="Near misses closed" value={pct(overview.parts?.near_misses_closed)} />
          <KeyValue
            label="Team records countersigned"
            value={pct(overview.parts?.team_records_countersigned)}
          />
          <KeyValue label="COSHH reviews in date" value={pct(overview.parts?.coshh_in_date)} />
          <KeyValue label="RAMS issued" value={pct(overview.parts?.rams_issued)} />
        </div>
      )}
      <p className="border-t border-white/[0.07] px-4 py-3 text-[13px] leading-snug text-white sm:px-5">
        Your own records stay in Site Safety in the Electrical Hub.
      </p>
    </section>
  );

  return (
    <PageFrame className={frameClass}>
      <PageHero
        title="Site Safety"
        description={statusLine}
        actions={
          <HeroActions>
            <HeroPrimary onClick={() => openTool('ai-rams')}>Create RAMS</HeroPrimary>
            <PageHelpButton help={SITE_SAFETY_HELP} askContext={{ page: 'site-safety' }} />
          </HeroActions>
        }
      />

      <HowItWorks help={SITE_SAFETY_HELP} askContext={{ page: 'site-safety' }} />

      <FigureStrip
        figures={[
          {
            label: 'Permits live',
            value: overviewLoading ? '–' : (overview?.permits_live ?? 0),
            onOpen: () => openTool('permit-to-work'),
          },
          {
            label: 'To countersign',
            value: overviewLoading ? '–' : (overview?.to_countersign ?? 0),
            sub: 'Team records shared with the firm',
            tone: overview?.to_countersign ? 'volt' : undefined,
          },
          {
            label: 'Near misses',
            value: overviewLoading ? '–' : (overview?.near_misses_30d ?? 0),
            sub: 'Last 30 days',
            onOpen: () => openTool('near-miss'),
          },
          {
            label: 'RIDDOR to report',
            value: overviewLoading ? '–' : (overview?.riddor_pending ?? 0),
            tone: overview?.riddor_pending ? 'red' : undefined,
            onOpen: () => openTool('accident-book'),
          },
        ]}
      />

      <TwoColumn
        main={
          <>
            {ramsPanel}
            {toolRows('Plan the job', PLAN_TOOLS)}
            {toolRows('Toolbox talks and incidents', TEAM_TOOLS)}
            {toolRows('On site', SITE_TOOLS)}
          </>
        }
        side={
          <>
            {scorePanel}
            {toolRows('Kit and reference', REFERENCE_TOOLS)}
          </>
        }
      />
    </PageFrame>
  );
}

export default SiteSafetySection;
