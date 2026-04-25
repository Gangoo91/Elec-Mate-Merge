import { Scale, BookOpen, ClipboardCheck, FileText } from 'lucide-react';
import { SectionCard } from '@/components/upskilling/cards';
import { ModuleShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const sections = [
  { id: 1, title: 'Control of Asbestos Regulations 2012', icon: Scale, description: 'CAR 2012 overview, three work categories, control limit, key regulations and HSE enforcement.' },
  { id: 2, title: 'The duty to manage (Regulation 4)', icon: BookOpen, description: 'Dutyholder identification, reasonable steps, asbestos register, management plan and penalties.' },
  { id: 3, title: 'Asbestos surveys', icon: ClipboardCheck, description: 'Management vs Refurbishment & Demolition surveys, HSG264 guidance, surveyor qualifications.' },
  { id: 4, title: 'The asbestos register & management plan', icon: FileText, description: 'Material and priority assessments, risk scoring, management options and review triggers.' },
];

export default function AsbestosModule2() {
  useSEO({
    title: 'Module 2: Legislation & the Duty to Manage | Asbestos Awareness | Elec-Mate',
    description:
      'Control of Asbestos Regulations 2012, Regulation 4 duty to manage, survey types and the asbestos register and management plan.',
  });

  return (
    <ModuleShell
      backTo="../asbestos-awareness-course"
      backLabel="Asbestos awareness"
      moduleNumber={2}
      title="Legislation & the duty to manage"
      description="The legal framework for managing asbestos in buildings — from CAR 2012 to surveys and the asbestos register."
      tone="orange"
      sectionsCount={sections.length}
      duration="30 mins"
      prevModuleHref="../asbestos-awareness-module-1"
      prevModuleLabel="What is asbestos?"
      nextModuleHref="../asbestos-awareness-module-3"
      nextModuleLabel="Identifying asbestos-containing materials"
    >
      {sections.map((section, index) => (
        <SectionCard
          key={section.id}
          to={`../asbestos-awareness-module-2-section-${section.id}`}
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
