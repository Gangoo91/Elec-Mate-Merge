/**
 * Welsh Level 3 — unit landing. One route serves all sixteen units; the unit is
 * the `:unitSlug` param, read out of the course tree.
 *
 * Sections are the unit's learning outcomes, in the handbook's own numbering.
 * The handbook's performance outcomes are not listed — they are signed off at
 * work through the practical project, so the page says that and moves on.
 */

import { useNavigate, useParams, Navigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, BookOpen } from 'lucide-react';
import { cn } from '@/lib/utils';
import { HubPage, HubBody, HubMasthead, HubSectionHeading } from '@/components/hub/HubPrimitives';
import { SectionCard } from '@/components/upskilling/cards';
import { CARD_BASE, CARD_NEUTRAL } from '@/components/ui/card-recipe';
import useSEO from '@/hooks/useSEO';
import { WELSH_L3_BASE, WELSH_L3_UNITS, findUnit } from '@/data/study-centre/welshLevel3';
import { EVIDENCED_AT_WORK, unitKindLabel } from './welshChrome';

export default function WelshUnitPage() {
  const { unitSlug } = useParams<{ unitSlug: string }>();
  const unit = findUnit(unitSlug);
  const navigate = useNavigate();

  useSEO({
    title: unit ? `Unit ${unit.code} ${unit.title} | Welsh Level 3 | Elec-Mate` : 'Welsh Level 3',
    description: unit?.title,
    noindex: true,
  });

  if (!unit) return <Navigate to={WELSH_L3_BASE} replace />;

  const index = WELSH_L3_UNITS.findIndex((u) => u.slug === unit.slug);
  const prev = index > 0 ? WELSH_L3_UNITS[index - 1] : undefined;
  const next = index < WELSH_L3_UNITS.length - 1 ? WELSH_L3_UNITS[index + 1] : undefined;
  const pages = unit.sections.reduce((n, s) => n + s.subsections.length, 0);

  return (
    <HubPage>
      <HubMasthead
        section={`Unit ${unit.code} · ${unit.glh} GLH`}
        title={unit.title}
        backTo={WELSH_L3_BASE}
      />
      <HubBody>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-white">
          <span>{unitKindLabel(unit.kind)}</span>
          {pages > 0 && (
            <>
              <span aria-hidden="true">·</span>
              <span>
                {pages} {pages === 1 ? 'page' : 'pages'}
              </span>
            </>
          )}
        </div>

        {/* Only where there is also something to study — on a unit that is
            wholly evidenced at work the line below says it once, and better. */}
        {unit.evidencedAtWork && unit.sections.length > 0 && (
          <p className="max-w-3xl text-[13px] leading-relaxed text-white">{EVIDENCED_AT_WORK}</p>
        )}

        {unit.sections.length > 0 ? (
          <div className="space-y-3">
            <div className="flex items-center justify-between gap-3 px-0.5">
              <HubSectionHeading>Learning outcomes</HubSectionHeading>
              <span className="text-[11px] text-white">{unit.sections.length} total</span>
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {unit.sections.map((section, index) => (
                <SectionCard
                  key={section.slug}
                  to={`${WELSH_L3_BASE}/${unit.slug}/${section.slug}`}
                  label="Outcome"
                  sectionNumber={section.outcome}
                  title={section.title}
                  description={`${section.subsections.length} ${
                    section.subsections.length === 1 ? 'criterion' : 'criteria'
                  }`}
                  icon={BookOpen}
                  index={index}
                />
              ))}
            </div>
          </div>
        ) : (
          <p className="max-w-3xl text-[13px] leading-relaxed text-white">
            There is nothing to study for this unit. Your employer confirms it from the work you do.
          </p>
        )}

        {(prev || next) && (
          <div className="grid grid-cols-2 gap-3 pt-2">
            {prev ? (
              <button
                type="button"
                onClick={() => navigate(`${WELSH_L3_BASE}/${prev.slug}`)}
                className={cn(
                  CARD_BASE,
                  CARD_NEUTRAL,
                  'p-4 text-left touch-manipulation lg:hover:-translate-y-0.5'
                )}
              >
                <div className="flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.14em] text-white">
                  <ChevronLeft className="h-3 w-3" /> Previous unit
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-white">
                  Unit {prev.code}
                </div>
              </button>
            ) : (
              <div />
            )}
            {next ? (
              <button
                type="button"
                onClick={() => navigate(`${WELSH_L3_BASE}/${next.slug}`)}
                className={cn(
                  CARD_BASE,
                  CARD_NEUTRAL,
                  'p-4 text-right touch-manipulation lg:hover:-translate-y-0.5'
                )}
              >
                <div className="flex items-center justify-end gap-2 text-[10px] font-medium uppercase tracking-[0.14em] text-white">
                  Next unit <ChevronRight className="h-3 w-3" />
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-white">
                  Unit {next.code}
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
