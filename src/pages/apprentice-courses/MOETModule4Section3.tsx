import { AlertTriangle, Search, Gauge, Cog, Settings, Zap, FileText } from 'lucide-react';
import { ModuleCard } from '@/components/apprentice-courses/ModuleCard';
import { SectionShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const subsections = [
    {
      number: '4.3.1',
      title: 'Symptom recognition and initial assessment',
      description: 'Identifying fault symptoms and conducting preliminary assessments',
      icon: AlertTriangle,
      href: '/study-centre/apprentice/m-o-e-t-module4-section3-1',
    },
    {
      number: '4.3.2',
      title: 'Systematic diagnostic approach',
      description: 'Structured fault-finding methodology and diagnostic procedures',
      icon: Search,
      href: '/study-centre/apprentice/m-o-e-t-module4-section3-2',
    },
    {
      number: '4.3.3',
      title: 'Use of electrical test instruments',
      description: 'Selection and application of test equipment for fault diagnosis',
      icon: Gauge,
      href: '/study-centre/apprentice/m-o-e-t-module4-section3-3',
    },
    {
      number: '4.3.4',
      title: 'Common faults in motors and drives',
      description: 'Typical motor and drive faults, causes and diagnostic techniques',
      icon: Cog,
      href: '/study-centre/apprentice/m-o-e-t-module4-section3-4',
    },
    {
      number: '4.3.5',
      title: 'Control circuit faults',
      description: 'Diagnosing faults in control circuits and automation systems',
      icon: Settings,
      href: '/study-centre/apprentice/m-o-e-t-module4-section3-5',
    },
    {
      number: '4.3.6',
      title: 'Intermittent faults and environmental factors',
      description: 'Identifying intermittent faults and environmental influences on equipment',
      icon: Zap,
      href: '/study-centre/apprentice/m-o-e-t-module4-section3-6',
    },
    {
      number: '4.3.7',
      title: 'Documentation of faults',
      description: 'Proper documentation, reporting and record keeping of fault diagnosis',
      icon: FileText,
      href: '/study-centre/apprentice/m-o-e-t-module4-section3-7',
    },
  ];


const MOETModule4Section3 = () => {
  useSEO(
    'Section 4.3: Fault Finding and Diagnostics - MOET Module 4',
    'Systematic diagnostic approach, test instruments, motor faults, control circuits and documentation'
  );

  return (
    <SectionShell
      backTo="/study-centre/apprentice/m-o-e-t-module4"
      backLabel="Module 4"
      moduleNumber={4}
      sectionNumber={3}
      title="Fault finding and diagnostics"
      description="Systematic diagnostic approach, test instruments, motor faults, control circuits and documentation."
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

export default MOETModule4Section3;
