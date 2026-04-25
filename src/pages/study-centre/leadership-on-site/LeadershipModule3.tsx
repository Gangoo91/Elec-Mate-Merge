import { Megaphone, Ear, ShieldAlert, PenLine } from 'lucide-react';
import { SectionCard } from '@/components/upskilling/cards';
import { ModuleShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const sections = [
  {
    id: 1,
    title: 'Running toolbox talks and site briefings',
    icon: Megaphone,
    description:
      'Planning, delivering and recording effective toolbox talks that keep your team engaged and informed.',
  },
  {
    id: 2,
    title: 'Active listening and asking questions',
    icon: Ear,
    description:
      'How to really hear what your team is telling you, open vs closed questions and reading between the lines.',
  },
  {
    id: 3,
    title: 'Having difficult conversations',
    icon: ShieldAlert,
    description:
      'Addressing poor performance, challenging behaviour and sensitive issues with confidence and fairness.',
  },
  {
    id: 4,
    title: 'Written communication — emails, reports, records',
    icon: PenLine,
    description:
      'Writing clear site reports, professional emails and keeping records that protect you and your team.',
  },
];

export default function LeadershipModule3() {
  useSEO({
    title: 'Module 3: Communication for Leaders | Leadership on Site | Elec-Mate',
    description:
      'Running toolbox talks, active listening, difficult conversations and written communication for site leaders.',
  });

  return (
    <ModuleShell
      backTo="../leadership-on-site"
      backLabel="Leadership on site"
      moduleNumber={3}
      title="Communication for leaders"
      description="Toolbox talks, active listening, handling difficult conversations and writing clear reports and records."
      tone="purple"
      sectionsCount={sections.length}
      duration="35 mins"
      prevModuleHref="../leadership-module-2"
      prevModuleLabel="Leading your team"
      nextModuleHref="../leadership-module-4"
      nextModuleLabel="Decision-making & problem-solving"
    >
      {sections.map((section, index) => (
        <SectionCard
          key={section.id}
          to={`../leadership-module-3-section-${section.id}`}
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
