import { Search, BarChart3, Layers, FileText, ClipboardCheck, RefreshCw } from 'lucide-react';
import { ModuleCard } from '@/components/apprentice-courses/ModuleCard';
import { SectionShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const subsections = [
  {
    number: '2.1',
    title: 'Hazard identification methods',
    description:
      'Workplace inspections, task analysis, incident data review and systematic hazard checklists',
    icon: Search,
    href: '../h-n-c-module1-section2-1',
  },
  {
    number: '2.2',
    title: 'Risk assessment process',
    description:
      'Five-step methodology, likelihood and severity ratings, risk matrices and documentation',
    icon: BarChart3,
    href: '../h-n-c-module1-section2-2',
  },
  {
    number: '2.3',
    title: 'Hierarchy of control',
    description:
      'Elimination, substitution, engineering controls, administrative measures and PPE selection',
    icon: Layers,
    href: '../h-n-c-module1-section2-3',
  },
  {
    number: '2.4',
    title: 'Method statements',
    description:
      'Content requirements, format standards, task breakdown structure and control measures',
    icon: FileText,
    href: '../h-n-c-module1-section2-4',
  },
  {
    number: '2.5',
    title: 'Safe systems of work',
    description:
      'Development processes, implementation strategies, monitoring requirements and review cycles',
    icon: ClipboardCheck,
    href: '../h-n-c-module1-section2-5',
  },
  {
    number: '2.6',
    title: 'Dynamic risk assessment',
    description:
      'On-site assessment techniques, responding to changing conditions and real-time decision making',
    icon: RefreshCw,
    href: '../h-n-c-module1-section2-6',
  },
];

const HNCModule1Section2 = () => {
  useSEO(
    'Risk assessment and RAMS - HNC Module 1 Section 2 | Building Services Engineering',
    'Master risk assessment processes and RAMS documentation: hazard identification, risk matrices, hierarchy of control, method statements and safe systems of work.'
  );

  return (
    <SectionShell
      backTo="../h-n-c-module1"
      backLabel="Module 1"
      moduleNumber={1}
      sectionNumber={2}
      title="Risk assessment and RAMS"
      description="Develop competence in identifying hazards, assessing risks and producing professional RAMS documentation."
      tone="purple"
      subsectionsCount={subsections.length}
    >
      {subsections.map((s, i) => (
        <ModuleCard
          key={i}
          number={s.number}
          title={s.title}
          description={s.description}
          icon={s.icon}
          href={s.href}
        />
      ))}
    </SectionShell>
  );
};

export default HNCModule1Section2;
