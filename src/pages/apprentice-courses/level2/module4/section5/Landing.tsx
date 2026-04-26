import { Eye } from 'lucide-react';
import { ModuleCard } from '@/components/apprentice-courses/ModuleCard';
import { SectionShell } from '@/components/study-centre/shells';

const subsections = [
  {
    number: '5.1',
    title: 'Visual inspection — what to check before energising (5.1)',
    description:
      'The structured walk-round of a dead installation — connections, identification, protective devices, isolation, before any test instrument touches the board.',
    icon: Eye,
    href: '5-1',
  },
];

export default function Section5() {
  return (
    <SectionShell
      backTo=".."
      backLabel="Module 4"
      moduleNumber={4}
      sectionNumber={5}
      title="Inspecting a dead installation"
      description="The visual checks you carry out before any test instrument touches the board — aligned to LO5 of Unit 204."
      tone="emerald"
      subsectionsCount={subsections.length}
      prevSectionHref="../section4"
      prevSectionLabel="Bonding mains services"
      nextSectionHref="../section6"
      nextSectionLabel="Testing a dead installation"
      aboveGrid={
        <div className="max-w-3xl space-y-3 pt-2">
          <p className="text-white/80 leading-relaxed text-[14px] sm:text-[15px]">
            Section 5 is the dead inspection — the structured walk-round of an
            installation before any test lead touches it. Most defects on an EICR are
            spotted with eyes, not instruments. Get this right and the dead-test stage
            in Section 6 is just confirmation rather than discovery.
          </p>
          <p className="text-white/80 leading-relaxed text-[14px] sm:text-[15px]">
            Sub 5.1 walks the schedule of inspections from BS 7671 Appendix 6 —
            connections, identification, protective devices, isolation, signage,
            workmanship and notices. The single Sub here at L2 covers the inspection
            you carry out before energising; the broader EICR-style inspection
            framework gets the full treatment in the I&T qualification.
          </p>
        </div>
      }
    >
      {subsections.map((subsection, index) => (
        <ModuleCard
          key={index}
          number={subsection.number}
          title={subsection.title}
          description={subsection.description}
          icon={subsection.icon}
          href={subsection.href}
        />
      ))}
    </SectionShell>
  );
}
