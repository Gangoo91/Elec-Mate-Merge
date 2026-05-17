import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import useSEO from '@/hooks/useSEO';

/* ==========================================================================
   ParentDigestPage — /p/:token  (public, no auth)
   ELE-932 (J3). Loads via parent-portal-view edge fn. The token is single-
   use — once viewed it's marked used (parent can ask for a fresh link from
   their next weekly email).
   ========================================================================== */

interface ParentDigestPayload {
  student_name: string;
  college_name: string;
  iso_week: string;
  greeting: string;
  attendance_pct: number | null;
  attendance_status_line: string;
  highlights: string[];
  concerns: string[];
  upcoming: string[];
  view_url: string;
  unsubscribe_url: string;
}

interface DigestResponse {
  ok: boolean;
  parent: { name: string; email: string };
  student: { name: string; status: string } | null;
  college: { name: string; logo_url: string | null } | null;
  digest: ParentDigestPayload | null;
  sent_at: string | null;
  iso_week: string | null;
}

export default function ParentDigestPage() {
  const { token } = useParams<{ token: string }>();
  const [search] = useSearchParams();
  const isUnsubscribe = search.get('action') === 'unsubscribe';

  useSEO({
    title: 'Apprentice update — Elec-Mate',
    description: 'Weekly update on your apprentice.',
    noindex: true,
  });

  const [data, setData] = useState<DigestResponse | null>(null);
  const [unsubscribed, setUnsubscribed] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!token) {
      setError('Missing link');
      setLoading(false);
      return;
    }
    let cancelled = false;
    (async () => {
      try {
        const { data: result, error: invErr } = await supabase.functions.invoke(
          'parent-portal-view',
          { body: { token, action: isUnsubscribe ? 'unsubscribe' : 'view' } }
        );
        if (cancelled) return;
        if (invErr) throw invErr;
        if (isUnsubscribe) {
          setUnsubscribed(true);
        } else {
          setData(result as DigestResponse);
        }
      } catch (e: any) {
        if (!cancelled) {
          const msg =
            e?.message?.includes('expired') || e?.message?.includes('410')
              ? 'This link has expired. Please ask the college for a fresh one.'
              : e?.message?.includes('invalid') || e?.message?.includes('404')
                ? "We couldn't find that link. Check your email for the latest one."
                : 'Something went wrong loading your update.';
          setError(msg);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [token, isUnsubscribe]);

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 py-10 sm:py-16">
        <header className="flex items-center justify-between gap-4 mb-8">
          <div>
            <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-500">
              Apprentice update
            </div>
            <div className="text-lg sm:text-xl font-semibold mt-1">
              {data?.college?.name ?? 'Elec-Mate'}
            </div>
          </div>
          {data?.college?.logo_url && (
            <img
              src={data.college.logo_url}
              alt=""
              className="h-10 w-auto"
              onError={(e) => ((e.currentTarget.style.display = 'none'))}
            />
          )}
        </header>

        {loading && <div className="text-sm text-slate-500">Loading your update…</div>}

        {error && (
          <div className="rounded-2xl border border-rose-200 bg-rose-50 px-5 py-4 text-sm text-rose-700">
            {error}
          </div>
        )}

        {unsubscribed && !error && (
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-5 py-4">
            <h1 className="text-lg font-semibold text-emerald-900">Unsubscribed</h1>
            <p className="mt-2 text-sm text-emerald-800">
              You won't receive any more weekly updates from this college. If you change your mind,
              speak to your apprentice's tutor and they can re-add you.
            </p>
          </div>
        )}

        {!loading && !error && data && data.digest && (
          <article className="space-y-6">
            <div>
              <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">
                {data.student?.name ?? 'Your apprentice'} — weekly update
              </h1>
              <p className="text-xs text-slate-500 mt-1">
                Week {data.iso_week} · sent{' '}
                {data.sent_at ? new Date(data.sent_at).toLocaleDateString('en-GB') : ''}
              </p>
            </div>

            <p className="text-[15px] leading-relaxed text-slate-700">
              {data.digest.greeting}
            </p>

            {data.digest.attendance_pct !== null && (
              <section className="rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4">
                <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Attendance
                </div>
                <div className="mt-1 text-3xl font-semibold text-slate-900">
                  {data.digest.attendance_pct}%
                </div>
                <div className="mt-2 text-sm text-slate-700">
                  {data.digest.attendance_status_line}
                </div>
              </section>
            )}

            {data.digest.highlights?.length > 0 && (
              <section>
                <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-500">
                  Highlights
                </h2>
                <ul className="mt-3 space-y-2">
                  {data.digest.highlights.map((h, i) => (
                    <li key={i} className="flex gap-3">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" />
                      <span className="text-[15px] text-slate-800">{h}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {data.digest.concerns?.length > 0 && (
              <section>
                <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-500">
                  Things to follow up
                </h2>
                <ul className="mt-3 space-y-2">
                  {data.digest.concerns.map((h, i) => (
                    <li key={i} className="flex gap-3">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" />
                      <span className="text-[15px] text-slate-800">{h}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {data.digest.upcoming?.length > 0 && (
              <section>
                <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-500">
                  Coming up
                </h2>
                <ul className="mt-3 space-y-2">
                  {data.digest.upcoming.map((h, i) => (
                    <li key={i} className="flex gap-3">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-400" />
                      <span className="text-[15px] text-slate-800">{h}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            <footer className="border-t border-slate-200 pt-6 mt-10 text-xs text-slate-500 space-y-2">
              <p>
                Sent by your apprentice's college via Elec-Mate. Reply directly to your apprentice's
                tutor to discuss any of the above.
              </p>
              {data.digest.unsubscribe_url && (
                <p>
                  <a
                    href={data.digest.unsubscribe_url}
                    className="text-slate-600 underline underline-offset-2"
                  >
                    Stop receiving these weekly updates
                  </a>
                </p>
              )}
            </footer>
          </article>
        )}

        {!loading && !error && data && !data.digest && (
          <div className="rounded-2xl border border-slate-200 bg-slate-50 px-5 py-6 text-sm text-slate-700">
            We don't have a digest sent to you yet. The next one will arrive on Monday morning.
          </div>
        )}
      </div>
    </div>
  );
}
