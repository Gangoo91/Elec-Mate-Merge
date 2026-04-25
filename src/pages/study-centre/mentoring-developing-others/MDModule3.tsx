import { Building2, FileText, ClipboardList, Heart } from 'lucide-react';
import { SectionCard } from '@/components/upskilling/cards';
import { ModuleShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const sections = [
  {
    id: 1,
    title: 'The JIB apprenticeship framework',
    icon: Building2,
    description:
      'JIB 4-stage structure, ECS grade progression, three-way relationship, AM2 assessment, off-the-job training requirements.',
  },
  {
    id: 2,
    title: 'NVQ evidence & portfolio building',
    icon: FileText,
    description:
      'Evidence types, SMART evidence criteria, generating opportunities, common portfolio mistakes, writing witness testimony.',
  },
  {
    id: 3,
    title: 'Planning learning opportunities on site',
    icon: ClipboardList,
    description:
      'Identifying opportunities within normal work, matching tasks to NVQ units, training needs analysis, balancing productivity.',
  },
  {
    id: 4,
    title: 'Managing apprentice wellbeing & pastoral care',
    icon: Heart,
    description:
      'Recognising stress and mental health difficulties, pastoral care boundaries, signposting support, dealing with bullying.',
  },
];

export default function MDModule3() {
  useSEO({
    title: 'Module 3: Supporting apprentices | Mentoring & developing others | Elec-Mate',
    description:
      'JIB apprenticeship framework, NVQ evidence and portfolio building, planning learning on site, and managing apprentice wellbeing.',
  });

  return (
    <ModuleShell
      backTo="../mentoring-developing-others"
      backLabel="Mentoring & developing others"
      moduleNumber={3}
      title="Supporting apprentices"
      description="Practical guidance for mentoring apprentices through the JIB framework — evidence building, learning planning, and pastoral care on site."
      tone="indigo"
      sectionsCount={sections.length}
      duration="40 mins"
      prevModuleHref="../md-module-2"
      prevModuleLabel="The mentor's toolkit"
      nextModuleHref="../md-module-4"
      nextModuleLabel="Assessment & evaluation"
    >
      {sections.map((section, index) => (
        <SectionCard
          key={section.id}
          to={`../md-module-3-section-${section.id}`}
          sectionNumber={section.id}
          title={section.title}
          description={section.description}
          icon={section.icon}
          index={index}
        />
      ))}
    </ModuleShell>
  );
}
