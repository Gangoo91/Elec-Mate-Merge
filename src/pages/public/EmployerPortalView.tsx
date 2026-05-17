/**
 * EmployerPortalView — public read-only employer dashboard.
 *
 * URL: /employer-view/:token
 *
 * No auth required. The token is a long random string issued by the
 * college via `college_employer_tokens`. The page shows every active
 * apprentice this employer has with attendance, OTJ hours, EPA status
 * and progress — so the employer can keep an eye on training without
 * needing an account.
 */

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Loader2, AlertTriangle, Briefcase, GraduationCap, Clock, Target } from 'lucide-react';
import { SUPABASE_URL } from '@/integrations/supabase/client';

interface Apprentice {
  id: string;
  name: string;
  course_name: string | null;
  progress_percent: number;
  attendance_percent: number | null;
  epa_status: string | null;
  epa_gateway_date: string | null;
  otj_total_hours: number;
  otj_verified_hours: number;
  start_date: string | null;
  expected_end_date: string | null;
}

interface PayloadOk {
  ok: true;
  employer: { company_name: string; contact_name: string | null };
  college_name: string | null;
  apprentices: Apprentice[];
  generated_at: string;
}

interface PayloadErr {
  ok: false;
  error: string;
}

function fmtDate(iso: string | null): string {
  if (!iso) return '—';
  try {
    return new Date(iso).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  } catch {
    return iso;
  }
}

function attendanceTone(pct: number | null): string {
  if (pct == null) return 'text-white/55';
  if (pct >= 85) return 'text-emerald-300';
  if (pct >= 70) return 'text-amber-300';
  return 'text-red-300';
}

function progressTone(pct: number): string {
  if (pct >= 75) return 'bg-emerald-400/80';
  if (pct >= 40) return 'bg-amber-400/80';
  return 'bg-red-400/80';
}

function epaTone(s: string | null): string {
  switch (s) {
    case 'Complete':
      return 'bg-emerald-500/[0.12] border-emerald-400/40 text-emerald-200';
    case 'Gateway Ready':
      return 'bg-elec-yellow/[0.12] border-elec-yellow/40 text-elec-yellow';
    case 'Pre-Gateway':
      return 'bg-blue-500/[0.12] border-blue-400/40 text-blue-200';
    case 'In Progress':
      return 'bg-amber-500/[0.10] border-amber-400/40 text-amber-200';
    default:
      return 'bg-white/[0.04] border-white/[0.10] text-white/55';
  }
}

