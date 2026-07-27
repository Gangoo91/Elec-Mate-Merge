/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Public fire alarm log book (ELE-1396) — the responsible person's view.
 *
 * Opened from a share link, no account needed. They see this week's call
 * point, record the weekly test in one tap, and can log faults and false
 * alarms. The electrician who owns the log stays supervisor: everything
 * lands in the same record their certificates read from.
 */
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { format } from 'date-fns';
import { supabase } from '@/integrations/supabase/client';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

interface SharedEntry {
  entry_type: string;
  entry_date: string;
  data: Record<string, string>;
  tester_name: string;
  resolved: boolean | null;
  created_at: string;
}

interface SharedLog {
  building_name: string;
  building_address: string;
  system_category: string;
  panel_make: string;
  panel_location: string;
  call_points: { number: string; zone: string; location: string }[];
  weekly_test_day: string;
  entries: SharedEntry[];
}

const TYPE_LABELS: Record<string, string> = {
  weekly_test: 'Weekly call point test',
  monthly_check: 'Monthly check',
  fault: 'Fault',
  false_alarm: 'False alarm',
  fire_event: 'Fire event',
  drill: 'Fire drill',
  service: 'Service visit',
  battery: 'Battery change',
  panel_event: 'Panel event',
  variation: 'Agreed variation',
};

const inputCn =
  'h-12 text-base touch-manipulation bg-white/[0.08] border-white/[0.16] text-white placeholder:text-white/45 focus:border-yellow-500 focus:ring-yellow-500';

const TESTER_KEY = 'fire-log-shared-tester';

function localIsoDate(d: Date = new Date()): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

function weekStartLocal(d: Date): string {
  const copy = new Date(d);
  copy.setDate(copy.getDate() - ((copy.getDay() + 6) % 7));
  return localIsoDate(copy);
}

