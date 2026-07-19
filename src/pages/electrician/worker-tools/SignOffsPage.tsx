import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  Loader2,
  ChevronLeft,
  FileCheck2,
  AlertTriangle,
  ExternalLink,
  CheckCircle2,
  FileText,
} from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { useRealtimeInvalidate } from '@/hooks/useRealtimeInvalidate';
import SignatureInput from '@/components/signature/SignatureInput';
import { useMyEmployeeRecord } from '@/hooks/useWorkerLocations';
import { WorkerToolPage } from '@/pages/electrician/worker-tools/WorkerToolPage';
import {
  Eyebrow,
  Pill,
  Dot,
  StatStrip,
  EmptyState,
  LoadingState,
  PrimaryButton,
  SecondaryButton,
  FilterBar,
} from '@/components/employer/editorial';

/* ==========================================================================
   SignOffsPage — the worker's RAMS / job-pack signature flow, as a routed page.

   The office sends a job pack (RAMS, method statement, briefing); the worker
   reads it here and signs before starting. The signature, timestamp and
   device stamp land on the acknowledgement row — the employer's register
   updates live and their bell rings.

   Data layer (hook + mutation + query keys) is carried over unchanged from the
   old SignOffsSheet; the chrome moves from a bottom sheet to a real page.

   Layout: on desktop the page fills the wide shell as a master-detail split —
   a responsive card grid of packs on the left, the selected pack's detail and
   signature pad on the right. On mobile it collapses to a single column where
   tapping a pack swaps the grid for the full detail view (in-page state).
   ========================================================================== */

interface PackSignOff {
  id: string;
  job_pack_id: string;
  acknowledged_at: string | null;
  // Evidence captured at signing — the record must read like evidence, not a
  // checkbox: the drawn signature, the device it was signed on, and (if
  // recorded) where.
  signature_data: string | null;
  device_info: string | null;
  location: string | null;
  pack: {
    id: string;
    title: string;
    client: string | null;
    location: string | null;
    scope: string | null;
    hazards: string[] | null;
    required_certifications: string[] | null;
    briefing_content: string | null;
  } | null;
  documents: { id: string; title: string; document_type: string | null; file_url: string | null }[];
}

