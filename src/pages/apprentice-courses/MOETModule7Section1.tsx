import { HelpCircle, Clock, MessageSquare, Search, Target } from 'lucide-react';
import { ModuleCard } from '@/components/apprentice-courses/ModuleCard';
import { SectionShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const subsections = [
    {
      number: '7.1.1',
      title: 'Multiple-choice question banks',
      description: 'Practice question banks covering all module topics and learning outcomes',
      icon: HelpCircle,
      href: '/study-centre/apprentice/m-o-e-t-module7-section1-1',
    },
    {
      number: '7.1.2',
      title: 'Timed mock tests',
      description: 'Full-length practice tests under exam conditions with time constraints',
      icon: Clock,
      href: '/study-centre/apprentice/m-o-e-t-module7-section1-2',
    },
    {
      number: '7.1.3',
      title: 'Feedback and explanations',
      description: 'Detailed explanations for answers and performance feedback',
      icon: MessageSquare,
      href: '/study-centre/apprentice/m-o-e-t-module7-section1-3',
    },
    {
      number: '7.1.4',
      title: 'Identifying knowledge gaps',
      description: 'Self-assessment techniques and identifying areas for improvement',
      icon: Search,
      href: '/study-centre/apprentice/m-o-e-t-module7-section1-4',
    },
    {
      number: '7.1.5',
      title: 'Exam techniques and strategies',
      description: 'Test-taking strategies, time management and approach techniques',
      icon: Target,
      href: '/study-centre/apprentice/m-o-e-t-module7-section1-5',
    },
  ];


const MOETModule7Section1 = () => {
  useSEO(
    'Section 7.1: Knowledge Test Practice - MOET Module 7',
    'Multiple-choice questions, mock tests, feedback and exam techniques'
  );

  return (
    <SectionShell
      backTo="/study-centre/apprentice/m-o-e-t-module7"
      backLabel="Module 7"
      moduleNumber={7}
      sectionNumber={1}
      title="Knowledge test practice"
      description="Multiple-choice questions, mock tests, feedback and exam techniques."
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

export default MOETModule7Section1;
