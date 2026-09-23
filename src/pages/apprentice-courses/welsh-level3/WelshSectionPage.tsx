/**
 * Welsh Level 3 — section landing. Lists the assessment criteria taught under
 * one learning outcome.
 */

import { useNavigate, useParams, Navigate } from 'react-router-dom';
import { ChevronRight, ChevronLeft, FileText } from 'lucide-react';
import { cn } from '@/lib/utils';
import { HubPage, HubBody, HubMasthead, HubSectionHeading } from '@/components/hub/HubPrimitives';
import { ModuleCard } from '@/components/apprentice-courses/ModuleCard';
import { CARD_BASE, CARD_NEUTRAL } from '@/components/ui/card-recipe';
import useSEO from '@/hooks/useSEO';
import { WELSH_L3_BASE, findSection, findUnit } from '@/data/study-centre/welshLevel3';

export default function WelshSectionPage() {
  const { unitSlug, sectionSlug } = useParams<{ unitSlug: string; sectionSlug: string }>();
  const unit = findUnit(unitSlug);
  const section = findSection(unit, sectionSlug);
  const navigate = useNavigate();

  useSEO({
    title: section
      ? `${section.title} | Unit ${unit?.code} | Welsh Level 3 | Elec-Mate`
      : 'Welsh Level 3',
    description: section?.title,
    noindex: true,
  });

  if (!unit) return <Navigate to={WELSH_L3_BASE} replace />;
  if (!section) return <Navigate to={`${WELSH_L3_BASE}/${unit.slug}`} replace />;

  const index = unit.sections.findIndex((s) => s.slug === section.slug);
  const prev = index > 0 ? unit.sections[index - 1] : undefined;
  const next = index < unit.sections.length - 1 ? unit.sections[index + 1] : undefined;

  return (
    <HubPage>
      <HubMasthead
        section={`Unit ${unit.code} · Outcome ${section.outcome}`}
        title={section.title}
        backTo={`${WELSH_L3_BASE}/${unit.slug}`}
      />
      <HubBody>
        <div className="space-y-3">
          <div className="flex items-center justify-between gap-3 px-0.5">
            <HubSectionHeading>Criteria</HubSectionHeading>
            <span className="text-[11px] text-white">{section.subsections.length} total</span>
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {section.subsections.map((sub) => (
              <ModuleCard
                key={sub.slug}
                number={`Criterion ${sub.code}`}
                title={sub.title}
                // The criterion is the whole of what this card has to say. A
                // second line here would only repeat the outcome the learner is
                // already inside; the card renders nothing for an empty string.
                description=""
                icon={FileText}
                href={`${WELSH_L3_BASE}/${unit.slug}/${section.slug}/${sub.slug}`}
              />
            ))}
          </div>
        </div>

        {(prev || next) && (
          <div className="grid grid-cols-2 gap-3 pt-2">
            {prev ? (
              <button
                type="button"
                onClick={() => navigate(`${WELSH_L3_BASE}/${unit.slug}/${prev.slug}`)}
                className={cn(
                  CARD_BASE,
                  CARD_NEUTRAL,
                  'p-4 text-left touch-manipulation lg:hover:-translate-y-0.5'
                )}
              >
                <div className="flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.14em] text-white">
                  <ChevronLeft className="h-3 w-3" /> Previous
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-white">
                  Outcome {prev.outcome}
                </div>
              </button>
            ) : (
              <div />
            )}
            {next ? (
              <button
                type="button"
                onClick={() => navigate(`${WELSH_L3_BASE}/${unit.slug}/${next.slug}`)}
                className={cn(
                  CARD_BASE,
                  CARD_NEUTRAL,
                  'p-4 text-right touch-manipulation lg:hover:-translate-y-0.5'
                )}
              >
                <div className="flex items-center justify-end gap-2 text-[10px] font-medium uppercase tracking-[0.14em] text-white">
                  Next <ChevronRight className="h-3 w-3" />
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-white">
                  Outcome {next.outcome}
                </div>
              </button>
            ) : (
              <div />
            )}
          </div>
        )}
      </HubBody>
    </HubPage>
  );
}
