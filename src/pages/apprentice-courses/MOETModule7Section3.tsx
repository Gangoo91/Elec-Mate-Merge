import { Briefcase, FileText, Calendar, MapPin } from 'lucide-react';
import { ModuleCard } from '@/components/apprentice-courses/ModuleCard';
import { SectionShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const subsections = [
    {
      number: '7.3.1',
      title: 'Building a work-based portfolio',
      description: 'Structuring and organising a comprehensive work-based evidence portfolio',
      icon: Briefcase,
      href: '/study-centre/apprentice/m-o-e-t-module7-section3-1',
    },
    {
      number: '7.3.2',
      title: 'Collecting witness statements',
      description: 'Obtaining and formatting witness statements from supervisors and colleagues',
      icon: FileText,
      href: '/study-centre/apprentice/m-o-e-t-module7-section3-2',
    },
    {
      number: '7.3.3',
      title: 'Logging on-the-job activities',
      description: 'Recording work activities, projects and learning experiences',
      icon: Calendar,
      href: '/study-centre/apprentice/m-o-e-t-module7-section3-3',
    },
    {
      number: '7.3.4',
      title: 'Mapping evidence to standards',
      description: 'Linking portfolio evidence to apprenticeship standards and learning outcomes',
      icon: MapPin,
      href: '/study-centre/apprentice/m-o-e-t-module7-section3-4',
    },
  ];


const MOETModule7Section3 = () => {
  useSEO(
    'Section 7.3: Portfolio Development and Evidence Gathering - MOET Module 7',
    'Work-based portfolio, witness statements and evidence mapping'
  );

  return (
    <SectionShell
      backTo="/study-centre/apprentice/m-o-e-t-module7"
      backLabel="Module 7"
      moduleNumber={7}
      sectionNumber={3}
      title="Portfolio development and evidence gathering"
      description="Work-based portfolio, witness statements and evidence mapping."
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

export default MOETModule7Section3;
