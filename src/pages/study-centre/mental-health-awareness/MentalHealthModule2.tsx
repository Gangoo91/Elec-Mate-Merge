import { User, Users, Flame, AlertTriangle } from 'lucide-react';
import { SectionCard } from '@/components/upskilling/cards';
import { ModuleShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const sections = [
  {
    id: 1,
    title: 'Signs and symptoms in yourself',
    icon: User,
    description:
      "Self-awareness, mood changes, physical symptoms, and recognising when you're not okay.",
  },
  {
    id: 2,
    title: 'Spotting changes in others',
    icon: Users,
    description: 'Behavioural changes, withdrawal, performance drops, and what to look for on site.',
  },
  {
    id: 3,
    title: 'Stress, anxiety and burnout',
    icon: Flame,
    description:
      'The difference between stress and burnout, the stages of burnout, and early warning signs.',
  },
  {
    id: 4,
    title: 'Crisis awareness and suicide prevention',
    icon: AlertTriangle,
    description:
      'Warning signs, risk factors, construction suicide statistics, and what to do if someone is in crisis.',
  },
];

export default function MentalHealthModule2() {
  useSEO({
    title: 'Module 2: Recognising the signs | Mental health awareness | Elec-Mate',
    description:
      'Signs and symptoms in yourself and others, stress vs burnout, and crisis awareness.',
  });

  return (
    <ModuleShell
      backTo="../mental-health-awareness"
      backLabel="Mental health awareness"
      moduleNumber={2}
      title="Recognising the signs"
      description="Signs in yourself and others, the difference between stress and burnout, and how to recognise when someone is in crisis."
      tone="purple"
      sectionsCount={sections.length}
      duration="30 mins"
      prevModuleHref="../mental-health-module-1"
      prevModuleLabel="Understanding mental health"
      nextModuleHref="../mental-health-module-3"
      nextModuleLabel="Starting conversations"
    >
      {sections.map((section, index) => (
        <SectionCard
          key={section.id}
          to={`../mental-health-module-2-section-${section.id}`}
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
