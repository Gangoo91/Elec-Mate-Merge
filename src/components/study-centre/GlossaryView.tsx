/**
 * Study Centre — shared glossary view
 *
 * Renders `GLOSSARY_GROUPS` for one course, or for the whole Study Centre.
 * Every course links to the same definitions, so a term cannot mean one thing
 * in MOET and something else in HNC.
 *
 * A glossary is scanned rather than read line by line, so the cards run two to
 * a row on a wide screen while running prose keeps a normal reading measure —
 * a 1216px paragraph is about 150 characters per line, which is uncomfortable.
 */

import { useMemo, useState, type ReactNode } from 'react';
import { Search } from 'lucide-react';

import { ContentEyebrow } from '@/components/study-centre/learning';
import { GLOSSARY_GROUPS, type GlossaryEntry } from '@/data/study-centre/glossary';

type GlossaryViewProps = {
  /** Course key. Omit to show every term in the Study Centre. */
  course?: string;
  /** Shown above the search box. */
  intro?: ReactNode;
};

export function GlossaryView({ course, intro }: GlossaryViewProps) {
  const [query, setQuery] = useState('');

  const groups = useMemo(
    () =>
      GLOSSARY_GROUPS.filter((g) => !course || !g.courses || g.courses.includes(course))
        .map((g) => ({
          ...g,
          entries: g.entries.filter((e) => !course || !e.courses || e.courses.includes(course)),
        }))
        .filter((g) => g.entries.length > 0),
    [course]
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return groups;
    const match = (e: GlossaryEntry) =>
      e.term.toLowerCase().includes(q) ||
      (e.expand ?? '').toLowerCase().includes(q) ||
      e.def.toLowerCase().includes(q);
    return groups
      .map((g) => ({ ...g, entries: g.entries.filter(match) }))
      .filter((g) => g.entries.length > 0);
  }, [groups, query]);

  const total = groups.reduce((n, g) => n + g.entries.length, 0);
  const showing = filtered.reduce((n, g) => n + g.entries.length, 0);

  return (
    <>
      {intro}

      <div className="relative max-w-[52rem]">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white" />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search the glossary"
          aria-label="Search the glossary"
          className="input-underline h-11 w-full rounded-none border-0 border-b border-white/[0.15] bg-transparent pl-10 pr-1 text-base font-medium text-white placeholder:text-white/25 caret-elec-yellow transition-colors hover:border-white/[0.3] focus:border-elec-yellow focus:outline-none focus:ring-0 focus-visible:ring-0 [color-scheme:dark] touch-manipulation"
        />
      </div>

      {query.trim() !== '' && (
        <p className="max-w-[52rem] text-[12.5px] text-white">
          {showing === 0
            ? 'No terms match that. Try a shorter search — the glossary matches on the term, what it stands for, and the definition.'
            : `${showing} of ${total} terms match.`}
        </p>
      )}

      <p className="max-w-[52rem] text-[12.5px] leading-relaxed text-white">
        <span className="font-semibold">Where these come from.</span> Regulation numbers, table
        references and numeric limits attributed to BS 7671, GN3 or the On-Site Guide are checked
        against those documents. HSE material (GS38, HSR25, HSG107) is checked against the
        publication itself. Definitions of industry terms that sit outside those documents — fibre
        grades, building protocols, fire system categories — are written from established industry
        usage. Where a figure governs something you are about to do, confirm it against the current
        standard rather than a glossary.
      </p>

      {filtered.map((group) => (
        <div key={group.heading} className="space-y-4">
          <ContentEyebrow>{group.heading}</ContentEyebrow>
          <p className="max-w-[52rem] text-[13px] leading-relaxed text-white">{group.blurb}</p>
          <dl className="grid gap-3 sm:grid-cols-2">
            {group.entries.map((e) => (
              <div
                key={e.term}
                className="flex h-full flex-col rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_16%)] p-4"
              >
                <dt className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                  <span className="text-[15px] font-semibold tracking-tight text-elec-yellow">
                    {e.term}
                  </span>
                  {e.expand && (
                    <span className="text-[12.5px] font-medium text-white">{e.expand}</span>
                  )}
                  {e.where && (!e.whereCourse || !course || e.whereCourse === course) && (
                    <span className="ml-auto text-[10.5px] font-medium uppercase tracking-[0.18em] text-white">
                      {e.where}
                    </span>
                  )}
                </dt>
                <dd className="mt-2 flex-1 text-[13.5px] leading-relaxed text-white">{e.def}</dd>
              </div>
            ))}
          </dl>
        </div>
      ))}
    </>
  );
}

/** Number of terms a given course would see — used for landing-card copy. */
export function glossaryTermCount(course?: string) {
  return GLOSSARY_GROUPS.filter((g) => !course || !g.courses || g.courses.includes(course)).reduce(
    (n, g) =>
      n + g.entries.filter((e) => !course || !e.courses || e.courses.includes(course)).length,
    0
  );
}
