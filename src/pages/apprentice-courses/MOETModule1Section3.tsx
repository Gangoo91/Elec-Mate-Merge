import { Search, BarChart3, Shield, FileCheck, Activity } from 'lucide-react';
import { ModuleCard } from '@/components/apprentice-courses/ModuleCard';
import { SectionShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const subsections = [
    {
      number: '1.3.1',
      title: 'Hazard identification',
      description: 'Systematic identification of workplace hazards and risks',
      icon: Search,
      href: '/study-centre/apprentice/m-o-e-t-module1-section3-1',
    },
    {
      number: '1.3.2',
      title: 'Risk evaluation (likelihood vs severity)',
      description: 'Assessing and rating risks using likelihood and severity matrices',
      icon: BarChart3,
      href: '/study-centre/apprentice/m-o-e-t-module1-section3-2',
    },
    {
      number: '1.3.3',
      title: 'Hierarchy of controls',
      description: 'Elimination, substitution, engineering, administrative and PPE controls',
      icon: Shield,
      href: '/study-centre/apprentice/m-o-e-t-module1-section3-3',
    },
    {
      number: '1.3.4',
      title: 'Writing and following method statements',
      description: 'Developing and implementing safe method statements',
      icon: FileCheck,
      href: '/study-centre/apprentice/m-o-e-t-module1-section3-4',
    },
    {
      number: '1.3.5',
      title: 'Dynamic risk assessments (on-the-job)',
      description: 'Real-time risk assessment and adaptation during work activities',
      icon: Activity,
      href: '/study-centre/apprentice/m-o-e-t-module1-section3-5',
    },
  ];


const MOETModule1Section3 = () => {
  useSEO(
    'Risk Assessment & Method Statements - MOET Module 1',
    'Hazard identification, risk evaluation, controls and dynamic assessments'
  );

  return (
    <SectionShell
      backTo="/study-centre/apprentice/m-o-e-t-module1"
      backLabel="Module 1"
      moduleNumber={1}
      sectionNumber={3}
      title="Risk assessment & method statements"
      description="Hazard identification, risk evaluation, controls and dynamic assessments."
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

export default MOETModule1Section3;
