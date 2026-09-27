/**
 * Welsh Level 3 — course landing.
 *
 * Built on `CourseShell`, the same shell every other Study Centre course
 * landing uses. Navigation follows our own conventions rather than the
 * qualification's shape — the handbook's sixteen units are wildly uneven —
 * but the qualification reference is never lost: each module card names the
 * units it draws on, and every lesson carries its unit code and criterion.
 *
 * 🔴 EAL qualification, no EAL mapping or endorsement held. Never describe this
 * course as EAL-approved, EAL-mapped or endorsed.
 */

import { GraduationCap } from 'lucide-react';
import { ModuleCard } from '@/components/upskilling/cards';
import { CourseShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';
import {
  WELSH_L3_BASE,
  WELSH_L3_MODULES,
  WELSH_L3_TAUGHT_GLH,
  WELSH_L3_ASSESSMENT_GLH,
  WELSH_L3_PAGE_COUNT,
  unitsInModule,
} from '@/data/study-centre/welshLevel3Tree';
import {
  welshLevel3MockExamConfig,
  welshLevel3QuestionBank,
} from '@/data/study-centre/welshLevel3MockExamData';
import { moduleIcon } from './welshChrome';

const TITLE = 'Welsh Level 3 Electrotechnical Installation | Elec-Mate';
const DESCRIPTION =
  'Building Services Engineering Level 3 — Electrotechnical Installation. Every assessment criterion of the Welsh qualification, taught in full.';

export default function WelshLevel3() {
  useSEO({ title: TITLE, description: DESCRIPTION, noindex: true });

  return (
    <CourseShell
      backTo="/study-centre/apprentice"
      backLabel="Apprentice courses"
      eyebrow="Welsh Level 3"
      title="Building Services Engineering — Electrotechnical Installation"
      notice={
        /*
         * Deliberately the ordinary card recipe rather than an alert colour.
         * The first version filled it amber, which against the dark ground
         * reads as brown and looks like a warning about something dangerous —
         * the course is fine, it is just still being read back. The volt label
         * carries the signal; the surface stays the same as every other card
         * on the page.
         */
        <div className="flex flex-col gap-1.5 rounded-2xl border border-white/[0.14] bg-gradient-to-b from-white/[0.08] to-white/[0.04] px-4 py-3.5 sm:flex-row sm:items-baseline sm:gap-4 sm:px-5">
          <span className="shrink-0 text-[11px] font-semibold uppercase tracking-[0.16em] text-elec-yellow">
            Still being checked
          </span>
          <p className="max-w-3xl text-[12.5px] leading-relaxed text-white">
            Every page of this course is written. We are reading back through it against BS 7671
            and the qualification, so some wording will still change. If something looks wrong to
            you, tell us — that is exactly what this stage is for.
          </p>
        </div>
      }
      description="The Level 3 qualification taught in Wales. It carries the electrical content England splits across Level 2 and Level 3, and adds a professional-practice core — planning and evaluating work, coordinating a work site, and working in the sector in Wales. Every lesson names the unit and criterion it covers."
      modulesCount={WELSH_L3_MODULES.length + 1}
      pagesCount={WELSH_L3_PAGE_COUNT}
      totalDuration={`${WELSH_L3_TAUGHT_GLH + WELSH_L3_ASSESSMENT_GLH} GLH`}
      level="Level 3"
    >
      {WELSH_L3_MODULES.map((module, index) => {
        const lessons = module.sections.reduce((n, s) => n + s.lessons.length, 0);
        const units = unitsInModule(module);
        return (
          <ModuleCard
            key={module.slug}
            to={`${WELSH_L3_BASE}/${module.slug}`}
            label="Module"
            moduleNumber={String(module.number)}
            duration={`${lessons} lessons`}
            title={module.title}
            description={`${module.sections.length} sections · Units ${units.join(', ')}`}
            icon={moduleIcon(module)}
            index={index}
          />
        );
      })}
      {/*
        Module 9 is the final paper. It sits in the same grid as the teaching
        modules because that is where a learner looks for it, and it is counted
        in modulesCount because CourseShell's KPI reads "Including final".
      */}
      <ModuleCard
        to={`${WELSH_L3_BASE}/mock-exam`}
        label="Module"
        moduleNumber="9"
        duration="90 mins"
        title="Final paper"
        description={`${welshLevel3MockExamConfig.totalQuestions} questions drawn from a bank of ${welshLevel3QuestionBank.length}, balanced across all eight modules`}
        icon={GraduationCap}
        index={WELSH_L3_MODULES.length}
        isExam
      />
    </CourseShell>
  );
}
