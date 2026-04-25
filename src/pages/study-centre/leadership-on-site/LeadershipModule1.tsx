import { Compass, Palette, Eye, ArrowUpRight } from 'lucide-react';
import { SectionCard } from '@/components/upskilling/cards';
import { ModuleShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const sections = [
  {
    id: 1,
    title: 'Leadership vs management',
    icon: Compass,
    description:
      'The key differences between leading and managing, why both matter on site, and where you fit in.',
  },
  {
    id: 2,
    title: 'Leadership styles — finding your approach',
    icon: Palette,
    description:
      'Autocratic, democratic, laissez-faire and situational styles — when to use each on site.',
  },
  {
    id: 3,
    title: 'Self-awareness and knowing your strengths',
    icon: Eye,
    description:
      'Understanding your natural tendencies, recognising blind spots and building on what you do well.',
  },
  {
    id: 4,
    title: 'The mate-to-manager transition',
    icon: ArrowUpRight,
    description:
      'Navigating the shift from working alongside your mates to being responsible for them.',
  },
];

export default function LeadershipModule1() {
  useSEO({
    title: 'Module 1: What Makes a Leader? | Leadership on Site | Elec-Mate',
    description:
      'Leadership vs management, leadership styles, self-awareness and the mate-to-manager transition.',
  });

  return (
    <ModuleShell
      backTo="../leadership-on-site"
      backLabel="Leadership on site"
      moduleNumber={1}
      title="What makes a leader?"
      description="Leadership vs management, finding your style, knowing your strengths and making the transition from mate to manager."
      tone="purple"
      sectionsCount={sections.length}
      duration="35 mins"
      nextModuleHref="../leadership-module-2"
      nextModuleLabel="Leading your team"
    >
      {sections.map((section, index) => (
        <SectionCard
          key={section.id}
          to={`../leadership-module-1-section-${section.id}`}
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
