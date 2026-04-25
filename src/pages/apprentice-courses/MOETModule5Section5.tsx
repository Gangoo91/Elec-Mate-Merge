import { Clipboard, TestTube, Settings, RotateCcw, FileText } from 'lucide-react';
import { ModuleCard } from '@/components/apprentice-courses/ModuleCard';
import { SectionShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const subsections = [
    {
      number: '5.5.1',
      title: 'Calibration procedures and standards',
      description: 'Calibration methodologies, standards and traceability requirements',
      icon: Clipboard,
      href: '/study-centre/apprentice/m-o-e-t-module5-section5-1',
    },
    {
      number: '5.5.2',
      title: 'Test instruments for control systems',
      description: 'Selection and use of calibration and test equipment',
      icon: TestTube,
      href: '/study-centre/apprentice/m-o-e-t-module5-section5-2',
    },
    {
      number: '5.5.3',
      title: 'Zero, span and linearity adjustments',
      description: 'Calibration adjustments and accuracy verification procedures',
      icon: Settings,
      href: '/study-centre/apprentice/m-o-e-t-module5-section5-3',
    },
    {
      number: '5.5.4',
      title: 'Functional testing of loops',
      description: 'End-to-end testing of control loops and system verification',
      icon: RotateCcw,
      href: '/study-centre/apprentice/m-o-e-t-module5-section5-4',
    },
    {
      number: '5.5.5',
      title: 'Documenting calibration results',
      description: 'Record keeping, certificates and calibration documentation',
      icon: FileText,
      href: '/study-centre/apprentice/m-o-e-t-module5-section5-5',
    },
  ];


const MOETModule5Section5 = () => {
  useSEO(
    'Section 5.5: Testing and Calibration of Systems - MOET Module 5',
    'Calibration procedures, test instruments, adjustments and documentation'
  );

  return (
    <SectionShell
      backTo="/study-centre/apprentice/m-o-e-t-module5"
      backLabel="Module 5"
      moduleNumber={5}
      sectionNumber={5}
      title="Testing and calibration of systems"
      description="Calibration procedures, test instruments, adjustments and documentation."
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

export default MOETModule5Section5;
