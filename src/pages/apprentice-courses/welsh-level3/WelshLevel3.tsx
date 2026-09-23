/**
 * Welsh Level 3 — course landing.
 *
 * Lists the qualification's own units, in the handbook's own order, under the
 * learner's own unit codes. That is the whole point of this course: a learner
 * in Wales should never have to translate a City & Guilds unit number into
 * theirs to find the page they were sent to.
 *
 * 🔴 EAL qualification, no EAL mapping or endorsement held. Never describe this
 * course as EAL-approved, EAL-mapped or endorsed.
 */

import {
  HubPage,
  HubBody,
  HubMasthead,
  HubSectionHeading,
  HubKpi,
  HubKpiRow,
} from '@/components/hub/HubPrimitives';
import { ModuleCard } from '@/components/upskilling/cards';
import useSEO from '@/hooks/useSEO';
import {
  WELSH_L3_BASE,
  WELSH_L3_UNITS,
  WELSH_L3_TAUGHT_GLH,
  WELSH_L3_ASSESSMENT_GLH,
  WELSH_L3_PAGE_COUNT,
} from '@/data/study-centre/welshLevel3';
import { unitIcon, unitSummary } from './welshChrome';

const TITLE = 'Welsh Level 3 Electrotechnical Installation | Elec-Mate';
const DESCRIPTION =
  'Building Services Engineering Level 3 — Electrotechnical Installation. Every unit, learning outcome and assessment criterion of the Welsh qualification, under its own unit codes.';

export default function WelshLevel3() {
  useSEO({ title: TITLE, description: DESCRIPTION, noindex: true });

  return (
    <HubPage>
      <HubMasthead
        section="Welsh Level 3"
        title="Building Services Engineering — Electrotechnical Installation"
        backTo="/study-centre/apprentice"
      />
      <HubBody>
        <p className="max-w-3xl text-[13px] leading-relaxed text-white">
          The Level 3 qualification taught in Wales. It carries the electrical content England
          splits across Level 2 and Level 3, and adds a professional-practice core — planning and
          evaluating work, coordinating a work site, and working in the sector in Wales — that the
          English route has no equivalent of. Units, outcomes and criteria are the qualification's
          own.
        </p>

        <HubKpiRow>
          <HubKpi label="Units" value={String(WELSH_L3_UNITS.length)} context="Handbook order" />
          <HubKpi label="Pages" value={String(WELSH_L3_PAGE_COUNT)} context="Reading material" />
          <HubKpi label="Taught" value={`${WELSH_L3_TAUGHT_GLH} GLH`} context="Across the units" />
          <HubKpi
            label="Total"
            value={`${WELSH_L3_TAUGHT_GLH + WELSH_L3_ASSESSMENT_GLH} GLH`}
            context={`Plus ${WELSH_L3_ASSESSMENT_GLH} assessment`}
          />
        </HubKpiRow>

        <section className="space-y-3">
          <div className="flex items-center justify-between gap-3 px-0.5">
            <HubSectionHeading>Units</HubSectionHeading>
            <span className="text-[11px] text-white">{WELSH_L3_UNITS.length} total</span>
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {WELSH_L3_UNITS.map((unit, index) => (
              <ModuleCard
                key={unit.code}
                to={`${WELSH_L3_BASE}/${unit.slug}`}
                label="Unit"
                moduleNumber={unit.code}
                duration={`${unit.glh} GLH`}
                title={unit.title}
                description={unitSummary(unit)}
                icon={unitIcon(unit)}
                index={index}
              />
            ))}
          </div>
        </section>

        <p className="max-w-3xl text-[11px] leading-relaxed text-white">
          Assessed by externally-set multiple-choice tests, a Safety Critical Test, an employer-set
          practical project and an externally-marked professional discussion.
        </p>
      </HubBody>
    </HubPage>
  );
}
