import { Phone, Accessibility, Handshake, AlertTriangle } from 'lucide-react';
import { ModuleCard } from '@/components/apprentice-courses/ModuleCard';
import { SectionShell } from '@/components/study-centre/shells';

const subsections = [
  {
    number: '3.1',
    title: 'Suitable verbal communication methods (3.1)',
    description:
      'Face-to-face, phone, two-way radio — when each one fits and how to keep the message clean.',
    icon: Phone,
    href: '3-1',
  },
  {
    number: '3.2',
    title: 'Communicating across disabilities and language differences (3.2)',
    description:
      'Adapting how you talk to people with physical disabilities, learning difficulties or English as a second language.',
    icon: Accessibility,
    href: '3-2',
  },
  {
    number: '3.3',
    title: 'Resolving conflicts between persons (3.3)',
    description:
      'Conflicts between customers, co-workers and supervisors — defusing them without losing the job or the team.',
    icon: Handshake,
    href: '3-3',
  },
  {
    number: '3.4',
    title: 'Effects of poor communication (3.4)',
    description:
      'Safety incidents, blown budgets, missed deadlines, lost customers — what bad comms actually costs an organisation.',
    icon: AlertTriangle,
    href: '3-4',
  },
];

export default function Section3() {
  return (
    <SectionShell
      backTo=".."
      backLabel="Module 5"
      moduleNumber={5}
      sectionNumber={3}
      title="Communication methods"
      description="Verbal methods, comms across disabilities and languages, resolving conflict and the cost of getting it wrong — aligned to LO3 of Unit 210."
      tone="emerald"
      subsectionsCount={subsections.length}
      prevSectionHref="../section2"
      prevSectionLabel="Information sources"
      aboveGrid={
        <div className="max-w-3xl space-y-3 pt-2">
          <p className="text-white/80 leading-relaxed text-[14px] sm:text-[15px]">
            Communication on a building site is a working tool, the same as a
            screwdriver. Use the wrong one for the job and the work suffers — too
            casual with the client and they lose confidence, too formal with the
            labourer and nothing gets done, the wrong tone with the supervisor and you're
            looking for new work.
          </p>
          <p className="text-white/80 leading-relaxed text-[14px] sm:text-[15px]">
            Sub 3.1 covers the verbal methods you'll use every shift. Sub 3.2 takes
            those methods and adapts them for people with disabilities or language
            differences. Sub 3.3 walks you through how to handle conflict when it kicks
            off. Sub 3.4 finishes on what poor communication actually costs — in
            money, in safety, and in reputation.
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
