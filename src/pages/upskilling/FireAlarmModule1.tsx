import { CheckCircle } from 'lucide-react';
import { SectionCard } from '@/components/upskilling/cards';
import { ModuleShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const sections = [
  { id: 1, title: 'L category systems (life safety)', icon: CheckCircle, description: 'L1-L5 categories for life protection.' },
  { id: 2, title: 'P category systems (property)', icon: CheckCircle, description: 'P1 and P2 for property protection.' },
  { id: 3, title: 'M category systems (manual)', icon: CheckCircle, description: 'Manual-only systems and call points.' },
  { id: 4, title: 'Category selection and risk assessment', icon: CheckCircle, description: 'Choosing based on building use and risk.' },
];

export default function FireAlarmModule1() {
  useSEO({
    title: 'Module 1: Categories of Fire Alarm Systems | Fire Alarm | Elec-Mate',
    description: 'L, P and M categories under BS 5839-1, their applications and how to select the right category for any building.',
  });

  return (
    <ModuleShell
      backTo="../../fire-alarm-course"
      backLabel="Fire alarm systems"
      moduleNumber={1}
      title="Categories of fire alarm systems"
      description="Understanding L, P and M categories under BS 5839-1 and selecting the right system for the application."
      tone="red"
      sectionsCount={sections.length}
      duration="2-3 hours"
      nextModuleHref="../module-2"
      nextModuleLabel="Detectors, call points and devices"
    >
      {sections.map((section, index) => (
        <SectionCard
          key={section.id}
          to={`section-${section.id}`}
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
