/**
 * "From your work" (ELE-1906): pick a certificate, a schedule of test
 * results or a calculation you did in Elec-Mate and turn it into portfolio
 * evidence. Choosing one makes the readable file (a PDF summary, or the
 * calculation's own PDF), stores it with your evidence, and hands the capture
 * sheet a prefilled draft with suggested criteria. The learner still claims,
 * describes and saves; nothing is claimed or sent from here.
 */
import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertTriangle, Calculator, Camera, ChevronRight, ClipboardList, FileCheck2, Loader2, ScanLine } from 'lucide-react';
import { cn } from '@/lib/utils';
import { FormSheet } from '@/components/forms/FormSheet';
import { useAuth } from '@/contexts/AuthContext';
import {
  listWorkSources,
  prepareWorkEvidence,
  type PreparedWorkEvidence,
  type WorkKind,
  type WorkSource,
} from '@/lib/portfolio/workEvidence';
import { P_BTN, P_LIST, P_ROW, pChip } from './ui';

const TABS: { key: WorkKind; label: string; icon: typeof FileCheck2 }[] = [
  { key: 'certificate', label: 'Certificates', icon: FileCheck2 },
  { key: 'test_results', label: 'Test results', icon: ClipboardList },
  { key: 'calculation', label: 'Calculations', icon: Calculator },
];

const EMPTY: Record<WorkKind, { title: string; body: string }> = {
  certificate: {
    title: 'No certificates yet',
    body: 'Certificates you fill in on Elec-Mate show up here. Helped with one on paper? Take a clear photo of it instead and pick "Certificate" as the type.',
  },
  test_results: {
    title: 'No test results yet',
    body: 'Schedules of test results from your certificates show up here. Filled in a paper schedule? Use "Photo of a paper schedule": we read the readings and you check them.',
  },
  calculation: {
    title: 'No calculations saved yet',
    body: 'Run a calculator, then tap "Add to portfolio" under the result. It appears here and in your evidence.',
  },
};

