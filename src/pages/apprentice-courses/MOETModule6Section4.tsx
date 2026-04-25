import { Clock, UserCheck, Users, Handshake } from 'lucide-react';
import { ModuleCard } from '@/components/apprentice-courses/ModuleCard';
import { SectionShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const subsections = [
    {
      number: '6.4.1',
      title: 'Shift handover procedures',
      description: 'Shift handover protocols, information transfer and continuity procedures',
      icon: Clock,
      href: '/study-centre/apprentice/m-o-e-t-module6-section4-1',
    },
    {
      number: '6.4.2',
      title: 'Communicating with supervisors and engineers',
      description: 'Professional communication, reporting lines and technical discussions',
      icon: UserCheck,
      href: '/study-centre/apprentice/m-o-e-t-module6-section4-2',
    },
    {
      number: '6.4.3',
      title: 'Liaising with non-technical staff',
      description: 'Communication with operations, management and non-technical personnel',
      icon: Users,
      href: '/study-centre/apprentice/m-o-e-t-module6-section4-3',
    },
    {
      number: '6.4.4',
      title: 'Professional behaviour and teamwork',
      description: 'Professional standards, teamwork principles and workplace behaviour',
      icon: Handshake,
      href: '/study-centre/apprentice/m-o-e-t-module6-section4-4',
    },
  ];


const MOETModule6Section4 = () => {
  useSEO(
    'Section 6.4: Handovers and Stakeholder Communication - MOET Module 6',
    'Shift handovers, stakeholder communication, professional behaviour and teamwork'
  );

  return (
    <SectionShell
      backTo="/study-centre/apprentice/m-o-e-t-module6"
      backLabel="Module 6"
      moduleNumber={6}
      sectionNumber={4}
      title="Handovers and stakeholder communication"
      description="Shift handovers, stakeholder communication, professional behaviour and teamwork."
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

export default MOETModule6Section4;
