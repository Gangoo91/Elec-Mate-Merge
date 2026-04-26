import { Eye, ListChecks, ClipboardList, AlertTriangle } from 'lucide-react';
import { ModuleCard } from '@/components/apprentice-courses/ModuleCard';
import { SectionShell } from '@/components/study-centre/shells';

const subsections = [
  {
    number: '5.1',
    title: 'Verify wiring systems conform to IET standards (5.1)',
    description:
      'The dead inspection per BS 7671 Section 642 — visual checks tied to every relevant chapter, before any test instrument touches the board.',
    icon: Eye,
    href: '5-1',
  },
  {
    number: '5.2',
    title: 'Schedule of Inspections walkthrough',
    description:
      'Walk every line of the IET model Schedule of Inspections (Appendix 6) — what each item asks for, how to verify it visually, and how to record limitations.',
    icon: ListChecks,
    href: '5-2',
  },
  {
    number: '5.3',
    title: 'Dead testing — preparation and sequence',
    description:
      'The BS 7671 Reg 643 dead-test sequence in order — continuity, ring final, insulation resistance, polarity, earth electrode — with the prep that makes it work.',
    icon: ClipboardList,
    href: '5-3',
  },
  {
    number: '5.4',
    title: 'Common non-conformances on first inspection',
    description:
      'The classic apprentice traps a supervisor catches — terminations, polarity, missing CPC, wrong RCD type, AFDD gaps, missing notices — and how to avoid them.',
    icon: AlertTriangle,
    href: '5-4',
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
      description="The structured visual inspection of a finished but unenergised installation — aligned to LO5 of Unit 204 and BS 7671 Section 642."
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
            installation before any test lead touches it. Most defects on a finished
            install are spotted with eyes, not instruments. Get this right and the
            dead-test stage in Section 6 is just confirmation rather than discovery.
          </p>
          <p className="text-white/80 leading-relaxed text-[14px] sm:text-[15px]">
            Sub 5.1 covers the inspection per BS 7671 Section 642 and how it maps to
            AC 5.1 — verifying every part of the install against the IET standard.
            Sub 5.2 walks every line of the model Schedule of Inspections from
            Appendix 6. Sub 5.3 lays out the dead-test preparation and the Reg 643
            test sequence ready for Section 6. Sub 5.4 covers the classic
            non-conformances a supervisor will flag on a first inspection — what they
            look for, how to fix them and how to avoid them next time.
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
