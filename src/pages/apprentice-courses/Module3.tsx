import { Cable, Package, Wrench, Cog, Cloud, CheckCircle } from 'lucide-react';
import { SectionCard } from '@/components/upskilling/cards';
import { ModuleShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const sections = [
  {
    id: 1,
    title: 'Wiring systems and cable types',
    icon: Cable,
    description: 'Different wiring systems, cable classifications and their applications.',
    href: 'section1',
  },
  {
    id: 2,
    title: 'Cable containment systems',
    icon: Package,
    description: 'Methods and systems for containing, protecting and supporting electrical cables.',
    href: 'section2',
  },
  {
    id: 3,
    title: 'Electrical tools and equipment',
    icon: Wrench,
    description: 'Essential tools, equipment and testing instruments for installation work.',
    href: 'section3',
  },
  {
    id: 4,
    title: 'Installation methods and techniques',
    icon: Cog,
    description: 'Practical installation methods and techniques for electrical systems.',
    href: 'section4',
  },
  {
    id: 5,
    title: 'Environmental considerations and external influences',
    icon: Cloud,
    description: 'Environmental factors affecting installations and protective measures.',
    href: 'section5',
  },
  {
    id: 6,
    title: 'Installation standards and best practice',
    icon: CheckCircle,
    description: 'Industry standards, regulations and best-practice guidelines for electrical work.',
    href: 'section6',
  },
];

export default function Module3() {
  useSEO({
    title: 'Module 3: Installation Methods and Technology | Level 2 Electrical | Elec-Mate',
    description:
      'Wiring systems, containment, tools, installation techniques, environmental factors and industry standards.',
  });

  return (
    <ModuleShell
      backTo=".."
      backLabel="Level 2 electrical installation"
      moduleNumber={3}
      title="Installation methods and technology"
      description="Wiring systems, cable containment, tools, installation techniques, environmental factors and standards."
      tone="emerald"
      sectionsCount={sections.length}
      prevModuleHref="../module2"
      prevModuleLabel="Principles of electrical science"
      nextModuleHref="../module4"
      nextModuleLabel="Installing wiring systems and enclosures"
    >
      {sections.map((section, index) => (
        <SectionCard
          key={section.id}
          to={section.href}
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
