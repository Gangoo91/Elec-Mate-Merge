import { BookOpen, TrendingUp, Building, ShieldCheck } from 'lucide-react';
import { SectionCard } from '@/components/upskilling/cards';
import { ModuleShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const sections = [
  { id: 1, title: 'What is fibre optic cabling', icon: BookOpen, description: 'Fundamentals of fibre optic technology.' },
  { id: 2, title: 'Advantages vs copper systems', icon: TrendingUp, description: 'Comparing fibre and copper performance.' },
  { id: 3, title: 'Fibre use in commercial and industrial settings', icon: Building, description: 'Applications and deployment scenarios.' },
  { id: 4, title: 'Health and safety in fibre work', icon: ShieldCheck, description: 'Safety protocols and protective measures.' },
];

export default function FiberOpticsModule1() {
  useSEO({
    title: 'Module 1: Introduction to Fibre Optics | Fibre Optics | Elec-Mate',
    description: 'Fundamentals of fibre optic technology, advantages over copper, common applications and health and safety.',
  });

  return (
    <ModuleShell
      backTo="../fiber-optics-course"
      backLabel="Fibre optics technology"
      moduleNumber={1}
      title="Introduction to fibre optics"
      description="Fibre optic fundamentals, comparison with copper, real-world applications and personal safety."
      tone="cyan"
      sectionsCount={sections.length}
      duration="45 mins"
      nextModuleHref="../fiber-optics-module-2"
      nextModuleLabel="Fibre types and connectors"
    >
      {sections.map((section, index) => (
        <SectionCard
          key={section.id}
          to={`../fiber-optics-module-1-section-${section.id}`}
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
