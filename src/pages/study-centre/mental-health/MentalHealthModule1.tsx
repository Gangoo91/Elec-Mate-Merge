import { Brain, Users, Briefcase, MessageCircle } from 'lucide-react';
import { SectionCard } from '@/components/upskilling/cards';
import { ModuleShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const sections = [
  {
    id: 1,
    title: 'Mental health awareness & the spectrum',
    icon: Brain,
    description:
      'Mental health vs mental illness, the continuum model, prevalence, impact on work, myths and stigma in construction.',
  },
  {
    id: 2,
    title: "The Mental Health First Aider's role",
    icon: Users,
    description:
      'MHFA England framework, ALGEE action plan, boundaries, confidentiality, duty of care vs duty to refer.',
  },
  {
    id: 3,
    title: 'Workplace mental health framework',
    icon: Briefcase,
    description:
      'HSE Management Standards, Health & Safety at Work Act 1974, Equality Act 2010, reasonable adjustments, risk assessments.',
  },
  {
    id: 4,
    title: 'Communication skills & active listening',
    icon: MessageCircle,
    description:
      'Non-judgemental listening, open questions, reflective techniques, body language, cultural sensitivity.',
  },
];

export default function MentalHealthModule1() {
  useSEO({
    title: 'Module 1: Understanding mental health & the MHFA role | Mental Health First Aid | Elec-Mate',
    description:
      'Mental health awareness, the MHFA role, workplace framework, communication skills and active listening.',
  });

  return (
    <ModuleShell
      backTo="../mental-health-course"
      backLabel="Mental Health First Aid"
      moduleNumber={1}
      title="Understanding mental health & the MHFA role"
      description="Mental health awareness, the role and responsibilities of a Mental Health First Aider, workplace legislation and communication skills."
      tone="purple"
      sectionsCount={sections.length}
      duration="40 mins"
      nextModuleHref="../mental-health-module-2"
      nextModuleLabel="Depression, anxiety & stress"
    >
      {sections.map((section, index) => (
        <SectionCard
          key={section.id}
          to={`../mental-health-module-1-section-${section.id}`}
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
