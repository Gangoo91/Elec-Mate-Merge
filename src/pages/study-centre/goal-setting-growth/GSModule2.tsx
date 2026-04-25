import { Focus, Calendar, Award, Map } from 'lucide-react';
import { SectionCard } from '@/components/upskilling/cards';
import { ModuleShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const sections = [
  {
    id: 1,
    title: 'The SMART framework for trade careers',
    icon: Focus,
    description:
      'Specific, Measurable, Achievable, Relevant, Time-bound goals for apprentices, qualified electricians and business owners.',
  },
  {
    id: 2,
    title: 'Short, medium & long-term goal planning',
    icon: Calendar,
    description:
      'Three horizons framework, goal cascading, the planning fallacy, seasonal planning and review cycles.',
  },
  {
    id: 3,
    title: 'Career goals for electricians',
    icon: Award,
    description:
      'JIB pathway, ECS cards, City & Guilds qualifications, professional registration, competent person schemes and specialisation paths.',
  },
  {
    id: 4,
    title: 'Creating your personal goal map',
    icon: Map,
    description:
      'Personal mission statement, wheel of life, goal prioritisation, 5-step goal writing and commitment devices.',
  },
];

export default function GSModule2() {
  useSEO({
    title: 'Module 2: Setting effective goals | Goal Setting & Growth',
    description:
      'SMART framework for trade careers, short/medium/long-term goal planning, career goals for electricians and creating your personal goal map.',
  });

  return (
    <ModuleShell
      backTo="../goal-setting-growth"
      backLabel="Goal setting & continuous growth"
      moduleNumber={2}
      title="Setting effective goals"
      description="The SMART framework, short/medium/long-term planning, career pathways for electricians and building your personal goal map."
      tone="purple"
      sectionsCount={sections.length}
      duration="40 mins"
      prevModuleHref="../gs-module-1"
      prevModuleLabel="Understanding goals & growth mindset"
      nextModuleHref="../gs-module-3"
      nextModuleLabel="Building habits that stick"
    >
      {sections.map((section, index) => (
        <SectionCard
          key={section.id}
          to={`../gs-module-2-section-${section.id}`}
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
