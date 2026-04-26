import { FileText, Gavel, Shield, AlertTriangle, Recycle } from 'lucide-react';
import { ModuleCard } from '@/components/apprentice-courses/ModuleCard';
import { SectionShell } from '@/components/study-centre/shells';

const subsections = [
  {
    number: 'Subsection 1',
    title: 'The Health and Safety at Work Act 1974',
    description:
      'Foundation legislation establishing the general duties of employers and employees.',
    icon: FileText,
    href: '1-1',
  },
  {
    number: 'Subsection 2',
    title: 'The Electricity at Work Regulations 1989',
    description: 'Specific regulations governing electrical work and safety requirements.',
    icon: Shield,
    href: '1-2',
  },
  {
    number: 'Subsection 3',
    title: 'Other key regulations (RIDDOR, PUWER, COSHH)',
    description: 'Additional regulations affecting electrical work environments.',
    icon: Gavel,
    href: '1-3',
  },
  {
    number: 'Subsection 4',
    title: 'The role of regulatory bodies',
    description: 'Understanding HSE, enforcement and compliance responsibilities.',
    icon: AlertTriangle,
    href: '1-4',
  },
  {
    number: 'Subsection 5',
    title: 'Environmental legislation and waste',
    description:
      'EPA 1990, Hazardous Waste Regs, WEEE, GB CLP pictograms — the rules covering everything that leaves the van.',
    icon: Recycle,
    href: '1-5',
  },
];

export default function Section1() {
  return (
    <SectionShell
      backTo=".."
      backLabel="Module 1"
      moduleNumber={1}
      sectionNumber={1}
      title="UK health and safety legislation"
      description="Essential legislation and regulations governing electrical work safety — HASAWA, EAWR and the supporting regs."
      tone="emerald"
      subsectionsCount={subsections.length}
      nextSectionHref="../section2"
      nextSectionLabel="Common electrical hazards"
      aboveGrid={
        <div className="max-w-3xl space-y-3 pt-2">
          <p className="text-white/80 leading-relaxed text-[14px] sm:text-[15px]">
            Section 1 is the legal floor under every job you’ll ever do. Before
            you can talk about hazards, controls or PPE, you need the regs that
            decide who is responsible for what — and what happens when those
            duties get ignored. Get this section solid and the rest of Module 1
            stops looking like rules and starts looking like the framework that
            keeps you out of court and your customer alive.
          </p>
          <p className="text-white/80 leading-relaxed text-[14px] sm:text-[15px]">
            We open with{' '}
            <span className="text-white font-medium">Sub 1</span> — HASAWA 1974,
            the umbrella safety law every other reg sits underneath.{' '}
            <span className="text-white font-medium">Sub 2</span> covers the
            electrical version, EAWR 1989 — the reg behind every prove-dead and
            every lock-off.{' '}
            <span className="text-white font-medium">Sub 3</span> picks up the
            supporting acronyms (RIDDOR, PUWER, COSHH and friends) that handle
            the risks HASAWA doesn’t name directly.{' '}
            <span className="text-white font-medium">Sub 4</span> introduces the
            regulatory bodies — HSE, NICEIC, JIB, IET — so you know who does
            what and who to call when.{' '}
            <span className="text-white font-medium">Sub 5</span> closes with
            environmental legislation and waste — the EPA, WEEE and the GB CLP
            pictograms that govern everything that leaves the van.
          </p>
          <p className="text-white/80 leading-relaxed text-[14px] sm:text-[15px]">
            By the end you’ll be able to name the regs that apply to a job,
            point to the duty-holder for each one, and recognise when something
            on site has crossed a legal line — not just an etiquette one.
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
