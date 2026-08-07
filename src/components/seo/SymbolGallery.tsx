/**
 * SymbolGallery — renders the IEC 60617 electrical symbols from the manifest.
 *
 * Usage:
 *   <SymbolGallery /> — full 114-symbol gallery, grouped by category
 *   <SymbolGallery category="switch" /> — single-category view (used on
 *      per-category subpages like /guides/electrical-switch-symbols)
 *   <SymbolGallery symbolIds={['1way-switch','2way-switch','intermediate-switch']} />
 *      — explicit subset
 *
 * Each symbol renders as an <img> referencing /public/symbols/<category>/<file>
 * so that Google Images can index each one. Alt text is SEO-targeted from the
 * manifest.
 *
 * 🔴 THE STANDARD IS **IEC 60617**, not "IEC 60617". BS 7671:2018+A4:2026 lists
 * BS EN 60617 as "Graphical symbols for diagrams. Now withdrawn and replaced by
 * IEC 60617", and Reg 514.9.1 requires that any symbol used in diagrams, charts,
 * tables or schedules complies with IEC 60617.
 *
 * DESIGN NOTES (rewritten 2026-08-06)
 * This page earns more search traffic than any other on the site (18,290
 * impressions/28d) and converted at 2.3% from position 9. Three things were
 * working against it, all visible the moment you looked at it:
 *
 *  1. NO WAY TO FIND A SYMBOL. 114 cards over 29 screens of scroll. The top
 *     queries are single-symbol lookups — "rcbo symbol" (position 2.3, zero
 *     clicks), "consumer unit symbol" (position 4.0, zero clicks). Someone
 *     landing here to find one glyph had to scroll for it. There is now a
 *     search box and category chips, and the search is sticky so it stays
 *     reachable the whole way down.
 *  2. EVERY CARD REPEATED "See all switch symbols →" IN THE ACCENT COLOUR.
 *     114 near-identical yellow links shouting over the symbols themselves.
 *     The category header already carries that link once, which is enough.
 *  3. TEXT TRUNCATED MID-WORD. line-clamp cut descriptions to "immersi…" and
 *     "701.512.3…", and clamped at different points per card so the grid was
 *     ragged. The symbol is what people came for, so it is now the hero and the
 *     supporting text is short enough not to need clamping.
 */

import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import {
  SYMBOLS,
  SYMBOL_CATEGORIES,
  type SymbolCategory,
  type ElectricalSymbol,
} from '@/data/electricalSymbols';

interface SymbolGalleryProps {
  category?: SymbolCategory;
  symbolIds?: string[];
  heading?: string;
  showCategoryHeadings?: boolean;
  showImageObjectSchema?: boolean;
  /** Search + category filter. Defaults on for the full gallery only. */
  searchable?: boolean;
}

const BASE = 'https://www.elec-mate.com';

function getSymbolsToRender({
  category,
  symbolIds,
}: Pick<SymbolGalleryProps, 'category' | 'symbolIds'>): ElectricalSymbol[] {
  if (symbolIds && symbolIds.length > 0) {
    const set = new Set(symbolIds);
    return SYMBOLS.filter((s) => set.has(s.id));
  }
  if (category) return SYMBOLS.filter((s) => s.category === category);
  return SYMBOLS;
}

function buildImageObjectSchemas(symbols: ElectricalSymbol[]) {
  // Google's Licensable Images rich result requires copyrightNotice +
  // acquireLicensePage in addition to license. Without these the images
  // don't qualify for the "Licensable" badge in Google Image search and
  // GSC raises Image Metadata warnings (one per ImageObject).
  return symbols.map((s) => ({
    '@context': 'https://schema.org',
    '@type': 'ImageObject',
    name: s.name,
    description: s.altText,
    contentUrl: `${BASE}/symbols/${s.file}`,
    encodingFormat: 'image/svg+xml',
    license: `${BASE}/legal/terms`,
    acquireLicensePage: `${BASE}/legal/terms`,
    copyrightNotice: '© Elec-Mate Ltd. Free to use with attribution.',
    copyrightHolder: { '@type': 'Organization', name: 'Elec-Mate Ltd', url: BASE },
    creditText: 'Elec-Mate',
    creator: { '@type': 'Organization', name: 'Elec-Mate Ltd', url: BASE },
  }));
}

