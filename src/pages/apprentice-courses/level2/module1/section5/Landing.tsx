import { Power, ClipboardCheck, Lock, Settings, AlertTriangle } from 'lucide-react';
import { ModuleCard } from '@/components/apprentice-courses/ModuleCard';
import { SectionShell } from '@/components/study-centre/shells';

const subsections = [
  {
    number: 'Subsection 1',
    title: 'Why safe isolation matters',
    description:
      'The single most important habit on site — around 30 electricians a year die at work in the UK and dead-by-default is the law, not a suggestion.',
    icon: Power,
    href: '5-1',
  },
  {
    number: 'Subsection 2',
    title: 'The safe isolation procedure',
    description:
      'The seven steps the JIB, NET and IET expect from a competent person — from identifying the correct point of isolation to confirming reinstatement.',
    icon: ClipboardCheck,
    href: '5-2',
  },
  {
    number: 'Subsection 3',
    title: 'Lock-off, tag-out and prove–test–prove',
    description:
      'The kit on your belt that turns the procedure into reality — padlocks, multi-hasps, tags, GS38 voltage indicators, proving units.',
    icon: Lock,
    href: '5-3',
  },
  {
    number: 'Subsection 4',
    title: 'Safe isolation in different scenarios',
    description:
      'The same seven steps adapted for three-phase distribution, sub-mains, fault-finding, PV, EV, generators and UPS — the places where second sources catch people out.',
    icon: Settings,
    href: '5-4',
  },
  {
    number: 'Subsection 5',
    title: 'When safe isolation goes wrong',
    description:
      'The failure modes that show up over and over in HSE prosecutions — backfeeds, locked-off-but-live, mis-labelled breakers, single-pole isolation of three-phase.',
    icon: AlertTriangle,
    href: '5-5',
  },
];

export default function Section5() {
  return (
    <SectionShell
      backTo=".."
      backLabel="Module 1"
      moduleNumber={1}
      sectionNumber={5}
      title="Safe isolation procedures"
      description="Step-by-step procedures for safely isolating electrical circuits before work."
      tone="emerald"
      subsectionsCount={subsections.length}
      prevSectionHref="../section4"
      prevSectionLabel="PPE and safe working practices"
      nextSectionHref="../section6"
      nextSectionLabel="Accidents, RIDDOR and emergency response"
      aboveGrid={
        <div className="max-w-3xl space-y-3 pt-2">
          <p className="text-white/80 leading-relaxed text-[14px] sm:text-[15px]">
            Section 4 covered the PPE and the daily habits. Section 5 is the
            single most important habit of the lot — safe isolation. Around 30
            electricians a year die at work in the UK and most of them are on the
            same 230 V and 400 V systems you’ll work on every day. Get this
            section into muscle memory and it’s the one habit you’ll never
            need to think about again.
          </p>
          <p className="text-white/80 leading-relaxed text-[14px] sm:text-[15px]">
            <span className="text-white font-medium">Sub 1</span> covers WHY —
            the EAWR duty that makes dead-by-default the legal default, the
            HSE fatality numbers, the criminal liability that sits on the
            individual.{' '}
            <span className="text-white font-medium">Sub 2</span> walks through
            the seven-step procedure the JIB, NET and IET expect from a
            competent person.{' '}
            <span className="text-white font-medium">Sub 3</span> covers the
            kit — lock-off devices, multi-hasps, tags, GS38 voltage indicators
            and the prove–test–prove rule.{' '}
            <span className="text-white font-medium">Sub 4</span> adapts the
            same seven steps to the rest of the trade — three-phase
            distribution, sub-mains, fault-finding, PV, EV, generators, UPS —
            the places where a second source of supply catches people out.{' '}
            <span className="text-white font-medium">Sub 5</span> closes with
            the failure modes that show up over and over in HSE prosecutions
            — knowing the patterns is half the defence.
          </p>
          <p className="text-white/80 leading-relaxed text-[14px] sm:text-[15px]">
            By the end you’ll be able to isolate any circuit you meet on a UK
            installation, prove it dead with the right kit in the right order,
            and recognise the second-source traps that turn a routine
            isolation into a fatality.
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
