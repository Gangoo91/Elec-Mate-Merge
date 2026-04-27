import { Receipt, BookMarked, ShieldCheck, Tags } from 'lucide-react';
import { ModuleCard } from '@/components/apprentice-courses/ModuleCard';
import { SectionShell } from '@/components/study-centre/shells';

const subsections = [
  {
    number: '4.1',
    title: 'Purpose of customer information (2.3)',
    description:
      'Quotes, contracts, job sheets, invoices, certificates, user instructions, manufacturer data and as-installed drawings — what each one is, why it exists and what it proves.',
    icon: Receipt,
    href: '4-1',
  },
  {
    number: '4.2',
    title: 'Company policies and working relationships (2.4)',
    description:
      'Safety, quality, HR, commercial and confidentiality policies — and how they shape the way you work with customers, co-workers and sub-contractors.',
    icon: BookMarked,
    href: '4-2',
  },
  {
    number: '4.3',
    title: 'GDPR and DPA — customer data, photos, retention',
    description:
      'UK GDPR and Data Protection Act 2018 for trade — lawful bases, photos of customer property, retention periods and the social-media trap.',
    icon: ShieldCheck,
    href: '4-3',
  },
  {
    number: '4.4',
    title: 'BS 7671 514.13 warning notices — labels as comms',
    description:
      'Main earthing notices, RCD test reminders, mixed-supply warnings, isolator labels and CU schematics — the regs treat the install itself as a communication channel.',
    icon: Tags,
    href: '4-4',
  },
];

export default function Section4() {
  return (
    <SectionShell
      backTo=".."
      backLabel="Module 5"
      moduleNumber={5}
      sectionNumber={4}
      title="Customer info and company policies"
      description="The customer-facing paperwork, the internal rule book, the data-protection layer and the install-as-comms layer that the regs require — aligned to LO2 of Unit 210 plus supplementary GDPR and BS 7671 514.13 material."
      tone="emerald"
      subsectionsCount={subsections.length}
      prevSectionHref="../section3"
      prevSectionLabel="Communication methods"
      aboveGrid={
        <div className="max-w-3xl space-y-3 pt-2">
          <p className="text-white/80 leading-relaxed text-[14px] sm:text-[15px]">
            Section 4 finishes Module 5 by going deeper on two areas the syllabus
            only brushes against — the customer-facing documents you'll hand over
            on every job, and the company policies that quietly govern how you behave
            on site. Both are exam-tested under AC 2.3 and 2.4 of Unit 210, and both
            are where apprentices most often get caught out in real work because the
            paperwork looks dull until something goes wrong.
          </p>
          <p className="text-white/80 leading-relaxed text-[14px] sm:text-[15px]">
            Sub 4.1 walks through every document a customer should see — quotes,
            contracts, job sheets, invoices, certificates, user instructions,
            manufacturer data and as-installed drawings — and why each one exists.
            Sub 4.2 takes the company-policy side and links it to the working
            relationships you'll have with customers, co-workers and sub-contractors.
            Sub 4.3 adds the data-protection layer that wasn't in the syllabus when
            210 was written but is now unavoidable on any job that involves photos
            or customer details. Sub 4.4 finishes on BS 7671 514.13 warning notices
            — the regs explicitly treat the labels you fix to a CU as a form of
            communication, and missing them is a non-conformance.
          </p>
          <p className="text-white/80 leading-relaxed text-[14px] sm:text-[15px]">
            By the end of Section 4 you should be able to walk a customer through
            the documents they're entitled to, explain why your firm has the policies
            it does, handle their personal data without breaching GDPR, and label up a
            consumer unit so it tells the next electrician (or the customer) what
            they need to know without you being there.
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
