/**
 * IndustryNews — editorial redesign matching ElectricianHub / CollegeDashboard.
 *
 * Sticky text-only header (← Back · INDUSTRY · Updates), date-eyebrow hero
 * with refresh CTA, hairline-grid article cards. Filters out stale rows
 * (>60 days unless explicitly opted in) and obviously-broken titles
 * (META_TITLE_*, all-caps tokens, empty content) so the page never looks
 * like a CMS dump.
 */

import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { ArrowRight, Search, RefreshCw } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useIndustryNews, NewsArticle } from '@/hooks/useIndustryNews';
import { Eyebrow, containerVariants, itemVariants } from '@/components/college/primitives';
import { useToast } from '@/components/ui/use-toast';

// ────────────────────────────────────────────────────────────────────────
// Helpers
// ────────────────────────────────────────────────────────────────────────

const partOfDay = (): 'MORNING' | 'AFTERNOON' | 'EVENING' => {
  const h = new Date().getHours();
  if (h < 12) return 'MORNING';
  if (h < 18) return 'AFTERNOON';
  return 'EVENING';
};

const dateEyebrow = (): string => {
  const d = new Date();
  const weekday = d.toLocaleDateString('en-GB', { weekday: 'long' }).toUpperCase();
  const day = d.getDate();
  const month = d.toLocaleDateString('en-GB', { month: 'long' }).toUpperCase();
  return `${weekday} · ${day} ${month} · ${partOfDay()}`;
};

const pickArticleDate = (a: NewsArticle): Date => {
  const raw = a.published_date || a.date_published || a.created_at;
  return new Date(raw);
};

const formatPostedAgo = (date: Date): string => {
  if (Number.isNaN(date.getTime())) return 'New';
  const diffDays = Math.floor((Date.now() - date.getTime()) / (1000 * 60 * 60 * 24));
  if (diffDays < 0) return 'New';
  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return '1d ago';
  if (diffDays < 7) return `${diffDays}d ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)}w ago`;
  if (diffDays < 365) return `${Math.floor(diffDays / 30)}mo ago`;
  return `${Math.floor(diffDays / 365)}y ago`;
};

const isValidExternalUrl = (url: string | undefined): boolean => {
  if (!url) return false;
  try {
    const u = new URL(url);
    return u.protocol === 'http:' || u.protocol === 'https:';
  } catch {
    return false;
  }
};

// Filter out articles with malformed/junk titles. The scraper sometimes
// captures CSS-class-style strings or template placeholders ("META_TITLE_*",
// "meta_title", all-caps single tokens) — those should never reach the user.
const isValidTitle = (title: string | undefined): boolean => {
  if (!title) return false;
  const t = title.trim();
  if (t.length < 10) return false;
  if (/^META_/i.test(t)) return false;
  if (/^[A-Z_]+$/.test(t)) return false; // all-caps tokens like META_TITLE_SECTORS
  if (/^_/.test(t)) return false;
  if (/^undefined$/i.test(t)) return false;
  return true;
};

// Approved UK electrical-trade sources. Articles whose source_name doesn't
// match one of these are dropped client-side — defends against the VPS
// scraper drifting onto general-news or off-topic feeds.
// Match is case-insensitive substring against source_name.
const APPROVED_SOURCES = [
  'electrical times',
  'electrical contracting news',
  'ecn',
  'professional electrician',
  'voltimum',
  'iet',
  'hse',
  'niceic',
  'napit',
  'electrical review',
  'wiring and construction',
  'electrical engineering',
  'electrical wholesaler',
  'lux review',
  'specifying & service',
];

const isApprovedSource = (source: string | undefined): boolean => {
  if (!source) return false;
  // Normalise underscores/hyphens to spaces so slug forms ("electrical_times")
  // match display forms ("electrical times"). The VPS scraper writes slugs;
  // legacy rows used display names — both are valid.
  const s = source.toLowerCase().replace(/[_-]+/g, ' ');
  return APPROVED_SOURCES.some((approved) => s.includes(approved));
};

// Topic guard — drop articles whose titles look distinctly off-topic
// (foreign education, generic news, sport, entertainment) so a misbehaving
// scraper run can't fill the page with irrelevant content.
const OFF_TOPIC_PATTERNS = [
  /\b(india|madras|delhi|mumbai|pakistan|bangladesh|nigeria)\b/i,
  /\b(admission|university course|college course|undergraduate|postgraduate|exam result)\b/i,
  /\b(cricket|football|premier league|olympics)\b/i,
  /\b(celebrity|royal family|hollywood|bollywood)\b/i,
  /\bweather\s+(forecast|warning)\b/i,
];

