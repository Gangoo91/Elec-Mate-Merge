/**
 * SymbolGallery — renders BS EN 60617 electrical symbols from the manifest.
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
 * manifest. Below the gallery, a yellow-accent CTA promotes the Elec-Mate Room
 * Planner at /electrician/business/room-planner — where all 114 symbols can be
 * dragged into a floor plan and exported as a labelled PDF.
 */

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
  return symbols.map((s) => ({
    '@context': 'https://schema.org',
    '@type': 'ImageObject',
    name: s.name,
    description: s.altText,
    contentUrl: `${BASE}/symbols/${s.file}`,
    encodingFormat: 'image/svg+xml',
    license: 'https://www.elec-mate.com/terms',
    creditText: 'Elec-Mate',
    creator: { '@type': 'Organization', name: 'Elec-Mate', url: BASE },
  }));
}

function SymbolCard({ symbol }: { symbol: ElectricalSymbol }) {
  const src = `/symbols/${symbol.file}`;
  const categoryMeta = SYMBOL_CATEGORIES.find((c) => c.id === symbol.category);

  return (
    <article
      id={`symbol-${symbol.id}`}
      className="rounded-2xl bg-white/[0.04] border border-white/10 p-4 sm:p-5 hover:border-yellow-500/30 transition-colors flex flex-col gap-3"
    >
      <div className="bg-white rounded-xl w-20 h-20 sm:w-24 sm:h-24 mx-auto flex items-center justify-center p-2 sm:p-3">
        <img
          src={src}
          alt={symbol.altText}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-contain"
        />
      </div>
      <div>
        <h3 className="font-semibold text-white text-sm sm:text-base leading-tight">
          {symbol.name}
        </h3>
        {symbol.bs60617 && (
          <p className="text-[10.5px] font-medium uppercase tracking-[0.12em] text-yellow-400 mt-1">
            BS EN 60617 {symbol.bs60617}
          </p>
        )}
        <p className="text-xs text-white/80 mt-2 leading-relaxed line-clamp-3">
          {symbol.description}
        </p>
        {symbol.useContext && (
          <p className="text-[11px] text-white/55 mt-2 italic line-clamp-2">
            <strong className="text-white/70 not-italic">Used in:</strong> {symbol.useContext}
          </p>
        )}
        {categoryMeta && (
          <Link
            to={`/guides/${categoryMeta.slug}`}
            className="inline-block mt-3 text-xs font-medium text-yellow-400 hover:text-yellow-300"
          >
            See all {categoryMeta.label.toLowerCase()} →
          </Link>
        )}
      </div>
    </article>
  );
}

export function SymbolGallery({
  category,
  symbolIds,
  heading,
  showCategoryHeadings = true,
  showImageObjectSchema = true,
}: SymbolGalleryProps) {
  const symbols = getSymbolsToRender({ category, symbolIds });
  const schemas = showImageObjectSchema ? buildImageObjectSchemas(symbols) : [];

  // Group by category for the main multi-category gallery
  const groupedByCategory: Record<string, ElectricalSymbol[]> = {};
  for (const s of symbols) {
    if (!groupedByCategory[s.category]) groupedByCategory[s.category] = [];
    groupedByCategory[s.category].push(s);
  }

  const showGroups = showCategoryHeadings && Object.keys(groupedByCategory).length > 1;

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

      {heading && <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">{heading}</h2>}

      {!showGroups ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4">
          {symbols.map((s) => (
            <SymbolCard key={s.id} symbol={s} />
          ))}
        </div>
      ) : (
        <div className="space-y-10">
          {SYMBOL_CATEGORIES.map((cat) => {
            const list = groupedByCategory[cat.id];
            if (!list || list.length === 0) return null;
            return (
              <div key={cat.id} id={`category-${cat.id}`}>
                <div className="mb-4 flex items-baseline justify-between flex-wrap gap-2">
                  <h2 className="text-2xl font-bold text-white">
                    {cat.label}
                    <span className="text-white/40 text-sm font-normal ml-2">({list.length})</span>
                  </h2>
                  <Link
                    to={`/guides/${cat.slug}`}
                    className="text-xs font-medium text-yellow-400 hover:text-yellow-300"
                  >
                    Full category guide →
                  </Link>
                </div>
                <p className="text-sm text-white/65 mb-5 max-w-3xl">{cat.description}</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4">
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
    <aside className="mt-10 rounded-2xl border border-yellow-500/30 bg-gradient-to-br from-yellow-500/[0.08] via-yellow-500/[0.04] to-transparent p-6 sm:p-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="max-w-2xl">
          <p className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-yellow-400 mb-2">
            Use these symbols in Elec-Mate
          </p>
          <h3 className="text-xl sm:text-2xl font-bold text-white leading-tight">
            Drag and drop every BS EN 60617 symbol into the Room Planner
          </h3>
          <p className="mt-2 text-sm text-white/75 leading-relaxed">
            The full 114-symbol library is built into the Elec-Mate Room Planner. Sketch the room,
            drop in sockets, switches, lights and the consumer unit, then export a labelled PDF for
            the job pack — no separate CAD software, no licence fees.
          </p>
        </div>
        <Link
          to="/electrician/business/room-planner"
          className="shrink-0 inline-flex items-center justify-center h-11 px-5 rounded-xl bg-yellow-500 hover:bg-yellow-400 text-black font-semibold text-sm touch-manipulation transition-colors"
        >
          Open Room Planner →
        </Link>
      </div>
    </aside>
  );
}
