import { Globe, Scale, Search, Lightbulb } from 'lucide-react';
import { SectionCard } from '@/components/upskilling/cards';
import { ModuleShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const sections = [
  {
    id: 1,
    title: 'What is environmental management?',
    icon: Globe,
    description:
      'Principles of environmental management, how organisations identify and control their environmental impacts, and why it matters on construction sites.',
  },
  {
    id: 2,
    title: 'Key environmental legislation',
    icon: Scale,
    description:
      'Environmental Protection Act 1990, Environment Act 2021, Clean Air Act, and other key legislation governing environmental responsibilities on site.',
  },
  {
    id: 3,
    title: 'Environmental impact assessment',
    icon: Search,
    description:
      'How environmental impact assessments are carried out, when they are required, the screening and scoping process, and how findings influence project decisions.',
  },
  {
    id: 4,
    title: 'Sustainability principles',
    icon: Lightbulb,
    description:
      'The three pillars of sustainability (environmental, social, economic), circular economy thinking, and how tradespeople contribute to sustainable construction.',
  },
];

export default function EnvironmentalSustainabilityModule1() {
  useSEO({
    title: 'Module 1: Environmental Awareness | Environmental & Sustainability | Elec-Mate',
    description:
      'Environmental management principles, key legislation, impact assessments and sustainability fundamentals for site-based tradespeople.',
  });

  return (
    <ModuleShell
      backTo="../environmental-sustainability-course"
      backLabel="Environmental & sustainability"
      moduleNumber={1}
      title="Environmental awareness"
      description="Fundamentals of environmental management, key legislation, how impact assessments are conducted, and the core principles of sustainability in construction."
      tone="emerald"
      sectionsCount={sections.length}
      duration="30 mins"
      nextModuleHref="../environmental-sustainability-module-2"
      nextModuleLabel="Waste management"
    >
      {sections.map((section, index) => (
        <SectionCard
          key={section.id}
          to={`../environmental-sustainability-module-1-section-${section.id}`}
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
