import { Search, ClipboardList, FileCheck, Shield } from 'lucide-react';
import { ModuleCard } from '@/components/apprentice-courses/ModuleCard';
import { SectionShell } from '@/components/study-centre/shells';

const subsections = [
  {
    number: 'Subsection 1',
    title: 'Purpose of Risk Assessments',
    description: 'Understanding why risk assessments are essential for electrical work',
    icon: Search,
    href: '3-1',
  },
  {
    number: 'Subsection 2',
    title: 'The Five Steps of Risk Assessment',
    description: 'Step-by-step process for conducting effective risk assessments',
    icon: ClipboardList,
    href: '3-2',
  },
  {
    number: 'Subsection 3',
    title: 'What is a Method Statement?',
    description: 'Documentation of safe working procedures and processes',
    icon: FileCheck,
    href: '3-3',
  },
  {
    number: 'Subsection 4',
    title: 'Working with RAMS on site',
    description:
      'How RAMS gets used live on site — toolbox talks, point-of-work checks, near-miss reporting and what to do when reality stops matching the plan.',
    icon: Shield,
    href: '3-4',
  },
];

export default function Section3() {
  return (
    <SectionShell
      backTo=".."
      backLabel="Module 1"
      moduleNumber={1}
      sectionNumber={3}
      title="Risk assessment and method statements"
      description="Planning and documenting safe working procedures for electrical installations."
      tone="emerald"
      subsectionsCount={subsections.length}
      prevSectionHref="../section2"
      prevSectionLabel="Common electrical hazards"
      nextSectionHref="../section4"
      nextSectionLabel="PPE and safe working practices"
      aboveGrid={
        <div className="max-w-3xl space-y-3 pt-2">
          <p className="text-white/80 leading-relaxed text-[14px] sm:text-[15px]">
            Section 2 named the hazards. Section 3 is the bit that turns those
            hazards into a written plan that controls them. Risk assessments
            and method statements (RAMS for short) are where the regs stop
            being a textbook and start being the piece of paper your supervisor
            hands you on Monday morning. Get this section solid and you’ll
            stop seeing RAMS as paperwork-to-sign and start seeing it as the
            plan that keeps you alive.
          </p>
          <p className="text-white/80 leading-relaxed text-[14px] sm:text-[15px]">
            <span className="text-white font-medium">Sub 1</span> covers why
            risk assessments exist in the first place — the legal duty under
            HASAWA and the Management Regs, and what happens to apprentices
            who treat them as paperwork.{' '}
            <span className="text-white font-medium">Sub 2</span> walks through
            the HSE’s five-step process — the same five steps used on every
            site from a single socket swap to a full commercial fit-out.{' '}
            <span className="text-white font-medium">Sub 3</span> turns those
            steps into method statements and safe systems of work — permits,
            isolations, toolbox talks layered on top.{' '}
            <span className="text-white font-medium">Sub 4</span> closes with
            working with RAMS live on site — toolbox talks each morning,
            point-of-work checks throughout the day, near-miss reporting, and
            what to do when reality stops matching the plan.
          </p>
          <p className="text-white/80 leading-relaxed text-[14px] sm:text-[15px]">
            By the end you’ll be able to read a RAMS, spot a control measure
            that doesn’t fit the actual job, and either escalate it or stop
            work — the muscle that makes the next two sections (PPE and safe
            isolation) actually count.
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