function SymbolCard({ symbol }: { symbol: ElectricalSymbol }) {
  return (
    <article
      id={`symbol-${symbol.id}`}
      className="group flex flex-col rounded-2xl border border-white/[0.1] bg-white/[0.03] p-3 transition-colors hover:border-elec-yellow/40 sm:p-4"
    >
      {/* The glyph is the reason anyone is on this page — give it the room. */}
      <div className="mx-auto flex h-24 w-full items-center justify-center rounded-xl bg-white p-3 sm:h-28">
        <img
          src={`/symbols/${symbol.file}`}
          alt={symbol.altText}
          loading="lazy"
          decoding="async"
          width={112}
          height={112}
          className="h-full w-full object-contain"
        />
      </div>

      <h3 className="mt-3 text-[13.5px] font-semibold leading-tight text-white sm:text-[15px]">
        {symbol.name}
      </h3>

      {/* IEC 60617 identity numbers (e.g. S00288 = isolation, quoted by BS 7671
          Reg 537.1.1) come from the IEC subscription database. The field is
          unpopulated — it renders only once real numbers are added, never guessed. */}
      {symbol.iec60617 && (
        <p className="mt-1 text-[10.5px] font-semibold uppercase tracking-[0.12em] text-elec-yellow">
          IEC 60617 {symbol.iec60617}
        </p>
      )}

      <p className="mt-2 text-[12px] leading-relaxed text-white">{symbol.description}</p>

      {symbol.useContext && (
        <p className="mt-auto pt-2 text-[11.5px] leading-relaxed text-white">
          <span className="font-semibold">Used in:</span> {symbol.useContext}
        </p>
      )}
    </article>
  );
}

const GRID =
  'grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6';

