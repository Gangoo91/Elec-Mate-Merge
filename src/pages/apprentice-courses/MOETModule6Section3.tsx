import { Book, AlertTriangle, Monitor, LinkIcon, Database } from 'lucide-react';
import { ModuleCard } from '@/components/apprentice-courses/ModuleCard';
import { SectionShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const subsections = [
    {
      number: '6.3.1',
      title: 'Recording work completed (logbooks, CMMS)',
      description: 'Work completion records, logbook entries and CMMS documentation',
      icon: Book,
      href: '/study-centre/apprentice/m-o-e-t-module6-section3-1',
    },
    {
      number: '6.3.2',
      title: 'Fault reports and corrective actions',
      description: 'Fault reporting procedures, corrective action documentation and follow-up',
      icon: AlertTriangle,
      href: '/study-centre/apprentice/m-o-e-t-module6-section3-2',
    },
    {
      number: '6.3.3',
      title: 'Digital vs paper-based reporting',
      description: 'Digital reporting systems, advantages and implementation considerations',
      icon: Monitor,
      href: '/study-centre/apprentice/m-o-e-t-module6-section3-3',
    },
    {
      number: '6.3.4',
      title: 'Traceability and compliance requirements',
      description: 'Audit trails, regulatory compliance and traceability documentation',
      icon: LinkIcon,
      href: '/study-centre/apprentice/m-o-e-t-module6-section3-4',
    },
    {
      number: '6.3.5',
      title: 'Using maintenance management systems',
      description: 'CMMS operation, data entry and system utilisation',
      icon: Database,
      href: '/study-centre/apprentice/m-o-e-t-module6-section3-5',
    },
  ];


const MOETModule6Section3 = () => {
  useSEO(
    'Section 6.3: Maintenance Records and Reporting - MOET Module 6',
    'Work recording, fault reports, digital reporting and maintenance management systems'
  );

  return (
    <SectionShell
      backTo="/study-centre/apprentice/m-o-e-t-module6"
      backLabel="Module 6"
      moduleNumber={6}
      sectionNumber={3}
      title="Maintenance records and reporting"
      description="Work recording, fault reports, digital reporting and maintenance management systems."
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

export default MOETModule6Section3;
