import { MessageCircle, FileText, Users, AlertTriangle, Presentation } from 'lucide-react';
import { ModuleCard } from '@/components/apprentice-courses/ModuleCard';
import { SectionShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const subsections = [
  {
    number: '3.1',
    title: 'Effective communication with clients and colleagues',
    description:
      'Developing clear and professional communication skills for workplace interactions',
    icon: MessageCircle,
    href: '../level3-module7-section3-1',
  },
  {
    number: '3.2',
    title: 'Technical reporting and documentation skills',
    description: 'Creating clear technical reports and maintaining professional documentation',
    icon: FileText,
    href: '../level3-module7-section3-2',
  },
  {
    number: '3.3',
    title: 'Working with other trades and coordination on site',
    description: 'Collaborative working practices and effective coordination with other trades',
    icon: Users,
    href: '../level3-module7-section3-3',
  },
  {
    number: '3.4',
    title: 'Conflict resolution and problem-solving',
    description: 'Techniques for resolving conflicts and solving problems in the workplace',
    icon: AlertTriangle,
    href: '../level3-module7-section3-4',
  },
  {
    number: '3.5',
    title: 'Presentation of technical information',
    description: 'Skills for presenting technical information clearly to different audiences',
    icon: Presentation,
    href: '../level3-module7-section3-5',
  },
];

const Level3Module7Section3 = () => {
  useSEO(
    'Section 3: Communication and Teamworking - Level 3 Module 7',
    'Effective communication skills and collaborative working practices'
  );

  return (
    <SectionShell
      backTo="/study-centre/apprentice/level3-module7"
      backLabel="Module 7"
      moduleNumber={7}
      sectionNumber={3}
      title="Communication and teamworking"
      description="Effective communication skills and collaborative working practices."
      tone="blue"
      subsectionsCount={subsections.length}
      prevSectionHref="../level3-module7-section2"
      prevSectionLabel="Professional standards and responsibilities"
      nextSectionHref="../level3-module7-section4"
      nextSectionLabel="Continuing professional development"
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

export default Level3Module7Section3;
