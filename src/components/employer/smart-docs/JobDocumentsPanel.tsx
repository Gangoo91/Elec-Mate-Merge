/**
 * ELE-2012: Smart Docs with memory. Pick a job and see every document it has
 * (RAMS, job pack, briefings, quotes and invoices, certificates, signatures)
 * with its status and who has signed; "Create for this job" offers the
 * generators that fit the work. With no job picked, the most recent documents
 * across every job.
 *
 * The generators themselves are linked, never changed here (RAMS, method
 * statement and briefing pack belong to Site Safety).
 */
import { useMemo, type ReactNode } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { MobileSelectPicker } from '@/components/ui/mobile-select-picker';
import { useJobs } from '@/hooks/useJobs';
import { useFirmDocuments, type FirmDocKind, type FirmDocument } from '@/hooks/useFirmDocuments';
import { cn } from '@/lib/utils';
import { selectTriggerClass } from '@/components/employer/editorial';
import {
  twoColClass,
  colClass,
  panel,
  PanelTitle,
  Row,
  StatusPill,
  PlainEmpty,
  plural,
  type PillTone,
} from '@/components/employer/pageParts/PageParts';
import type { Section } from '@/pages/employer/EmployerDashboard';

const KIND: Record<FirmDocKind, { label: string }> = {
  rams: { label: 'RAMS' },
  job_pack: { label: 'Job pack' },
  briefing: { label: 'Briefing' },
  quote: { label: 'Quote' },
  invoice: { label: 'Invoice' },
  certificate: { label: 'Certificate' },
  signature: { label: 'Signature' },
  compliance: { label: 'Document' },
  ai_rams: { label: 'RAMS, AI drafted' },
  design: { label: 'Design' },
};

/** One status pill per row: green when done, red when it is a problem. */
const statusTone = (st: string): PillTone =>
  /^not issued$/i.test(st)
    ? 'volt'
    : /overdue|reject|fail|expired|declin|void/i.test(st)
      ? 'red'
      : /paid|signed|approv|complete|accept|issued|done|active/i.test(st)
        ? 'green'
        : 'neutral';

const gbp = (n: number) => `£${Math.round(n).toLocaleString('en-GB')}`;
const when = (iso: string | null) =>
  iso
    ? new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
    : null;
const cap = (s: string | null) =>
  s ? s.charAt(0).toUpperCase() + s.slice(1).replace(/_/g, ' ') : null;

function signedLine(d: FirmDocument): string | null {
  if (d.to_sign == null && d.signed == null) return null;
  const n = d.signed ?? 0;
  const of = d.to_sign ?? 0;
  const names = (d.signers ?? []).filter(Boolean);
  if (!n) return of ? `Nobody signed yet (${of} to sign)` : 'Nobody signed yet';
  const who = names.length
    ? `: ${names.slice(0, 3).join(', ')}${names.length > 3 ? ` +${names.length - 3}` : ''}`
    : '';
  return `${of ? `${n} of ${of}` : n} signed${who}`;
}

type Gen = { key: string; label: string; section: Section; kinds: FirmDocKind[]; why: string };

