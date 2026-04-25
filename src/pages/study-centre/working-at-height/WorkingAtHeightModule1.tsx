import { BookOpen, Scale, Search, Shield } from 'lucide-react';
import { SectionCard } from '@/components/upskilling/cards';
import { ModuleShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const sections = [
  {
    id: 1,
    title: 'What is working at height?',
    icon: BookOpen,
    description:
      'WAH Regulations 2005 definition, common scenarios, fatal fall statistics and what counts as working at height.',
  },
  {
    id: 2,
    title: 'The legal framework',
    icon: Scale,
    description:
      'WAH Regs 2005, HASAWA 1974, CDM 2015, LOLER 1998, PUWER 1998 and employer/employee duties.',
  },
  {
    id: 3,
    title: 'Risk assessment for working at height',
    icon: Search,
    description:
      'Five-step risk assessment process, site-specific factors, dynamic risk assessment and weather considerations.',
  },
  {
    id: 4,
    title: 'The hierarchy of controls',
    icon: Shield,
    description:
      'Avoid, prevent, mitigate — collective vs personal protection and the control hierarchy.',
  },
];

export default function WorkingAtHeightModule1() {
  useSEO({
    title: 'Module 1: Understanding Working at Height | Working at Height | Elec-Mate',
    description:
      'WAH Regulations 2005 definition, the legal framework, risk assessment and the hierarchy of controls for working at height.',
  });

  return (
    <ModuleShell
      backTo="../working-at-height-course"
      backLabel="Working at height"
      moduleNumber={1}
      title="Understanding working at height"
      description="The regulations, legal duties, risk assessment process and hierarchy of controls for safe working at height."
      tone="amber"
      sectionsCount={sections.length}
      duration="30 mins"
      nextModuleHref="../working-at-height-module-2"
      nextModuleLabel="Access equipment & selection"
    >
      {sections.map((section, index) => (
        <SectionCard
          key={section.id}
          to={`../working-at-height-module-1-section-${section.id}`}
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
