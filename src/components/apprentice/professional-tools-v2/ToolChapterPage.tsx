import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LC_TILE } from '@/components/apprentice-hub/college-hub/learnerUi';
import { GuideFacts, GuidePage } from '@/components/apprentice/shared/GuideKit';
import { itemVariants } from '@/components/college/primitives';
import {
  TOOLS_GUIDE_BASE,
  TOOL_CHAPTERS,
  chapterHref,
  findChapter,
} from '@/data/professional-tools/chapters';
import { CHAPTER_STATS } from '@/data/professional-tools/chapterStats';

interface ToolChapterPageProps {
  slug: string;
  children: React.ReactNode;
}

/**
 * Shell for one Tool Guide chapter.
 *
 * Each chapter is its own route rather than a panel revealed under the hub
 * cards. The card used to toggle a panel *below the grid*, which on a phone
 * put the content off-screen with only a border colour as feedback — "people
 * will think nothing's happened". A route change cannot be missed: the URL
 * moves, the page moves, and Back does the obvious thing.
 *
 * It also matches how `electrical-installation-guides` in this same hub is
 * already built (hub + commercial/industrial/domestic/specialist), so the two
 * biggest reference sets in the Apprentice Hub now behave the same way.
 *
 * The prev/next pair at the foot exists because the old single page let you
 * read straight through. Losing that was the one genuine cost of splitting, so
 * it is given back explicitly rather than left to the back button.
 */
const ToolChapterPage = ({ slug, children }: ToolChapterPageProps) => {
  const chapter = findChapter(slug);
  const index = TOOL_CHAPTERS.findIndex((c) => c.slug === slug);
  const prev = index > 0 ? TOOL_CHAPTERS[index - 1] : null;
  const next = index >= 0 && index < TOOL_CHAPTERS.length - 1 ? TOOL_CHAPTERS[index + 1] : null;

  if (!chapter) return null;

  const stats = CHAPTER_STATS[slug];

  return (
    <GuidePage
      area="Tool guide"
      title={chapter.label}
      backTo={TOOLS_GUIDE_BASE}
      description={chapter.blurb}
    >
      {/* Counted from the arrays this page renders — a chapter cannot advertise
          a total it does not go on to show. */}
      {stats && <GuideFacts items={stats.map((s) => ({ label: s.label, value: s.value }))} />}

      <motion.div variants={itemVariants} className="space-y-4 sm:space-y-5">
        {children}
      </motion.div>

      <motion.nav
        variants={itemVariants}
        aria-label="Chapter navigation"
        className="grid grid-cols-1 gap-3 sm:grid-cols-2"
      >
        {prev ? (
          <Link
            to={chapterHref(prev.slug)}
            className={cn(LC_TILE, 'min-h-[72px] px-4 py-3.5 sm:p-5')}
          >
            <span className="text-[13px] font-semibold text-white">Previous · {prev.number}</span>
            <span className="mt-1.5 flex items-center gap-1.5 text-[15px] font-semibold tracking-tight text-white">
              <ArrowRight aria-hidden className="h-4 w-4 rotate-180 text-elec-yellow" />
              {prev.label}
            </span>
          </Link>
        ) : (
          <span aria-hidden className="hidden sm:block" />
        )}

        {next && (
          <Link
            to={chapterHref(next.slug)}
            className={cn(LC_TILE, 'min-h-[72px] px-4 py-3.5 text-right sm:col-start-2 sm:p-5')}
          >
            <span className="text-[13px] font-semibold text-white">Next · {next.number}</span>
            <span className="mt-1.5 flex items-center justify-end gap-1.5 text-[15px] font-semibold tracking-tight text-white">
              {next.label}
              <ArrowRight aria-hidden className="h-4 w-4 text-elec-yellow" />
            </span>
          </Link>
        )}
      </motion.nav>
    </GuidePage>
  );
};

export default ToolChapterPage;
