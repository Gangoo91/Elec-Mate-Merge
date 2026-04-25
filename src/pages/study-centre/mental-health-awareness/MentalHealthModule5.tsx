import { Users, Scale, Building2, Target } from 'lucide-react';
import { SectionCard } from '@/components/upskilling/cards';
import { ModuleShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const sections = [
  {
    id: 1,
    title: 'Leadership and mental health culture',
    icon: Users,
    description:
      'The role of supervisors, psychological safety, and creating a culture where people talk.',
  },
  {
    id: 2,
    title: 'Legal framework and workplace policies',
    icon: Scale,
    description:
      'Equality Act 2010, Health and Safety at Work Act, HSE stress management standards, and employer duties.',
  },
  {
    id: 3,
    title: 'Industry initiatives — Mates in Mind and beyond',
    icon: Building2,
    description:
      'Mates in Mind, Lighthouse Club, Building Mental Health, and how to get your site involved.',
  },
  {
    id: 4,
    title: 'Your personal wellbeing action plan',
    icon: Target,
    description:
      'Building your own plan, resilience strategies, daily habits, and committing to ongoing learning.',
  },
];

export default function MentalHealthModule5() {
  useSEO({
    title: 'Module 5: Creating a mentally healthy workplace | Mental health awareness | Elec-Mate',
    description:
      'Leadership and culture, legal framework, industry initiatives, and your personal wellbeing plan.',
  });

  return (
    <ModuleShell
      backTo="../mental-health-awareness"
      backLabel="Mental health awareness"
      moduleNumber={5}
      title="Creating a mentally healthy workplace"
      description="How leaders shape mental health culture, what the law says, industry initiatives making a difference, and building your own wellbeing plan."
      tone="purple"
      sectionsCount={sections.length}
      duration="30 mins"
      prevModuleHref="../mental-health-module-4"
      prevModuleLabel="Supporting others"
      nextModuleHref="../mental-health-module-6"
      nextModuleLabel="Mock exam"
    >
      {sections.map((section, index) => (
        <SectionCard
          key={section.id}
          to={`../mental-health-module-5-section-${section.id}`}
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
