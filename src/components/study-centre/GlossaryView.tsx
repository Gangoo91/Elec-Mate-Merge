/**
 * Study Centre — shared glossary view
 *
 * Renders `GLOSSARY_GROUPS` for one course, or for the whole Study Centre.
 * Every course links to the same definitions, so a term cannot mean one thing
 * in MOET and something else in HNC.
 *
 * Redesigned 10 Oct 2026 as a reference tool, not a document: a header with
 * the search front and centre, topic chips to narrow it, and term cards that
 * lead with the abbreviation in large type. Matches are highlighted. Once the
 * header scrolls away a compact search pins under the masthead, so you never
 * scroll back up 130 terms to look something else up. Each card has an id
 * (`#term-zs`) so a lesson can link straight to a definition.
 */

import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import { ArrowUp, ChevronDown, Search, X } from 'lucide-react';

import { GLOSSARY_GROUPS, type GlossaryEntry } from '@/data/study-centre/glossary';
import { chipCn } from '@/components/college/ui/CollegeUi';
import { cn } from '@/lib/utils';

type GlossaryViewProps = {
  /** Course key. Omit to show every term in the Study Centre. */
  course?: string;
  /** The line under the title. */
  intro?: ReactNode;
  /** Header title. */
  title?: string;
  /** Header eyebrow. */
  eyebrow?: string;
};

type Group = (typeof GLOSSARY_GROUPS)[number];

const slug = (term: string) =>
  'term-' +
  term
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

/**
 * An entry's own `courses` wins over its group's; untagged entries inherit the
 * group. (Filtering by group first hid terms like "IP rating" from PAT, which
 * tags it but sits in a group PAT isn't on.)
 */
const shows = (g: Group, e: GlossaryEntry, course?: string) =>
  !course || (e.courses ? e.courses.includes(course) : !g.courses || g.courses.includes(course));

function groupsFor(course?: string) {
  return GLOSSARY_GROUPS.map((g) => ({
    ...g,
    entries: g.entries.filter((e) => shows(g, e, course)),
  })).filter((g) => g.entries.length > 0);
}

/** 0 = the term itself … 4 = only the definition mentions it; -1 = no match. */
function rank(e: GlossaryEntry, q: string) {
  if (!q) return 0;
  const t = e.term.toLowerCase();
  if (t === q) return 0;
  if (t.startsWith(q)) return 1;
  if (t.includes(q)) return 2;
  if ((e.expand ?? '').toLowerCase().includes(q)) return 3;
  if (e.def.toLowerCase().includes(q)) return 4;
  return -1;
}

/** Wraps each match of `q` in a highlight. */
function Hl({ text, q }: { text: string; q: string }) {
  if (!q) return <>{text}</>;
  const i = text.toLowerCase().indexOf(q);
  if (i < 0) return <>{text}</>;
  return (
    <>
      {text.slice(0, i)}
      <mark className="rounded-sm bg-elec-yellow px-0.5 text-black">
        {text.slice(i, i + q.length)}
      </mark>
      <Hl text={text.slice(i + q.length)} q={q} />
    </>
  );
}