export default function EmployerPortalView() {
  const { token } = useParams<{ token: string }>();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<PayloadOk | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!token) return;
    let cancelled = false;
    (async () => {
      try {
        const url = `${SUPABASE_URL}/functions/v1/employer-portal-view?token=${encodeURIComponent(token)}`;
        const res = await fetch(url);
        const body = (await res.json()) as PayloadOk | PayloadErr;
        if (cancelled) return;
        if (!res.ok || !body.ok) {
          setError((body as PayloadErr).error || `Could not load (${res.status})`);
        } else {
          setData(body);
        }
      } catch (err) {
        if (!cancelled) setError((err as Error).message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [token]);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-6">
        {loading && (
          <div className="flex items-center gap-3 py-20 justify-center">
            <Loader2 className="h-4 w-4 animate-spin text-white/55" />
            <span className="text-[12px] uppercase tracking-[0.18em] text-white/55">
              Loading your apprentices…
            </span>
          </div>
        )}

        {!loading && error && (
          <div className="rounded-xl border border-red-500/30 bg-red-500/[0.04] p-5 space-y-2">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-red-300" />
              <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-red-300">
                Cannot show this dashboard
              </span>
            </div>
            <p className="text-[13px] text-white/85 leading-relaxed">{error}</p>
            <p className="text-[12px] text-white/55 leading-relaxed">
              Ask the college to issue a fresh link.
            </p>
          </div>
        )}

        {!loading && data && (
          <>
            <header className="space-y-2">
              <div className="flex items-center gap-2">
                <Briefcase className="h-3.5 w-3.5 text-elec-yellow" />
                <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                  Employer dashboard
                </span>
              </div>
              <h1 className="text-[24px] sm:text-[28px] font-semibold tracking-tight leading-tight">
                {data.employer.company_name}
              </h1>
              <p className="text-[13px] text-white/70 leading-relaxed">
                Live progress for every apprentice placed with you
                {data.college_name ? ` by ${data.college_name}` : ''}. Read-only —
                no login required. The college updates this automatically.
              </p>
            </header>

            {/* Headline numbers */}
            <section className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <Tile
                label="Apprentices"
                value={data.apprentices.length}
                icon={<GraduationCap className="h-3 w-3" />}
              />
              <Tile
                label="Avg attendance"
                value={avgAttendance(data.apprentices)}
                suffix="%"
                icon={<Target className="h-3 w-3" />}
              />
              <Tile
                label="OTJ hours"
                value={totalOtj(data.apprentices)}
                suffix="h"
                icon={<Clock className="h-3 w-3" />}
              />
              <Tile
                label="Gateway ready"
                value={
                  data.apprentices.filter(
                    (a) => a.epa_status === 'Gateway Ready' || a.epa_status === 'Complete'
                  ).length
                }
              />
            </section>

            {data.apprentices.length === 0 && (
              <div className="rounded-xl border border-dashed border-white/[0.10] p-8 text-center text-[13px] text-white/55">
                No active apprentices are placed with you right now.
              </div>
            )}

            {data.apprentices.length > 0 && (
              <section className="space-y-3">
                <h2 className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                  Your apprentices
                </h2>
                <ul className="space-y-3">
                  {data.apprentices.map((a) => (
                    <li
                      key={a.id}
                      className="rounded-xl border border-white/[0.06] bg-[hsl(0_0%_10%)] p-4 sm:p-5 space-y-3"
                    >
                      <div className="flex items-start justify-between gap-3 flex-wrap">
                        <div className="min-w-0 flex-1">
                          <div className="text-[15px] font-semibold text-white truncate">
                            {a.name}
                          </div>
                          <div className="text-[11.5px] text-white/55 truncate">
                            {a.course_name ?? 'Course'}
                            {a.start_date && (
                              <span className="ml-2">· started {fmtDate(a.start_date)}</span>
                            )}
                          </div>
                        </div>
                        {a.epa_status && (
                          <span
                            className={`inline-flex items-center h-6 px-2 rounded-md border text-[10.5px] font-semibold tracking-[0.04em] uppercase ${epaTone(a.epa_status)}`}
                          >
                            {a.epa_status}
                          </span>
                        )}
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        <Stat
                          label="Progress"
                          value={`${a.progress_percent}%`}
                          bar={<Bar pct={a.progress_percent} className={progressTone(a.progress_percent)} />}
                        />
                        <Stat
                          label="Attendance"
                          value={a.attendance_percent != null ? `${a.attendance_percent}%` : '—'}
                          valueTone={attendanceTone(a.attendance_percent)}
                        />
                        <Stat
                          label="OTJ hours"
                          value={`${a.otj_total_hours}h`}
                          sub={
                            a.otj_verified_hours > 0
                              ? `${a.otj_verified_hours}h verified`
                              : undefined
                          }
                        />
                        <Stat
                          label="Gateway"
                          value={fmtDate(a.epa_gateway_date)}
                          sub={a.expected_end_date ? `End ${fmtDate(a.expected_end_date)}` : undefined}
                        />
                      </div>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            <footer className="pt-6 border-t border-white/[0.06] text-center space-y-2">
              <p className="text-[10.5px] uppercase tracking-[0.18em] text-white/35">
                Last refreshed{' '}
                {new Date(data.generated_at).toLocaleString('en-GB', {
                  day: 'numeric',
                  month: 'short',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </p>
              <p className="text-[10px] uppercase tracking-[0.18em] text-white/25">
                Powered by Elec-Mate · UK apprenticeship platform
              </p>
            </footer>
          </>
        )}
      </div>
    </div>
  );
}

function avgAttendance(apprentices: Apprentice[]): number {
  const vals = apprentices
    .map((a) => a.attendance_percent)
    .filter((v): v is number => typeof v === 'number');
  if (vals.length === 0) return 0;
  return Math.round(vals.reduce((s, v) => s + v, 0) / vals.length);
}

function totalOtj(apprentices: Apprentice[]): number {
  return Math.round(apprentices.reduce((s, a) => s + (a.otj_total_hours ?? 0), 0));
}

function Tile({
  label,
  value,
  suffix,
  icon,
}: {
  label: string;
  value: number;
  suffix?: string;
  icon?: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-white/[0.06] bg-[hsl(0_0%_10%)] p-3">
      <div className="flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
        {icon}
        {label}
      </div>
      <div className="mt-1 text-[22px] font-semibold text-white tabular-nums leading-none">
        {value}
        {suffix && <span className="ml-0.5 text-[14px] font-normal text-white/55">{suffix}</span>}
      </div>
    </div>
  );
}

function Stat({
  label,
  value,
  valueTone,
  sub,
  bar,
}: {
  label: string;
  value: string;
  valueTone?: string;
  sub?: string;
  bar?: React.ReactNode;
}) {
  return (
    <div>
      <div className="text-[10px] uppercase tracking-[0.14em] text-white/55">{label}</div>
      <div className={`mt-0.5 text-[14px] font-semibold tabular-nums ${valueTone ?? 'text-white'}`}>
        {value}
      </div>
      {bar}
      {sub && <div className="mt-0.5 text-[10.5px] text-white/45">{sub}</div>}
    </div>
  );
}

function Bar({ pct, className }: { pct: number; className?: string }) {
  return (
    <div className="mt-1 h-1 rounded-full bg-white/[0.06] overflow-hidden">
      <div
        className={`h-full ${className ?? 'bg-white/60'}`}
        style={{ width: `${Math.max(0, Math.min(100, pct))}%` }}
      />
    </div>
  );
}
