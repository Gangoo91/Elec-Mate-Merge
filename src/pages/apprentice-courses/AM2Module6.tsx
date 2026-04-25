import { Monitor, BookOpen, Clock, FileQuestion } from 'lucide-react';
import { SectionCard } from '@/components/upskilling/cards';
import { ModuleShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const sections = [
  { id: 1, title: 'Format and structure of the online test', icon: Monitor, description: 'How the online knowledge test is laid out and what to expect.' },
  { id: 2, title: 'Core topics covered (regs, science, safety)', icon: BookOpen, description: 'The key subject areas the knowledge test draws from.' },
  { id: 3, title: 'Time management strategies', icon: Clock, description: 'Effective techniques for managing your time during the test.' },
  { id: 4, title: 'Exam techniques and mindset', icon: FileQuestion, description: 'Mental preparation and effective in-exam strategies.' },
];

export default function AM2Module6() {
  useSEO({
    title: 'Module 6: Online Knowledge Test | AM2 | Elec-Mate',
    description: 'Format, core topics, time management and exam techniques for the AM2 online knowledge test.',
  });

  return (
    <ModuleShell
      backTo="../am2"
      backLabel="AM2 preparation & guidance"
      moduleNumber={6}
      title="Online knowledge test"
      description="Master the AM2 online knowledge test — test format, core topics, time management and exam techniques."
      tone="yellow"
      sectionsCount={sections.length}
      duration="1.5h"
      prevModuleHref="../module5"
      prevModuleLabel="Fault diagnosis and rectification"
      nextModuleHref="../module7"
      nextModuleLabel="Exam strategy and success tips"
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
