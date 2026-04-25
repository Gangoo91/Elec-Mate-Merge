import { BookOpen, Calendar, Monitor, ClipboardList, Zap } from 'lucide-react';
import { ModuleCard } from '@/components/apprentice-courses/ModuleCard';
import { SectionShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const subsections = [
  {
    number: '4.1',
    title: 'Importance of lifelong learning in the trade',
    description: 'Understanding the value of continuous learning and skill development',
    icon: BookOpen,
    href: '../level3-module7-section4-1',
  },
  {
    number: '4.2',
    title: 'Attending courses and seminars (e.g. 18th Edition updates)',
    description: 'Participating in formal training courses and industry seminars',
    icon: Calendar,
    href: '../level3-module7-section4-2',
  },
  {
    number: '4.3',
    title: 'Online learning platforms and digital resources',
    description: 'Utilising digital learning platforms and online resources for skill development',
    icon: Monitor,
    href: '../level3-module7-section4-3',
  },
  {
    number: '4.4',
    title: 'Recording and tracking CPD',
    description: 'Methods for documenting and tracking continuing professional development',
    icon: ClipboardList,
    href: '../level3-module7-section4-4',
  },
  {
    number: '4.5',
    title: 'Future-proofing skills (green tech, automation, smart systems)',
    description: 'Developing skills in emerging technologies and future industry trends',
    icon: Zap,
    href: '../level3-module7-section4-5',
  },
];

const Level3Module7Section4 = () => {
  useSEO(
    'Section 4: Continuing Professional Development (CPD) - Level 3 Module 7',
    'Lifelong learning, skills development and staying current with industry changes'
  );

  return (
    <SectionShell
      backTo="/study-centre/apprentice/level3-module7"
      backLabel="Module 7"
      moduleNumber={7}
      sectionNumber={4}
      title="Continuing professional development"
      description="Lifelong learning, skills development and staying current with industry changes."
      tone="blue"
      subsectionsCount={subsections.length}
      prevSectionHref="../level3-module7-section3"
      prevSectionLabel="Communication and teamworking"
      nextSectionHref="../level3-module7-section5"
      nextSectionLabel="Employment and business awareness"
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

export default Level3Module7Section4;
