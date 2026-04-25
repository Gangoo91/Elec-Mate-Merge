import { FileText, TrendingUp, MessageSquare, Search, BarChart3, Heart } from 'lucide-react';
import { ModuleCard } from '@/components/apprentice-courses/ModuleCard';
import { SectionShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const subsections = [
  {
    number: '5.1',
    title: 'Accident and incident reporting procedures',
    description:
      'Formal procedures for documenting and reporting workplace accidents and incidents',
    icon: FileText,
    href: '../level3-module1-section5-1',
  },
  {
    number: '5.2',
    title: 'Near-miss reporting and safety culture',
    description: 'Importance of near-miss reporting in developing positive safety culture',
    icon: TrendingUp,
    href: '../level3-module1-section5-2',
  },
  {
    number: '5.3',
    title: 'Toolbox talks and site inductions',
    description: 'Delivering effective safety briefings and comprehensive site inductions',
    icon: MessageSquare,
    href: '../level3-module1-section5-3',
  },
  {
    number: '5.4',
    title: 'Safety audits and inspections',
    description: 'Conducting systematic safety audits and workplace inspections',
    icon: Search,
    href: '../level3-module1-section5-4',
  },
  {
    number: '5.5',
    title: 'Monitoring and continual improvement (HSE guidance, ISO 45001 links)',
    description: 'Performance monitoring and continuous improvement of safety management systems',
    icon: BarChart3,
    href: '../level3-module1-section5-5',
  },
  {
    number: '5.6',
    title: 'Emergency planning and first aid provision',
    description: 'Emergency response planning and workplace first aid requirements',
    icon: Heart,
    href: '../level3-module1-section5-6',
  },
];

const Level3Module1Section5 = () => {
  useSEO(
    'Section 5: Safety Management Systems - Level 3 Module 1',
    'Development and implementation of comprehensive safety management systems'
  );

  return (
    <SectionShell
      backTo="/study-centre/apprentice/level3-module1"
      backLabel="Module 1"
      moduleNumber={1}
      sectionNumber={5}
      title="Safety management systems"
      description="Development and implementation of comprehensive safety management systems."
      tone="blue"
      subsectionsCount={subsections.length}
      prevSectionHref="../level3-module1-section4"
      prevSectionLabel="Hazard identification and control"
      nextSectionHref="../level3-module1-section6"
      nextSectionLabel="Professional responsibilities"
    >
      {subsections.map((s, i) => (
        <ModuleCard
          key={i}
          number={s.number}
          title={s.title}
          description={s.description}
          icon={s.icon}
          href={s.href}
        />
      ))}
    </SectionShell>
  );
};

export default Level3Module1Section5;
