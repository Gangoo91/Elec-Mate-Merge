import { Zap, Heart, ClipboardList, Search, Flame, Siren } from 'lucide-react';
import { ModuleCard } from '@/components/apprentice-courses/ModuleCard';
import { SectionShell } from '@/components/study-centre/shells';

const subsections = [
  {
    number: 'Subsection 1',
    title: 'First response to electric shock',
    description:
      'The first 60 seconds when a mate gets caught on a live conductor — isolate first, DR ABC, recovery position, when to start CPR.',
    icon: Zap,
    href: '6-1',
  },
  {
    number: 'Subsection 2',
    title: 'First aid for electrical injuries',
    description:
      'Burns, arc eye, AED, cardiac arrhythmia — what actually goes wrong with a body after current passes through it, and the right treatment for each.',
    icon: Heart,
    href: '6-2',
  },
  {
    number: 'Subsection 3',
    title: 'RIDDOR — what must be reported',
    description:
      'The legal duty to report serious accidents to the HSE — the four reportable buckets, the clocks, the F2508, and what happens if you’re late.',
    icon: ClipboardList,
    href: '6-3',
  },
  {
    number: 'Subsection 4',
    title: 'Accident investigation & lessons learned',
    description:
      'Why incidents get investigated — to LEARN, not to blame. Root cause analysis, the 5 Whys, the four-stage HSE model.',
    icon: Search,
    href: '6-4',
  },
  {
    number: 'Subsection 5',
    title: 'Fire emergency procedures',
    description:
      'Fire alarm, evacuation, the six fire classes, the right extinguisher for each, the PASS technique and the special cases — lithium-ion, switchgear arc, hot works.',
    icon: Flame,
    href: '6-5',
  },
  {
    number: 'Subsection 6',
    title: 'General workplace emergency procedures',
    description:
      'Gas leaks, structural collapse, extreme weather, security incidents, mental health crises — the responses for everything that isn’t fire or shock.',
    icon: Siren,
    href: '6-6',
  },
];

export default function Section6() {
  return (
    <SectionShell
      backTo=".."
      backLabel="Module 1"
      moduleNumber={1}
      sectionNumber={6}
      title="Accidents, RIDDOR and emergency response"
      description="What to do when something goes wrong — first response, first aid, RIDDOR reporting, fire and the wider workplace emergencies."
      tone="emerald"
      subsectionsCount={subsections.length}
      prevSectionHref="../section5"
      prevSectionLabel="Safe isolation procedures"
      aboveGrid={
        <div className="max-w-3xl space-y-3 pt-2">
          <p className="text-white/80 leading-relaxed text-[14px] sm:text-[15px]">
            Sections 1 to 5 covered keeping things from going wrong. Section 6
            is what happens when they do anyway. Every emergency you’ll ever
            meet on a UK site comes down to the same skeleton response — stop,
            make safe if you can, evacuate, escalate, stay until released —
            with the specifics changing per emergency. Get this section solid
            and you’ll be the colleague people are glad is there when the
            alarm goes off.
          </p>
          <p className="text-white/80 leading-relaxed text-[14px] sm:text-[15px]">
            <span className="text-white font-medium">Sub 1</span> covers the
            first 60 seconds after a mate gets caught on a live conductor —
            isolate first, DR ABC, recovery position, CPR.{' '}
            <span className="text-white font-medium">Sub 2</span> goes deeper
            on the medical side — electrical burns, arc eye, AED use, cardiac
            arrhythmia — and the rules every first aid box runs on.{' '}
            <span className="text-white font-medium">Sub 3</span> covers RIDDOR
            — the legal duty to report serious accidents to the HSE, who
            reports, the F2508 form, the clocks.{' '}
            <span className="text-white font-medium">Sub 4</span> covers
            accident investigation and lessons learned — root cause analysis,
            the 5 Whys, how learning actually changes site behaviour.{' '}
            <span className="text-white font-medium">Sub 5</span> covers fire
            — the six classes, the right extinguisher for each, the PASS
            technique and the special cases (lithium-ion, switchgear arc, hot
            works).{' '}
            <span className="text-white font-medium">Sub 6</span> closes
            Module 1 with the wider workplace emergencies — gas leaks,
            structural collapse, extreme weather, security, mental health.
          </p>
          <p className="text-white/80 leading-relaxed text-[14px] sm:text-[15px]">
            By the end you’ll be able to respond to any emergency on a UK
            site, know who to call and when, file a RIDDOR report correctly,
            and feed lessons back into the next RAMS — closing the loop on
            everything Module 1 has built.
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