export function SymbolGallery({
  category,
  symbolIds,
  heading,
  showCategoryHeadings = true,
  showImageObjectSchema = true,
  searchable,
}: SymbolGalleryProps) {
  const symbols = useMemo(
    () => getSymbolsToRender({ category, symbolIds }),
    [category, symbolIds]
  );
  const [query, setQuery] = useState('');
  const [activeCat, setActiveCat] = useState<SymbolCategory | 'all'>('all');

  const schemas = showImageObjectSchema ? buildImageObjectSchemas(symbols) : [];

  // Search across name, description and where-you-see-it, so "cooker", "shower"
  // or "bathroom" find the right symbol even when the user does not know its name.
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const inCat = symbols.filter((s) => activeCat === 'all' || s.category === activeCat);
    if (!q) return inCat;

    // Rank by WHERE the match is, not just whether there was one. Searching
    // "rcbo" used to return Consumer Unit and Distribution Board first — they
    // mention RCBOs in their description — with the actual RCBO symbol third.
    // 0 = name starts with the term, 1 = name contains it, 2 = description,
    // 3 = where-you-see-it. Ties keep manifest order.
    const rank = (s: ElectricalSymbol): number => {
      const name = s.name.toLowerCase();
      if (name.startsWith(q)) return 0;
      if (name.includes(q)) return 1;
      if (s.description.toLowerCase().includes(q)) return 2;
      if ((s.useContext ?? '').toLowerCase().includes(q)) return 3;
      return 99;
    };
    return inCat
      .map((s, i) => ({ s, r: rank(s), i }))
      .filter((x) => x.r < 99)
      .sort((a, b) => a.r - b.r || a.i - b.i)
      .map((x) => x.s);
  }, [symbols, query, activeCat]);

  const grouped: Record<string, ElectricalSymbol[]> = {};
  for (const s of filtered) {
    (grouped[s.category] ||= []).push(s);
  }

  const isFiltering = query.trim().length > 0 || activeCat !== 'all';
  const showGroups = showCategoryHeadings && Object.keys(grouped).length > 1 && !isFiltering;
  const showSearch = searchable ?? (!category && !symbolIds && symbols.length > 24);
  const presentCats = SYMBOL_CATEGORIES.filter((c) => symbols.some((s) => s.category === c.id));

  return (
    <section className="py-8">
      {schemas.length > 0 && (
        <Helmet>
          {schemas.map((schema, idx) => (
            <script key={`symbol-schema-${idx}`} type="application/ld+json">
              {JSON.stringify(schema)}
            </script>
          ))}
        </Helmet>
      )}

      {heading && <h2 className="mb-2 text-2xl font-bold text-white sm:text-3xl">{heading}</h2>}

      {showSearch && (
        // Sticky under the 64px fixed nav, so it stays reachable across all
        // 29 screens. Deliberately NOT bottom-anchored — the public layout
        // already pins a CTA bar there.
        <div className="sticky top-[calc(4rem+env(safe-area-inset-top,0px))] z-20 -mx-4 mb-6 border-b border-white/[0.1] bg-[#0a0a0a]/95 px-4 py-3 backdrop-blur sm:mx-0 sm:rounded-2xl sm:border sm:px-4">
          <label htmlFor="symbol-search" className="sr-only">
            Search {symbols.length} electrical symbols
          </label>
          <input
            id="symbol-search"
            type="search"
            inputMode="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={`Search ${symbols.length} symbols — try "cooker", "RCBO", "bathroom"`}
            className="h-11 w-full rounded-none border-0 border-b border-white/[0.15] bg-transparent px-1 text-base font-medium text-white caret-elec-yellow transition-colors placeholder:text-white/40 hover:border-white/[0.3] focus:border-elec-yellow focus:outline-none focus:ring-0 [color-scheme:dark]"
          />

          <div className="mt-3 flex flex-wrap gap-1.5">
            <button
              type="button"
              onClick={() => setActiveCat('all')}
              className={`h-8 touch-manipulation rounded-lg px-3 text-[12px] font-semibold transition-colors ${
                activeCat === 'all'
                  ? 'bg-elec-yellow text-black'
                  : 'border border-white/[0.12] bg-white/[0.05] text-white'
              }`}
            >
              All {symbols.length}
            </button>
            {presentCats.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => setActiveCat(c.id)}
                className={`h-8 touch-manipulation rounded-lg px-3 text-[12px] font-semibold transition-colors ${
                  activeCat === c.id
                    ? 'bg-elec-yellow text-black'
                    : 'border border-white/[0.12] bg-white/[0.05] text-white'
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>

          {isFiltering && (
            <p className="mt-2 text-[12.5px] text-white" role="status">
              {filtered.length} of {symbols.length} symbols
              {filtered.length === 0 && ' — try a different word, or pick a category above'}
            </p>
          )}
        </div>
      )}

      {!showGroups ? (
        <div className={GRID}>
          {filtered.map((s) => (
            <SymbolCard key={s.id} symbol={s} />
          ))}
        </div>
      ) : (
        <div className="space-y-10">
          {SYMBOL_CATEGORIES.map((cat) => {
            const list = grouped[cat.id];
            if (!list || list.length === 0) return null;
            return (
              <div key={cat.id} id={`category-${cat.id}`}>
                <div className="mb-3 flex flex-wrap items-baseline justify-between gap-2">
                  <h2 className="text-2xl font-bold text-white">
                    {cat.label}
                    <span className="ml-2 text-sm font-normal text-white">({list.length})</span>
                  </h2>
                  <Link
                    to={`/guides/${cat.slug}`}
                    className="text-xs font-semibold text-elec-yellow hover:brightness-110"
                  >
                    Full category guide →
                  </Link>
                </div>
                <p className="mb-5 max-w-3xl text-sm text-white">{cat.description}</p>
                <div className={GRID}>
                  {list.map((s) => (
                    <SymbolCard key={s.id} symbol={s} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      <RoomPlannerCTA />
    </section>
  );
}

function RoomPlannerCTA() {
  return (
    <aside className="mt-10 rounded-2xl border border-elec-yellow/30 bg-gradient-to-br from-elec-yellow/[0.08] via-elec-yellow/[0.04] to-transparent p-6 sm:p-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="max-w-2xl">
          <p className="mb-2 text-[10.5px] font-semibold uppercase tracking-[0.18em] text-elec-yellow">
            Use these symbols in Elec-Mate
          </p>
          <h3 className="text-xl font-bold leading-tight text-white sm:text-2xl">
            Drag and drop every IEC 60617 symbol into the Room Planner
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-white">
            The full 114-symbol library is built into the Elec-Mate Room Planner. Sketch the room,
            drop in sockets, switches, lights and the consumer unit, then export a labelled PDF for
            the job pack — no separate CAD software, no licence fees.
          </p>
        </div>
        <Link
          to="/electrician/business/room-planner"
          className="inline-flex h-11 shrink-0 touch-manipulation items-center justify-center rounded-xl bg-elec-yellow px-5 text-sm font-semibold text-black transition-colors hover:brightness-95"
        >
          Open Room Planner →
        </Link>
      </div>
    </aside>
  );
}
