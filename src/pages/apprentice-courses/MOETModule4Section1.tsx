import { Calendar, FileText, Settings, CheckSquare, Scale } from 'lucide-react';
import { ModuleCard } from '@/components/apprentice-courses/ModuleCard';
import { SectionShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const subsections = [
    {
      number: '4.1.1',
      title: 'Principles of PPM',
      description:
        'Understanding preventive maintenance philosophy, benefits and implementation strategies',
      icon: Calendar,
      href: '/study-centre/apprentice/m-o-e-t-module4-section1-1',
    },
    {
      number: '4.1.2',
      title: 'Maintenance scheduling and records',
      description: 'Creating maintenance schedules, record keeping and documentation systems',
      icon: FileText,
      href: '/study-centre/apprentice/m-o-e-t-module4-section1-2',
    },
    {
      number: '4.1.3',
      title: 'Lubrication, cleaning and adjustments',
      description:
        'Routine maintenance tasks including lubrication schedules and equipment adjustments',
      icon: Settings,
      href: '/study-centre/apprentice/m-o-e-t-module4-section1-3',
    },
    {
      number: '4.1.4',
      title: 'Electrical inspection routines',
      description: 'Systematic electrical inspection procedures and safety checks',
      icon: CheckSquare,
      href: '/study-centre/apprentice/m-o-e-t-module4-section1-4',
    },
    {
      number: '4.1.5',
      title: 'Legal and regulatory compliance in PPM',
      description: 'Regulatory requirements, standards compliance and legal obligations',
      icon: Scale,
      href: '/study-centre/apprentice/m-o-e-t-module4-section1-5',
    },
  ];


const MOETModule4Section1 = () => {
  useSEO(
    'Section 4.1: Planned Preventive Maintenance (PPM) - MOET Module 4',
    'Principles of PPM, maintenance scheduling, records, lubrication, inspection routines and regulatory compliance'
  );

  return (
    <SectionShell
      backTo="/study-centre/apprentice/m-o-e-t-module4"
      backLabel="Module 4"
      moduleNumber={4}
      sectionNumber={1}
      title="Planned preventive maintenance (PPM)"
      description="Principles of PPM, maintenance scheduling, records, lubrication, inspection routines and regulatory compliance."
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

export default MOETModule4Section1;
