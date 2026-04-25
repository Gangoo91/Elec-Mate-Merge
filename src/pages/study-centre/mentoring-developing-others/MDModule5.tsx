import { AlertTriangle, Sparkles, Globe, TrendingUp } from 'lucide-react';
import { SectionCard } from '@/components/upskilling/cards';
import { ModuleShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const sections = [
  {
    id: 1,
    title: 'Difficult mentoring situations',
    icon: AlertTriangle,
    description:
      'The reluctant learner, the overconfident learner, repetitive mistakes, personal problems, generational differences.',
  },
  {
    id: 2,
    title: 'Maintaining motivation & engagement',
    icon: Sparkles,
    description:
      'Self-Determination Theory in practice, growth mindset (Dweck), flow states, recognition, connecting work to goals.',
  },
  {
    id: 3,
    title: 'Diversity, inclusion & cross-cultural mentoring',
    icon: Globe,
    description:
      'Equality Act 2010, unconscious bias, language barriers, neurodiversity, gender in a male-dominated industry.',
  },
  {
    id: 4,
    title: 'Your development as a mentor',
    icon: TrendingUp,
    description:
      'Reflective practice, seeking feedback, CPD pathways, building a mentoring portfolio, the ripple effect.',
  },
];

export default function MDModule5() {
  useSEO({
    title: 'Module 5: Challenging situations & professional growth | Mentoring & developing others | Elec-Mate',
    description:
      'Difficult mentoring situations, maintaining motivation, diversity and inclusion, and your development as a mentor.',
  });

  return (
    <ModuleShell
      backTo="../mentoring-developing-others"
      backLabel="Mentoring & developing others"
      moduleNumber={5}
      title="Challenging situations & professional growth"
      description="Handling difficult mentoring scenarios, keeping learners motivated, embracing diversity, and developing your own practice as a mentor."
      tone="indigo"
      sectionsCount={sections.length}
      duration="40 mins"
      prevModuleHref="../md-module-4"
      prevModuleLabel="Assessment & evaluation"
      nextModuleHref="../md-module-6"
      nextModuleLabel="Mock exam"
    >
      {sections.map((section, index) => (
        <SectionCard
          key={section.id}
          to={`../md-module-5-section-${section.id}`}
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
