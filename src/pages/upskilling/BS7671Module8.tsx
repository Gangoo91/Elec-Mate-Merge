import { BookOpen, FileText, AlertCircle } from 'lucide-react';
import { SectionCard } from '@/components/upskilling/cards';
import { ModuleShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const sections = [
  {
    id: 1,
    title: 'Navigating key appendices',
    icon: BookOpen,
    description: 'Zs tables, conductor sizing and voltage drop reference material.',
  },
  {
    id: 2,
    title: 'Schedules, checklists and reference charts',
    icon: FileText,
    description: 'Documentation tools and quality control material from the appendices.',
  },
  {
    id: 3,
    title: 'Amendment 3 highlights',
    icon: AlertCircle,
    description: 'Latest updates and enhanced requirements introduced by Amendment 3.',
  },
];

export default function BS7671Module8() {
  useSEO({
    title: 'Module 8: Reference Materials & Amendment 3 | BS 7671 | Elec-Mate',
    description:
      'Master the BS 7671 appendices, Zs tables, conductor sizing, schedules and Amendment 3 highlights.',
  });

  return (
    <ModuleShell
      backTo="../bs7671-course"
      backLabel="18th edition (BS 7671)"
      moduleNumber={8}
      title="Reference materials and Amendment 3"
      description="Master the appendices, documentation tools and the latest Amendment 3 updates."
      tone="yellow"
      sectionsCount={sections.length}
      duration="45 mins"
      prevModuleHref="../bs7671-module-7"
      prevModuleLabel="Special installations and locations"
      nextModuleHref="../bs7671-module-9"
      nextModuleLabel="Mock exam"
    >
      {sections.map((section, index) => (
        <SectionCard
          key={section.id}
          to={`../bs7671-module-8-section-${section.id}`}
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
