import { Clock, Heart, Shield, AlertTriangle } from 'lucide-react';
import { SectionCard } from '@/components/upskilling/cards';
import { ModuleShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const sections = [
  { id: 1, title: 'Managing time in each section of the AM2', icon: Clock, description: 'How to allocate and protect time across each AM2 section.' },
  { id: 2, title: 'Coping with nerves and pressure', icon: Heart, description: 'Techniques for managing exam stress and staying focused.' },
  { id: 3, title: "Safety-first approach — show the assessor you're safe", icon: Shield, description: 'Demonstrating safety competence throughout the assessment.' },
  { id: 4, title: 'Avoiding common mistakes', icon: AlertTriangle, description: 'The typical errors candidates make and how to prevent them.' },
];

export default function AM2Module7() {
  useSEO({
    title: 'Module 7: Exam Strategy and Success Tips | AM2 | Elec-Mate',
    description: 'Time management, coping with pressure, safety-first approach and avoiding common mistakes on the AM2.',
  });

  return (
    <ModuleShell
      backTo="../am2"
      backLabel="AM2 preparation & guidance"
      moduleNumber={7}
      title="Exam strategy and success tips"
      description="Time management, coping with pressure and the safety-first approach that gets you through the AM2."
      tone="yellow"
      sectionsCount={sections.length}
      duration="1.5h"
      prevModuleHref="../module6"
      prevModuleLabel="Online knowledge test"
      nextModuleHref="../module8"
      nextModuleLabel="Full mock AM2 assessment"
    >
      {sections.map((section, index) => (
        <SectionCard
          key={section.id}
          to={`section${section.id}`}
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
