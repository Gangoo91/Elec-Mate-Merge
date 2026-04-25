import { Heart, BookOpen, FileText, Handshake } from 'lucide-react';
import { ModuleCard } from '@/components/apprentice-courses/ModuleCard';
import { SectionShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const subsections = [
  {
    number: '2.1',
    title: 'Duty of care and professional ethics',
    description:
      'Understanding professional responsibilities and ethical obligations in electrical work',
    icon: Heart,
    href: '../level3-module7-section2-1',
  },
  {
    number: '2.2',
    title: 'Codes of practice and BS 7671 compliance',
    description: 'Adhering to industry codes of practice and maintaining regulatory compliance',
    icon: BookOpen,
    href: '../level3-module7-section2-2',
  },
  {
    number: '2.3',
    title: 'Importance of accurate documentation and record-keeping',
    description: 'Maintaining proper documentation and records for professional accountability',
    icon: FileText,
    href: '../level3-module7-section2-3',
  },
  {
    number: '2.4',
    title: 'Professional behaviour on site and client relations',
    description:
      'Maintaining professional standards in workplace behaviour and client interactions',
    icon: Handshake,
    href: '../level3-module7-section2-4',
  },
];

const Level3Module7Section2 = () => {
  useSEO(
    'Section 2: Professional Standards and Responsibilities - Level 3 Module 7',
    'Professional ethics, standards and responsibilities in electrical work'
  );

  return (
    <SectionShell
      backTo="/study-centre/apprentice/level3-module7"
      backLabel="Module 7"
      moduleNumber={7}
      sectionNumber={2}
      title="Professional standards and responsibilities"
      description="Professional ethics, standards and responsibilities in electrical work."
      tone="blue"
      subsectionsCount={subsections.length}
      prevSectionHref="../level3-module7-section1"
      prevSectionLabel="The electrical industry and career pathways"
      nextSectionHref="../level3-module7-section3"
      nextSectionLabel="Communication and teamworking"
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

export default Level3Module7Section2;
