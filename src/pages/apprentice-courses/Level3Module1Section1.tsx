import { Scale, Zap, FileWarning, Shield, Wrench, Mountain, Users } from 'lucide-react';
import { ModuleCard } from '@/components/apprentice-courses/ModuleCard';
import { SectionShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const subsections = [
  {
    number: '1.1',
    title: 'Health and Safety at Work Act (HASAWA) 1974',
    description: 'Foundation legislation for workplace health and safety requirements',
    icon: Scale,
    href: '../level3-module1-section1-1',
  },
  {
    number: '1.2',
    title: 'Electricity at Work Regulations (EAWR) 1989',
    description: 'Specific regulations governing electrical work safety and compliance',
    icon: Zap,
    href: '../level3-module1-section1-2',
  },
  {
    number: '1.3',
    title: 'RIDDOR (reporting of injuries, diseases and dangerous occurrences regulations)',
    description: 'Mandatory reporting requirements for workplace incidents and accidents',
    icon: FileWarning,
    href: '../level3-module1-section1-3',
  },
  {
    number: '1.4',
    title: 'COSHH (control of substances hazardous to health)',
    description: 'Regulations for managing and controlling hazardous substances in the workplace',
    icon: Shield,
    href: '../level3-module1-section1-4',
  },
  {
    number: '1.5',
    title: 'PUWER and LOLER (equipment and lifting regs)',
    description: 'Equipment safety regulations and lifting operations requirements',
    icon: Wrench,
    href: '../level3-module1-section1-5',
  },
  {
    number: '1.6',
    title: 'Working at Height Regulations',
    description: 'Legal requirements for safe working at height and fall prevention',
    icon: Mountain,
    href: '../level3-module1-section1-6',
  },
  {
    number: '1.7',
    title: 'Employer vs employee responsibilities under law',
    description: 'Legal duties and responsibilities of employers and employees in workplace safety',
    icon: Users,
    href: '../level3-module1-section1-7',
  },
];

const Level3Module1Section1 = () => {
  useSEO(
    'Section 1: Legislation and Regulations - Level 3 Module 1',
    'Key legislation, regulations and standards governing electrical work and building services'
  );

  return (
    <SectionShell
      backTo="/study-centre/apprentice/level3-module1"
      backLabel="Module 1"
      moduleNumber={1}
      sectionNumber={1}
      title="Legislation and regulations"
      description="Key legislation, regulations and standards governing electrical work and building services."
      tone="blue"
      subsectionsCount={subsections.length}
      nextSectionHref="../level3-module1-section2"
      nextSectionLabel="Risk assessment and method statements"
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

export default Level3Module1Section1;