/** The generators that fit the work, from the job's own words. */
function generatorsFor(
  job: { title?: string | null; description?: string | null; job_type?: string | null } | null
): Gen[] {
  // No job picked: every generator, so each is one tap away
  if (!job) {
    return [
      {
        key: 'rams',
        label: 'Safety documents',
        section: 'airams',
        kinds: ['rams', 'ai_rams', 'job_pack'],
        why: 'RAMS and method statement in one run',
      },
      {
        key: 'brief',
        label: 'AI briefing pack',
        section: 'aibriefingpack',
        kinds: ['briefing', 'job_pack'],
        why: 'Brief the crew before they start',
      },
      {
        key: 'design',
        label: 'AI design spec',
        section: 'aidesignspec',
        kinds: ['design'],
        why: 'Circuit design from your job brief',
      },
      {
        key: 'quote',
        label: 'AI quote',
        section: 'aiquote',
        kinds: ['quote', 'invoice'],
        why: 'Priced from your price book and past jobs',
      },
      {
        key: 'cert',
        label: 'Certificate',
        section: 'testing',
        kinds: ['certificate'],
        why: 'When the work is done',
      },
    ];
  }
  const t = `${job?.job_type ?? ''} ${job?.title ?? ''} ${job?.description ?? ''}`.toLowerCase();
  const testing = /\beicr\b|periodic|inspection|testing|landlord|re-?test|\bpat\b/.test(t);
  const design =
    /install|rewire|consumer unit|\bcu\b|board|\bev\b|charg|solar|\bpv\b|battery|extension|new circuit|kitchen|lighting/.test(
      t
    );
  const list: Gen[] = [];
  if (testing) {
    list.push({
      key: 'cert',
      label: 'Certificate',
      section: 'testing',
      kinds: ['certificate'],
      why: 'Inspection or testing work',
    });
  }
  list.push({
    key: 'rams',
    label: 'Safety documents',
    section: 'airams',
    kinds: ['rams', 'ai_rams', 'job_pack'],
    why: 'RAMS and method statement in one run',
  });
  list.push({
    key: 'brief',
    label: 'AI briefing pack',
    section: 'aibriefingpack',
    kinds: ['briefing', 'job_pack'],
    why: 'Brief the crew before they start',
  });
  if (design) {
    list.push({
      key: 'design',
      label: 'AI design spec',
      section: 'aidesignspec',
      kinds: ['design'],
      why: 'New or altered circuits',
    });
  }
  list.push({
    key: 'quote',
    label: 'AI quote',
    section: 'aiquote',
    kinds: ['quote', 'invoice'],
    why: 'Priced from your price book',
  });
  if (!testing) {
    list.push({
      key: 'cert',
      label: 'Certificate',
      section: 'testing',
      kinds: ['certificate'],
      why: 'When the work is done',
    });
  }
  return list;
}

interface Props {
  onNavigate: (section: Section) => void;
  /** Drawn under the create list in the right-hand column. */
  aside?: ReactNode;
  /** "44 drafted" beside each generator when no job is picked. */
  counts?: Partial<Record<string, number>>;
}

