import { CalendarDays, Network, Shield, GraduationCap } from 'lucide-react';
import { SectionCard } from '@/components/upskilling/cards';
import { ModuleShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const sections = [
  {
    id: 1,
    title: 'Planning and organising the work',
    icon: CalendarDays,
    description:
      'Programming tasks, managing resources, coordinating timelines and keeping the job on track.',
  },
  {
    id: 2,
    title: 'Managing subcontractors and other trades',
    icon: Network,
    description:
      'Coordinating with other trades, setting expectations and maintaining standards across teams.',
  },
  {
    id: 3,
    title: 'Health, safety and welfare as a leader',
    icon: Shield,
    description:
      'Your legal duties, leading by example, site inductions and creating a positive safety culture.',
  },
  {
    id: 4,
    title: 'Supporting apprentices and new starters',
    icon: GraduationCap,
    description:
      'Mentoring effectively, setting development goals and helping the next generation succeed on site.',
  },
];

export default function LeadershipModule5() {
  useSEO({
    title: 'Module 5: Leading on Site | Leadership on Site | Elec-Mate',
    description:
      'Planning work, managing subcontractors, health and safety leadership and supporting apprentices.',
  });

  return (
    <ModuleShell
      backTo="../leadership-on-site"
      backLabel="Leadership on site"
      moduleNumber={5}
      title="Leading on site"
      description="Planning and organising work, coordinating trades, leading on safety and developing apprentices and new starters."
      tone="purple"
      sectionsCount={sections.length}
      duration="35 mins"
      prevModuleHref="../leadership-module-4"
      prevModuleLabel="Decision-making & problem-solving"
      nextModuleHref="../leadership-module-6"
      nextModuleLabel="Mock exam"
    >
      {sections.map((section, index) => (
        <SectionCard
          key={section.id}
          to={`../leadership-module-5-section-${section.id}`}
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
