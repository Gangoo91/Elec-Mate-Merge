import { Scale, FileText, Receipt, BookMarked } from 'lucide-react';
import { ModuleCard } from '@/components/apprentice-courses/ModuleCard';
import { SectionShell } from '@/components/study-centre/shells';

const subsections = [
  {
    number: '2.1',
    title: 'Statutory legislation and guidance (2.1)',
    description:
      'HASAWA, EAWR, BS 7671, HSE guidance — the legal and technical documents you have to know exist and where to find them.',
    icon: Scale,
    href: '2-1',
  },
  {
    number: '2.2',
    title: 'Workplace information (2.2)',
    description:
      'Drawings, specs, RAMS, work instructions, schedules — the day-to-day paperwork that tells you what to do and how.',
    icon: FileText,
    href: '2-2',
  },
  {
    number: '2.3',
    title: 'Customer-facing information (2.3)',
    description:
      'Quotes, invoices, certificates and handover documents — what the customer gets and why each one matters.',
    icon: Receipt,
    href: '2-3',
  },
  {
    number: '2.4',
    title: 'Company policies and procedures (2.4)',
    description:
      'The internal rules that govern how your firm works — equality, dignity at work, disciplinary, IT and social media policies.',
    icon: BookMarked,
    href: '2-4',
  },
];

export default function Section2() {
  return (
    <SectionShell
      backTo=".."
      backLabel="Module 5"
      moduleNumber={5}
      sectionNumber={2}
      title="Information sources"
      description="Statutory law, workplace paperwork, customer-facing documents and company policies — aligned to LO2 of Unit 210."
      tone="emerald"
      subsectionsCount={subsections.length}
      prevSectionHref="../section1"
      prevSectionLabel="Site roles and team responsibilities"
      nextSectionHref="../section3"
      nextSectionLabel="Communication methods"
      aboveGrid={
        <div className="max-w-3xl space-y-3 pt-2">
          <p className="text-white/80 leading-relaxed text-[14px] sm:text-[15px]">
            Information on a job site comes from four directions — government and
            standards bodies set the legal floor, the design office sends the drawings,
            the customer signs off the quote and the certificate, and your own company
            sets the rules everyone's expected to follow.
          </p>
          <p className="text-white/80 leading-relaxed text-[14px] sm:text-[15px]">
            Sub 2.1 is statutory — the legislation and guidance you'll cite when
            something goes wrong. Sub 2.2 is workplace — drawings, specs and RAMS. Sub
            2.3 is the customer-facing paperwork. Sub 2.4 finishes on the company
            policies that quietly shape every working relationship on site.
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