export function JobDocumentsPanel({ onNavigate, aside, counts }: Props) {
  const [params, setParams] = useSearchParams();
  const jobId = params.get('docsjob');
  const { data: jobs = [], isLoading: jobsLoading } = useJobs();
  const { data, isLoading, error } = useFirmDocuments(jobId, jobId ? 100 : 12);

  const liveJobs = useMemo(() => jobs.filter((j) => !j.archived_at && !j.is_template), [jobs]);
  // An archived job picked from a link still shows as itself
  const job = jobs.find((j) => j.id === jobId) ?? null;
  const gens = useMemo(() => generatorsFor(job), [job]);
  // A job pack only counts for a document it actually carries (its detail
  // lists "RAMS, method statement, briefing"); any pack used to tick all three
  const PACK_PART: Record<string, string> = {
    rams: 'rams',
    brief: 'briefing',
  };
  const has = (g: Gen) =>
    g.kinds.some((k) =>
      k === 'job_pack' && PACK_PART[g.key]
        ? (data?.items ?? []).some(
            (d) =>
              d.kind === 'job_pack' && (d.detail ?? '').toLowerCase().includes(PACK_PART[g.key])
          )
        : (data?.by_kind?.[k] ?? 0) > 0
    );

  const pickJob = (id: string) => {
    const next = new URLSearchParams(params);
    if (id) next.set('docsjob', id);
    else next.delete('docsjob');
    setParams(next, { replace: true });
  };

  const open = (d: FirmDocument) => {
    const next: Record<string, string> = { section: d.section, ...(d.params ?? {}) };
    setParams(next);
  };

  const options = [
    { value: '', label: 'All jobs: most recent' },
    ...(job && !liveJobs.includes(job) ? [job] : []).concat(liveJobs).map((j) => ({
      value: j.id,
      label: j.title,
      description: j.client || undefined,
    })),
  ];

  const items = data?.items ?? [];

  return (
    <div className={twoColClass}>
      <div className={colClass}>
        <section data-help="smartdocs.byjob">
          <PanelTitle
            title={job ? 'Documents for this job' : 'Recent documents'}
            meta={data ? plural(data.total, 'document') : undefined}
          />
          <div className={cn(panel, 'overflow-hidden')}>
            <div className="border-b border-white/[0.07] px-4 pb-3 pt-3.5 sm:px-5">
              <label className="mb-1 block text-[13px] font-semibold text-white">Job</label>
              <MobileSelectPicker
                value={jobId ?? ''}
                onValueChange={pickJob}
                options={options}
                placeholder={jobsLoading ? 'Loading jobs…' : 'Pick a job'}
                title="Pick a job"
                triggerClassName={selectTriggerClass}
              />
            </div>
            {isLoading ? (
              <div className="flex items-center gap-2 px-4 py-4 text-[14px] text-white sm:px-5">
                <Loader2 className="h-4 w-4 animate-spin" /> Gathering documents
              </div>
            ) : error ? (
              <PlainEmpty
                bare
                text="Couldn't load documents. Check your connection and try again."
              />
            ) : items.length === 0 ? (
              <PlainEmpty
                bare
                text={
                  job
                    ? 'Nothing saved to this job yet. Start one from Create for this job. RAMS, packs, briefings, quotes and certificates saved to this job show here.'
                    : 'No documents on any job yet. Pick a job to see what it has, and what it still needs.'
                }
              />
            ) : (
              <div className="divide-y divide-white/[0.07]">
                {items.map((d) => {
                  const k = KIND[d.kind] ?? KIND.compliance;
                  const detail = [k.label, job ? null : d.job_title, d.detail]
                    .filter(Boolean)
                    .join(' · ');
                  const meta = [
                    signedLine(d),
                    d.total != null ? gbp(Number(d.total)) : null,
                    when(d.at),
                  ]
                    .filter(Boolean)
                    .join(' · ');
                  return (
                    <Row
                      key={`${d.kind}-${d.id}`}
                      title={d.title}
                      detail={detail}
                      meta={meta || undefined}
                      trailing={
                        d.status ? (
                          <StatusPill tone={statusTone(d.status)}>{cap(d.status)}</StatusPill>
                        ) : undefined
                      }
                      onClick={() => open(d)}
                    />
                  );
                })}
              </div>
            )}
          </div>
        </section>
      </div>

      <div className={colClass}>
        <section>
          <PanelTitle
            title={job ? 'Create for this job' : 'Create a document'}
            meta={job ? 'What this job still needs' : undefined}
          />
          <div className={cn(panel, 'overflow-hidden')}>
            <div className="divide-y divide-white/[0.07]">
              {gens.map((g) => {
                const done = job ? has(g) : false;
                const n = !job ? counts?.[g.key] : undefined;
                return (
                  <Row
                    key={g.key}
                    data-help={
                      !job && g.key === 'design'
                        ? 'smartdocs.design'
                        : !job && g.key === 'quote'
                          ? 'smartdocs.quote'
                          : undefined
                    }
                    title={g.label}
                    detail={
                      job && g.kinds.length
                        ? done
                          ? 'Already on this job'
                          : 'Not on this job yet'
                        : n !== undefined
                          ? `${g.why} · ${n === 0 ? 'none yet' : `${n} drafted`}`
                          : g.why
                    }
                    trailing={
                      job && g.kinds.length ? (
                        done ? (
                          <StatusPill tone="green">Done</StatusPill>
                        ) : (
                          <StatusPill tone="volt">Needed</StatusPill>
                        )
                      ) : undefined
                    }
                    onClick={() =>
                      // The generators that save to a job open on this one.
                      job && (g.section === 'airams' || g.section === 'aidesignspec')
                        ? setParams({ section: g.section, job: job.id })
                        : onNavigate(g.section)
                    }
                  />
                );
              })}
            </div>
            {job && (
              <p className="border-t border-white/[0.07] px-4 py-3 text-[13px] text-white sm:px-5">
                Safety documents and designs open on this job, so what they make is saved to it.
              </p>
            )}
          </div>
        </section>
        {aside}
      </div>
    </div>
  );
}
