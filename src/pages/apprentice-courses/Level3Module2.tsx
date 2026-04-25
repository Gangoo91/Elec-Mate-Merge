import { FileText, Zap, Sun, Leaf, Settings, Recycle } from 'lucide-react';
import { SectionCard } from '@/components/upskilling/cards';
import { ModuleShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const sections = [
  {
    id: 1,
    title: 'Environmental legislation and standards',
    description: 'Environmental laws, regulations and standards affecting electrical installations.',
    icon: FileText,
  },
  {
    id: 2,
    title: 'Energy efficiency in electrical installations',
    description: 'Techniques and technologies for improving energy efficiency in electrical systems.',
    icon: Zap,
  },
  {
    id: 3,
    title: 'Renewable energy systems',
    description: 'Solar, wind and other renewable energy technologies and their applications.',
    icon: Sun,
  },
  {
    id: 4,
    title: 'Low carbon technologies',
    description: 'Carbon reduction technologies and their integration in building services.',
    icon: Leaf,
  },
  {
    id: 5,
    title: 'Integration with electrical installations',
    description: 'Incorporating environmental technologies into conventional electrical systems.',
    icon: Settings,
  },
  {
    id: 6,
    title: 'Sustainable working practices',
    description: 'Environmentally responsible working methods and waste management practices.',
    icon: Recycle,
  },
];

export default function Level3Module2() {
  useSEO({
    title: 'Module 2: Environmental Technology | Level 3 Electrical Installation | Elec-Mate',
    description:
      'Environmental legislation, energy efficiency, renewable energy, low carbon technologies and sustainable working practices for electrical installations.',
  });

  return (
    <ModuleShell
      backTo="../level3"
      backLabel="Level 3 electrical installation"
      moduleNumber={2}
      title="Environmental technology systems"
      description="Energy efficiency, renewable energy, low carbon technologies and sustainable practice for modern electrical installations."
      tone="blue"
      sectionsCount={sections.length}
      duration="60 mins"
      prevModuleHref="../level3-module1"
      prevModuleLabel="Health and safety in building services engineering"
      nextModuleHref="../level3-module3"
      nextModuleLabel="Electrical science principles"
    >
      {sections.map((section, index) => (
        <SectionCard
          key={section.id}
          to={`../level3-module2-section${section.id}`}
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
