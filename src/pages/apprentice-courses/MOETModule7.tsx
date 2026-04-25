import { BookOpen, Wrench, FolderOpen, Users, CheckCircle } from 'lucide-react';
import { SectionCard } from '@/components/upskilling/cards';
import { ModuleShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const sections = [
  { id: 1, title: 'Knowledge test practice', icon: BookOpen, description: 'Multiple-choice questions, mock tests, feedback and exam techniques.' },
  { id: 2, title: 'Practical task preparation', icon: Wrench, description: 'Safe isolation, fault diagnosis, repairs and control system troubleshooting.' },
  { id: 3, title: 'Portfolio development and evidence gathering', icon: FolderOpen, description: 'Work-based portfolio, witness statements and evidence mapping.' },
  { id: 4, title: 'Professional behaviours and soft skills', icon: Users, description: 'Teamwork, communication, time management and professional conduct.' },
  { id: 5, title: 'EPA readiness and final review', icon: CheckCircle, description: 'Gateway requirements, final revision and EPA day preparation.' },
];

export default function MOETModule7() {
  useSEO({
    title: 'Module 7: End Point Assessment Preparation | MOET | Elec-Mate',
    description: 'EPA preparation, knowledge tests, practical tasks, portfolio development and the professional behaviours required to pass.',
  });

  return (
    <ModuleShell
      backTo="../moet"
      backLabel="MOET"
      moduleNumber={7}
      title="End point assessment preparation"
      description="Comprehensive EPA preparation — knowledge tests, practical tasks, portfolio development and the professional behaviours required to pass."
      tone="orange"
      sectionsCount={sections.length}
      duration="4h"
      prevModuleHref="../m-o-e-t-module6"
      prevModuleLabel="Technical documentation and communication"
    >
      {sections.map((section, index) => (
        <SectionCard
          key={section.id}
          to={`../m-o-e-t-module7-section${section.id}`}
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
