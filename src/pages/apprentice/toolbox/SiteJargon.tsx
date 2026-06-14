/**
 * SiteJargon — editorial site-jargon index.
 *
 * Browse by category, quick-search across every term, or jump into the
 * flashcard study mode. Rebuilt on the editorial primitives system to
 * match its sibling pages (no shadcn cards, no per-category colour map).
 */

import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { ArrowLeft, ChevronRight, Search, X, GraduationCap } from 'lucide-react';
import { siteJargonTerms, siteJargonCategories } from '@/data/apprentice/siteJargonData';
import { PageFrame, PageHero, itemVariants } from '@/components/college/primitives';
import { Eyebrow, SectionHeader } from '@/components/apprentice-hub/portfolio/PortfolioPrimitives';
import JargonTermCard from '@/components/apprentice/site-jargon/JargonTermCard';

const categoryEmoji: Record<string, string> = {
  'electrical-terms': '⚡',
  'tools-equipment': '🔧',
  'safety-terms': '🛡',
  'site-language': '💬',
  'regulations-standards': '📋',
  'installation-methods': '🔌',
  'testing-terminology': '🔬',
  'commercial-industrial': '🏭',
};

const SiteJargon = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    siteJargonTerms.forEach((term) => {
      counts[term.category] = (counts[term.category] || 0) + 1;
    });
    return counts;
  }, []);

  const searchResults = useMemo(() => {
    if (!searchTerm) return [];
    const search = searchTerm.toLowerCase();
    return siteJargonTerms.filter((term) => {
      const matchesTerm = term.term.toLowerCase().includes(search);
      const matchesDefinition = term.definition.toLowerCase().includes(search);
      const matchesUsage = term.commonUsage?.toLowerCase().includes(search);
      const matchesRelated = term.relatedTerms?.some((r) => r.toLowerCase().includes(search));
      return matchesTerm || matchesDefinition || matchesUsage || matchesRelated;
    });
  }, [searchTerm]);

  const basicCount = siteJargonTerms.filter((t) => t.difficulty === 'basic').length;
  const intermediateCount = siteJargonTerms.filter((t) => t.difficulty === 'intermediate').length;
  const advancedCount = siteJargonTerms.filter((t) => t.difficulty === 'advanced').length;

  return (
    <PageFrame className="px-4 sm:px-6 lg:px-8">
      <motion.div variants={itemVariants}>
        <button
          onClick={() => navigate('/apprentice/toolbox')}
          className="inline-flex items-center gap-2 h-11 -ml-2 px-2 rounded-md text-[12px] uppercase tracking-[0.18em] text-white/55 hover:text-white/85 transition-colors touch-manipulation"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>
      </motion.div>

      <motion.div variants={itemVariants}>
        <PageHero
          eyebrow="Apprentice · Language"
          title="Site jargon & terminology"
          description="Every trade has its language. From your first day on site you'll hear 'bang', 'spur', 'first fix', 'second fix' — knowing what they mean keeps you safe, in the conversation, and not looking lost."
          tone="yellow"
        />
      </motion.div>

      {/* ── Glossary overview ───────────────────────────────────── */}
      <motion.div variants={itemVariants}>
        <div className="rounded-xl border border-white/[0.06] bg-[hsl(0_0%_10%)] p-4 sm:p-5 space-y-3">
          <div className="flex items-baseline justify-between gap-3 flex-wrap">
            <Eyebrow>Glossary overview</Eyebrow>
            <span className="text-[12px] font-mono tabular-nums text-elec-yellow">
              {siteJargonTerms.length} terms
            </span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {basicCount > 0 && (
              <span className="inline-flex items-center h-7 px-2 rounded-md border border-elec-yellow/30 bg-elec-yellow/[0.06] text-[11px] font-medium text-elec-yellow">
                <span className="font-mono tabular-nums mr-1">{basicCount}</span> basic
              </span>
            )}
            {intermediateCount > 0 && (
              <span className="inline-flex items-center h-7 px-2 rounded-md border border-white/[0.10] bg-white/[0.03] text-[11px] font-medium text-white/85">
                <span className="font-mono tabular-nums mr-1">{intermediateCount}</span>{' '}
                intermediate
              </span>
            )}
            {advancedCount > 0 && (
              <span className="inline-flex items-center h-7 px-2 rounded-md border border-red-500/30 bg-red-500/[0.04] text-[11px] font-medium text-red-300">
                <span className="font-mono tabular-nums mr-1">{advancedCount}</span> advanced
              </span>
            )}
          </div>
        </div>
      </motion.div>

      {/* ── Quick search ────────────────────────────────────────── */}
      <motion.div variants={itemVariants}>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40 pointer-events-none" />
          <Input
            placeholder="Search any term, definition, or usage…"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="h-11 pl-10 pr-10 touch-manipulation bg-[hsl(0_0%_10%)] border border-white/[0.08] text-[13px] focus:border-elec-yellow/40 focus:ring-1 focus:ring-elec-yellow/20 placeholder:text-white/40"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-2 top-1/2 -translate-y-1/2 h-9 w-9 flex items-center justify-center rounded-full active:bg-white/[0.06] touch-manipulation"
              aria-label="Clear search"
            >
              <X className="h-4 w-4 text-white/55" />
            </button>
          )}
        </div>
      </motion.div>

      {/* ── Search results OR category browse ───────────────────── */}
      {searchTerm ? (
        <motion.section variants={itemVariants} className="space-y-3">
          <Eyebrow>
            {searchResults.length} result{searchResults.length !== 1 ? 's' : ''} for “{searchTerm}”
          </Eyebrow>
          {searchResults.length > 0 ? (
            <div className="space-y-2.5">
              {searchResults.map((term, i) => (
                <JargonTermCard key={i} term={term} />
              ))}
            </div>
          ) : (
            <div className="rounded-xl border border-white/[0.06] bg-[hsl(0_0%_10%)] p-6 text-center space-y-2">
              <Search className="h-5 w-5 text-white/40 mx-auto" />
              <p className="text-[13px] text-white/55">No terms found. Try a different search.</p>
            </div>
          )}
        </motion.section>
      ) : (
        <>
          {/* ── Browse by category ──────────────────────────────── */}
          <motion.section variants={itemVariants} className="space-y-3">
            <SectionHeader
              eyebrow="Browse"
              title="Browse by category"
              meta={`${siteJargonCategories.length} categories`}
            />
            <div className="space-y-2.5">
              {siteJargonCategories.map((cat) => {
                const emoji = categoryEmoji[cat.id] || '📘';
                const count = categoryCounts[cat.id] || 0;
                return (
                  <button
                    key={cat.id}
                    onClick={() => navigate(`/apprentice/toolbox/site-jargon/${cat.id}`)}
                    className="w-full text-left rounded-xl border border-white/[0.06] bg-[hsl(0_0%_10%)] p-4 flex items-center gap-3 touch-manipulation active:scale-[0.99] transition-transform"
                  >
                    <span className="text-2xl flex-shrink-0">{emoji}</span>
                    <div className="flex-1 min-w-0 space-y-0.5">
                      <h3 className="text-[15px] font-semibold text-white">{cat.name}</h3>
                      <p className="text-[12px] text-white/55 line-clamp-1">{cat.description}</p>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <span className="text-[12px] font-mono tabular-nums text-elec-yellow">
                        {count}
                      </span>
                      <ChevronRight className="h-4 w-4 text-white/40" />
                    </div>
                  </button>
                );
              })}
            </div>
          </motion.section>

          {/* ── Study mode ──────────────────────────────────────── */}
          <motion.div variants={itemVariants}>
            <div className="rounded-xl border border-elec-yellow/25 bg-elec-yellow/[0.04] p-4 sm:p-5 space-y-3">
              <div className="flex items-center gap-2">
                <GraduationCap className="h-4 w-4 text-elec-yellow" />
                <Eyebrow className="text-elec-yellow/85">Study mode</Eyebrow>
              </div>
              <p className="text-[13px] text-white/85 leading-relaxed">
                Test your knowledge with interactive flashcards. Terms are shuffled randomly — see
                the term first, then tap to reveal the definition, context, and usage examples.
              </p>
              <button
                onClick={() => navigate('/apprentice/toolbox/site-jargon/study')}
                className="w-full inline-flex items-center justify-center gap-2 h-11 rounded-md border border-elec-yellow/30 bg-elec-yellow/[0.06] text-[13px] font-medium text-elec-yellow hover:bg-elec-yellow/[0.10] active:scale-[0.98] transition-all touch-manipulation"
              >
                <GraduationCap className="h-3.5 w-3.5" />
                Start flashcards ({siteJargonTerms.length} terms)
              </button>
            </div>
          </motion.div>

          {/* ── Tip ─────────────────────────────────────────────── */}
          <motion.div variants={itemVariants}>
            <div className="rounded-md border border-elec-yellow/20 bg-elec-yellow/[0.04] p-3">
              <p className="text-[12.5px] text-white/85 leading-relaxed">
                <span className="font-semibold text-elec-yellow">New to site?</span> Start with
                Basic terms in Electrical Terms and Site Language — these are the ones you'll hear
                most on your first day.
              </p>
            </div>
          </motion.div>
        </>
      )}
    </PageFrame>
  );
};

export default SiteJargon;
