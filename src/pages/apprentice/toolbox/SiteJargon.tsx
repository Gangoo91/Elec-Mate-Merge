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
import { Search, X, GraduationCap } from 'lucide-react';
import { siteJargonTerms, siteJargonCategories } from '@/data/apprentice/siteJargonData';
import { itemVariants } from '@/components/college/primitives';
import {
  Eyebrow,
  GUIDE_CARD,
  GuideFacts,
  GuideIndex,
  GuidePage,
} from '@/components/apprentice/shared/GuideKit';
import JargonTermCard from '@/components/apprentice/site-jargon/JargonTermCard';
import { cn } from '@/lib/utils';

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
    <GuidePage
      section="Apprentice · Language"
      area="Toolbox"
      title="Site jargon & terminology"
      backTo="/apprentice/toolbox"
      description="Every trade has its language. From your first day on site you'll hear 'bang', 'spur', 'first fix', 'second fix' — knowing what they mean keeps you safe, in the conversation, and not looking lost."
    >
      {/* ── Glossary overview ───────────────────────────────────── */}
      <GuideFacts
        items={[
          { label: 'Terms', value: String(siteJargonTerms.length) },
          { label: 'Basic', value: String(basicCount) },
          { label: 'Intermediate', value: String(intermediateCount) },
          { label: 'Advanced', value: String(advancedCount) },
        ]}
      />

      {/* ── Quick search ────────────────────────────────────────── */}
      <motion.div variants={itemVariants}>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white pointer-events-none" />
          <Input
            placeholder="Search any term, definition, or usage…"
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
            <div className={cn(GUIDE_CARD, 'space-y-2 text-center')}>
              <Search className="h-5 w-5 text-white mx-auto" />
              <p className="text-[13px] text-white">No terms found. Try a different search.</p>
            </div>
          )}
        </motion.section>
      ) : (
        <>
          {/* ── Browse by category ──────────────────────────────── */}
          <GuideIndex
            title="Browse by category"
            sub={`${siteJargonCategories.length} categories`}
            columns={2}
            items={siteJargonCategories.map((cat) => ({
              id: cat.id,
              title: cat.name,
              badge: `${categoryCounts[cat.id] || 0} terms`,
              description: cat.description,
              to: `/apprentice/toolbox/site-jargon/${cat.id}`,
            }))}
          />

          {/* ── Study mode ──────────────────────────────────────── */}
          <motion.div variants={itemVariants}>
            <div className={cn(GUIDE_CARD, 'space-y-3')}>
              <div className="flex items-center gap-2">
                <GraduationCap className="h-[18px] w-[18px] text-white" strokeWidth={1.5} />
                <h2 className="text-[17px] font-semibold text-white">Study mode</h2>
              </div>
              <p className="max-w-3xl text-[14.5px] text-white leading-relaxed">
                Test your knowledge with interactive flashcards. Terms are shuffled randomly — see
                the term first, then tap to reveal the definition, context, and usage examples.
              </p>
              <button
                onClick={() => navigate('/apprentice/toolbox/site-jargon/study')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 h-11 rounded-xl bg-elec-yellow px-5 text-[14px] font-semibold text-black hover:opacity-90 active:opacity-80 transition-opacity touch-manipulation"
              >
                <GraduationCap className="h-4 w-4" strokeWidth={1.5} />
                Start flashcards ({siteJargonTerms.length} terms)
              </button>
            </div>
          </motion.div>

          {/* ── Tip ─────────────────────────────────────────────── */}
          <motion.div variants={itemVariants}>
            <div className={GUIDE_CARD}>
              <p className="max-w-3xl text-[14px] text-white leading-relaxed">
                <span className="font-semibold text-elec-yellow">New to site?</span> Start with
                Basic terms in Electrical Terms and Site Language — these are the ones you'll hear
                most on your first day.
              </p>
            </div>
          </motion.div>
        </>
      )}
    </GuidePage>
  );
};

export default SiteJargon;
