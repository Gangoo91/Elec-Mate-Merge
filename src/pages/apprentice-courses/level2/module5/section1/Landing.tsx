import {
  HardHat,
  Hammer,
  ClipboardCheck,
  ShieldCheck,
  GraduationCap,
} from 'lucide-react';
import { ModuleCard } from '@/components/apprentice-courses/ModuleCard';
import { SectionShell } from '@/components/study-centre/shells';

const subsections = [
  {
    number: '1.1',
    title: 'Site management team key roles (1.1)',
    description:
      'Project Manager, Site Manager, Foreman, Charge-hand on the main side; Contracts Manager, Project Engineer, Approved Electrician, Mentor on the electrical side. Who outranks who and who you actually answer to.',
    icon: HardHat,
    href: '1-1',
  },
  {
    number: '1.2',
    title: 'Individuals reporting to site management (1.2)',
    description:
      'Trades and operatives at the work face — electricians, plumbers, joiners, plasterers, gas-safe engineers, painters, plant operators, labourers, banksmen and slingers. JIB grades and your apprentice peer group.',
    icon: Hammer,
    href: '1-2',
  },
  {
    number: '1.3',
    title: 'Site visitors key roles (1.3)',
    description:
      'Building Inspector, HSE Inspector, Local Authority EHO, scheme assessors (NICEIC, NAPIT, ELECSA), Designer, CDM Principal Designer, Client representative — who turns up on site, why and what they want.',
    icon: ClipboardCheck,
    href: '1-3',
  },
  {
    number: '1.4',
    title: 'CDM 2015 framework — your duties as Worker',
    description:
      'Client, Principal Designer, Designer, Principal Contractor, Contractor, Worker — the CDM 2015 cascade and what Reg 15 puts on you personally. The framework that makes Subs 1.1, 1.2 and 1.3 make sense.',
    icon: ShieldCheck,
    href: '1-4',
  },
  {
    number: '1.5',
    title: 'Apprenticeship triangle + UK trade-body landscape',
    description:
      'College Tutor, Workplace Mentor, Employer — the three-way relationship that runs the apprenticeship. Plus EPA, schemes (NICEIC, NAPIT, ELECSA), trade bodies (ECA, SELECT, JIB) and industry charities.',
    icon: GraduationCap,
    href: '1-5',
  },
];

export default function Section1() {
  return (
    <SectionShell
      backTo=".."
      backLabel="Module 5"
      moduleNumber={5}
      sectionNumber={1}
      title="Construction team and site roles"
      description="The site management team, the trades reporting to them, the visitors who turn up — plus the CDM 2015 framework that wraps it all and the apprenticeship triangle that supports you. Aligned to LO1 of Unit 210."
      tone="emerald"
      subsectionsCount={subsections.length}
      nextSectionHref="../section2"
      nextSectionLabel="Information sources"
      aboveGrid={
        <div className="max-w-3xl space-y-3 pt-2">
          <p className="text-white/80 leading-relaxed text-[14px] sm:text-[15px]">
            A building site is a chain of command first and a job second. Walk
            on without knowing who's who and you'll either talk to the wrong
            person, take instructions from someone who can't give them, or
            miss the visitor whose sign-off you actually need.
          </p>
          <p className="text-white/80 leading-relaxed text-[14px] sm:text-[15px]">
            Subs 1.1 to 1.3 cover the three core ACs from Unit 210 LO1 — the
            site management team, the trades reporting to them, and the
            visitors who turn up. Sub 1.4 zooms out to the CDM 2015 framework
            that wraps it all and what Reg 15 puts on you personally as a
            Worker. Sub 1.5 covers the apprenticeship triangle (College
            Tutor, Workplace Mentor, Employer) and the wider UK trade-body
            landscape (ECA, SELECT, JIB, schemes, industry charities) that
            supports you across the apprenticeship.
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
