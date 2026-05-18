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
 * manifest. Image cards sit on a card surface that doubles as in-page CTA
 * to /tools/diagram-builder for users who want to use the symbols in an
 * actual circuit drawing.
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
      <div className="bg-white rounded-xl aspect-square flex items-center justify-center p-3 sm:p-4">
        <img
          src={src}
          alt={symbol.altText}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-contain"
          width={120}
          height={120}
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
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
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
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
                  {list.map((s) => (
                    <SymbolCard key={s.id} symbol={s} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
