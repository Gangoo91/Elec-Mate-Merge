import { FileText, ClipboardList, FlaskConical, Wrench, NotebookPen } from 'lucide-react';
import { ModuleCard } from '@/components/apprentice-courses/ModuleCard';
import { SectionShell } from '@/components/study-centre/shells';

const subsections = [
  {
    number: '3.1',
    title: 'Purpose of workplace information (2.2)',
    description:
      'The five families of workplace information — safety, design, standards, contract and HR. What each one is for, who owns it, and what happens if it is missing.',
    icon: FileText,
    href: '3-1',
  },
  {
    number: '3.2',
    title: 'Reading RAMS and method statements',
    description:
      'How to read a RAMS like a tradesperson, not skim it like a chore. Generic vs site-specific, sign-on responsibility, and stopping work when the document does not match the conditions.',
    icon: ClipboardList,
    href: '3-2',
  },
  {
    number: '3.3',
    title: 'COSHH data sheets — finding, reading, applying',
    description:
      'COSHH 2002 framework, the SDS 16-section format, and the chemicals an electrician actually meets. Pre-task review of the data sheet is the point.',
    icon: FlaskConical,
    href: '3-3',
  },
  {
    number: '3.4',
    title: 'Manufacturer instructions — Reg 526.1 and warranty',
    description:
      'BS 7671 Reg 526.1 ties durable connections to the manufacturer instructions. Torque values, ferrule requirements, sequence — and why deviation voids both compliance and warranty.',
    icon: Wrench,
    href: '3-4',
  },
  {
    number: '3.5',
    title: 'Site diary and time sheets — the apprentice paper trail',
    description:
      'Daily diary, weekly time sheet, NVQ portfolio, off-the-job training log, monthly review forms. What each record is for and what happens if it is blank.',
    icon: NotebookPen,
    href: '3-5',
  },
];

export default function Section3() {
  return (
    <SectionShell
      backTo=".."
      backLabel="Module 5"
      moduleNumber={5}
      sectionNumber={3}
      title="Workplace information"
      description="The information that lives at the workface — RAMS, COSHH, manufacturer data, and the apprentice's own paper trail. Built around AC 2.2 of Unit 210, with supplementary deep-dives on each family."
      tone="emerald"
      subsectionsCount={subsections.length}
      prevSectionHref="../section2"
      prevSectionLabel="Information sources"
      aboveGrid={
        <div className="max-w-3xl space-y-3 pt-2">
          <p className="text-white/80 leading-relaxed text-[14px] sm:text-[15px]">
            Section 3 is the practical companion to Section 2. Where Section 2 maps the
            information sources at a high level, Section 3 zooms in on the documents you
            actually read at the workface — the RAMS pinned to the wall of the site
            cabin, the COSHH data sheet you check before opening a tin of brick acid,
            the manufacturer torque value inside the consumer-unit lid, the diary entry
            you write at the end of the shift.
          </p>
          <p className="text-white/80 leading-relaxed text-[14px] sm:text-[15px]">
            <span className="text-white font-medium">Sub 3.1</span> is the AC 2.2
            content proper — the five families of workplace information and what each is
            for. <span className="text-white font-medium">Subs 3.2 to 3.5</span> are
            supplementary deep-dives — reading RAMS, finding and applying COSHH data
            sheets, working to manufacturer instructions under BS 7671 Reg 526.1, and
            keeping the apprentice&apos;s personal paper trail (diary, time sheets,
            NVQ portfolio, off-the-job training log).
          </p>
          <p className="text-white/80 leading-relaxed text-[14px] sm:text-[15px]">
            By the end of this section you should be able to walk into any work area,
            point to where each document lives, read it well enough to spot a defect,
            raise gaps in writing, and keep your own records to a standard that holds up
            in any later dispute.
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