const useMySignOffs = () => {
  const { data: me } = useMyEmployeeRecord();
  return useQuery({
    queryKey: ['my-pack-signoffs', me?.id],
    queryFn: async (): Promise<PackSignOff[]> => {
      const { data, error } = await supabase
        .from('employer_job_pack_acknowledgements')
        .select(
          'id, job_pack_id, acknowledged_at, signature_data, device_info, location, pack:employer_job_packs(id, title, client, location, scope, hazards, required_certifications, briefing_content)'
        )
        .eq('employee_id', me!.id)
        .order('created_at', { ascending: false });
      if (error) throw error;

      const packIds = (data || []).map((a) => a.job_pack_id);
      let docs: PackSignOff['documents'] = [];
      if (packIds.length > 0) {
        const { data: docRows } = await supabase
          .from('employer_job_pack_documents')
          .select('id, title, document_type, file_url, job_pack_id')
          .in('job_pack_id', packIds);
        docs = docRows || [];
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return (data || []).map((a: any) => ({
        ...a,
        documents: docs.filter(
          (d) => (d as { job_pack_id?: string }).job_pack_id === a.job_pack_id
        ),
      }));
    },
    enabled: !!me?.id,
    staleTime: 30 * 1000,
  });
};

/* Relative timestamp helper — glanceable "2h ago" style for signed packs. */
function relativeTime(iso: string): string {
  const then = new Date(iso).getTime();
  const diff = Date.now() - then;
  if (Number.isNaN(then)) return '';
  const mins = Math.round(diff / 60000);
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins} min${mins === 1 ? '' : 's'} ago`;
  const hrs = Math.round(mins / 60);
  if (hrs < 24) return `${hrs} hr${hrs === 1 ? '' : 's'} ago`;
  const days = Math.round(hrs / 24);
  if (days < 7) return `${days} day${days === 1 ? '' : 's'} ago`;
  return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
}

function fullTimestamp(iso: string): string {
  return new Date(iso).toLocaleString('en-GB', {
    dateStyle: 'medium',
    timeStyle: 'short',
  });
}

/* Friendly device name from the stored user-agent stamp — evidence should
   read "signed on an iPhone", not a raw UA string. */
function deviceSummary(ua: string | null): string | null {
  if (!ua) return null;
  if (/iPhone/i.test(ua)) return 'iPhone';
  if (/iPad/i.test(ua)) return 'iPad';
  if (/Android/i.test(ua)) return 'Android device';
  if (/Macintosh|Mac OS/i.test(ua)) return 'Mac';
  if (/Windows/i.test(ua)) return 'Windows PC';
  if (/Linux/i.test(ua)) return 'Linux device';
  return 'Recorded device';
}

type TabValue = 'all' | 'pending' | 'signed';

export default function SignOffsPage() {
  const { data: me } = useMyEmployeeRecord();
  const { data: signoffs = [], isLoading } = useMySignOffs();
  const queryClient = useQueryClient();

  // Live: when the office sends a new job pack (inserts an acknowledgement row
  // for this worker) — or updates one — the list refreshes instantly, no manual
  // reload. RLS + the employee_id filter scope this to the worker's own packs.
  useRealtimeInvalidate(
    'worker-pack-signoffs',
    [{ table: 'employer_job_pack_acknowledgements', filter: `employee_id=eq.${me?.id}` }],
    [['my-pack-signoffs', me?.id]],
    Boolean(me?.id)
  );

  const [selected, setSelected] = useState<PackSignOff | null>(null);
  const [signature, setSignature] = useState<string | null>(null);
  const [tab, setTab] = useState<TabValue>('all');
  const [search, setSearch] = useState('');

  // ?signoff=<id> deep link (job-pack push notification) — auto-open that pack
  // once the list loads. Matches the acknowledgement id or the pack id.
  const [searchParams] = useSearchParams();
  const deepLinkId = searchParams.get('signoff');
  useEffect(() => {
    if (!deepLinkId || signoffs.length === 0) return;
    setSelected((current) => {
      if (current) return current;
      return (
        signoffs.find((s) => s.id === deepLinkId || s.job_pack_id === deepLinkId) ?? current
      );
    });
  }, [deepLinkId, signoffs]);

  const pending = useMemo(() => signoffs.filter((s) => !s.acknowledged_at), [signoffs]);
  const signed = useMemo(() => signoffs.filter((s) => !!s.acknowledged_at), [signoffs]);

  const signMutation = useMutation({
    mutationFn: async () => {
      if (!selected || !signature) throw new Error('Sign first');
      const { error } = await supabase
        .from('employer_job_pack_acknowledgements')
        .update({
          acknowledged_at: new Date().toISOString(),
          signature_data: signature,
          device_info: navigator.userAgent.slice(0, 200),
        })
        .eq('id', selected.id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['my-pack-signoffs'] });
      toast.success('Signed — the office has been notified');
      setSelected(null);
      setSignature(null);
    },
    onError: () => toast.error('Could not save your signature'),
  });

  /* Filter helpers — tab + free-text search across title/client/location. */
  const matchesSearch = (s: PackSignOff) => {
    const q = search.trim().toLowerCase();
    if (!q) return true;
    return [s.pack?.title, s.pack?.client, s.pack?.location]
      .filter(Boolean)
      .some((v) => (v as string).toLowerCase().includes(q));
  };

  /* ── Pack card — tappable tile for the responsive grid ─────────────── */
  const renderCard = (s: PackSignOff) => {
    const subtitleParts = [s.pack?.client, s.pack?.location].filter(Boolean);
    const isSigned = !!s.acknowledged_at;
    const isActive = selected?.id === s.id;
    return (
      <button
        key={s.id}
        type="button"
        onClick={() => {
          setSelected(s);
          setSignature(null);
        }}
        className={`group relative flex w-full flex-col gap-3 rounded-2xl border p-4 text-left touch-manipulation transition-colors min-h-[7rem] ${
          isActive
            ? 'border-elec-yellow/40 bg-[hsl(0_0%_15%)]'
            : 'border-white/[0.06] bg-white/[0.03] hover:bg-[hsl(0_0%_15%)]'
        }`}
      >
        <span
          aria-hidden
          className={`absolute left-0 top-4 bottom-4 w-[3px] rounded-full ${
            isSigned ? 'bg-emerald-500' : 'bg-amber-500'
          }`}
        />
        <div className="flex items-start justify-between gap-2 pl-2">
          <span className="text-[14px] font-medium text-white leading-snug">
            {s.pack?.title || 'Job pack'}
          </span>
          {isSigned ? <Pill tone="emerald">Signed</Pill> : <Pill tone="amber">Sign</Pill>}
        </div>
        <div className="mt-auto pl-2 text-[11.5px] text-white/70 truncate">
          {subtitleParts.length > 0 ? subtitleParts.join(' · ') : 'Job pack'}
          {isSigned && s.acknowledged_at ? ` · Signed ${relativeTime(s.acknowledged_at)}` : ''}
        </div>
      </button>
    );
  };

  /* ── Detail body — scope / hazards / docs / signature for one pack ─── */
  const renderDetailBody = (s: PackSignOff) => {
    const hazardCount = s.pack?.hazards?.length ?? 0;
    const isSigned = !!s.acknowledged_at;
    return (
      <div className="space-y-5">
        {isSigned && (
          <div className="rounded-xl bg-emerald-500/10 border border-emerald-500/20 p-4 space-y-3">
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
              <div className="min-w-0">
                <p className="text-[13px] font-medium text-white">Signature record</p>
                <p className="text-[11.5px] text-white/55">
                  {relativeTime(s.acknowledged_at!)} · the office has been notified
                </p>
              </div>
            </div>

            {/* The drawn signature — this is the evidence, show it */}
            {s.signature_data && (
              <div className="rounded-lg bg-white px-3 py-2">
                <img
                  src={s.signature_data}
                  alt={`Signature of ${me?.name || 'worker'}`}
                  className="h-16 w-auto mx-auto"
                />
              </div>
            )}

            <div className="space-y-1.5 text-[12.5px]">
              <div className="flex items-baseline justify-between gap-3">
                <span className="text-white/55 shrink-0">Signed by</span>
                <span className="text-white text-right">{me?.name || 'You'}</span>
              </div>
              <div className="flex items-baseline justify-between gap-3">
                <span className="text-white/55 shrink-0">Date &amp; time</span>
                <span className="text-white text-right">{fullTimestamp(s.acknowledged_at!)}</span>
              </div>
              {deviceSummary(s.device_info) && (
                <div className="flex items-baseline justify-between gap-3">
                  <span className="text-white/55 shrink-0">Signed on</span>
                  <span className="text-white text-right">{deviceSummary(s.device_info)}</span>
                </div>
              )}
              {s.location && (
                <div className="flex items-baseline justify-between gap-3">
                  <span className="text-white/55 shrink-0">Location</span>
                  <span className="text-white text-right truncate">{s.location}</span>
                </div>
              )}
            </div>
          </div>
        )}

        {s.pack?.scope && (
          <div className="rounded-xl bg-white/[0.03] border border-white/[0.06] p-4 space-y-2">
            <Eyebrow>Scope of works</Eyebrow>
            <p className="text-[13.5px] text-white leading-relaxed whitespace-pre-wrap">
              {s.pack.scope}
            </p>
          </div>
        )}

        {hazardCount > 0 && (
          <div className="rounded-xl bg-red-500/[0.06] border border-red-500/20 p-4 space-y-2.5">
            <Eyebrow className="text-red-400/90 flex items-center gap-1.5">
              <AlertTriangle className="h-3 w-3" />
              Hazards
              <Pill tone="red">{hazardCount}</Pill>
            </Eyebrow>
            <div className="flex flex-wrap gap-1.5">
              {s.pack!.hazards!.map((h) => (
                <Pill key={h} tone="red">
                  {h}
                </Pill>
              ))}
            </div>
          </div>
        )}

        {(s.pack?.required_certifications?.length ?? 0) > 0 && (
          <div className="rounded-xl bg-white/[0.03] border border-white/[0.06] p-4 space-y-2.5">
            <Eyebrow>Required credentials</Eyebrow>
            <div className="flex flex-wrap gap-1.5">
              {s.pack!.required_certifications!.map((c) => (
                <Pill key={c} tone="blue">
                  {c}
                </Pill>
              ))}
            </div>
          </div>
        )}

        {s.pack?.briefing_content && (
          <div className="rounded-xl bg-white/[0.03] border border-white/[0.06] p-4 space-y-2">
            <Eyebrow>Briefing</Eyebrow>
            <p className="text-[13.5px] text-white leading-relaxed whitespace-pre-wrap">
              {s.pack.briefing_content}
            </p>
          </div>
        )}

        {s.documents.length > 0 && (
          <div className="space-y-2">
            <Eyebrow>Documents</Eyebrow>
            {s.documents.map((d) =>
              d.file_url ? (
                <a
                  key={d.id}
                  href={d.file_url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between gap-3 min-h-12 rounded-xl bg-white/[0.03] border border-white/[0.06] px-4 py-3 touch-manipulation hover:bg-white/[0.08] transition-colors"
                >
                  <span className="flex items-center gap-2.5 min-w-0">
                    <FileText className="h-4 w-4 text-white/45 shrink-0" />
                    <span className="text-[13px] text-white truncate">{d.title}</span>
                  </span>
                  <ExternalLink className="h-4 w-4 text-elec-yellow shrink-0" />
                </a>
              ) : (
                <div
                  key={d.id}
                  className="flex items-center gap-2.5 min-h-12 rounded-xl bg-white/[0.03] border border-white/[0.06] px-4 py-3"
                >
                  <FileText className="h-4 w-4 text-white/45 shrink-0" />
                  <span className="text-[13px] text-white truncate">{d.title}</span>
                </div>
              )
            )}
          </div>
        )}

        {!isSigned && (
          <div className="rounded-xl bg-white/[0.03] border border-white/[0.06] p-4 space-y-3">
            <Eyebrow>Your signature</Eyebrow>
            <p className="text-[12.5px] text-white leading-relaxed">
              By signing you confirm you've read and understood the scope, hazards and method of
              work above.
            </p>
            <SignatureInput value={signature || undefined} onChange={setSignature} />
            {!signature && (
              <p className="text-[11.5px] text-amber-400/80">
                Draw your signature above to enable signing.
              </p>
            )}
          </div>
        )}

        {/* Inline action block — matches sibling pages (no fixed bar) */}
        <div className="pt-1">
          {!isSigned ? (
            <div className="flex w-full flex-row gap-2">
              <SecondaryButton
                size="lg"
                onClick={() => setSelected(null)}
                className="shrink-0 px-5"
              >
                Back
              </SecondaryButton>
              <PrimaryButton
                size="lg"
                fullWidth
                onClick={() => signMutation.mutate()}
                disabled={!signature || signMutation.isPending}
                className="gap-2"
              >
                {signMutation.isPending ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <FileCheck2 className="h-4 w-4" />
                )}
                {signMutation.isPending ? 'Saving…' : 'Sign and confirm'}
              </PrimaryButton>
            </div>
          ) : (
            <SecondaryButton size="lg" fullWidth onClick={() => setSelected(null)}>
              Back to sign-offs
            </SecondaryButton>
          )}
        </div>
      </div>
    );
  };

  /* ── Detail header — pack title + context, shown above the body ────── */
  const renderDetailHeader = (s: PackSignOff) => {
    const isSigned = !!s.acknowledged_at;
    const context = [s.pack?.client, s.pack?.location].filter(Boolean).join(' · ');
    return (
      <div className="space-y-1.5">
        <Eyebrow>{isSigned ? 'Signed job pack' : 'Awaiting your signature'}</Eyebrow>
        <h3 className="text-[20px] sm:text-[22px] font-semibold tracking-tight text-white leading-tight">
          {s.pack?.title || 'Job pack'}
        </h3>
        {context && <p className="text-[13px] text-white/70">{context}</p>}
      </div>
    );
  };

  /* ── Filtering ─────────────────────────────────────────────────────── */
  const filtered = signoffs
    .filter((s) =>
      tab === 'pending' ? !s.acknowledged_at : tab === 'signed' ? !!s.acknowledged_at : true
    )
    .filter(matchesSearch);

  const filteredPending = filtered.filter((s) => !s.acknowledged_at);
  const filteredSigned = filtered.filter((s) => !!s.acknowledged_at);

  /* ── The master list: stats, filter bar, and pack-card grids ───────── */
  const masterList = (
    <div className="space-y-6">
      <StatStrip
        columns={2}
        stats={[
          { label: 'To sign', value: pending.length, accent: pending.length > 0 },
          { label: 'Signed', value: signed.length, tone: 'emerald' },
        ]}
      />

      <FilterBar
        tabs={[
          { value: 'all', label: 'All', count: signoffs.length },
          { value: 'pending', label: 'To sign', count: pending.length },
          { value: 'signed', label: 'Signed', count: signed.length },
        ]}
        activeTab={tab}
        onTabChange={(v) => setTab(v as TabValue)}
        search={search}
        onSearchChange={setSearch}
        searchPlaceholder="Search packs…"
      />

      {filtered.length === 0 ? (
        <EmptyState
          title="No matching sign-offs"
          description="Try a different filter or clear your search."
        />
      ) : (
        <div className="space-y-6">
          {(tab === 'all' || tab === 'pending') && filteredPending.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Dot tone="amber" />
                <Eyebrow className="text-amber-400/80">Waiting for your signature</Eyebrow>
                <Pill tone="amber">{filteredPending.length}</Pill>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
                {filteredPending.map(renderCard)}
              </div>
            </div>
          )}

          {(tab === 'all' || tab === 'signed') && filteredSigned.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Dot tone="emerald" />
                <Eyebrow>Signed</Eyebrow>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
                {filteredSigned.map(renderCard)}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );

  return (
    <WorkerToolPage
      eyebrow="Worker tools"
      title="Sign-offs"
      description="Job packs the office has sent you to read and sign before you start."
    >
      {isLoading ? (
        <LoadingState />
      ) : signoffs.length === 0 ? (
        <EmptyState
          title="Nothing to sign"
          description="When the office sends a job pack — RAMS, method statement or briefing — it lands here for your signature before you start."
        />
      ) : (
        <>
          {/* ── Mobile (< lg): single column, list ⇄ detail via state ── */}
          <div className="lg:hidden">
            {selected ? (
              <div className="space-y-5">
                <button
                  type="button"
                  onClick={() => setSelected(null)}
                  className="-mt-1 -ml-1 inline-flex items-center gap-1 h-11 pr-3 text-[13px] font-medium text-white/70 hover:text-white touch-manipulation"
                >
                  <ChevronLeft className="h-4 w-4" />
                  All sign-offs
                </button>
                {renderDetailHeader(selected)}
                {renderDetailBody(selected)}
              </div>
            ) : (
              masterList
            )}
          </div>

          {/* ── Desktop (lg+): master-detail split using the full width ── */}
          <div className="hidden lg:grid lg:grid-cols-[3fr_2fr] gap-8 items-start">
            <div className="min-w-0">{masterList}</div>
            <div className="min-w-0 lg:sticky lg:top-20">
              {selected ? (
                <div className="rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_10%)] p-5 space-y-5">
                  {renderDetailHeader(selected)}
                  {renderDetailBody(selected)}
                </div>
              ) : (
                <div className="rounded-2xl border border-white/[0.06] border-dashed bg-white/[0.02] px-6 py-16 text-center">
                  <FileCheck2 className="mx-auto h-6 w-6 text-white/30" />
                  <p className="mt-3 text-[13px] font-medium text-white">Select a job pack</p>
                  <p className="mt-1.5 text-[12px] text-white/55 leading-relaxed">
                    Choose a pack on the left to read the scope, hazards and method — then sign.
                  </p>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </WorkerToolPage>
  );
}