export function GlossaryView({
  course,
  intro,
  title = 'Glossary',
  eyebrow = 'Study Centre',
}: GlossaryViewProps) {
  const [query, setQuery] = useState('');
  const [topic, setTopic] = useState<string | null>(null);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [pinned, setPinned] = useState(false);
  // Typing in the pinned bar: keep it, even if a short result list lets the
  // header back into view.
  const [pinFocus, setPinFocus] = useState(false);
  const [flash, setFlash] = useState<string | null>(null);
  const headerRef = useRef<HTMLElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);
  const { hash } = useLocation();

  const groups = useMemo(() => groupsFor(course), [course]);
  const total = groups.reduce((n, g) => n + g.entries.length, 0);

  const q = query.trim().toLowerCase();

  /** Every group with only its matching terms, best match first. */
  const matched = useMemo(() => {
    return (
      groups
        .map((g) => {
          const entries = g.entries
            .map((e) => ({ e, r: rank(e, q) }))
            .filter((x) => x.r >= 0)
            .sort((a, b) => a.r - b.r)
            .map((x) => x.e);
          const best = q
            ? Math.min(...g.entries.map((e) => rank(e, q)).filter((r) => r >= 0), 9)
            : 0;
          return { ...g, entries, size: g.entries.length, best };
        })
        .filter((g) => g.entries.length > 0)
        // Searching "AFDD" should open on the group that defines it, not on the
        // first group whose definitions happen to mention it.
        .sort((a, b) => a.best - b.best)
    );
  }, [groups, q]);

  const filtered = topic ? matched.filter((g) => g.heading === topic) : matched;
  const showing = filtered.reduce((n, g) => n + g.entries.length, 0);
  const matchingAll = matched.reduce((n, g) => n + g.entries.length, 0);

  // Show the compact search once the header has scrolled under the masthead.
  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([en]) => setPinned(!en.isIntersecting), {
      rootMargin: '-110px 0px 0px 0px',
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // "/" jumps to the search, as on most reference sites.
  useEffect(() => {
    const onKey = (ev: KeyboardEvent) => {
      if (ev.key !== '/' || ev.metaKey || ev.ctrlKey) return;
      const t = ev.target as HTMLElement;
      if (t.closest('input, textarea, [contenteditable="true"]')) return;
      ev.preventDefault();
      inputRef.current?.focus();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // A link to `#term-zs` lands on that card and marks it for a moment.
  useEffect(() => {
    const id = decodeURIComponent(hash.slice(1));
    if (!id.startsWith('term-')) return;
    const raf = requestAnimationFrame(() => {
      const el = document.getElementById(id);
      if (!el) return;
      el.scrollIntoView({ block: 'center' });
      setFlash(id);
    });
    const t = window.setTimeout(() => setFlash(null), 2600);
    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(t);
    };
  }, [hash]);

  /** Typing in the pinned search brings the results back into view. */
  const typePinned = (v: string) => {
    setQuery(v);
    requestAnimationFrame(() => {
      const el = resultsRef.current;
      if (el && el.getBoundingClientRect().top < 0) el.scrollIntoView({ block: 'start' });
    });
  };

  const toTop = () => {
    headerRef.current?.scrollIntoView({ block: 'start', behavior: 'smooth' });
  };

  const usedIds = new Set<string>();

  return (
    <div className="space-y-6">
      {/* ── Pinned search, once the header has gone. First in the page so it is
          already stuck by the time it shows, and never sits in the flow over the
          topic chips. ── */}
      <div className="sticky top-[58px] lg:top-[74px] z-30 -mb-6 h-0" aria-hidden={!pinned && !pinFocus}>
        <div
          className={cn(
            'absolute inset-x-0 top-0 flex items-center gap-2 rounded-2xl border border-white/[0.14] bg-[#161616] p-1.5 shadow-[0_12px_32px_-12px_rgba(0,0,0,0.9)] transition-[opacity,transform] duration-200',
            pinned || pinFocus
              ? 'translate-y-0 opacity-100'
              : 'pointer-events-none -translate-y-2 opacity-0'
          )}
        >
          <label className="relative min-w-0 flex-1">
            <span className="sr-only">Search the glossary</span>
            <Search
              className="pointer-events-none absolute left-3.5 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-white"
              aria-hidden
            />
            <input
              type="search"
              value={query}
              tabIndex={pinned || pinFocus ? 0 : -1}
              onChange={(e) => typePinned(e.target.value)}
              onFocus={() => setPinFocus(true)}
              onBlur={() => setPinFocus(false)}
              onKeyDown={(e) => e.key === 'Escape' && setQuery('')}
              placeholder={`Search ${total} terms`}
              enterKeyHint="search"
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck={false}
              className={cn(
                'h-11 w-full rounded-xl bg-transparent pl-10 text-[16px] font-medium text-white placeholder:text-white/40 caret-elec-yellow outline-none [&::-webkit-search-cancel-button]:hidden',
                query ? 'pr-24' : 'pr-3'
              )}
            />
            {query && (
              <span className="absolute right-11 top-1/2 -translate-y-1/2 text-[13px] font-semibold tabular-nums text-white">
                {showing}
              </span>
            )}
            {query && (
              <button
                type="button"
                tabIndex={pinned || pinFocus ? 0 : -1}
                onClick={() => setQuery('')}
                aria-label="Clear search"
                className="absolute right-0 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-xl text-white touch-manipulation active:bg-white/[0.08]"
              >
                <X className="h-[18px] w-[18px]" />
              </button>
            )}
          </label>
          <button
            type="button"
            tabIndex={pinned || pinFocus ? 0 : -1}
            onClick={toTop}
            aria-label="Back to the top"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/[0.12] bg-white/[0.06] text-white touch-manipulation active:bg-white/[0.12]"
          >
            <ArrowUp className="h-[18px] w-[18px]" />
          </button>
        </div>
      </div>

      {/* ── Header: what this is, and the search ── */}
      <section
        ref={headerRef}
        className="relative -mx-4 scroll-mt-24 overflow-hidden card-landing max-sm:!rounded-none max-sm:!border-x-0 px-5 py-6 sm:mx-0 sm:rounded-3xl sm:px-8 sm:py-8"
      >
        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-elec-yellow/0 via-elec-yellow/70 to-elec-yellow/0"
        />
        <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-elec-yellow">
          {eyebrow}
        </p>
        <h1 className="mt-1.5 text-[28px] font-bold leading-tight tracking-tight text-white sm:text-[38px]">
          {title}
        </h1>
        <p className="mt-2.5 max-w-2xl text-[15px] leading-relaxed text-white">
          {intro ??
            'Every abbreviation the Study Centre uses, in plain English: what it is and why it matters on the job.'}
        </p>
        <p className="mt-2 text-[13px] font-medium text-white">
          {total} terms · {groups.length} topics · checked against BS 7671:2018+A4:2026, GN3 and the
          On-Site Guide
        </p>

        <label className="relative mt-5 block max-w-2xl">
          <span className="sr-only">Search the glossary</span>
          <Search
            className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-white"
            aria-hidden
          />
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Escape' && setQuery('')}
            placeholder="Search a term: Zs, PEN, RCD, P-F…"
            enterKeyHint="search"
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck={false}
            className="h-14 w-full rounded-2xl border border-white/[0.16] bg-black/30 pl-12 pr-12 text-[16px] font-medium text-white placeholder:text-white/40 caret-elec-yellow outline-none transition-colors focus:border-elec-yellow [&::-webkit-search-cancel-button]:hidden"
          />
          {query && (
            <button
              type="button"
              onClick={() => {
                setQuery('');
                inputRef.current?.focus();
              }}
              aria-label="Clear search"
              className="absolute right-1.5 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-xl text-white touch-manipulation active:bg-white/[0.08]"
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </label>
        <p className="mt-2.5 min-h-[20px] text-[13.5px] font-medium text-white" aria-live="polite">
          {q
            ? showing === 0
              ? 'No matches'
              : `${showing} of ${total} ${showing === 1 ? 'term matches' : 'terms match'}`
            : null}
        </p>
      </section>

      {/* Results. Searching from the pinned bar holds the page height, so a
          short list doesn't pull the page back up under your thumb. */}
      <div
        ref={resultsRef}
        className={cn('scroll-mt-[128px] lg:scroll-mt-[150px] space-y-6', pinFocus && q && 'min-h-[100dvh]')}
      >
        {/* ── Topics: one swipeable row on a phone, wrapped from sm up ── */}
        <div
          role="group"
          aria-label="Topic"
          className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 scrollbar-none sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0 sm:pb-0"
        >
          {[null, ...groups.map((g) => g.heading)].map((h) => {
            const n = h ? (matched.find((g) => g.heading === h)?.entries.length ?? 0) : matchingAll;
            // While searching, topics with nothing to show step aside.
            if (h && q && n === 0 && topic !== h) return null;
            return (
              <button
                key={h ?? 'all'}
                type="button"
                aria-pressed={topic === h}
                onClick={() => setTopic(h)}
                className={chipCn(topic === h)}
              >
                {h ?? 'All topics'}
                <span className="ml-1.5 tabular-nums">{n}</span>
              </button>
            );
          })}
        </div>

        {/* ── Nothing found ── */}
        {showing === 0 && (
          <div className="rounded-2xl border border-white/[0.1] bg-white/[0.03] px-5 py-6 sm:px-6">
            <p className="text-[17px] font-semibold text-white">
              Nothing matches “{query.trim()}”{topic && ` in ${topic}`}
            </p>
            <p className="mt-1.5 max-w-xl text-[14.5px] leading-relaxed text-white">
              {topic && matchingAll > 0
                ? `There ${matchingAll === 1 ? 'is 1 match' : `are ${matchingAll} matches`} in other topics.`
                : 'It looks in the abbreviation, what it stands for and the definition. Try fewer letters, or the words instead of the letters.'}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {topic && matchingAll > 0 && (
                <button
                  type="button"
                  onClick={() => setTopic(null)}
                  className="h-11 rounded-xl bg-elec-yellow px-4 text-[14px] font-semibold text-black touch-manipulation active:opacity-90"
                >
                  Search all topics
                </button>
              )}
              <button
                type="button"
                onClick={() => {
                  setQuery('');
                  inputRef.current?.focus();
                }}
                className="h-11 rounded-xl border border-white/[0.14] bg-white/[0.06] px-4 text-[14px] font-semibold text-white touch-manipulation active:bg-white/[0.1]"
              >
                Clear search
              </button>
            </div>
          </div>
        )}

        {/* ── Terms ── */}
        {filtered.map((group) => (
          <section key={group.heading} className="space-y-3" aria-labelledby={slug(group.heading)}>
            <div>
              <div className="flex items-baseline justify-between gap-3">
                <h2
                  id={slug(group.heading)}
                  className="text-[18px] font-bold tracking-tight text-white sm:text-[20px]"
                >
                  {group.heading}
                </h2>
                <span className="shrink-0 text-[13px] font-medium tabular-nums text-white">
                  {q && group.entries.length < group.size
                    ? `${group.entries.length} of ${group.size}`
                    : `${group.size} ${group.size === 1 ? 'term' : 'terms'}`}
                </span>
              </div>
              <p className="mt-1 max-w-2xl text-[14px] leading-relaxed text-white">{group.blurb}</p>
            </div>
            <dl className="grid gap-2.5 sm:gap-3 md:grid-cols-2 xl:grid-cols-3">
              {group.entries.map((e) => {
                // `where` is a section in `whereCourse` (MOET when unset): name the
                // course unless you're already on it, and hide it on other courses.
                const wc = e.whereCourse ?? 'moet';
                const where = e.where && (!course || course === wc);
                // A term can sit in two groups ("AM2"); only the first gets the id.
                const s = slug(e.term);
                const id = usedIds.has(s) ? undefined : (usedIds.add(s), s);
                return (
                  <div
                    key={e.term}
                    id={id}
                    className={cn(
                      'flex scroll-mt-32 flex-col lg:scroll-mt-40 rounded-2xl border bg-white/[0.03] p-4 transition-colors duration-700 sm:p-5',
                      flash && flash === id ? 'border-elec-yellow' : 'border-white/[0.1]'
                    )}
                  >
                    <dt>
                      <span className="block text-[22px] font-bold leading-tight tracking-tight text-white">
                        <Hl text={e.term} q={q} />
                      </span>
                      {e.expand && (
                        <span className="mt-0.5 block text-[14px] font-semibold leading-snug text-elec-yellow">
                          <Hl text={e.expand} q={q} />
                        </span>
                      )}
                    </dt>
                    <dd className="mt-2.5 flex-1 text-[14.5px] leading-relaxed text-white">
                      <Hl text={e.def} q={q} />
                    </dd>
                    {where && (
                      <dd className="mt-3 border-t border-white/[0.08] pt-2.5 text-[12.5px] font-medium text-white">
                        {course === wc ? 'Section' : `${wc.toUpperCase()} section`} {e.where}
                      </dd>
                    )}
                  </div>
                );
              })}
            </dl>
          </section>
        ))}
      </div>

      {/* ── Sources, folded ── */}
      <section className="rounded-2xl border border-white/[0.1] bg-white/[0.03]">
        <button
          type="button"
          onClick={() => setAboutOpen((v) => !v)}
          aria-expanded={aboutOpen}
          className="flex min-h-[52px] w-full items-center justify-between gap-3 px-5 py-3 text-left touch-manipulation active:bg-white/[0.04]"
        >
          <span className="text-[14.5px] font-semibold text-white">
            Where these definitions come from
          </span>
          <ChevronDown
            className={cn(
              'h-5 w-5 shrink-0 text-white transition-transform',
              aboutOpen && 'rotate-180'
            )}
            aria-hidden
          />
        </button>
        {aboutOpen && (
          <p className="border-t border-white/[0.08] px-5 py-4 text-[14px] leading-relaxed text-white">
            Regulation numbers, table references and numeric limits attributed to BS 7671, GN3 or
            the On-Site Guide are checked against those documents. HSE material (GS38, HSR25,
            HSG107) is checked against the publication itself. Definitions of industry terms that
            sit outside those documents (fibre grades, building protocols, fire system categories)
            are written from established industry usage. Where a figure governs something you are
            about to do, confirm it against the current standard rather than a glossary.
          </p>
        )}
      </section>
    </div>
  );
}

/** Number of terms a given course would see — used for landing-card copy. */
export function glossaryTermCount(course?: string) {
  return groupsFor(course).reduce((n, g) => n + g.entries.length, 0);
}
