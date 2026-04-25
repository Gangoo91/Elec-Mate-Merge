import { Gauge, Wrench, Swords, Scale } from 'lucide-react';
import { SectionCard } from '@/components/upskilling/cards';
import { ModuleShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const sections = [
  {
    id: 1,
    title: 'Making decisions under pressure',
    icon: Gauge,
    description:
      'Frameworks for quick thinking, balancing speed with accuracy and owning your calls on site.',
  },
  {
    id: 2,
    title: 'Problem-solving on site',
    icon: Wrench,
    description:
      'Root cause analysis, the 5 Whys, systematic troubleshooting and thinking beyond the obvious fix.',
  },
  {
    id: 3,
    title: 'Managing conflict',
    icon: Swords,
    description:
      'De-escalation techniques, mediating between team members and turning disagreements into progress.',
  },
  {
    id: 4,
    title: 'Taking responsibility and accountability',
    icon: Scale,
    description:
      'Owning mistakes, holding others accountable fairly and building a culture of responsibility.',
  },
];

export default function LeadershipModule4() {
  useSEO({
    title: 'Module 4: Decision-Making & Problem-Solving | Leadership on Site | Elec-Mate',
    description:
      'Making decisions under pressure, problem-solving on site, managing conflict and taking responsibility.',
  });

  return (
    <ModuleShell
      backTo="../leadership-on-site"
      backLabel="Leadership on site"
      moduleNumber={4}
      title="Decision-making & problem-solving"
      description="Making calls under pressure, systematic problem-solving, managing conflict and owning your responsibilities."
      tone="purple"
      sectionsCount={sections.length}
      duration="35 mins"
      prevModuleHref="../leadership-module-3"
      prevModuleLabel="Communication for leaders"
      nextModuleHref="../leadership-module-5"
      nextModuleLabel="Leading on site"
    >
      {sections.map((section, index) => (
        <SectionCard
          key={section.id}
          to={`../leadership-module-4-section-${section.id}`}
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
