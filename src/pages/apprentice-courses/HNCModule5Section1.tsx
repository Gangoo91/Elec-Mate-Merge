import { Network, BarChart3, GitBranch, Users, ShieldAlert, Layers } from 'lucide-react';
import { ModuleCard } from '@/components/apprentice-courses/ModuleCard';
import { SectionShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const subsections = [
  {
    number: '1.1',
    title: 'Work breakdown structure',
    description:
      'WBS development, coding systems, hierarchical decomposition and scope definition for building services projects',
    icon: Network,
    href: '../h-n-c-module5-section1-1',
  },
  {
    number: '1.2',
    title: 'Programme development',
    description:
      'Gantt charts, bar charts, milestones, programme logic and scheduling techniques for MEP installations',
    icon: BarChart3,
    href: '../h-n-c-module5-section1-2',
  },
  {
    number: '1.3',
    title: 'Critical path method',
    description:
      'Network analysis, float calculations, dependencies, activity-on-node diagrams and programme optimisation',
    icon: GitBranch,
    href: '../h-n-c-module5-section1-3',
  },
  {
    number: '1.4',
    title: 'Resource planning',
    description:
      'Labour allocation, materials procurement, plant requirements, resource levelling and productivity factors',
    icon: Users,
    href: '../h-n-c-module5-section1-4',
  },
  {
    number: '1.5',
    title: 'Risk management',
    description:
      'Risk identification, qualitative and quantitative assessment, mitigation strategies and contingency planning',
    icon: ShieldAlert,
    href: '../h-n-c-module5-section1-5',
  },
  {
    number: '1.6',
    title: 'Building services coordination',
    description:
      'MEP sequencing, interface management, clash detection, coordination drawings and installation priorities',
    icon: Layers,
    href: '../h-n-c-module5-section1-6',
  },
];

const HNCModule5Section1 = () => {
  useSEO(
    'Project planning and programming - HNC Module 5 Section 1 | Building Services',
    'Master project planning: WBS development, Gantt charts, critical path method, resource planning, risk management and MEP coordination for building services.'
  );

  return (
    <SectionShell
      backTo="../h-n-c-module5"
      backLabel="Module 5"
      moduleNumber={5}
      sectionNumber={1}
      title="Project planning and programming"
      description="Develop comprehensive project plans and programmes for building services installations."
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

export default HNCModule5Section1;
