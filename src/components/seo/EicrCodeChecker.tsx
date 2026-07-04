/**
 * EicrCodeChecker — public, free EICR observation code lookup.
 *
 * Electrician types an observation (or taps a category / code card) and
 * gets the classification most inspectors would apply, with practical
 * reasoning and the satisfactory/unsatisfactory implication.
 *
 * No login wall — top-of-class SEO pattern: ship the actual tool.
 * Mobile-first: h-11 touch targets, touch-manipulation, chip scroller.
 */
import { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, X, ArrowRight, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { trackSeoToolUsed } from '@/lib/analytics-events';
import {
  eicrObservations,
  eicrObservationCategories,
  EICR_CODE_MEANINGS,
  type EicrCode,
  type EicrObservation,
} from '@/data/seo/eicrObservationsDataset';

const CODE_ORDER: EicrCode[] = ['C1', 'C2', 'C3', 'FI'];

const CODE_STYLES: Record<
  EicrCode,
  { badge: string; card: string; cardActive: string; dot: string }
> = {
  C1: {
    badge: 'bg-red-500/15 border-red-500/40 text-red-400',
    card: 'border-red-500/25 bg-red-500/5',
    cardActive: 'border-red-500 bg-red-500/15 ring-1 ring-red-500/50',
    dot: 'bg-red-500',
  },
  C2: {
    badge: 'bg-orange-500/15 border-orange-500/40 text-orange-400',
    card: 'border-orange-500/25 bg-orange-500/5',
    cardActive: 'border-orange-500 bg-orange-500/15 ring-1 ring-orange-500/50',
    dot: 'bg-orange-500',
  },
  C3: {
    badge: 'bg-yellow-500/15 border-yellow-500/40 text-yellow-400',
    card: 'border-yellow-500/25 bg-yellow-500/5',
    cardActive: 'border-yellow-500 bg-yellow-500/15 ring-1 ring-yellow-500/50',
    dot: 'bg-yellow-400',
  },
  FI: {
    badge: 'bg-blue-500/15 border-blue-500/40 text-blue-400',
    card: 'border-blue-500/25 bg-blue-500/5',
    cardActive: 'border-blue-500 bg-blue-500/15 ring-1 ring-blue-500/50',
    dot: 'bg-blue-500',
  },
};

const COMMON_SEARCHES = [
  'no rcd',
  'plastic consumer unit',
  'broken socket',
  'bonding',
  'bathroom',
  'exposed wire',
];

const INITIAL_VISIBLE = 10;

function matchesQuery(obs: EicrObservation, query: string): boolean {
  const q = query.trim().toLowerCase();
  if (!q) return true;
  const words = q.split(/\s+/).filter(Boolean);
  const haystack = [obs.observation, obs.reasoning, obs.category, obs.code, ...obs.searchTerms]
    .join(' ')
    .toLowerCase();
  return words.every((w) => haystack.includes(w));
}

function SignupCTA() {
  return (
    <div className="rounded-2xl border border-yellow-500/25 bg-yellow-500/5 p-5 sm:p-6">
      <p className="text-white font-semibold mb-1.5">Writing this up on a real EICR?</p>
      <p className="text-sm text-white/70 leading-relaxed mb-4">
        Produce professional EICR reports with codes, photos and automatic unsatisfactory logic —
        try Elec-Mate free.
      </p>
      <Link
        to="/auth/signup?ref=eicr-code-checker"
        className="inline-flex items-center justify-center gap-2 h-11 px-6 w-full sm:w-auto bg-yellow-500 hover:bg-yellow-400 text-black font-semibold rounded-xl touch-manipulation transition-colors"
      >
        Start free trial <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
  );
}

export default function EicrCodeChecker() {
  const [query, setQuery] = useState('');
  const [activeCode, setActiveCode] = useState<EicrCode | null>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [showAll, setShowAll] = useState(false);

  // Fire once per visit on first real interaction (search or filter) — views
  // alone don't prove the tool is used.
  const usedRef = useRef(false);
  useEffect(() => {
    if (usedRef.current) return;
    if (query.trim() === '' && activeCode === null && activeCategory === null) return;
    usedRef.current = true;
    trackSeoToolUsed({ tool: 'eicr_code_checker', page: window.location.pathname });
  }, [query, activeCode, activeCategory]);

  const results = useMemo(() => {
    return eicrObservations.filter(
      (obs) =>
        (!activeCode || obs.code === activeCode) &&
        (!activeCategory || obs.category === activeCategory) &&
        matchesQuery(obs, query)
    );
  }, [query, activeCode, activeCategory]);

  const isFiltered = query.trim() !== '' || activeCode !== null || activeCategory !== null;
  const visibleResults = showAll || isFiltered ? results : results.slice(0, INITIAL_VISIBLE);

  const clearAll = () => {
    setQuery('');
    setActiveCode(null);
    setActiveCategory(null);
    setShowAll(false);
  };

  return (
    <div className="rounded-2xl sm:border sm:border-white/10 sm:bg-white/[0.03] sm:p-6 space-y-6">
      {/* Code meanings summary strip — tappable filter cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
        {CODE_ORDER.map((code) => {
          const meaning = EICR_CODE_MEANINGS[code];
          const styles = CODE_STYLES[code];
          const active = activeCode === code;
          return (
            <button
              key={code}
              type="button"
              onClick={() => setActiveCode(active ? null : code)}
              aria-pressed={active}
              className={`text-left rounded-xl border p-3 min-h-[44px] touch-manipulation transition-colors ${
                active ? styles.cardActive : `${styles.card} hover:border-white/25`
              }`}
            >
              <span className="flex items-center gap-2 mb-1">
                <span className={`w-2 h-2 rounded-full ${styles.dot}`} aria-hidden />
                <span className="font-bold text-white">{code}</span>
              </span>
              <span className="block text-xs font-medium text-white/85 leading-snug">
                {meaning.label}
              </span>
              <span className="block text-[11px] text-white/55 leading-snug mt-0.5">
                {meaning.action}
              </span>
            </button>
          );
        })}
      </div>

      {/* Search */}
      <div className="relative">
        <Search
          className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40 pointer-events-none"
          aria-hidden
        />
        <Input
          type="search"
          inputMode="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Describe the observation — e.g. no RCD on sockets, cracked socket, plastic consumer unit…"
          aria-label="Search EICR observations"
          className="h-11 text-base touch-manipulation pl-10 pr-10 bg-white/5 border-white/30 focus:border-yellow-500 focus:ring-yellow-500 text-white placeholder:text-white/40"
        />
        {query && (
          <button
            type="button"
            onClick={() => setQuery('')}
            aria-label="Clear search"
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-lg text-white/50 hover:text-white touch-manipulation"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Category chips — horizontal scroll on mobile */}
      <div
        className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        role="group"
        aria-label="Filter by category"
      >
        <button
          type="button"
          onClick={() => setActiveCategory(null)}
          className={`shrink-0 h-9 px-3.5 rounded-full border text-sm touch-manipulation transition-colors ${
            activeCategory === null
              ? 'bg-yellow-500 border-yellow-500 text-black font-semibold'
              : 'border-white/15 text-white/70 hover:border-white/35'
          }`}
        >
          All
        </button>
        {eicrObservationCategories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setActiveCategory(activeCategory === cat ? null : cat)}
            className={`shrink-0 h-9 px-3.5 rounded-full border text-sm touch-manipulation transition-colors ${
              activeCategory === cat
                ? 'bg-yellow-500 border-yellow-500 text-black font-semibold'
                : 'border-white/15 text-white/70 hover:border-white/35'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Result count + clear */}
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm text-white/60">
          {results.length} observation{results.length === 1 ? '' : 's'}
          {isFiltered ? ' match' : ' in the checker'}
        </p>
        {isFiltered && (
          <button
            type="button"
            onClick={clearAll}
            className="text-sm text-yellow-400 hover:text-yellow-300 touch-manipulation min-h-[44px] px-1"
          >
            Clear filters
          </button>
        )}
      </div>

      {/* Results */}
      {results.length > 0 ? (
        <>
          <ul className="space-y-3">
            {visibleResults.map((obs) => {
              const meaning = EICR_CODE_MEANINGS[obs.code];
              const styles = CODE_STYLES[obs.code];
              return (
                <li
                  key={obs.id}
                  className="rounded-xl border border-white/10 bg-white/[0.03] p-4 sm:p-5"
                >
                  <div className="flex flex-wrap items-center gap-2 mb-2.5">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border text-sm font-bold ${styles.badge}`}
                    >
                      {obs.code}
                    </span>
                    <span className="text-xs text-white/50">{meaning.action}</span>
                    <span className="text-xs text-white/35 ml-auto">{obs.category}</span>
                  </div>
                  <p className="text-white font-medium leading-snug mb-2">{obs.observation}</p>
                  <p className="text-sm text-white/70 leading-relaxed mb-3">{obs.reasoning}</p>
                  {meaning.unsatisfactory ? (
                    <p className="inline-flex items-center gap-1.5 text-xs font-medium text-orange-300">
                      <AlertTriangle className="w-3.5 h-3.5" aria-hidden />
                      Results in an unsatisfactory EICR
                    </p>
                  ) : (
                    <p className="inline-flex items-center gap-1.5 text-xs font-medium text-green-400">
                      <CheckCircle2 className="w-3.5 h-3.5" aria-hidden />
                      C3 alone still allows a satisfactory EICR
                    </p>
                  )}
                </li>
              );
            })}
          </ul>

          {!showAll && !isFiltered && results.length > INITIAL_VISIBLE && (
            <button
              type="button"
              onClick={() => setShowAll(true)}
              className="w-full h-11 rounded-xl border border-white/15 text-white/80 hover:border-yellow-500/40 hover:text-white font-medium touch-manipulation transition-colors"
            >
              Show all {results.length} observations
            </button>
          )}

          <p className="text-xs text-white/45 leading-relaxed">
            Classification codes are always the inspector&apos;s judgement based on the actual
            condition found on site. These are typical codings — the same defect can justify a
            different code depending on accessibility, location and who uses the installation.
          </p>

          <SignupCTA />
        </>
      ) : (
        /* Empty state */
        <div className="space-y-5">
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-6 text-center">
            <p className="text-white font-medium mb-1.5">No observations match that search</p>
            <p className="text-sm text-white/60 mb-4">
              Try a shorter term, or one of these common searches:
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {COMMON_SEARCHES.map((term) => (
                <button
                  key={term}
                  type="button"
                  onClick={() => {
                    setQuery(term);
                    setActiveCode(null);
                    setActiveCategory(null);
                  }}
                  className="h-9 px-3.5 rounded-full border border-yellow-500/30 bg-yellow-500/10 text-sm text-yellow-400 hover:bg-yellow-500/20 touch-manipulation transition-colors"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
          <SignupCTA />
        </div>
      )}
    </div>
  );
}
