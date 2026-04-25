import { CheckSquare, DoorOpen, BookOpen, Calendar } from 'lucide-react';
import { ModuleCard } from '@/components/apprentice-courses/ModuleCard';
import { SectionShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const subsections = [
    {
      number: '7.5.1',
      title: 'Employer and training provider sign-off',
      description: 'Securing employer and training provider approval for EPA gateway',
      icon: CheckSquare,
      href: '/study-centre/apprentice/m-o-e-t-module7-section5-1',
    },
    {
      number: '7.5.2',
      title: 'EPA gateway requirements',
      description: 'Understanding and completing all EPA gateway documentation',
      icon: DoorOpen,
      href: '/study-centre/apprentice/m-o-e-t-module7-section5-2',
    },
    {
      number: '7.5.3',
      title: 'Final revision and confidence building',
      description: 'Final preparation strategies and building confidence for assessment',
      icon: BookOpen,
      href: '/study-centre/apprentice/m-o-e-t-module7-section5-3',
    },
    {
      number: '7.5.4',
      title: 'What to expect on EPA day',
      description: 'EPA day procedures, assessment format and what to expect',
      icon: Calendar,
      href: '/study-centre/apprentice/m-o-e-t-module7-section5-4',
    },
  ];


const MOETModule7Section5 = () => {
  useSEO(
    'Section 7.5: EPA Readiness and Final Review - MOET Module 7',
    'Gateway requirements, final revision and EPA day preparation'
  );

  return (
    <SectionShell
      backTo="/study-centre/apprentice/m-o-e-t-module7"
      backLabel="Module 7"
      moduleNumber={7}
      sectionNumber={5}
      title="EPA readiness and final review"
      description="Gateway requirements, final revision and EPA day preparation."
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

export default MOETModule7Section5;
