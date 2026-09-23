/**
 * Welsh Level 3 — the lesson page.
 *
 * One route serves every page in the course; the unit, outcome and criterion
 * come from the URL. Until a page has its teaching written, it shows the
 * criterion it will cover and says so plainly — a learner should never tap into
 * a page that looks finished and is not.
 *
 * Content goes in per criterion, replacing the placeholder body below. The
 * route, the breadcrumb, the prev/next chain and the progress record all work
 * from the day the scaffold lands, so writing a page is only writing.
 */

import { Suspense } from 'react';
import { useNavigate, useParams, Navigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { HubPage, HubBody, HubMasthead } from '@/components/hub/HubPrimitives';
import { CARD_BASE, CARD_NEUTRAL } from '@/components/ui/card-recipe';
import useSEO from '@/hooks/useSEO';
import { CourseSkeleton } from '@/components/ui/page-skeleton';
import { lessonContent } from './content/registry';
import {
  WELSH_L3_BASE,
  findSection,
  findSubsection,
  findUnit,
  neighbours,
} from '@/data/study-centre/welshLevel3';

export default function WelshLessonPage() {
  const { unitSlug, sectionSlug, subSlug } = useParams<{
    unitSlug: string;
    sectionSlug: string;
    subSlug: string;
  }>();
  const navigate = useNavigate();

  const unit = findUnit(unitSlug);
  const section = findSection(unit, sectionSlug);
  const sub = findSubsection(section, subSlug);

  useSEO({
    title: sub ? `${sub.title} | Unit ${unit?.code} | Welsh Level 3 | Elec-Mate` : 'Welsh Level 3',
    description: sub?.title,
    noindex: true,
  });

  if (!unit) return <Navigate to={WELSH_L3_BASE} replace />;
  if (!section) return <Navigate to={`${WELSH_L3_BASE}/${unit.slug}`} replace />;
  if (!sub) return <Navigate to={`${WELSH_L3_BASE}/${unit.slug}/${section.slug}`} replace />;

  const { prev, next } = neighbours(unit.slug, section.slug, sub.slug);
  const Content = lessonContent(unit.slug, section.slug, sub.slug);

  return (
    <HubPage ground="reading">
      <HubMasthead
        section={`Unit ${unit.code} · ${sub.code}`}
        title={sub.title}
        backTo={`${WELSH_L3_BASE}/${unit.slug}/${section.slug}`}
      />
      <HubBody>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-white">
          <span>{unit.title}</span>
          <span aria-hidden="true">·</span>
          <span>Outcome {section.outcome}</span>
        </div>

        {Content ? (
          <Suspense fallback={<CourseSkeleton />}>
            <Content />
          </Suspense>
        ) : (
          <section
            className={cn(
              CARD_BASE,
              CARD_NEUTRAL,
              '-mx-4 rounded-none border-x-0 p-4 sm:mx-0 sm:rounded-2xl sm:border-x sm:p-5'
            )}
          >
            <h2 className="text-[13px] font-semibold text-white">What this page covers</h2>
            <p className="mt-2 max-w-3xl text-[13px] leading-relaxed text-white">{sub.title}</p>

            <div className="mt-4 border-t border-white/[0.1] pt-4">
              <h3 className="text-[13px] font-semibold text-white">Teaching on its way</h3>
              <p className="mt-2 max-w-3xl text-[13px] leading-relaxed text-white">
                This page is being written. The unit, outcome and criterion above are the
                qualification’s own, so what lands here will cover exactly this.
              </p>
            </div>
          </section>
        )}

        <div className="grid grid-cols-2 gap-3 pt-2">
          {prev ? (
            <button
              type="button"
              onClick={() => navigate(prev.href)}
              className={cn(
                CARD_BASE,
                CARD_NEUTRAL,
                'p-4 text-left touch-manipulation lg:hover:-translate-y-0.5'
              )}
            >
              <div className="flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.14em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 truncate text-[14px] font-semibold text-white">{prev.title}</div>
            </button>
          ) : (
            <div />
          )}
          {next ? (
            <button
              type="button"
              onClick={() => navigate(next.href)}
              className={cn(
                CARD_BASE,
                CARD_NEUTRAL,
                'p-4 text-right touch-manipulation lg:hover:-translate-y-0.5'
              )}
            >
              <div className="flex items-center justify-end gap-2 text-[10px] font-medium uppercase tracking-[0.14em] text-white">
                Next <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 truncate text-[14px] font-semibold text-white">{next.title}</div>
            </button>
          ) : (
            <div />
          )}
        </div>
      </HubBody>
    </HubPage>
  );
}
