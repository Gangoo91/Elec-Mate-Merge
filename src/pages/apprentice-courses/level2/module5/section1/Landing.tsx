import { HardHat, Hammer, ClipboardCheck } from 'lucide-react';
import { ModuleCard } from '@/components/apprentice-courses/ModuleCard';
import { SectionShell } from '@/components/study-centre/shells';

const subsections = [
  {
    number: '1.1',
    title: 'Site management team roles (1.1)',
    description:
      'Project manager, site manager, foreman, supervisor — who outranks who and who you actually answer to.',
    icon: HardHat,
    href: '1-1',
  },
  {
    number: '1.2',
    title: 'Trades reporting to site management (1.2)',
    description:
      'Electricians, plumbers, joiners, plasterers, labourers — the trades on a typical job and how they slot together.',
    icon: Hammer,
    href: '1-2',
  },
  {
    number: '1.3',
    title: 'Site visitors and other roles (1.3)',
    description:
      'Clients, building control, DNO, HSE inspectors — the people who turn up unannounced and what they want.',
    icon: ClipboardCheck,
    href: '1-3',
  },
];

export default function Section1() {
  return (
    <SectionShell
      backTo=".."
      backLabel="Module 5"
      moduleNumber={5}
      sectionNumber={1}
      title="Site roles and team responsibilities"
      description="The site management team, the trades reporting to them, and the visitors you'll meet on every job — aligned to LO1 of Unit 210."
      tone="emerald"
      subsectionsCount={subsections.length}
      nextSectionHref="../section2"
      nextSectionLabel="Information sources"
      aboveGrid={
        <div className="max-w-3xl space-y-3 pt-2">
          <p className="text-white/80 leading-relaxed text-[14px] sm:text-[15px]">
            A building site is a chain of command first and a job second. Walk on
            without knowing who's who and you'll either talk to the wrong person, take
            instructions from someone who can't give them, or miss the visitor whose
            sign-off you actually need.
          </p>
          <p className="text-white/80 leading-relaxed text-[14px] sm:text-[15px]">
            Sub 1.1 covers the site management team — project manager down to supervisor.
            Sub 1.2 walks through the trades reporting to them and how the work
            interlocks. Sub 1.3 finishes on the visitors and inspectors who turn up,
            why they're there and what they want from you.
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
