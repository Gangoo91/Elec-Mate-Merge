import { Brain, RotateCcw, Layers, Flame } from 'lucide-react';
import { SectionCard } from '@/components/upskilling/cards';
import { ModuleShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const sections = [
  {
    id: 1,
    title: 'Adult learning theory',
    icon: Brain,
    description:
      "Knowles' six principles of andragogy, pedagogy vs andragogy, Bloom's Taxonomy mapped to construction training.",
  },
  {
    id: 2,
    title: "Kolb's experiential learning cycle",
    icon: RotateCcw,
    description:
      'Concrete experience, reflective observation, abstract conceptualisation, active experimentation and Honey & Mumford styles.',
  },
  {
    id: 3,
    title: 'Scaffolding & the zone of proximal development',
    icon: Layers,
    description:
      "Vygotsky's ZPD, Wood, Bruner & Ross scaffolding, Situational Leadership mapped to learner readiness.",
  },
  {
    id: 4,
    title: 'Motivation & barriers to learning',
    icon: Flame,
    description:
      'Intrinsic vs extrinsic motivation, Self-Determination Theory, common barriers in construction, legal duty to train.',
  },
];

export default function MDModule1() {
  useSEO({
    title: 'Module 1: How people learn | Mentoring & developing others | Elec-Mate',
    description:
      "Adult learning theory, Kolb's experiential learning cycle, scaffolding, the zone of proximal development, motivation and barriers to learning.",
  });

  return (
    <ModuleShell
      backTo="../mentoring-developing-others"
      backLabel="Mentoring & developing others"
      moduleNumber={1}
      title="How people learn"
      description="Foundational learning theory for mentors — understanding how adults learn, the role of experience, scaffolding, and what motivates or blocks learning on site."
      tone="indigo"
      sectionsCount={sections.length}
      duration="40 mins"
      nextModuleHref="../md-module-2"
      nextModuleLabel="The mentor's toolkit"
    >
      {sections.map((section, index) => (
        <SectionCard
          key={section.id}
          to={`../md-module-1-section-${section.id}`}
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
