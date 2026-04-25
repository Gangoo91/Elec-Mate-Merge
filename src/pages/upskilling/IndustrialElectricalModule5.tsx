import { Search, Zap, TestTube, FileSearch, FileCheck } from 'lucide-react';
import { SectionCard } from '@/components/upskilling/cards';
import { ModuleShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const sections = [
  { id: 1, title: 'Fault-finding strategies and logic flow', icon: Search, description: 'Systematic approach to industrial fault diagnosis.' },
  { id: 2, title: 'Common control faults (coils, relays, power)', icon: Zap, description: 'Typical control system failures and diagnosis.' },
  { id: 3, title: 'Loop testing and continuity', icon: TestTube, description: 'Circuit testing and continuity verification.' },
  { id: 4, title: 'PLC diagnostics and alarms', icon: FileSearch, description: 'PLC system diagnostics and alarm analysis.' },
  { id: 5, title: 'Root cause analysis and reporting', icon: FileCheck, description: 'Investigation methods and documentation.' },
];

export default function IndustrialElectricalModule5() {
  useSEO({
    title: 'Module 5: Industrial Fault Finding | Industrial Electrical | Elec-Mate',
    description: 'Systematic fault-finding, common control faults, loop testing, PLC diagnostics and root cause analysis.',
  });

  return (
    <ModuleShell
      backTo="../industrial-electrical-course"
      backLabel="Industrial electrical systems"
      moduleNumber={5}
      title="Industrial fault finding and troubleshooting"
      description="Diagnose, test and document — a structured approach to industrial fault finding."
      tone="orange"
      sectionsCount={sections.length}
      duration="65 mins"
      prevModuleHref="../industrial-electrical-module-4"
      prevModuleLabel="PLC basics and system integration"
    >
      {sections.map((section, index) => (
        <SectionCard
          key={section.id}
          to={`../industrial-electrical-module-5-section-${section.id}`}
          sectionNumber={section.id}
          title={section.title}
          description={section.description}
          icon={section.icon}
          index={index}
        />
      ))}
    </ModuleShell>
  );
}
