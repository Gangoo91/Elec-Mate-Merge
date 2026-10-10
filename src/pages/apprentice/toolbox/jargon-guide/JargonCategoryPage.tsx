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
import { Search, X } from 'lucide-react';
import { siteJargonTerms, siteJargonCategories } from '@/data/apprentice/siteJargonData';
import { itemVariants } from '@/components/college/primitives';
import { HubSubPage } from '@/components/hub/HubSubPage';
import { CollegeHeading } from '@/components/college/ui/CollegeUi';
import { P_SEG_GROUP, pSeg } from '@/components/apprentice-hub/portfolio2/ui';
import {
  Eyebrow,
  GUIDE_CARD,
  GuideFacts,
  GuidePage,
} from '@/components/apprentice/shared/GuideKit';
import JargonTermCard from '@/components/apprentice/site-jargon/JargonTermCard';
import { cn } from '@/lib/utils';

const JargonCategoryPage = () => {
  const navigate = useNavigate();
  const { categoryId } = useParams<{ categoryId: string }>();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');

  const category = siteJargonCategories.find((c) => c.id === categoryId);

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
      <HubSubPage
        section="Jargon"
        title="Category not found"
        backTo="/apprentice/toolbox/site-jargon"
        description="This jargon category doesn't exist."
      >
        <div />
      </HubSubPage>
    );
  }

  return (
    <GuidePage
      section={`Apprentice · ${category.name}`}
      area="Site jargon"
      title={category.name}
      backTo="/apprentice/toolbox/site-jargon"
      description={category.description}
    >
      {/* ── Stats ───────────────────────────────────────────────── */}
      <GuideFacts
        items={[
          { label: 'Terms', value: String(allCategoryTerms.length) },
          { label: 'Basic', value: String(basicCount) },
          { label: 'Intermediate', value: String(intermediateCount) },
          { label: 'Advanced', value: String(advancedCount) },
        ]}
      />

      {/* ── Search ──────────────────────────────────────────────── */}
      <motion.div variants={itemVariants}>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white pointer-events-none" />
          <Input
            placeholder={`Search ${category.name.toLowerCase()}…`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="h-11 rounded-xl border border-white/[0.12] bg-white/[0.06] pl-10 pr-10 text-base text-white placeholder:text-white/40 caret-elec-yellow focus:border-elec-yellow focus:outline-none focus:ring-0 touch-manipulation"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-0 top-1/2 -translate-y-1/2 h-11 w-11 flex items-center justify-center rounded-full active:bg-white/[0.06] touch-manipulation"
              aria-label="Clear search"
            >
              <X className="h-4 w-4 text-white" />
            </button>
          )}
        </div>
      </motion.div>

      {/* ── Difficulty filters ──────────────────────────────────── */}
      <motion.div
        variants={itemVariants}
        className={P_SEG_GROUP}
        role="group"
        aria-label="Difficulty"
      >
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
              aria-pressed={isActive}
              className={cn(pSeg(isActive), 'max-sm:px-1.5 max-sm:text-[12.5px]')}
            >
              <span>{labelMap[level]}</span>
              <span className="tabular-nums max-sm:hidden">{count}</span>
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
        <CollegeHeading>{`${filteredTerms.length} on screen`}</CollegeHeading>
        {filteredTerms.length > 0 ? (
          <div className="space-y-2.5 lg:grid lg:grid-cols-2 lg:items-start lg:gap-3 lg:space-y-0">
            {filteredTerms.map((term, i) => (
              <JargonTermCard key={i} term={term} />
            ))}
          </div>
        ) : (
          <div className={cn(GUIDE_CARD, 'space-y-2 text-center')}>
            <Search className="h-5 w-5 text-white mx-auto" />
            <p className="text-[13px] text-white">
              No terms match your filters. Try adjusting your search.
            </p>
          </div>
        )}
      </motion.section>
    </GuidePage>
  );
};

export default JargonCategoryPage;
