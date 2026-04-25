import { Search, HelpCircle, GitBranch, Target, FileText } from 'lucide-react';
import { ModuleCard } from '@/components/apprentice-courses/ModuleCard';
import { SectionShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const subsections = [
    {
      number: '4.6.1',
      title: 'Identifying underlying failures',
      description: 'Techniques for identifying root causes rather than symptoms',
      icon: Search,
      href: '/study-centre/apprentice/m-o-e-t-module4-section6-1',
    },
    {
      number: '4.6.2',
      title: "The '5 Whys' Technique",
      description: 'Using the 5 Whys method for systematic root cause investigation',
      icon: HelpCircle,
      href: '/study-centre/apprentice/m-o-e-t-module4-section6-2',
    },
    {
      number: '4.6.3',
      title: 'Fishbone (ishikawa) diagrams',
      description: 'Creating and using fishbone diagrams for cause analysis',
      icon: GitBranch,
      href: '/study-centre/apprentice/m-o-e-t-module4-section6-3',
    },
    {
      number: '4.6.4',
      title: 'Corrective vs preventive actions',
      description: 'Developing appropriate corrective and preventive action plans',
      icon: Target,
      href: '/study-centre/apprentice/m-o-e-t-module4-section6-4',
    },
    {
      number: '4.6.5',
      title: 'Recording and reporting RCA outcomes',
      description: 'Documentation and communication of root cause analysis results',
      icon: FileText,
      href: '/study-centre/apprentice/m-o-e-t-module4-section6-5',
    },
  ];


const MOETModule4Section6 = () => {
  useSEO(
    'Section 4.6: Root Cause Analysis - MOET Module 4',
    'Identifying underlying failures, 5 Whys technique, fishbone diagrams and corrective actions'
  );

  return (
    <SectionShell
      backTo="/study-centre/apprentice/m-o-e-t-module4"
      backLabel="Module 4"
      moduleNumber={4}
      sectionNumber={6}
      title="Root cause analysis"
      description="Identifying underlying failures, 5 Whys technique, fishbone diagrams and corrective actions."
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

export default MOETModule4Section6;
