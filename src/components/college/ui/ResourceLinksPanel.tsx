import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { getMyCollegeId } from '@/lib/myCollege';
import { cn } from '@/lib/utils';
import { useResourceLinks } from '@/hooks/useResourceLinks';
import { useResourceAiSuggestions } from '@/hooks/useResourceAiSuggestions';
import { UsesAi } from './UsesAi';

/* ==========================================================================
   ResourceLinksPanel — renders + manages AC and lesson links on a resource.
   Compact editorial layout; used inside the ResourcePreviewSheet.
   ========================================================================== */

interface Qualification {
  code: string;
  title: string;
}
interface RequirementRow {
  qualification_code: string;
  unit_code: string;
  unit_title: string | null;
  ac_code: string;
  ac_text: string;
}

interface Props {
  resourceId: string;
}

export function ResourceLinksPanel({ resourceId }: Props) {
  const {
    acLinks,
    lessonLinks,
    addAcLink,
    removeAcLink,
    addLessonLink,
    removeLessonLink,
    refresh: refreshLinks,
  } = useResourceLinks(resourceId);

  const {
    suggestions,
    loading: aiLoading,
    reason: aiReason,
    suggest,
    accept,
    acceptAll,
    dismiss,
  } = useResourceAiSuggestions(resourceId);

  const [acPickerOpen, setAcPickerOpen] = useState(false);
  const [lessonPickerOpen, setLessonPickerOpen] = useState(false);

  // Hide suggestions that are already linked so the list stays useful
  const alreadyLinkedKeys = new Set(
    acLinks.map((l) => `${l.qualification_code}|${l.unit_code}|${l.ac_code}`)
  );
  const visibleSuggestions = suggestions.filter(
    (s) => !alreadyLinkedKeys.has(`${s.qualification_code}|${s.unit_code}|${s.ac_code}`)
  );

  return (
    <div className="space-y-5">
      {/* AI suggestions — shown above AC links when present */}
      {(visibleSuggestions.length > 0 || aiLoading) && (
        <div className="card-surface rounded-2xl px-4 py-3.5">
          <div className="flex items-center justify-between gap-3 mb-2">
            <div className="text-[13px] font-semibold text-elec-yellow">
              Suggested criteria
              {!aiLoading && visibleSuggestions.length > 0 && (
                <span className="ml-2 text-white normal-case tracking-normal">
                  {visibleSuggestions.length} match
                  {visibleSuggestions.length === 1 ? '' : 'es'}
                </span>
              )}
            </div>
            {!aiLoading && visibleSuggestions.length > 0 && (
              <button
                type="button"
                onClick={() => acceptAll(refreshLinks)}
                className="inline-flex h-11 items-center text-[13px] font-semibold text-elec-yellow transition-colors touch-manipulation"
              >
                Accept all →
              </button>
            )}
          </div>
          {aiLoading ? (
            <div className="flex items-center gap-2 py-1 text-[12px] text-white">
              <span className="h-3 w-3 rounded-full border-2 border-white/15 border-t-elec-yellow animate-spin" />
              Matching against this college's assessment criteria…
            </div>
          ) : (
            <ul className="space-y-1.5">
              {visibleSuggestions.map((s) => {
                const key = `${s.qualification_code}|${s.unit_code}|${s.ac_code}`;
                const confPct = Math.round(s.confidence * 100);
                const confClass =
                  s.confidence >= 0.8
                    ? 'text-emerald-300'
                    : s.confidence >= 0.6
                      ? 'text-elec-yellow'
                      : 'text-white';
                return (
                  <li
                    key={key}
                    className="flex items-start gap-3 bg-[hsl(0_0%_9%)]/60 border border-white/[0.06] rounded-lg px-3 py-2.5"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-mono tabular-nums text-[12px] text-elec-yellow">
                          {s.qualification_code} · {s.unit_code} · {s.ac_code}
                        </span>
                        <span className={cn('text-[12px] tabular-nums', confClass)}>
                          {confPct}%
                        </span>
                      </div>
                      <div className="mt-1 text-[12px] text-white leading-snug line-clamp-2">
                        {s.ac_text}
                      </div>
                      {s.rationale && (
                        <div className="mt-1 text-[12.5px] text-white leading-snug">
                          {s.rationale}
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        type="button"
                        onClick={() => accept(s, refreshLinks)}
                        className="h-11 px-3.5 rounded-xl border border-white/[0.14] text-white text-[13px] font-semibold transition-colors hover:border-elec-yellow touch-manipulation"
                        aria-label="Accept suggestion"
                      >
                        Accept
                      </button>
                      <button
                        type="button"
                        onClick={() => dismiss(key)}
                        className="h-11 w-11 rounded-full text-white hover:bg-white/[0.06] flex items-center justify-center transition-colors touch-manipulation"
                        aria-label="Dismiss suggestion"
                      >
                        ×
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
          {!aiLoading && visibleSuggestions.length === 0 && suggestions.length > 0 && (
            <div className="text-[12px] text-white">All suggested ACs are already linked.</div>
          )}
        </div>
      )}

      {/* AC links */}
      <div>
        <div className="flex items-center justify-between gap-3 mb-2">
          <div className="text-[13px] font-semibold text-white">
            Assessment criteria · {acLinks.length}
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={suggest}
              disabled={aiLoading}
              className="inline-flex h-11 items-center gap-1.5 text-[13px] font-semibold text-elec-yellow transition-colors touch-manipulation disabled:opacity-50"
            >
              {aiLoading ? (
                'Suggesting…'
              ) : (
                <>
                  Suggest criteria <UsesAi />
                </>
              )}
            </button>
            <button
              type="button"
              onClick={() => setAcPickerOpen((v) => !v)}
              className="inline-flex h-11 items-center text-[13px] font-semibold text-white transition-colors touch-manipulation"
            >
              {acPickerOpen ? 'Close' : '+ Add AC'}
            </button>
          </div>
        </div>
        {aiReason === 'no_college_qualifications' && (
          <div className="mb-2 text-[12.5px] text-white">
            Add courses in Settings so criteria can be suggested.
          </div>
        )}
        {acLinks.length > 0 ? (
          <div className="flex flex-wrap gap-1.5">
            {acLinks.map((l) => (
              <span
                key={l.id}
                className="group inline-flex h-11 items-center gap-1 rounded-full border border-elec-yellow/40 pl-3 pr-1 font-mono text-[12px] tabular-nums text-white"
              >
                <span>
                  {l.qualification_code} · {l.unit_code} · {l.ac_code}
                </span>
                <button
                  type="button"
                  onClick={() => removeAcLink(l.id)}
                  aria-label={`Remove ${l.ac_code}`}
                  className="flex h-9 w-9 items-center justify-center rounded-full text-[16px] text-white hover:bg-white/[0.08] touch-manipulation"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        ) : (
          <div className="text-[12.5px] text-white">
            No ACs linked. Add the criteria this resource supports.
          </div>
        )}
        {acPickerOpen && (
          <AcPicker
            onPick={async (row) => {
              await addAcLink(row);
            }}
          />
        )}
      </div>

      {/* Lesson links */}
      <div>
        <div className="flex items-center justify-between gap-3 mb-2">
          <div className="text-[13px] font-semibold text-white">
            Lesson plans · {lessonLinks.length}
          </div>
          <button
            type="button"
            onClick={() => setLessonPickerOpen((v) => !v)}
            className="inline-flex h-11 items-center text-[13px] font-semibold text-elec-yellow transition-colors touch-manipulation"
          >
            {lessonPickerOpen ? 'Close' : '+ Attach lesson'}
          </button>
        </div>
        {lessonLinks.length > 0 ? (
          <ul className="space-y-1">
            {lessonLinks.map((l) => (
              <li
                key={l.id}
                className="flex items-center justify-between gap-3 bg-[hsl(0_0%_13%)] border border-white/[0.06] rounded-lg px-3 py-2"
              >
                <span className="text-[12.5px] text-white truncate">
                  {l.lesson_title ?? 'Untitled lesson'}
                </span>
                <button
                  type="button"
                  onClick={() => removeLessonLink(l.id)}
                  className="inline-flex h-11 shrink-0 items-center px-1 text-[13px] font-semibold text-white transition-colors hover:text-red-300 touch-manipulation"
                >
                  Detach
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-[12.5px] text-white">Not attached to any lesson plan.</div>
        )}
        {lessonPickerOpen && (
          <LessonPicker
            excludeIds={lessonLinks.map((l) => l.lesson_plan_id)}
            onPick={async (lessonPlanId) => {
              await addLessonLink(lessonPlanId);
              setLessonPickerOpen(false);
            }}
          />
        )}
      </div>
    </div>
  );
}

/* ==========================================================================
   AcPicker — search across the college's courses' qualifications
   ========================================================================== */

function AcPicker({
  onPick,
}: {
  onPick: (row: {
    qualification_code: string;
    unit_code: string;
    ac_code: string;
  }) => Promise<void>;
}) {
  const [qualOptions, setQualOptions] = useState<Qualification[]>([]);
  const [qual, setQual] = useState<string | null>(null);
  const [rows, setRows] = useState<RequirementRow[]>([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const { data: userRes } = await supabase.auth.getUser();
      if (!userRes?.user) return;
      const collegeId = await getMyCollegeId(userRes.user.id).catch(() => null);
      if (!collegeId) return;
      const { data: courses } = await supabase
        .from('college_courses')
        .select('code, name')
        .eq('college_id', collegeId);
      if (cancelled) return;
      const codes = Array.from(
        new Set(
          (courses ?? []).map((c) => c.code as string | null).filter((c): c is string => Boolean(c))
        )
      );
      if (codes.length === 0) return;
      const { data: quals } = await supabase
        .from('qualifications')
        .select('code, title')
        .in('code', codes);
      if (!cancelled && quals) {
        setQualOptions(quals as Qualification[]);
        if (quals.length === 1) setQual(quals[0].code);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!qual) {
      setRows([]);
      return;
    }
    let cancelled = false;
    setLoading(true);
    supabase
      .from('qualification_requirements')
      .select('qualification_code, unit_code, unit_title, ac_code, ac_text')
      .eq('qualification_code', qual)
      .order('unit_code')
      .order('ac_code')
      .then(({ data }) => {
        if (cancelled) return;
        setRows((data ?? []) as RequirementRow[]);
        setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [qual]);

  const filtered = query.trim()
    ? rows.filter(
        (r) =>
          r.ac_code.toLowerCase().includes(query.toLowerCase()) ||
          r.unit_code.toLowerCase().includes(query.toLowerCase()) ||
          r.ac_text.toLowerCase().includes(query.toLowerCase())
      )
    : rows;

  return (
    <div className="mt-3 bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-xl overflow-hidden">
      <div className="px-3 py-2.5 border-b border-white/[0.06] flex items-center gap-2 flex-wrap">
        <select
          value={qual ?? ''}
          onChange={(e) => setQual(e.target.value || null)}
          className="h-11 bg-[hsl(0_0%_9%)] border border-white/[0.08] rounded-full px-3 text-base text-white focus:outline-none focus:border-elec-yellow"
        >
          <option value="">Select qualification…</option>
          {qualOptions.map((q) => (
            <option key={q.code} value={q.code}>
              {q.code} · {q.title}
            </option>
          ))}
        </select>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search AC code, unit or text…"
          className="flex-1 min-w-[160px] h-11 bg-[hsl(0_0%_9%)] border border-white/[0.08] rounded-full px-3 text-base text-white placeholder:text-white focus:outline-none focus:border-elec-yellow"
        />
      </div>
      <div className="max-h-[220px] overflow-y-auto">
        {!qual ? (
          <div className="px-4 py-4 text-[12px] text-white">
            Pick a qualification to browse its ACs.
          </div>
        ) : loading ? (
          <div className="px-4 py-4 text-[12px] text-white">Loading ACs…</div>
        ) : filtered.length === 0 ? (
          <div className="px-4 py-4 text-[12px] text-white">
            {rows.length === 0
              ? 'No ACs found for this qualification.'
              : 'No ACs match this search.'}
          </div>
        ) : (
          <ul className="divide-y divide-white/[0.05]">
            {filtered.slice(0, 40).map((r) => (
              <li key={`${r.qualification_code}|${r.unit_code}|${r.ac_code}`}>
                <button
                  type="button"
                  onClick={() =>
                    onPick({
                      qualification_code: r.qualification_code,
                      unit_code: r.unit_code,
                      ac_code: r.ac_code,
                    })
                  }
                  className="w-full text-left px-4 py-2.5 hover:bg-white/[0.03] flex items-start gap-3 transition-colors touch-manipulation"
                >
                  <span className="shrink-0 font-mono tabular-nums text-[12px] text-elec-yellow mt-0.5">
                    {r.unit_code}:{r.ac_code}
                  </span>
                  <span className="flex-1 text-[12px] text-white leading-snug line-clamp-2">
                    {r.ac_text}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

/* ==========================================================================
   LessonPicker — list lesson plans at the college with search
   ========================================================================== */

function LessonPicker({
  onPick,
  excludeIds,
}: {
  onPick: (lessonPlanId: string) => void | Promise<void>;
  excludeIds: string[];
}) {
  const [rows, setRows] = useState<
    { id: string; title: string; status: string | null; created_at: string }[]
  >([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    supabase
      .from('college_lesson_plans')
      .select('id, title, status, created_at')
      .order('created_at', { ascending: false })
      .limit(40)
      .then(({ data }) => {
        if (cancelled) return;
        setRows(
          (data ?? []) as {
            id: string;
            title: string;
            status: string | null;
            created_at: string;
          }[]
        );
        setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const filtered = rows
    .filter((r) => !excludeIds.includes(r.id))
    .filter((r) => (query ? r.title.toLowerCase().includes(query.toLowerCase()) : true));

  return (
    <div className="mt-3 bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-xl overflow-hidden">
      <div className="px-3 py-2.5 border-b border-white/[0.06]">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search lesson plans…"
          className="w-full h-11 bg-[hsl(0_0%_9%)] border border-white/[0.08] rounded-full px-3 text-base text-white placeholder:text-white focus:outline-none focus:border-elec-yellow"
        />
      </div>
      <div className="max-h-[240px] overflow-y-auto">
        {loading ? (
          <div className="px-4 py-4 text-[12px] text-white">Loading plans…</div>
        ) : filtered.length === 0 ? (
          <div className="px-4 py-4 text-[12px] text-white">No lesson plans to attach.</div>
        ) : (
          <ul className="divide-y divide-white/[0.05]">
            {filtered.map((r) => (
              <li key={r.id}>
                <button
                  type="button"
                  onClick={() => onPick(r.id)}
                  className={cn(
                    'w-full text-left px-4 py-3 hover:bg-white/[0.03] transition-colors touch-manipulation',
                    'flex items-center justify-between gap-3'
                  )}
                >
                  <span className="text-[12.5px] text-white truncate">{r.title}</span>
                  <span className="shrink-0 text-[13px] text-white">{r.status ?? 'Draft'}</span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
