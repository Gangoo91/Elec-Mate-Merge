import { Briefcase, Shield, Users, GraduationCap, TrendingUp } from 'lucide-react';
import { SectionCard } from '@/components/upskilling/cards';
import { ModuleShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const sections = [
  {
    id: 1,
    title: 'The electrical industry and career pathways',
    description: 'Industry roles, career progression routes and professional pathways.',
    icon: Briefcase,
  },
  {
    id: 2,
    title: 'Professional standards and responsibilities',
    description: 'Professional ethics, standards and responsibilities in electrical work.',
    icon: Shield,
  },
  {
    id: 3,
    title: 'Communication and teamworking',
    description: 'Effective communication skills and collaborative working practices.',
    icon: Users,
  },
  {
    id: 4,
    title: 'Continuing professional development',
    description: 'Lifelong learning, skills development and staying current with industry changes.',
    icon: GraduationCap,
  },
  {
    id: 5,
    title: 'Employment and business awareness',
    description: 'Employment skills, self-employment options and business development.',
    icon: TrendingUp,
  },
];

export default function Level3Module7() {
  useSEO({
    title: 'Module 7: Career Awareness and Professional Development | Level 3 Electrical Installation | Elec-Mate',
    description:
      'Industry pathways, professional standards, communication, continuing professional development and employment awareness for the electrical industry.',
  });

  return (
    <ModuleShell
      backTo="../level3"
      backLabel="Level 3 electrical installation"
      moduleNumber={7}
      title="Career awareness and professional development"
      description="Industry pathways, professional standards, communication, continuing professional development and business awareness."
      tone="blue"
      sectionsCount={sections.length}
      duration="50 mins"
      prevModuleHref="../level3-module6"
      prevModuleLabel="Electrical systems design"
      nextModuleHref="../level3-module8"
      nextModuleLabel="Mock exams and assessment"
    >
      {sections.map((section, index) => (
        <SectionCard
          key={section.id}
          to={`../level3-module7-section${section.id}`}
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
