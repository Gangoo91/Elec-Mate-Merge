import { Zap, Wrench, Shield, AlertTriangle, Activity } from 'lucide-react';
import { ModuleCard } from '@/components/apprentice-courses/ModuleCard';
import { SectionShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const subsections = [
    {
      number: '1.2.1',
      title: 'Dangers of electricity',
      description: 'Understanding shock, arc flash, burns, fire and electrical hazards',
      icon: Zap,
      href: '/study-centre/apprentice/m-o-e-t-module1-section2-1',
    },
    {
      number: '1.2.2',
      title: 'Safe use of tools and test equipment',
      description: 'Proper selection, inspection and use of electrical tools',
      icon: Wrench,
      href: '/study-centre/apprentice/m-o-e-t-module1-section2-2',
    },
    {
      number: '1.2.3',
      title: 'Personal protective equipment (PPE)',
      description: 'Selection, use and maintenance of electrical PPE',
      icon: Shield,
      href: '/study-centre/apprentice/m-o-e-t-module1-section2-3',
    },
    {
      number: '1.2.4',
      title: 'Approach distances and live working restrictions',
      description: 'Safe approach distances and live working limitations',
      icon: AlertTriangle,
      href: '/study-centre/apprentice/m-o-e-t-module1-section2-4',
    },
    {
      number: '1.2.5',
      title: 'Earthing and bonding for safety',
      description: 'Protective earthing and equipotential bonding principles',
      icon: Activity,
      href: '/study-centre/apprentice/m-o-e-t-module1-section2-5',
    },
  ];


const MOETModule1Section2 = () => {
  useSEO(
    'Electrical Safety - MOET Module 1',
    'Electrical dangers, safe use of tools, PPE, approach distances and earthing'
  );

  return (
    <SectionShell
      backTo="/study-centre/apprentice/m-o-e-t-module1"
      backLabel="Module 1"
      moduleNumber={1}
      sectionNumber={2}
      title="Electrical safety"
      description="Electrical dangers, safe use of tools, PPE, approach distances and earthing."
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

export default MOETModule1Section2;
