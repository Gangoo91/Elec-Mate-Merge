import { Scale, BookOpen, ShieldAlert, Zap, Library, Award } from 'lucide-react';
import { ModuleCard } from '@/components/apprentice-courses/ModuleCard';
import { SectionShell } from '@/components/study-centre/shells';

const subsections = [
  {
    number: '1.1',
    title: 'Statutory regulations (1.1, 1.3)',
    description:
      'HASAWA, EAWR, ESQCR and Building Regs Part P — the legally binding regs and what they oblige you to do.',
    icon: Scale,
    href: '1-1',
  },
  {
    number: '1.2',
    title: 'Non-statutory regulations and guidance (1.2, 1.4)',
    description:
      'BS 7671, GN3, OSG, JIB, NICEIC and NAPIT — the industry framework that gives statutory regs their teeth.',
    icon: BookOpen,
    href: '1-2',
  },
  {
    number: '1.3',
    title: 'HASAWA 1974 deep dive (1.1, 1.3)',
    description:
      'Sections 2, 3, 6, 7 and 37 of the Health and Safety at Work etc Act unpacked — employer, designer/supplier, personal and director duties, plus enforcement and sentencing reality.',
    icon: ShieldAlert,
    href: '1-3',
  },
  {
    number: '1.4',
    title: 'EAWR 1989 deep dive (1.1, 1.3)',
    description:
      'Reg 4 (safe systems), Reg 13 (dead working), Reg 14 (live working three-condition test) and Reg 16 (competence) — the four EAWR regs the HSE prosecutes electricians under most often.',
    icon: Zap,
    href: '1-4',
  },
  {
    number: '1.5',
    title: 'BS 7671 deep dive (1.2, 1.4)',
    description:
      'Structure of Parts 1-8, Part 2 definitions as the legal vocabulary, the deemed-to-comply doctrine and the headline A4:2026 changes — PNB, AFDD, schedule columns, model forms.',
    icon: Library,
    href: '1-5',
  },
  {
    number: '1.6',
    title: 'Competent Person Schemes, insurance and civil (1.2, 1.4)',
    description:
      'NICEIC, NAPIT, ELECSA, Stroma; JIB grading; PL / EL / PI insurance; civil claims under contract and tort; the commercial reality of scheme withdrawal.',
    icon: Award,
    href: '1-6',
  },
];

export default function Section1() {
  return (
    <SectionShell
      backTo=".."
      backLabel="Module 3"
      moduleNumber={3}
      sectionNumber={1}
      title="Industry regulations and what they mean"
      description="The statutory and non-statutory regs that govern every electrical install in the UK — what they say, what they oblige you to do, and the consequences of getting it wrong. Aligned to LO1 of Unit 203."
      tone="emerald"
      subsectionsCount={subsections.length}
      nextSectionHref="../section2"
      nextSectionLabel="Technical information and drawings"
      aboveGrid={
        <div className="max-w-3xl space-y-3 pt-2">
          <p className="text-white/80 leading-relaxed text-[14px] sm:text-[15px]">
            Before you cut a single conductor, you need to know which laws and which
            industry standards you're working under. Section 1 covers the two halves
            of the UK regulatory framework — the statutory regs that carry criminal
            sanctions, and the non-statutory codes that everyone in the trade
            follows because the courts treat them as the standard of competent work.
          </p>
          <p className="text-white/80 leading-relaxed text-[14px] sm:text-[15px]">
            Sub 1.1 covers the statutory side — the Health and Safety at Work Act,
            the Electricity at Work Regulations, the Electricity Safety, Quality
            and Continuity Regulations and Building Regs Part P. Sub 1.2 covers the
            non-statutory side — BS 7671, IET Guidance Note 3, the On-Site Guide,
            the JIB and the registration bodies (NICEIC, NAPIT) that keep the
            industry honest.
          </p>
          <p className="text-white/80 leading-relaxed text-[14px] sm:text-[15px]">
            Get this section solid and the rest of Module 3 — drawings, wiring
            systems, earthing, supply, renewables — sits inside a framework you
            understand instead of a stack of acronyms.
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
