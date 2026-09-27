/**
 * Welsh Level 3 — module landing. Lists the sections inside one module.
 *
 * Built on `ModuleShell`, the same shell every English module landing uses.
 * The module grouping is ours rather than the qualification's, so the page
 * names the units it draws on — a learner should always be able to tie what
 * they are reading back to what they are assessed on.
 */

import { useParams, Navigate } from 'react-router-dom';
import { BookOpen } from 'lucide-react';
import { SectionCard } from '@/components/upskilling/cards';
import { ModuleShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';
import {
  WELSH_L3_BASE,
  WELSH_L3_MODULES,
  findModule,
  unitsInModule,
} from '@/data/study-centre/welshLevel3Tree';

export default function WelshUnitPage() {
  const { moduleSlug } = useParams<{ moduleSlug: string }>();
  const module = findModule(moduleSlug);

  useSEO({
    title: module
      ? `${module.title} | Module ${module.number} | Welsh Level 3 | Elec-Mate`
      : 'Welsh Level 3',
    description: module?.title,
    noindex: true,
  });

  if (!module) return <Navigate to={WELSH_L3_BASE} replace />;

  const i = WELSH_L3_MODULES.findIndex((m) => m.slug === module.slug);
  const prev = i > 0 ? WELSH_L3_MODULES[i - 1] : undefined;
  const next = i < WELSH_L3_MODULES.length - 1 ? WELSH_L3_MODULES[i + 1] : undefined;
  // After the last teaching module the next step is Module 9, the final
  // paper. It is not in WELSH_L3_MODULES — it has no sections and no
  // criteria — so the link is added here rather than faked into the tree.
  const nextHref = next ? `${WELSH_L3_BASE}/${next.slug}` : `${WELSH_L3_BASE}/mock-exam`;
  const nextLabel = next ? next.title : 'Final paper';
  const lessons = module.sections.reduce((n, s) => n + s.lessons.length, 0);
  const units = unitsInModule(module);

  return (
    <ModuleShell
      backTo={WELSH_L3_BASE}
      backLabel="Welsh Level 3"
      moduleNumber={module.number}
      title={module.title}
      description={`${lessons} lessons · qualification units ${units.join(', ')}`}
      sectionsCount={module.sections.length}
      prevModuleHref={prev ? `${WELSH_L3_BASE}/${prev.slug}` : undefined}
      prevModuleLabel={prev?.title}
      nextModuleHref={nextHref}
      nextModuleLabel={nextLabel}
    >
      {module.sections.map((section, index) => (
        <SectionCard
          key={section.slug}
          to={`${WELSH_L3_BASE}/${module.slug}/${section.slug}`}
          label="Section"
          sectionNumber={String(section.number)}
          title={section.title}
          description={`${section.lessons.length} ${
            section.lessons.length === 1 ? 'lesson' : 'lessons'
          }`}
          icon={BookOpen}
          index={index}
        />
      ))}
    </ModuleShell>
  );
}
