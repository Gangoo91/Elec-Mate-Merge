import { FileText, Lock, Shield, HardHat, Home } from 'lucide-react';
import { ModuleCard } from '@/components/apprentice-courses/ModuleCard';
import { SectionShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const subsections = [
    {
      number: '1.1.1',
      title: 'Permit to work systems',
      description: 'Understanding and implementing permit to work procedures',
      icon: FileText,
      href: '/study-centre/apprentice/m-o-e-t-module1-section1-1',
    },
    {
      number: '1.1.2',
      title: 'Isolation procedures',
      description: 'Safe isolation of electrical and mechanical systems',
      icon: Lock,
      href: '/study-centre/apprentice/m-o-e-t-module1-section1-2',
    },
    {
      number: '1.1.3',
      title: 'Lock-out / tag-out (LOTO)',
      description: 'LOTO procedures for energy isolation and control',
      icon: Shield,
      href: '/study-centre/apprentice/m-o-e-t-module1-section1-3',
    },
    {
      number: '1.1.4',
      title: 'Safe access and work at height',
      description: 'Working safely at height and access equipment requirements',
      icon: HardHat,
      href: '/study-centre/apprentice/m-o-e-t-module1-section1-4',
    },
    {
      number: '1.1.5',
      title: 'Working in confined spaces',
      description: 'Safe entry and working procedures for confined spaces',
      icon: Home,
      href: '/study-centre/apprentice/m-o-e-t-module1-section1-5',
    },
  ];


const MOETModule1Section1 = () => {
  useSEO(
    'Safe Systems of Work - MOET Module 1',
    'Permit to work systems, isolation procedures, LOTO, work at height and confined spaces'
  );

  return (
    <SectionShell
      backTo="/study-centre/apprentice/m-o-e-t-module1"
      backLabel="Module 1"
      moduleNumber={1}
      sectionNumber={1}
      title="Safe systems of work"
      description="Permit to work systems, isolation procedures, LOTO, work at height and confined spaces."
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

export default MOETModule1Section1;