export function WorkEvidencePicker({
  open,
  onOpenChange,
  initialKind = 'certificate',
  onPrepared,
  onPhotograph,
  onPaperSchedule,
}: {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  initialKind?: WorkKind;
  onPrepared: (prepared: PreparedWorkEvidence) => void;
  /** Close and open the camera, for a paper certificate or schedule. */
  onPhotograph?: () => void;
  /** Close and open "Photo of a paper schedule" (AI reads, learner confirms). */
  onPaperSchedule?: () => void;
}) {
  const navigate = useNavigate();
  const { user, profile } = useAuth();
  const [tab, setTab] = useState<WorkKind>(initialKind);
  const [sources, setSources] = useState<Record<WorkKind, WorkSource[]> | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  // Full issued certificate as well as the summary. OFF by default every time
  // the picker opens: it carries the client's name and address.
  const [includeFull, setIncludeFull] = useState(false);

  useEffect(() => {
    if (!open || !user) return;
    setTab(initialKind);
    setError(null);
    setIncludeFull(false);
    setLoadError(null);
    let live = true;
    listWorkSources(user.id)
      .then((r) => {
        if (live) setSources({ certificate: r.certs, test_results: r.schedules, calculation: r.calcs });
      })
      .catch(() => live && setLoadError('Could not load your work. Check your signal and try again.'));
    return () => {
      live = false;
    };
  }, [open, initialKind, user]);

  const list = useMemo(() => sources?.[tab] ?? [], [sources, tab]);

  const choose = async (src: WorkSource) => {
    if (!user || busyId) return;
    setBusyId(`${src.kind}:${src.id}`);
    setError(null);
    try {
      const prepared = await prepareWorkEvidence(
        src.kind,
        src.id,
        { userId: user.id, name: (profile?.full_name as string | undefined) ?? '' },
        { includeFullCertificate: src.kind === 'certificate' && includeFull }
      );
      onPrepared(prepared);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Something went wrong. Try again.');
    } finally {
      setBusyId(null);
    }
  };

  return (
    <FormSheet
      open={open}
      onOpenChange={(o) => {
        if (busyId) return;
        onOpenChange(o);
      }}
      width="wide"
      eyebrow="Capture · From your work"
      title="Use your own work as evidence"
      description="Pick a certificate, a schedule of test results or a calculation you did. We make a readable copy for your assessor and suggest the criteria it could cover. You choose what to claim."
    >
      <div className="grid gap-6 py-2 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-10">
        <div className="min-w-0 space-y-4">
          <div className="flex gap-2 overflow-x-auto pb-1" role="tablist" aria-label="Kind of work">
            {TABS.map((t) => {
              const n = sources?.[t.key]?.length;
              return (
                <button
                  key={t.key}
                  type="button"
                  role="tab"
                  aria-selected={tab === t.key}
                  className={cn(pChip(tab === t.key), 'h-11 inline-flex items-center gap-1.5')}
                  onClick={() => setTab(t.key)}
                >
                  <t.icon className="h-4 w-4" />
                  {t.label}
                  {n !== undefined && <span className="font-mono">{n}</span>}
                </button>
              );
            })}
          </div>

          {tab === 'certificate' && (sources?.certificate.length ?? 0) > 0 && (
            <div className="space-y-2">
              <button
                type="button"
                role="switch"
                aria-checked={includeFull}
                onClick={() => setIncludeFull((v) => !v)}
                className="flex min-h-11 w-full items-center gap-3 rounded-2xl border border-white/[0.12] bg-white/[0.04] px-4 py-2.5 text-left touch-manipulation"
              >
                <span
                  className={cn(
                    'relative h-6 w-10 shrink-0 rounded-full transition-colors',
                    includeFull ? 'bg-elec-yellow' : 'bg-white/[0.18]'
                  )}
                  aria-hidden
                >
                  <span
                    className={cn(
                      'absolute top-0.5 h-5 w-5 rounded-full bg-white transition-all',
                      includeFull ? 'left-[18px]' : 'left-0.5'
                    )}
                  />
                </span>
                <span className="min-w-0">
                  <span className="block text-[14px] font-semibold text-white">
                    Also attach the full issued certificate
                  </span>
                  <span className="block text-[12.5px] leading-snug text-white">
                    Off: the summary only, with no client details. Completed certificates only.
                  </span>
                </span>
              </button>
              {includeFull && (
                <div
                  role="alert"
                  className="flex gap-3 rounded-2xl border border-amber-400/40 bg-amber-500/[0.1] p-3.5"
                >
                  <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-300" aria-hidden />
                  <p className="text-[13px] leading-snug text-white">
                    The full certificate shows the client&apos;s name and address. Evidence files can
                    be opened by anyone who has the link, including your assessor and anyone you
                    share your portfolio with. Only attach it if the client, or your employer, has
                    said that is fine.
                  </p>
                </div>
              )}
            </div>
          )}

          {tab === 'test_results' && onPaperSchedule && (
            <button
              type="button"
              onClick={onPaperSchedule}
              className="flex min-h-11 w-full items-center gap-3 rounded-2xl border border-white/[0.12] bg-white/[0.04] px-4 py-2.5 text-left touch-manipulation active:bg-white/[0.08]"
            >
              <ScanLine className="h-5 w-5 shrink-0 text-elec-yellow" aria-hidden />
              <span className="min-w-0 flex-1">
                <span className="block text-[14px] font-semibold text-white">Photo of a paper schedule</span>
                <span className="block text-[12.5px] leading-snug text-white">
                  We read the readings off your photo. You check every value before it is used.
                </span>
              </span>
              <ChevronRight className="h-4 w-4 shrink-0 text-white" aria-hidden />
            </button>
          )}

          {error && (
            <p role="alert" className="rounded-xl border border-orange-500/30 bg-orange-500/10 p-3 text-[13px] text-orange-300">
              {error}
            </p>
          )}

          {loadError ? (
            <p className="text-[14px] text-white">{loadError}</p>
          ) : !sources ? (
            <div className="space-y-2">
              {[0, 1, 2].map((k) => (
                <div key={k} className="h-16 animate-pulse rounded-2xl bg-white/[0.04]" />
              ))}
            </div>
          ) : list.length === 0 ? (
            <div className="-mx-4 space-y-3 border-y border-white/[0.08] bg-gradient-to-b from-white/[0.07] to-white/[0.025] p-5 sm:mx-0 sm:rounded-3xl sm:border-x">
              <p className="text-[15px] font-semibold text-white">{EMPTY[tab].title}</p>
              <p className="text-[13.5px] leading-relaxed text-white">{EMPTY[tab].body}</p>
              <div className="flex flex-wrap gap-2">
                {tab === 'test_results' && onPaperSchedule && (
                  <button type="button" className={P_BTN} onClick={onPaperSchedule}>
                    <ScanLine className="h-4 w-4" /> Photo of a paper schedule
                  </button>
                )}
                {tab === 'certificate' && onPhotograph && (
                  <button type="button" className={P_BTN} onClick={onPhotograph}>
                    <Camera className="h-4 w-4" /> Photograph a paper one
                  </button>
                )}
                {tab === 'calculation' && (
                  <button
                    type="button"
                    className={P_BTN}
                    onClick={() => {
                      onOpenChange(false);
                      navigate('/apprentice/calculators');
                    }}
                  >
                    <Calculator className="h-4 w-4" /> Open the calculators
                  </button>
                )}
              </div>
            </div>
          ) : (
            <ul className={P_LIST}>
              {list.map((src) => {
                const key = `${src.kind}:${src.id}`;
                const busy = busyId === key;
                return (
                  <li key={key}>
                    <button
                      type="button"
                      className={cn(P_ROW, busyId && !busy && 'opacity-50')}
                      disabled={!!busyId}
                      onClick={() => void choose(src)}
                    >
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-[14.5px] font-semibold text-white">{src.title}</span>
                        <span className="block truncate text-[12.5px] text-white">{src.meta || 'No date'}</span>
                      </span>
                      <span
                        className={cn(
                          'shrink-0 rounded-full border px-2 py-0.5 text-[11px] font-semibold',
                          src.status === 'Completed'
                            ? 'border-emerald-400/40 bg-emerald-500/[0.12] text-emerald-300'
                            : 'border-white/[0.2] text-white'
                        )}
                      >
                        {src.status}
                      </span>
                      {busy ? (
                        <span className="flex shrink-0 items-center gap-1.5 text-[12.5px] font-semibold text-elec-yellow">
                          <Loader2 className="h-4 w-4 animate-spin" />
                          <span className="hidden sm:inline">Making the copy</span>
                        </span>
                      ) : (
                        <ChevronRight className="h-4 w-4 shrink-0 text-white" />
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        <aside className="space-y-4 lg:border-l lg:border-white/[0.08] lg:pl-8">
          <h3 className="text-[13px] font-semibold text-white">What happens when you pick one</h3>
          <ol className="space-y-3">
            {[
              ['A readable copy', 'Certificates and schedules become a one-page PDF summary with every test result. Client names and full addresses are left out. A calculation keeps its own PDF and gets an automatic check against BS 7671 for your assessor.'],
              ['Suggested criteria', 'We match what the work contains against your course criteria. These are suggestions until you tick them.'],
              ['You finish it', 'Say what your part was and who supervised you, tick what it really shows, then save. Send it to your assessor when you are ready.'],
            ].map(([t, b], i) => (
              <li key={t} className="flex gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-elec-yellow/50 font-mono text-[12px] text-elec-yellow">
                  {i + 1}
                </span>
                <span className="min-w-0">
                  <span className="block text-[13.5px] font-semibold text-white">{t}</span>
                  <span className="block text-[12.5px] leading-snug text-white">{b}</span>
                </span>
              </li>
            ))}
          </ol>
          <p className="text-[12.5px] leading-snug text-white">
            Only your assessor can pass a criterion. Your certificate itself is never changed.
          </p>
        </aside>
      </div>
    </FormSheet>
  );
}

export default WorkEvidencePicker;
