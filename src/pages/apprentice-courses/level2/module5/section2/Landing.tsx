import { Scale, ShieldCheck, Gavel, Users } from 'lucide-react';
import { ModuleCard } from '@/components/apprentice-courses/ModuleCard';
import { SectionShell } from '@/components/study-centre/shells';

const subsections = [
  {
    number: '2.1',
    title: 'Statutory legislation and guidance (2.1)',
    description:
      'Three layers — statutory law, HSE guidance, industry standards. Where HASAWA, EAWR, CDM, BS 7671 and Approved Document P sit, and which ones a court treats as binding.',
    icon: Scale,
    href: '2-1',
  },
  {
    number: '2.2',
    title: 'HASAWA & EAWR — your duties',
    description:
      'The personal-duty layer. HASAWA s.7, s.8 and s.37, and EAWR Reg 3, Reg 14 and Reg 16 — what they require of you on Monday morning, and what happens if you breach them.',
    icon: ShieldCheck,
    href: '2-2',
  },
  {
    number: '2.3',
    title: 'HSE vs Local Authority enforcement',
    description:
      'Who turns up after an incident. HSE inspectors for higher-risk premises, Local Authority EHOs for lower-risk. Powers under HASAWA s.20-22 and s.33, and the RIDDOR reporting that brings them in.',
    icon: Gavel,
    href: '2-3',
  },
  {
    number: '2.4',
    title: 'Equality Act 2010 — fair treatment on site',
    description:
      'Level 2 awareness — nine protected characteristics, reasonable adjustments for disabled workers, harassment, the banter trap and the apprentice\'s own legal exposure.',
    icon: Users,
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
      title="Statutory & regulatory framework"
      description="The legal landscape an electrician works inside — statute, guidance and standard, your personal duties, who enforces it, and the Equality Act floor for fair treatment on site."
      tone="emerald"
      subsectionsCount={subsections.length}
      prevSectionHref="../section1"
      prevSectionLabel="Site roles and team responsibilities"
      nextSectionHref="../section3"
      nextSectionLabel="Communication methods"
      aboveGrid={
        <div className="max-w-3xl space-y-3 pt-2">
          <p className="text-white/80 leading-relaxed text-[14px] sm:text-[15px]">
            Section 2 is the legal floor every electrician works on. Sub 2.1 is the
            mapped 210 AC — the three layers of rule (statutory, guidance, standard)
            and how BS 7671 sits inside the statutory Building Regulations regime.
            Subs 2.2 to 2.4 are supplementary — they extend Sub 2.1 with the personal-
            duty layer, the enforcement layer, and the Equality Act floor for fair
            treatment on site.
          </p>
          <p className="text-white/80 leading-relaxed text-[14px] sm:text-[15px]">
            The point of the section is to leave you able to answer four questions in
            plain English on a job. What law applies to what I&apos;m doing? What does
            it require of ME, personally? Who shows up if it goes wrong? And how do
            people on site have to treat each other under the Equality Act?
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
