import { HandHeart, GitBranch, Rocket, MessageSquare } from 'lucide-react';
import { SectionCard } from '@/components/upskilling/cards';
import { ModuleShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const sections = [
  {
    id: 1,
    title: 'Building trust and earning respect',
    icon: HandHeart,
    description:
      'Why trust is the foundation of leadership, how to earn it on site, and what destroys it.',
  },
  {
    id: 2,
    title: 'Delegating effectively',
    icon: GitBranch,
    description:
      'Matching tasks to people, setting clear expectations and letting go without losing control.',
  },
  {
    id: 3,
    title: 'Motivating your team',
    icon: Rocket,
    description:
      'What drives people at work, recognising effort and keeping morale high on difficult jobs.',
  },
  {
    id: 4,
    title: 'Giving feedback that sticks',
    icon: MessageSquare,
    description:
      'Constructive feedback techniques, the SBI model and having praise land as well as criticism.',
  },
];

export default function LeadershipModule2() {
  useSEO({
    title: 'Module 2: Leading Your Team | Leadership on Site | Elec-Mate',
    description:
      'Building trust, delegating effectively, motivating your team and giving feedback that sticks.',
  });

  return (
    <ModuleShell
      backTo="../leadership-on-site"
      backLabel="Leadership on site"
      moduleNumber={2}
      title="Leading your team"
      description="Building trust, delegating work, keeping your team motivated and giving feedback that actually makes a difference."
      tone="purple"
      sectionsCount={sections.length}
      duration="35 mins"
      prevModuleHref="../leadership-module-1"
      prevModuleLabel="What makes a leader?"
      nextModuleHref="../leadership-module-3"
      nextModuleLabel="Communication for leaders"
    >
      {sections.map((section, index) => (
        <SectionCard
          key={section.id}
          to={`../leadership-module-2-section-${section.id}`}
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
