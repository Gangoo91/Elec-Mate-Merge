/**
 * Welsh Level 3 — section landing. Lists the lessons in one section.
 *
 * Built on `SectionShell`, the same shell every English section landing uses,
 * so this course sits inside the existing design language rather than beside
 * it. Each card names the qualification unit and criterion the lesson covers,
 * so a learner can find the page they were sent to by its handbook reference.
 */

import { useParams, Navigate } from 'react-router-dom';
import { FileText } from 'lucide-react';
import { ModuleCard } from '@/components/apprentice-courses/ModuleCard';
import { SectionShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';
import { WELSH_L3_BASE, findModule, findSection } from '@/data/study-centre/welshLevel3Tree';

export default function WelshSectionPage() {
  const { moduleSlug, sectionSlug } = useParams<{ moduleSlug: string; sectionSlug: string }>();
  const module = findModule(moduleSlug);
  const section = findSection(module, sectionSlug);

  useSEO({
    title: section ? `${section.title} | Welsh Level 3 | Elec-Mate` : 'Welsh Level 3',
    description: section?.title,
    noindex: true,
  });

  if (!module) return <Navigate to={WELSH_L3_BASE} replace />;
  if (!section) return <Navigate to={`${WELSH_L3_BASE}/${module.slug}`} replace />;

  const i = module.sections.findIndex((s) => s.slug === section.slug);
  const prev = i > 0 ? module.sections[i - 1] : undefined;
  const next = i < module.sections.length - 1 ? module.sections[i + 1] : undefined;

  return (
    <SectionShell
      backTo={`${WELSH_L3_BASE}/${module.slug}`}
      backLabel={`Module ${module.number}`}
      moduleNumber={module.number}
      sectionNumber={section.number}
      title={section.title}
      description={module.title}
      subsectionsCount={section.lessons.length}
      prevSectionHref={prev ? `${WELSH_L3_BASE}/${module.slug}/${prev.slug}` : undefined}
      prevSectionLabel={prev?.title}
      nextSectionHref={next ? `${WELSH_L3_BASE}/${module.slug}/${next.slug}` : undefined}
      nextSectionLabel={next?.title}
    >
      {section.lessons.map((lesson) => (
        <ModuleCard
          key={lesson.slug}
          number={`Unit ${lesson.unit} · ${lesson.criterion}`}
          title={lesson.title}
          description={lesson.summary ?? ''}
          icon={FileText}
          href={`${WELSH_L3_BASE}/${module.slug}/${section.slug}/${lesson.slug}`}
        />
      ))}
    </SectionShell>
  );
}
