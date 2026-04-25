import { BarChart3, BookOpen, GraduationCap, Users } from 'lucide-react';
import { SectionCard } from '@/components/upskilling/cards';
import { ModuleShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const sections = [
  {
    id: 1,
    title: 'Measuring progress & celebrating wins',
    icon: BarChart3,
    description:
      'Lead vs lag measures, key metrics for electricians, tracking methods, the psychology of progress, celebrating milestones, the comparison trap and handling plateaus.',
  },
  {
    id: 2,
    title: 'Reflective practice & learning from experience',
    icon: BookOpen,
    description:
      'Kolb experiential learning cycle, Schon reflection-in/on-action, Gibbs reflective cycle, daily debrief, learning from mistakes and a professional development journal.',
  },
  {
    id: 3,
    title: 'CPD & continuous professional development',
    icon: GraduationCap,
    description:
      'BS 7671 amendments, ECS card renewal CPD, IET professional registration, NICEIC/NAPIT assessments, types of CPD, CITB training grants and building a CPD plan.',
  },
  {
    id: 4,
    title: 'Accountability & support systems',
    icon: Users,
    description:
      'The accountability effect, types of accountability, finding accountability in trades, mentoring, a personal board of advisers and support for the self-employed.',
  },
];

export default function GSModule4() {
  useSEO({
    title: 'Module 4: Tracking progress & continuous improvement | Goal Setting & Growth',
    description:
      'Measuring progress, reflective practice, CPD and continuous professional development, and accountability and support systems.',
  });

  return (
    <ModuleShell
      backTo="../goal-setting-growth"
      backLabel="Goal setting & continuous growth"
      moduleNumber={4}
      title="Tracking progress & continuous improvement"
      description="How to measure progress effectively, learn from experience, maintain continuous professional development and build accountability systems that keep you moving forward."
      tone="purple"
      sectionsCount={sections.length}
      duration="40 mins"
      prevModuleHref="../gs-module-3"
      prevModuleLabel="Building habits that stick"
      nextModuleHref="../gs-module-5"
      nextModuleLabel="Your growth action plan"
    >
      {sections.map((section, index) => (
        <SectionCard
          key={section.id}
          to={`../gs-module-4-section-${section.id}`}
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
