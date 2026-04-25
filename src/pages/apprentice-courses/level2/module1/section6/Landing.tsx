import { AlertTriangle, ClipboardList, Heart, Shield, Eye, Crown } from 'lucide-react';
import { ModuleCard } from '@/components/apprentice-courses/ModuleCard';
import { SectionShell } from '@/components/study-centre/shells';

const subsections = [
  {
    number: 'Subsection 1',
    title: 'Types of Workplace Accidents',
    description: 'Understanding common accident types in electrical work environments',
    icon: AlertTriangle,
    href: '6-1',
  },
  {
    number: 'Subsection 2',
    title: 'RIDDOR: What Must Be Reported',
    description: 'Legal requirements for reporting workplace incidents and injuries',
    icon: ClipboardList,
    href: '6-2',
  },
  {
    number: 'Subsection 3',
    title: 'First Aid Requirements on Site',
    description: 'Understanding legal first aid provision and emergency response procedures',
    icon: Heart,
    href: '6-3',
  },
  {
    number: 'Subsection 4',
    title: 'Emergency Procedures and Evacuation Plans',
    description: 'Learning emergency responses and evacuation requirements for electrical sites',
    icon: Shield,
    href: '6-4',
  },
  {
    number: 'Subsection 5',
    title: 'The Importance of Near Miss Reporting',
    description:
      'Understanding how near miss reporting prevents serious incidents and improves workplace safety',
    icon: Eye,
    href: '6-5',
  },
  {
    number: 'Subsection 6',
    title: 'Final Summary and Key Safety Principles',
    description: 'Reinforcing core safety concepts and building lifelong safe working habits',
    icon: Crown,
    href: '6-6',
  },
];

export default function Section6() {
  return (
    <SectionShell
      backTo=".."
      backLabel="Module 1"
      moduleNumber={1}
      sectionNumber={6}
      title="Health and safety incidents"
      description="Understanding workplace accidents and legal reporting requirements."
      tone="emerald"
      subsectionsCount={subsections.length}
      prevSectionHref="../section5"
      prevSectionLabel="Safe isolation procedures"
    >
      {subsections.map((subsection, index) => (
        <ModuleCard
          key={index}
          number={subsection.number}
          title={subsection.title}
          description={subsection.description}
          icon={subsection.icon}
          href={subsection.href}
        />
      ))}
    </SectionShell>
  );
}
