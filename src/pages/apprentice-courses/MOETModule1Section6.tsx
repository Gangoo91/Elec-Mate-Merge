import { Flame, Heart, ArrowRight, FileText, Users } from 'lucide-react';
import { ModuleCard } from '@/components/apprentice-courses/ModuleCard';
import { SectionShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const subsections = [
    {
      number: '1.6.1',
      title: 'Fire safety and extinguishers',
      description: 'Fire prevention, detection and appropriate extinguisher selection',
      icon: Flame,
      href: '/study-centre/apprentice/m-o-e-t-module1-section6-1',
    },
    {
      number: '1.6.2',
      title: 'First aid for electrical incidents',
      description: 'CPR, treatment of electrical burns and shock response',
      icon: Heart,
      href: '/study-centre/apprentice/m-o-e-t-module1-section6-2',
    },
    {
      number: '1.6.3',
      title: 'Evacuation procedures',
      description: 'Emergency evacuation plans and muster point procedures',
      icon: ArrowRight,
      href: '/study-centre/apprentice/m-o-e-t-module1-section6-3',
    },
    {
      number: '1.6.4',
      title: 'Reporting incidents, accidents and near misses',
      description: 'Incident reporting systems and investigation procedures',
      icon: FileText,
      href: '/study-centre/apprentice/m-o-e-t-module1-section6-4',
    },
    {
      number: '1.6.5',
      title: 'Role of first responders on site',
      description: 'First responder duties and coordination with emergency services',
      icon: Users,
      href: '/study-centre/apprentice/m-o-e-t-module1-section6-5',
    },
  ];


const MOETModule1Section6 = () => {
  useSEO(
    'Emergency Procedures & First Aid - MOET Module 1',
    'Fire safety, electrical first aid, evacuation and incident reporting'
  );

  return (
    <SectionShell
      backTo="/study-centre/apprentice/m-o-e-t-module1"
      backLabel="Module 1"
      moduleNumber={1}
      sectionNumber={6}
      title="Emergency procedures & first aid"
      description="Fire safety, electrical first aid, evacuation and incident reporting."
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

export default MOETModule1Section6;
