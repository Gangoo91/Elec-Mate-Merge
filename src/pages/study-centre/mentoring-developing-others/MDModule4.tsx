import { Scale, Eye, BarChart3, MessageSquareWarning } from 'lucide-react';
import { SectionCard } from '@/components/upskilling/cards';
import { ModuleShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const sections = [
  {
    id: 1,
    title: 'Principles of assessment',
    icon: Scale,
    description:
      'VACSR principles, formative vs summative assessment, assessment types, competence-based language, assessment planning.',
  },
  {
    id: 2,
    title: 'Observation & questioning skills for assessment',
    icon: Eye,
    description:
      "Structured observation, Bloom's Taxonomy questioning, recording evidence, assessor bias awareness.",
  },
  {
    id: 3,
    title: "Kirkpatrick's four levels of training evaluation",
    icon: BarChart3,
    description:
      'Reaction, Learning, Behaviour, Results — evaluating training effectiveness beyond happy sheets.',
  },
  {
    id: 4,
    title: 'Giving assessment decisions & managing disagreement',
    icon: MessageSquareWarning,
    description:
      'Delivering "not yet competent" constructively, action planning, appeals process, internal quality assurance.',
  },
];

export default function MDModule4() {
  useSEO({
    title: 'Module 4: Assessment & evaluation | Mentoring & developing others | Elec-Mate',
    description:
      "Principles of assessment, observation and questioning skills, Kirkpatrick's four levels, and giving assessment decisions.",
  });

  return (
    <ModuleShell
      backTo="../mentoring-developing-others"
      backLabel="Mentoring & developing others"
      moduleNumber={4}
      title="Assessment & evaluation"
      description="How to assess learner competence fairly and reliably, evaluate training effectiveness, and deliver assessment decisions constructively."
      tone="indigo"
      sectionsCount={sections.length}
      duration="40 mins"
      prevModuleHref="../md-module-3"
      prevModuleLabel="Supporting apprentices"
      nextModuleHref="../md-module-5"
      nextModuleLabel="Challenging situations & professional growth"
    >
      {sections.map((section, index) => (
        <SectionCard
          key={section.id}
          to={`../md-module-4-section-${section.id}`}
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
