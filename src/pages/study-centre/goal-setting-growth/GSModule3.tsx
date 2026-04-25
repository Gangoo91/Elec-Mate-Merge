import { Zap, HardHat, XCircle, Layers } from 'lucide-react';
import { SectionCard } from '@/components/upskilling/cards';
import { ModuleShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const sections = [
  {
    id: 1,
    title: 'The science of habit formation',
    icon: Zap,
    description:
      'Habit loop, 66-day research, Fogg Behavior Model, the 4 Laws of Behavior Change, the compound effect and willpower limits.',
  },
  {
    id: 2,
    title: 'Building professional habits on site',
    icon: HardHat,
    description:
      'Morning routines, tool management, safety habits, admin discipline, CPD habits and health on site.',
  },
  {
    id: 3,
    title: 'Breaking bad habits & overcoming resistance',
    icon: XCircle,
    description:
      'Inverting the 4 Laws, common trade bad habits, the resistance cycle, temptation bundling and dealing with relapse.',
  },
  {
    id: 4,
    title: 'Habit stacking & environment design',
    icon: Layers,
    description:
      'Habit stacking formula, complete trade day stack, environment design, the 20-second rule, visual cues and keystone habits.',
  },
];

export default function GSModule3() {
  useSEO({
    title: 'Module 3: Building habits that stick | Goal Setting & Growth',
    description:
      'The science of habit formation, building professional habits on site, breaking bad habits, habit stacking and environment design.',
  });

  return (
    <ModuleShell
      backTo="../goal-setting-growth"
      backLabel="Goal setting & continuous growth"
      moduleNumber={3}
      title="Building habits that stick"
      description="The science of habit formation, professional habits for electricians, breaking bad patterns and designing your environment for success."
      tone="purple"
      sectionsCount={sections.length}
      duration="40 mins"
      prevModuleHref="../gs-module-2"
      prevModuleLabel="Setting effective goals"
      nextModuleHref="../gs-module-4"
      nextModuleLabel="Tracking progress & continuous improvement"
    >
      {sections.map((section, index) => (
        <SectionCard
          key={section.id}
          to={`../gs-module-3-section-${section.id}`}
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
