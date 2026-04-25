import { HeartPulse, Activity, ClipboardList, GraduationCap } from 'lucide-react';
import { SectionCard } from '@/components/upskilling/cards';
import { ModuleShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const sections = [
  {
    id: 1,
    title: 'Musculoskeletal disorders',
    icon: HeartPulse,
    description:
      'Types of MSDs, symptoms, early reporting, treatment and return-to-work programmes.',
  },
  {
    id: 2,
    title: 'Fitness, fatigue & personal factors',
    icon: Activity,
    description:
      'Physical fitness, age considerations, pregnancy, medication and fatigue management.',
  },
  {
    id: 3,
    title: 'Incident reporting & investigation',
    icon: ClipboardList,
    description:
      'RIDDOR requirements for manual handling injuries, the investigation process and corrective actions.',
  },
  {
    id: 4,
    title: 'Roles, responsibilities & training',
    icon: GraduationCap,
    description:
      'Employer and employee duties, competent person, training requirements and refresher schedules.',
  },
];

export default function ManualHandlingModule5() {
  useSEO({
    title: 'Module 5: Health, Welfare & Responsibilities | Manual Handling | Elec-Mate',
    description:
      'Musculoskeletal disorders, fitness and fatigue, RIDDOR reporting and employer/employee roles and training.',
  });

  return (
    <ModuleShell
      backTo="../manual-handling-course"
      backLabel="Manual handling"
      moduleNumber={5}
      title="Health, welfare & responsibilities"
      description="Musculoskeletal disorders, fitness and fatigue, RIDDOR reporting and employer/employee roles and training requirements."
      tone="emerald"
      sectionsCount={sections.length}
      duration="30 mins"
      prevModuleHref="../manual-handling-module-4"
      prevModuleLabel="Workplace-specific handling"
      nextModuleHref="../manual-handling-module-6"
      nextModuleLabel="Mock exam"
    >
      {sections.map((section, index) => (
        <SectionCard
          key={section.id}
          to={`../manual-handling-module-5-section-${section.id}`}
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
