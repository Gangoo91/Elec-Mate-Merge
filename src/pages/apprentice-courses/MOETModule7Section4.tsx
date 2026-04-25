import { Users, MessageCircle, Clock, Lightbulb, UserCheck } from 'lucide-react';
import { ModuleCard } from '@/components/apprentice-courses/ModuleCard';
import { SectionShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const subsections = [
    {
      number: '7.4.1',
      title: 'Teamwork and collaboration',
      description: 'Working effectively in teams and collaborative problem-solving',
      icon: Users,
      href: '/study-centre/apprentice/m-o-e-t-module7-section4-1',
    },
    {
      number: '7.4.2',
      title: 'Communication and reporting skills',
      description: 'Effective communication techniques and professional reporting',
      icon: MessageCircle,
      href: '/study-centre/apprentice/m-o-e-t-module7-section4-2',
    },
    {
      number: '7.4.3',
      title: 'Time management and organisation',
      description: 'Priority setting, planning and efficient work organisation',
      icon: Clock,
      href: '/study-centre/apprentice/m-o-e-t-module7-section4-3',
    },
    {
      number: '7.4.4',
      title: 'Initiative and problem-solving',
      description: 'Demonstrating initiative and systematic problem-solving approaches',
      icon: Lightbulb,
      href: '/study-centre/apprentice/m-o-e-t-module7-section4-4',
    },
    {
      number: '7.4.5',
      title: 'Professional conduct and attitude',
      description: 'Professional standards, work ethics and positive workplace attitude',
      icon: UserCheck,
      href: '/study-centre/apprentice/m-o-e-t-module7-section4-5',
    },
  ];


const MOETModule7Section4 = () => {
  useSEO(
    'Section 7.4: Professional Behaviours and Soft Skills - MOET Module 7',
    'Teamwork, communication, time management and professional conduct'
  );

  return (
    <SectionShell
      backTo="/study-centre/apprentice/m-o-e-t-module7"
      backLabel="Module 7"
      moduleNumber={7}
      sectionNumber={4}
      title="Professional behaviours and soft skills"
      description="Teamwork, communication, time management and professional conduct."
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

export default MOETModule7Section4;
