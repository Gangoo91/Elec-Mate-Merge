import { Settings, Scale, AlertTriangle, BookOpen } from 'lucide-react';
import { ModuleCard } from '@/components/apprentice-courses/ModuleCard';
import { SectionShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const subsections = [
    {
      number: '4.7.1',
      title: 'Principles of reliability-centred maintenance (RCM)',
      description: 'Understanding RCM philosophy and implementation strategies',
      icon: Settings,
      href: '/study-centre/apprentice/m-o-e-t-module4-section7-1',
    },
    {
      number: '4.7.2',
      title: 'Balancing PPM and corrective maintenance',
      description: 'Optimising the balance between preventive and corrective maintenance',
      icon: Scale,
      href: '/study-centre/apprentice/m-o-e-t-module4-section7-2',
    },
    {
      number: '4.7.3',
      title: 'Criticality analysis of equipment',
      description: 'Assessing equipment criticality and prioritising maintenance activities',
      icon: AlertTriangle,
      href: '/study-centre/apprentice/m-o-e-t-module4-section7-3',
    },
    {
      number: '4.7.4',
      title: 'Industry best practices in RCM',
      description: 'Learning from industry standards and best practice examples',
      icon: BookOpen,
      href: '/study-centre/apprentice/m-o-e-t-module4-section7-4',
    },
  ];


const MOETModule4Section7 = () => {
  useSEO(
    'Section 4.7: Reliability-Centred Maintenance - MOET Module 4',
    'RCM principles, balancing maintenance types, criticality analysis and industry best practices'
  );

  return (
    <SectionShell
      backTo="/study-centre/apprentice/m-o-e-t-module4"
      backLabel="Module 4"
      moduleNumber={4}
      sectionNumber={7}
      title="Reliability-centred maintenance"
      description="RCM principles, balancing maintenance types, criticality analysis and industry best practices."
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

export default MOETModule4Section7;
