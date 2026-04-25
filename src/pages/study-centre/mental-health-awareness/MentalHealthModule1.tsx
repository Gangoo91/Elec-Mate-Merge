import { Activity, BookOpen, HardHat, Megaphone } from 'lucide-react';
import { SectionCard } from '@/components/upskilling/cards';
import { ModuleShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const sections = [
  {
    id: 1,
    title: 'What is mental health?',
    icon: Activity,
    description:
      'The mental health continuum, mental health vs mental illness, and why everyone has mental health.',
  },
  {
    id: 2,
    title: 'Common mental health conditions',
    icon: BookOpen,
    description:
      'Depression, anxiety, PTSD, and substance misuse — what they look like and how they affect work.',
  },
  {
    id: 3,
    title: 'Risk factors in construction',
    icon: HardHat,
    description:
      'Long hours, job insecurity, physical demands, and why construction has the highest suicide rate of any industry.',
  },
  {
    id: 4,
    title: 'Breaking the stigma',
    icon: Megaphone,
    description:
      "Why tradespeople don't talk, masculinity and mental health, and how to change the culture on site.",
  },
];

export default function MentalHealthModule1() {
  useSEO({
    title: 'Module 1: Understanding mental health | Mental health awareness | Elec-Mate',
    description:
      'What mental health means, common conditions, risk factors in construction, and breaking the stigma.',
  });

  return (
    <ModuleShell
      backTo="../mental-health-awareness"
      backLabel="Mental health awareness"
      moduleNumber={1}
      title="Understanding mental health"
      description="What mental health really means, common conditions in the trades, risk factors unique to construction, and breaking down the stigma."
      tone="purple"
      sectionsCount={sections.length}
      duration="30 mins"
      nextModuleHref="../mental-health-module-2"
      nextModuleLabel="Recognising the signs"
    >
      {sections.map((section, index) => (
        <SectionCard
          key={section.id}
          to={`../mental-health-module-1-section-${section.id}`}
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