const isOnTopic = (title: string, summary: string): boolean => {
  const blob = `${title} ${summary}`.toLowerCase();
  return !OFF_TOPIC_PATTERNS.some((re) => re.test(blob));
};

const STALE_DAYS = 60;

const isFresh = (a: NewsArticle): boolean => {
  const date = pickArticleDate(a);
  if (Number.isNaN(date.getTime())) return false;
  const diffDays = (Date.now() - date.getTime()) / (1000 * 60 * 60 * 24);
  return diffDays <= STALE_DAYS;
};

// ────────────────────────────────────────────────────────────────────────
// Page masthead — sticky College-style header
// ────────────────────────────────────────────────────────────────────────

const PageMasthead = () => {
  const navigate = useNavigate();
  return (
    <div className="sticky top-0 z-50 bg-elec-dark/95 backdrop-blur-sm border-b border-white/[0.06]">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex items-center h-12 gap-4 sm:gap-6">
          <button
            type="button"
            onClick={() => navigate('/electrician')}
            className="text-[12.5px] font-medium text-white hover:text-white transition-colors touch-manipulation whitespace-nowrap"
          >
            ← Back
          </button>
          <div className="flex-1 min-w-0 flex items-baseline gap-2.5">
            <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white hidden sm:inline">
              Industry
            </span>
            <span className="hidden sm:inline h-3 w-px bg-white/10" aria-hidden />
            <h1 className="text-[13px] sm:text-sm font-semibold text-white truncate tracking-tight">
              Updates
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

// ────────────────────────────────────────────────────────────────────────
// Hero
// ────────────────────────────────────────────────────────────────────────

const Hero = ({
  total,
  freshCount,
  lastUpdatedAt,
  onRefresh,
  isRefreshing,
}: {
  total: number;
  freshCount: number;
  lastUpdatedAt: Date | null;
  onRefresh: () => void;
  isRefreshing: boolean;
}) => {
  const verdict = useMemo(() => {
    if (total === 0) return "We're loading the trade press now.";
    const updated = lastUpdatedAt ? formatPostedAgo(lastUpdatedAt) : 'recently';
    return `${freshCount} fresh ${freshCount === 1 ? 'article' : 'articles'} from Electrical Times, ECN, Professional Electrician, IET and HSE. Last refresh ${updated}.`;
  }, [total, freshCount, lastUpdatedAt]);

  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="relative pt-2 sm:pt-4"
    >
      <motion.div variants={itemVariants}>
        <Eyebrow>{dateEyebrow()}</Eyebrow>
      </motion.div>

      <motion.h1
        variants={itemVariants}
        className="mt-3 font-semibold tracking-tight leading-[1.05] text-[34px] sm:text-[44px] lg:text-[56px]"
      >
        <span className="text-elec-yellow">What's new </span>
        <span className="text-white">in the trade.</span>
      </motion.h1>

      <motion.p
        variants={itemVariants}
        className="mt-3 sm:mt-4 text-[14px] sm:text-[15px] leading-relaxed text-white/90 max-w-2xl"
      >
        {verdict}
      </motion.p>

      <motion.div variants={itemVariants} className="mt-5 sm:mt-6">
        <button
          type="button"
          onClick={onRefresh}
          disabled={isRefreshing}
          className={cn(
            'group inline-flex items-center gap-2 h-10 px-4 rounded-full',
            'border border-elec-yellow/25 bg-elec-yellow/10 hover:bg-elec-yellow/20',
            'text-[13px] font-medium text-elec-yellow touch-manipulation transition-colors',
            isRefreshing && 'opacity-60 cursor-wait'
          )}
        >
          <RefreshCw className={cn('h-4 w-4', isRefreshing && 'animate-spin')} />
          <span>{isRefreshing ? 'Refreshing…' : 'Refresh feed'}</span>
        </button>
      </motion.div>
    </motion.section>
  );
};

// ────────────────────────────────────────────────────────────────────────
// Search + category chips
// ────────────────────────────────────────────────────────────────────────

const CATEGORIES = ['All', 'Industry', 'Safety', 'Technical', 'BS7671', 'Projects'] as const;
type Category = (typeof CATEGORIES)[number];

const SearchAndFilters = ({
  search,
  setSearch,
  category,
  setCategory,
}: {
  search: string;
  setSearch: (v: string) => void;
  category: Category;
  setCategory: (c: Category) => void;
}) => (
  <div className="space-y-3">
    <div className="relative">
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-white/35 pointer-events-none" />
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search articles"
        aria-label="Search articles"
        className={cn(
          'w-full h-11 pl-11 pr-4',
          'bg-[hsl(0_0%_10%)] border border-white/[0.08] rounded-xl',
          'text-[14px] text-white placeholder:text-white/35',
          'focus:outline-none focus:border-elec-yellow/40 focus:ring-1 focus:ring-elec-yellow/30',
          'transition-colors touch-manipulation'
        )}
      />
    </div>
    <div className="flex flex-wrap gap-2">
      {CATEGORIES.map((c) => {
        const active = c === category;
        return (
          <button
            key={c}
            type="button"
            onClick={() => setCategory(c)}
            className={cn(
              'h-8 px-3 rounded-full text-[11px] uppercase tracking-[0.16em] font-semibold',
              'border transition-colors touch-manipulation',
              active
                ? 'bg-elec-yellow text-black border-elec-yellow'
                : 'border-white/[0.08] text-white/65 hover:text-white hover:border-white/[0.16]'
            )}
          >
            {c}
          </button>
        );
      })}
    </div>
  </div>
);

// ────────────────────────────────────────────────────────────────────────
// Article card — hairline-grid cell
// ────────────────────────────────────────────────────────────────────────

const ArticleCard = ({ article, index }: { article: NewsArticle; index: number }) => {
  const [imageFailed, setImageFailed] = useState(false);
  const date = pickArticleDate(article);
  const ago = formatPostedAgo(date);
  const externalHref = article.external_url || article.source_url || '#';
  const category = article.category || 'Industry';
  const source = article.source_name || 'Trade press';
  const hasImage = !!article.image_url && !imageFailed;

  return (
    <a
      href={externalHref}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative bg-[hsl(0_0%_10%)] hover:bg-elec-yellow/[0.04] transition-colors text-left flex flex-col h-full cursor-pointer touch-manipulation overflow-hidden"
    >
      {/* Photo — full-bleed at the top, fixed aspect for visual rhythm.
          When there's no image we render a tinted accent panel so cards
          without art still slot into the grid cleanly. */}
      <div className="relative w-full h-[140px] sm:h-[150px] lg:h-[160px] overflow-hidden border-b border-white/[0.06] bg-[hsl(0_0%_8%)]">
        {hasImage ? (
          <img
            src={article.image_url}
            alt=""
            loading="lazy"
            onError={() => setImageFailed(true)}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-elec-yellow/[0.06] via-transparent to-elec-yellow/[0.02]">
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-[40px] sm:text-[48px] font-light tabular-nums text-elec-yellow/15 leading-none">
                {String(index + 1).padStart(2, '0')}
              </span>
            </div>
          </div>
        )}
        {/* Posted-ago chip overlaid bottom-right */}
        <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-black/60 backdrop-blur-sm">
          <span className="text-[10px] font-medium uppercase tracking-[0.16em] text-white/85 tabular-nums whitespace-nowrap">
            {ago}
          </span>
        </div>
      </div>

      <div className="flex flex-col flex-1 p-5 sm:p-6">
        <div className="flex items-baseline gap-2">
          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-elec-yellow/80 tabular-nums">
            {String(index + 1).padStart(2, '0')}
          </span>
          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
            · {category}
          </span>
        </div>

        <h3 className="mt-3 text-[16px] sm:text-[18px] lg:text-[19px] font-semibold tracking-tight leading-[1.2] text-white group-hover:text-elec-yellow transition-colors line-clamp-3">
          {article.title}
        </h3>

        {article.summary && (
          <p className="mt-2 text-[12.5px] leading-relaxed text-white/55 line-clamp-2">
            {article.summary}
          </p>
        )}

        <div className="flex-grow" />

        <div className="mt-4 flex items-center justify-between gap-3 pt-3 border-t border-white/[0.05]">
          <span className="text-[11px] text-white/55 truncate uppercase tracking-[0.14em]">
            {source}
          </span>
          <span className="inline-flex items-center gap-1.5 text-[12px] font-medium text-elec-yellow shrink-0">
            Read
            <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
          </span>
        </div>
      </div>
    </a>
  );
};

// ────────────────────────────────────────────────────────────────────────
// Hairline grid
// ────────────────────────────────────────────────────────────────────────

const ArticlesGrid = ({ articles }: { articles: NewsArticle[] }) => (
  <div className="relative grid auto-rows-[400px] sm:auto-rows-[420px] gap-px bg-white/[0.12] border border-white/[0.08] rounded-2xl overflow-hidden grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-elec-yellow/0 via-elec-yellow/60 to-elec-yellow/0 pointer-events-none z-10" />
    {articles.map((article, i) => (
      <ArticleCard key={article.id} article={article} index={i} />
    ))}
  </div>
);

// ────────────────────────────────────────────────────────────────────────
// Skeleton
// ────────────────────────────────────────────────────────────────────────

const Skeleton = () => (
  <div className="relative grid auto-rows-[400px] sm:auto-rows-[420px] gap-px bg-white/[0.12] border border-white/[0.08] rounded-2xl overflow-hidden grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-elec-yellow/0 via-elec-yellow/60 to-elec-yellow/0 pointer-events-none z-10" />
    {[0, 1, 2, 3, 4, 5].map((i) => (
      <motion.div
        key={i}
        animate={{ opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 2, repeat: Infinity, delay: i * 0.1 }}
        className="bg-[hsl(0_0%_10%)] p-5 sm:p-6 lg:p-7 h-full flex flex-col"
      >
        <div className="flex items-baseline justify-between gap-2">
          <div className="h-2.5 w-20 rounded-full bg-white/[0.06]" />
          <div className="h-2.5 w-12 rounded-full bg-white/[0.04]" />
        </div>
        <div className="mt-4 h-5 w-3/4 rounded-full bg-white/[0.06]" />
        <div className="mt-3 space-y-2">
          <div className="h-3 w-2/3 rounded-full bg-white/[0.04]" />
          <div className="h-3 w-1/2 rounded-full bg-white/[0.04]" />
        </div>
      </motion.div>
    ))}
  </div>
);

// ────────────────────────────────────────────────────────────────────────
// Empty state
// ────────────────────────────────────────────────────────────────────────

const EmptyState = ({
  showingAll,
  onShowAll,
  searchActive,
}: {
  showingAll: boolean;
  onShowAll: () => void;
  searchActive: boolean;
}) => (
  <div className="relative bg-[hsl(0_0%_10%)] border border-white/[0.08] rounded-2xl px-6 py-12 text-center overflow-hidden">
    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-elec-yellow/0 via-elec-yellow/60 to-elec-yellow/0 pointer-events-none" />
    <p className="text-[13px] text-white/65 leading-relaxed max-w-md mx-auto">
      {searchActive
        ? 'No articles match your search.'
        : showingAll
          ? 'The feed is empty.'
          : `Nothing fresh in the last ${STALE_DAYS} days.`}
    </p>
    {!showingAll && !searchActive && (
      <button
        type="button"
        onClick={onShowAll}
        className="inline-flex items-center gap-1.5 mt-4 text-[12px] font-medium text-elec-yellow hover:text-elec-yellow/85 transition-colors touch-manipulation"
      >
        Show older articles
        <ArrowRight className="h-3.5 w-3.5" />
      </button>
    )}
  </div>
);

// ────────────────────────────────────────────────────────────────────────
// Main
// ────────────────────────────────────────────────────────────────────────

const ITEMS_PER_PAGE = 18;

const IndustryNews = () => {
  const { toast } = useToast();
  const {
    data: articles = [],
    isLoading,
    error,
    refresh,
    isRefreshing,
    refreshError,
    refreshSuccess,
  } = useIndustryNews();

  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<Category>('All');
  const [showStale, setShowStale] = useState(false);
  const [page, setPage] = useState(1);

  // Last-updated timestamp comes from the most recent created_at across all
  // ingested rows (not date_published, which can be a back-dated DATE).
  const lastUpdatedAt = useMemo(() => {
    if (!articles.length) return null;
    const ts = articles
      .map((a) => new Date(a.created_at).getTime())
      .filter((t) => !Number.isNaN(t));
    if (!ts.length) return null;
    return new Date(Math.max(...ts));
  }, [articles]);

  // Cleaned source list: valid title, valid external URL, approved source,
  // on-topic. Belt-and-braces against the VPS scraper drifting off feed.
  const cleaned = useMemo(
    () =>
      articles.filter(
        (a) =>
          isValidTitle(a.title) &&
          isValidExternalUrl(a.external_url || a.source_url) &&
          isApprovedSource(a.source_name) &&
          isOnTopic(a.title || '', a.summary || '')
      ),
    [articles]
  );

  // Fresh-only by default (last 60 days). User can opt to show stale via the
  // empty-state action, which flips `showStale`.
  const freshCount = useMemo(() => cleaned.filter(isFresh).length, [cleaned]);

  const filtered = useMemo(() => {
    return cleaned
      .filter((a) => (showStale ? true : isFresh(a)))
      .filter((a) => {
        if (category !== 'All' && a.category !== category) return false;
        if (!search) return true;
        const needle = search.toLowerCase();
        return (
          a.title?.toLowerCase().includes(needle) ||
          a.summary?.toLowerCase().includes(needle)
        );
      })
      .sort((a, b) => pickArticleDate(b).getTime() - pickArticleDate(a).getTime());
  }, [cleaned, showStale, category, search]);

  useEffect(() => {
    setPage(1);
  }, [search, category, showStale]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  // Toasts on refresh outcome
  useEffect(() => {
    if (refreshSuccess && !isRefreshing) {
      toast({ title: 'Feed refreshed', description: 'Fetching the latest articles…' });
    }
  }, [refreshSuccess, isRefreshing, toast]);

  useEffect(() => {
    if (refreshError) {
      toast({
        title: 'Refresh failed',
        description: refreshError,
        variant: 'destructive',
      });
    }
  }, [refreshError, toast]);

  return (
    <div className="-mt-3 sm:-mt-4 md:-mt-6 bg-elec-dark min-h-screen pb-24">
      <Helmet>
        <title>Industry Updates · Elec-Mate</title>
        <meta
          name="description"
          content="Latest regulatory updates, compliance information, and industry developments from leading electrical bodies and professional sources"
        />
      </Helmet>

      <PageMasthead />

      <div className="px-4 py-4 space-y-12 sm:space-y-16 max-w-7xl mx-auto">
        <Hero
          total={cleaned.length}
          freshCount={freshCount}
          lastUpdatedAt={lastUpdatedAt}
          onRefresh={refresh}
          isRefreshing={isRefreshing}
        />

        {/* 01 · BROWSE — search and category chips */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-4"
        >
          <motion.div variants={itemVariants}>
            <Eyebrow>01 · BROWSE</Eyebrow>
          </motion.div>
          <motion.div variants={itemVariants}>
            <SearchAndFilters
              search={search}
              setSearch={setSearch}
              category={category}
              setCategory={setCategory}
            />
          </motion.div>
        </motion.section>

        {/* 02 · ARTICLES */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-4"
        >
          <motion.div variants={itemVariants} className="flex items-end justify-between gap-4">
            <Eyebrow>
              02 · {showStale ? 'ALL ARTICLES' : 'RECENT ARTICLES'}
            </Eyebrow>
            <span className="text-[11px] text-white/55 tabular-nums">
              {filtered.length} {filtered.length === 1 ? 'article' : 'articles'}
            </span>
          </motion.div>

          <motion.div variants={itemVariants}>
            {isLoading ? (
              <Skeleton />
            ) : error ? (
              <EmptyState
                showingAll={showStale}
                onShowAll={() => setShowStale(true)}
                searchActive={!!search}
              />
            ) : filtered.length === 0 ? (
              <EmptyState
                showingAll={showStale}
                onShowAll={() => setShowStale(true)}
                searchActive={!!search || category !== 'All'}
              />
            ) : (
              <ArticlesGrid articles={paginated} />
            )}
          </motion.div>

          {/* Pagination */}
          {totalPages > 1 && (
            <motion.div
              variants={itemVariants}
              className="flex items-center justify-center gap-3 pt-2"
            >
              <button
                type="button"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="text-[12px] uppercase tracking-[0.18em] font-semibold text-white/55 hover:text-white disabled:text-white/15 disabled:cursor-not-allowed transition-colors touch-manipulation"
              >
                ← Previous
              </button>
              <span className="text-[11px] tabular-nums text-white/55">
                Page {page} of {totalPages}
              </span>
              <button
                type="button"
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="text-[12px] uppercase tracking-[0.18em] font-semibold text-white/55 hover:text-white disabled:text-white/15 disabled:cursor-not-allowed transition-colors touch-manipulation"
              >
                Next →
              </button>
            </motion.div>
          )}
        </motion.section>

        {/* Footer note: stale-toggle */}
        {!showStale && filtered.length > 0 && (
          <div className="text-center pt-4">
            <button
              type="button"
              onClick={() => setShowStale(true)}
              className="text-[11px] uppercase tracking-[0.18em] font-semibold text-white/45 hover:text-white transition-colors touch-manipulation"
            >
              Show older than {STALE_DAYS} days →
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default IndustryNews;
