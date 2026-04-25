import { Zap, Cog, RotateCw, Battery, Play } from 'lucide-react';
import { ModuleCard } from '@/components/apprentice-courses/ModuleCard';
import { SectionShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const subsections = [
    {
      number: '2.3.1',
      title: 'Transformers: principles and applications',
      description: 'Transformer operation, types and practical applications',
      icon: Zap,
      href: '/study-centre/apprentice/m-o-e-t-module2-section3-1',
    },
    {
      number: '2.3.2',
      title: 'Induction motors (single & three-phase)',
      description: 'Induction motor principles, construction and characteristics',
      icon: Cog,
      href: '/study-centre/apprentice/m-o-e-t-module2-section3-2',
    },
    {
      number: '2.3.3',
      title: 'Synchronous motors and generators',
      description: 'Synchronous machine operation and applications',
      icon: RotateCw,
      href: '/study-centre/apprentice/m-o-e-t-module2-section3-3',
    },
    {
      number: '2.3.4',
      title: 'DC motors and their control',
      description: 'DC motor types, characteristics and control methods',
      icon: Battery,
      href: '/study-centre/apprentice/m-o-e-t-module2-section3-4',
    },
    {
      number: '2.3.5',
      title: 'Motor starting methods',
      description: 'Various motor starting techniques and protection',
      icon: Play,
      href: '/study-centre/apprentice/m-o-e-t-module2-section3-5',
    },
  ];


const MOETModule2Section3 = () => {
  useSEO(
    'Electrical Machines - MOET Module 2',
    'Transformers, induction motors, synchronous machines and motor starting'
  );

  return (
    <SectionShell
      backTo="/study-centre/apprentice/m-o-e-t-module2"
      backLabel="Module 2"
      moduleNumber={2}
      sectionNumber={3}
      title="Electrical machines"
      description="Transformers, induction motors, synchronous machines and motor starting."
      tone="orange"
      subsectionsCount={subsections.length}
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
};

export default MOETModule2Section3;
