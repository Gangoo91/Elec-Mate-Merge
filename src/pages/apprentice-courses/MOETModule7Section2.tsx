import { Shield, Search, Wrench, Settings, Award, Eye } from 'lucide-react';
import { ModuleCard } from '@/components/apprentice-courses/ModuleCard';
import { SectionShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const subsections = [
    {
      number: '7.2.1',
      title: 'Safe isolation and testing routines',
      description: 'Practice safe isolation procedures and electrical testing protocols',
      icon: Shield,
      href: '/study-centre/apprentice/m-o-e-t-module7-section2-1',
    },
    {
      number: '7.2.2',
      title: 'Fault diagnosis exercises',
      description: 'Systematic fault finding practice using real-world scenarios',
      icon: Search,
      href: '/study-centre/apprentice/m-o-e-t-module7-section2-2',
    },
    {
      number: '7.2.3',
      title: 'Component replacement and repair',
      description: 'Hands-on practice with component replacement and repair techniques',
      icon: Wrench,
      href: '/study-centre/apprentice/m-o-e-t-module7-section2-3',
    },
    {
      number: '7.2.4',
      title: 'Control system troubleshooting',
      description: 'PLC and control system fault diagnosis and resolution practice',
      icon: Settings,
      href: '/study-centre/apprentice/m-o-e-t-module7-section2-4',
    },
    {
      number: '7.2.5',
      title: 'Completing work to industry standards',
      description: 'Quality standards, workmanship and compliance requirements',
      icon: Award,
      href: '/study-centre/apprentice/m-o-e-t-module7-section2-5',
    },
    {
      number: '7.2.6',
      title: 'Assessment marking criteria awareness',
      description: 'Understanding EPA marking criteria and assessment expectations',
      icon: Eye,
      href: '/study-centre/apprentice/m-o-e-t-module7-section2-6',
    },
  ];


const MOETModule7Section2 = () => {
  useSEO(
    'Section 7.2: Practical Task Preparation - MOET Module 7',
    'Safe isolation, fault diagnosis, repairs and control system troubleshooting'
  );

  return (
    <SectionShell
      backTo="/study-centre/apprentice/m-o-e-t-module7"
      backLabel="Module 7"
      moduleNumber={7}
      sectionNumber={2}
      title="Practical task preparation"
      description="Safe isolation, fault diagnosis, repairs and control system troubleshooting."
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

export default MOETModule7Section2;
