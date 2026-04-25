import { Building2, Building, UserCog, Sunset } from 'lucide-react';
import { SectionCard } from '@/components/upskilling/cards';
import { ModuleShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const sections = [
  {
    id: 1,
    title: 'State Pension basics',
    icon: Building2,
    description:
      'Full new State Pension amount, qualifying years, NI contributions, checking your forecast and State Pension age.',
  },
  {
    id: 2,
    title: 'Workplace pensions & auto-enrolment',
    icon: Building,
    description:
      'Pensions Act 2008, minimum contributions, JIB pension scheme, NEST, opting out and employer duties.',
  },
  {
    id: 3,
    title: 'Self-employed pension options',
    icon: UserCog,
    description:
      'The pension gap, SIPPs, stakeholder pensions, how much to save, investment basics and making it happen.',
  },
  {
    id: 4,
    title: 'Planning for retirement',
    icon: Sunset,
    description:
      'How much you need, pension freedoms, career transition planning, the three-pot approach and pension calculators.',
  },
];

export default function PFModule4() {
  useSEO({
    title:
      'Module 4: Pensions & retirement planning | Personal finance & financial wellbeing | Elec-Mate',
    description:
      'State Pension basics, workplace pensions, self-employed pension options and planning for retirement.',
  });

  return (
    <ModuleShell
      backTo="../personal-finance"
      backLabel="Personal finance & financial wellbeing"
      moduleNumber={4}
      title="Pensions & retirement planning"
      description="The State Pension, workplace and self-employed pension options, and how to plan for a comfortable retirement as a tradesperson."
      tone="purple"
      sectionsCount={sections.length}
      duration="50 mins"
      prevModuleHref="../pf-module-3"
      prevModuleLabel="Debt management & credit"
      nextModuleHref="../pf-module-5"
      nextModuleLabel="Financial protection & planning ahead"
    >
      {sections.map((section, index) => (
        <SectionCard
          key={section.id}
          to={`../pf-module-4-section-${section.id}`}
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
