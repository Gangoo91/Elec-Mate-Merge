/**
 * JargonCategoryPage — editorial site-jargon category browser.
 *
 * Lists all terms in a category, filterable by difficulty and searchable.
 * Drops the per-category multi-colour map for the editorial pattern.
 */

import { useState, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Search, X } from 'lucide-react';
import { siteJargonTerms, siteJargonCategories } from '@/data/apprentice/siteJargonData';
import {
  PageFrame,
  PageHero,
  itemVariants,
} from '@/components/college/primitives';
import {
  Eyebrow,
  SectionHeader,
} from '@/components/apprentice-hub/portfolio/PortfolioPrimitives';
import JargonTermCard from '@/components/apprentice/site-jargon/JargonTermCard';
import { cn } from '@/lib/utils';

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

const JargonCategoryPage = () => {
  const navigate = useNavigate();
  const { categoryId } = useParams<{ categoryId: string }>();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');

  const category = siteJargonCategories.find((c) => c.id === categoryId);
  const emoji = categoryEmoji[categoryId || ''] || '📘';

  const allCategoryTerms = useMemo(() => {
    return siteJargonTerms.filter((term) => term.category === categoryId);
  }, [categoryId]);

  const filteredTerms = useMemo(() => {
    return allCategoryTerms.filter((term) => {
      if (searchTerm) {
        const search = searchTerm.toLowerCase();
        const matchesTerm = term.term.toLowerCase().includes(search);
        const matchesDefinition = term.definition.toLowerCase().includes(search);
        const matchesUsage = term.commonUsage?.toLowerCase().includes(search);
        const matchesRelated = term.relatedTerms?.some((r) => r.toLowerCase().includes(search));
        if (!matchesTerm && !matchesDefinition && !matchesUsage && !matchesRelated) {
          return false;
        }
      }
      if (selectedDifficulty !== 'all' && term.difficulty !== selectedDifficulty) return false;
      return true;
    });
  }, [allCategoryTerms, searchTerm, selectedDifficulty]);

  const basicCount = allCategoryTerms.filter((t) => t.difficulty === 'basic').length;
  const intermediateCount = allCategoryTerms.filter((t) => t.difficulty === 'intermediate').length;
  const advancedCount = allCategoryTerms.filter((t) => t.difficulty === 'advanced').length;

  if (!category) {
    return (
      <PageFrame className="px-4 sm:px-6 lg:px-8">
        <motion.div variants={itemVariants}>
          <button
            onClick={() => navigate('/apprentice/toolbox/site-jargon')}
            className="inline-flex items-center gap-2 h-11 -ml-2 px-2 rounded-md text-[12px] uppercase tracking-[0.18em] text-white/55 hover:text-white/85 transition-colors touch-manipulation"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </button>
        </motion.div>
        <motion.div variants={itemVariants}>
          <PageHero
            eyebrow="Apprentice · Jargon"
            title="Category not found"
            description="This jargon category doesn't exist."
            tone="yellow"
          />
        </motion.div>
      </PageFrame>
    );
  }

  return (
    <PageFrame className="px-4 sm:px-6 lg:px-8">
      <motion.div variants={itemVariants}>
        <button
          onClick={() => navigate('/apprentice/toolbox/site-jargon')}
          className="inline-flex items-center gap-2 h-11 -ml-2 px-2 rounded-md text-[12px] uppercase tracking-[0.18em] text-white/55 hover:text-white/85 transition-colors touch-manipulation"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>
      </motion.div>

      <motion.div variants={itemVariants}>
        <PageHero
          eyebrow={`Apprentice · ${category.name}`}
          title={`${emoji} ${category.name}`}
          description={category.description}
          tone="yellow"
        />
      </motion.div>

      {/* ── Stats ───────────────────────────────────────────────── */}
      <motion.div variants={itemVariants}>
        <div className="rounded-xl border border-white/[0.06] bg-[hsl(0_0%_10%)] p-4 sm:p-5 space-y-3">
          <div className="flex items-baseline justify-between gap-3 flex-wrap">
            <Eyebrow>Category overview</Eyebrow>
            <span className="text-[12px] font-mono tabular-nums text-elec-yellow">
              {allCategoryTerms.length} terms
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
                <span className="font-mono tabular-nums mr-1">{intermediateCount}</span> intermediate
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

      {/* ── Search ──────────────────────────────────────────────── */}
      <motion.div variants={itemVariants}>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40 pointer-events-none" />
          <Input
            placeholder={`Search ${category.name.toLowerCase()}…`}
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

      {/* ── Difficulty filters ──────────────────────────────────── */}
      <motion.div variants={itemVariants} className="flex gap-1.5 flex-wrap">
        {(['all', 'basic', 'intermediate', 'advanced'] as const).map((level) => {
          const isActive = selectedDifficulty === level;
          const count =
            level === 'all'
              ? allCategoryTerms.length
              : level === 'basic'
                ? basicCount
                : level === 'intermediate'
                  ? intermediateCount
                  : advancedCount;
          if (level !== 'all' && count === 0) return null;
          const labelMap: Record<string, string> = {
            all: 'All',
            basic: 'Basic',
            intermediate: 'Intermediate',
            advanced: 'Advanced',
          };
          return (
            <button
              key={level}
              onClick={() => setSelectedDifficulty(level)}
              className={cn(
                'inline-flex items-center gap-1.5 h-8 px-3 rounded-md border text-[11.5px] font-medium touch-manipulation active:scale-[0.98] transition-all',
                isActive
                  ? 'border-elec-yellow/30 bg-elec-yellow/[0.06] text-elec-yellow'
                  : 'border-white/[0.08] bg-white/[0.02] text-white/85 hover:bg-white/[0.04]'
              )}
            >
              <span>{labelMap[level]}</span>
              <span className="font-mono tabular-nums text-[10.5px] opacity-70">
                {count}
              </span>
            </button>
          );
        })}
      </motion.div>

      {/* ── Results count ───────────────────────────────────────── */}
      {(searchTerm || selectedDifficulty !== 'all') && (
        <motion.div variants={itemVariants}>
          <Eyebrow>
            Showing {filteredTerms.length} of {allCategoryTerms.length} terms
          </Eyebrow>
        </motion.div>
      )}

      {/* ── Terms ───────────────────────────────────────────────── */}
      <motion.section variants={itemVariants} className="space-y-3">
        <SectionHeader eyebrow="Terms" title={`${filteredTerms.length} on screen`} />
        {filteredTerms.length > 0 ? (
          <div className="space-y-2.5">
            {filteredTerms.map((term, i) => (
              <JargonTermCard key={i} term={term} />
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-white/[0.06] bg-[hsl(0_0%_10%)] p-6 text-center space-y-2">
            <Search className="h-5 w-5 text-white/40 mx-auto" />
            <p className="text-[13px] text-white/55">
              No terms match your filters. Try adjusting your search.
            </p>
          </div>
        )}
      </motion.section>
    </PageFrame>
  );
};

export default JargonCategoryPage;