const FireLogShared = () => {
  const { token } = useParams<{ token: string }>();
  const [log, setLog] = useState<SharedLog | null>(null);
  const [loading, setLoading] = useState(true);
  const [tester, setTester] = useState(() => localStorage.getItem(TESTER_KEY) || '');
  const [busy, setBusy] = useState(false);
  const [reportType, setReportType] = useState<'fault' | 'false_alarm' | null>(null);
  const [reportText, setReportText] = useState('');
  const [reportZone, setReportZone] = useState('');

  const load = useCallback(async () => {
    if (!token) return;
    setLoading(true);
    try {
      const { data, error } = await (supabase as any).rpc('get_fire_log_shared', {
        p_token: token,
      });
      if (error) throw error;
      setLog(data as SharedLog | null);
    } catch {
      setLog(null);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    load();
  }, [load]);

  const status = useMemo(() => {
    if (!log) return null;
    const weekly = log.entries.filter((e) => e.entry_type === 'weekly_test');
    const thisWeek = weekStartLocal(new Date());
    const testedThisWeek = weekly.some(
      (e) => weekStartLocal(new Date(e.entry_date + 'T00:00:00')) === thisWeek
    );
    const points = log.call_points ?? [];
    let nextCp = points[0] ?? null;
    const lastTest = weekly.find((e) => e.data?.call_point);
    if (lastTest && points.length) {
      const i = points.findIndex((p) => p.number === lastTest.data.call_point);
      nextCp = points[(i + 1) % points.length];
    }
    const openFaults = log.entries.filter(
      (e) => e.entry_type === 'fault' && e.resolved !== true
    ).length;
    const testWeeks = new Set(
      weekly.map((e) => weekStartLocal(new Date(e.entry_date + 'T00:00:00')))
    );
    const weeklyRecord: boolean[] = [];
    for (let i = 7; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i * 7);
      weeklyRecord.push(testWeeks.has(weekStartLocal(d)));
    }
    return { testedThisWeek, nextCp, openFaults, weeklyRecord };
  }, [log]);

  const requireTester = (): string | null => {
    const t = tester.trim();
    if (t.length < 2) {
      toast.error('Add your name first — every entry needs a recorded tester');
      return null;
    }
    localStorage.setItem(TESTER_KEY, t);
    return t;
  };

  const recordPass = async () => {
    if (!token || !status?.nextCp) return;
    const t = requireTester();
    if (!t) return;
    setBusy(true);
    try {
      const { error } = await (supabase as any).rpc('add_fire_log_shared_entry', {
        p_token: token,
        p_entry_type: 'weekly_test',
        p_entry_date: localIsoDate(),
        p_data: {
          call_point: status.nextCp.number,
          zone: status.nextCp.zone,
          location: status.nextCp.location,
          result: 'Pass',
        },
        p_tester: t,
      });
      if (error) throw error;
      toast.success(`Call point ${status.nextCp.number} logged — pass`);
      await load();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'Could not log the test');
    } finally {
      setBusy(false);
    }
  };

  const submitReport = async () => {
    if (!token || !reportType || !reportText.trim()) return;
    const t = requireTester();
    if (!t) return;
    setBusy(true);
    try {
      const { error } = await (supabase as any).rpc('add_fire_log_shared_entry', {
        p_token: token,
        p_entry_type: reportType,
        p_entry_date: localIsoDate(),
        p_data:
          reportType === 'fault'
            ? { description: reportText.trim(), zone: reportZone.trim() }
            : { cause: reportText.trim(), zone: reportZone.trim() },
        p_tester: t,
      });
      if (error) throw error;
      toast.success(
        reportType === 'fault'
          ? 'Fault logged — your fire alarm contractor can see it'
          : 'False alarm logged'
      );
      setReportType(null);
      setReportText('');
      setReportZone('');
      await load();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'Could not save');
    } finally {
      setBusy(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="h-8 w-8 rounded-full border-2 border-white/20 border-t-elec-yellow animate-spin" />
      </div>
    );
  }

  if (!log) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-6">
        <div className="text-center max-w-sm">
          <p className="text-[17px] font-semibold text-white">This link isn't active</p>
          <p className="mt-2 text-[13px] text-white/75 leading-relaxed">
            The log book share may have been turned off. Contact your fire alarm contractor for a
            new link.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <Helmet>
        <title>{log.building_name} — Fire Alarm Log Book</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <main className="px-4 sm:px-6 pb-[max(5rem,env(safe-area-inset-bottom))] max-w-xl mx-auto">
        {/* Identity */}
        <div className="pt-9">
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-elec-yellow/80">
            Fire alarm log book
          </p>
          <h1 className="mt-1.5 text-2xl sm:text-3xl font-semibold text-white tracking-[-0.02em]">
            {log.building_name}
          </h1>
          {log.building_address && (
            <p className="mt-1 text-[13px] text-white/75">{log.building_address}</p>
          )}
          <p className="mt-2 text-[11.5px] text-white/70">
            {[
              log.system_category && `Category ${log.system_category}`,
              log.panel_make,
              log.panel_location && `panel at ${log.panel_location}`,
            ]
              .filter(Boolean)
              .join(' · ')}
          </p>
        </div>

        {/* Your name */}
        <div className="mt-6">
          <p className="text-[11.5px] font-medium text-white/80 mb-1.5">Your name</p>
          <Input
            className={inputCn}
            placeholder="Recorded against every entry you make"
            autoComplete="name"
            autoCapitalize="words"
            value={tester}
            onChange={(e) => setTester(e.target.value)}
          />
        </div>

        {/* This week */}
        <div className="mt-5 rounded-2xl bg-[hsl(0_0%_12%)] border border-white/[0.08] overflow-hidden">
          <div className="px-5 pt-5 pb-4">
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-elec-yellow/80">
              This week
            </p>
            {status?.testedThisWeek ? (
              <>
                <h2 className="mt-1.5 text-[19px] font-semibold text-white tracking-tight">
                  Tested — all done
                </h2>
                <p className="mt-1 text-[12.5px] text-white/75">
                  Next in rotation: CP {status.nextCp?.number ?? '—'}
                  {status.nextCp?.location ? ` — ${status.nextCp.location}` : ''}
                </p>
              </>
            ) : status?.nextCp ? (
              <>
                <h2 className="mt-1.5 text-[19px] font-semibold text-white tracking-tight">
                  Test call point {status.nextCp.number}
                </h2>
                <p className="mt-1 text-[13px] text-white/80">
                  {[status.nextCp.zone && `Zone ${status.nextCp.zone}`, status.nextCp.location]
                    .filter(Boolean)
                    .join(' · ')}
                </p>
                <p className="mt-2 text-[11.5px] text-white/70 leading-relaxed">
                  Operate the call point, check the sounders, reset the panel — then record it
                  here.
                </p>
              </>
            ) : (
              <h2 className="mt-1.5 text-[17px] font-semibold text-white tracking-tight">
                No call points listed yet — your contractor is setting this up
              </h2>
            )}
          </div>
          {status && !status.testedThisWeek && status.nextCp && (
            <div className="px-5 pb-5">
              <Button
                onClick={recordPass}
                disabled={busy}
                className="w-full h-12 rounded-xl bg-elec-yellow text-black font-semibold hover:bg-yellow-400 touch-manipulation"
              >
                {busy ? 'Saving…' : 'Record pass'}
              </Button>
            </div>
          )}
        </div>

        {/* Report */}
        <div className="mt-4 grid grid-cols-2 gap-2.5">
          {(
            [
              ['fault', 'Report a fault'],
              ['false_alarm', 'Log a false alarm'],
            ] as ['fault' | 'false_alarm', string][]
          ).map(([type, label]) => (
            <button
              key={type}
              type="button"
              onClick={() => setReportType(reportType === type ? null : type)}
              className={cn(
                'h-12 rounded-xl text-[13.5px] font-medium touch-manipulation border transition-colors',
                reportType === type
                  ? 'bg-white/[0.1] text-white border-white/[0.25]'
                  : 'bg-white/[0.05] text-white/80 border-white/[0.12] hover:bg-white/[0.09]'
              )}
            >
              {label}
            </button>
          ))}
        </div>

        {reportType && (
          <div className="mt-3 rounded-2xl bg-[hsl(0_0%_12%)] border border-white/[0.08] p-4 space-y-3">
            <Textarea
              className="touch-manipulation text-base min-h-[90px] bg-white/[0.06] border-white/[0.12] text-white focus:border-yellow-500 focus:ring-2 focus:ring-elec-yellow/20"
              placeholder={
                reportType === 'fault'
                  ? 'What happened? (e.g. fault light on panel, zone 2)'
                  : 'What set it off? (e.g. cooking, dust from works)'
              }
              value={reportText}
              onChange={(e) => setReportText(e.target.value)}
            />
            <Input
              className={inputCn}
              placeholder="Zone or area (optional)"
              value={reportZone}
              onChange={(e) => setReportZone(e.target.value)}
            />
            <Button
              onClick={submitReport}
              disabled={busy || !reportText.trim()}
              className="w-full h-12 rounded-xl bg-elec-yellow text-black font-semibold hover:bg-yellow-400 touch-manipulation"
            >
              {busy ? 'Saving…' : 'Save to log'}
            </Button>
          </div>
        )}

        {status && status.openFaults > 0 && (
          <p className="mt-3 text-[12px] text-orange-300">
            {status.openFaults} open fault{status.openFaults > 1 ? 's' : ''} — your fire alarm
            contractor can see {status.openFaults > 1 ? 'them' : 'it'}.
          </p>
        )}

        {/* Recent record */}
        <div className="mt-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/70">
              Recent record
            </p>
            {status && (
              <div className="flex items-center gap-1" aria-label="Last 8 weeks of tests">
                {status.weeklyRecord.map((tested, i) => (
                  <span
                    key={i}
                    className={cn(
                      'h-2 w-2 rounded-[2px]',
                      tested ? 'bg-elec-yellow' : 'bg-white/[0.1]'
                    )}
                  />
                ))}
              </div>
            )}
          </div>
          <div className="rounded-2xl bg-[hsl(0_0%_12%)] border border-white/[0.08] divide-y divide-white/[0.06] overflow-hidden">
            {log.entries.length === 0 ? (
              <p className="px-5 py-8 text-center text-[13px] text-white/75">
                Nothing logged yet — the first weekly test starts the record.
              </p>
            ) : (
              log.entries.slice(0, 20).map((e, i) => (
                <div key={i} className="px-5 py-3 flex items-baseline gap-4">
                  <span className="shrink-0 w-[70px] text-[11.5px] text-white/70 tabular-nums">
                    {format(new Date(e.entry_date + 'T00:00:00'), 'd MMM yy')}
                  </span>
                  <div className="min-w-0">
                    <span className="text-[9px] font-semibold uppercase tracking-[0.14em] text-white/70 border border-white/[0.12] rounded px-1.5 py-0.5">
                      {TYPE_LABELS[e.entry_type] ?? e.entry_type}
                    </span>
                    <p className="mt-1 text-[13px] text-white leading-snug">
                      {[
                        e.data.call_point && `CP ${e.data.call_point}`,
                        e.data.description || e.data.cause || e.data.scope,
                        e.data.result,
                      ]
                        .filter(Boolean)
                        .join(' — ') || '—'}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <p className="mt-6 text-[11px] text-white/65 leading-relaxed">
          This log book is kept digitally in accordance with BS 5839-1:2025 Clause 48.2, maintained
          with your fire alarm contractor through Elec-Mate.
        </p>
      </main>
    </div>
  );
};

export default FireLogShared;
