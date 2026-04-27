import { Users, BookOpen, ClipboardList, Receipt, MessageSquare } from 'lucide-react';
import { SectionCard } from '@/components/upskilling/cards';
import { ModuleShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const sections = [
  {
    id: 1,
    title: 'Site roles and team responsibilities',
    icon: Users,
    description:
      'LO1 — site management team, the trades reporting to them, and the visitors who turn up on site (clients, inspectors, DNO).',
    href: 'section1',
  },
  {
    id: 2,
    title: 'Statutory and regulatory framework',
    icon: BookOpen,
    description:
      'AC 2.1 plus supplementary deep dives — statutory legislation, your personal duties under HASAWA + EAWR, HSE vs Local Authority enforcement, and Equality Act 2010 fair treatment on site.',
    href: 'section2',
  },
  {
    id: 3,
    title: 'Workplace information',
    icon: ClipboardList,
    description:
      'AC 2.2 plus supplementary — purpose of workplace info, reading RAMS / Method Statements, COSHH data sheets, manufacturer instructions (Reg 526.1), and the apprentice paper trail (site diary, time sheets, NVQ portfolio).',
    href: 'section3',
  },
  {
    id: 4,
    title: 'Customer info and company policies',
    icon: Receipt,
    description:
      'AC 2.3 + 2.4 plus supplementary GDPR / DPA and BS 7671 514.13 warning notices — customer-facing documents, policies, data-protection layer and install-as-comms layer.',
    href: 'section4',
  },
  {
    id: 5,
    title: 'Communication, conflict and wellbeing',
    icon: MessageSquare,
    description:
      'LO3 — communication methods, accessible comms (Equality Act), conflict resolution, the cost of poor communication, plus mental health and neurodiversity in the trade (Mates in Mind, Lighthouse Club).',
    href: 'section5',
  },
];

export default function Module5() {
  useSEO({
    title:
      'Module 5: Communicate with others within building services engineering | Level 2 Electrical | Elec-Mate',
    description:
      'Site roles, information sources and communication methods — the unit that turns a competent electrician into someone who can run a job. Aligned to City & Guilds 2365-02 Unit 210.',
  });

  return (
    <ModuleShell
      backTo=".."
      backLabel="Level 2 electrical installation"
      moduleNumber={5}
      title="Communicate with others within building services engineering"
      description="City &amp; Guilds 2365-02 Unit 210 — site roles, information sources, communication methods. The unit that turns a competent electrician into someone who can actually run a job."
      tone="emerald"
      sectionsCount={sections.length}
      prevModuleHref="../module4"
      prevModuleLabel="Installation of wiring systems and enclosures"
      aboveGrid={
        <div className="max-w-3xl space-y-3 pt-2">
          <p className="text-white/80 leading-relaxed text-[14px] sm:text-[15px]">
            Module 5 is the unit nobody talks about until something goes wrong on site —
            and then it's the only thing that matters. Wiring a job correctly is half the
            battle. The other half is reading the drawings the designer sent you,
            understanding who the person in the high-vis with the clipboard actually is,
            and being able to tell the customer their kitchen will be without power for
            two hours without it turning into a row.
          </p>
          <p className="text-white/80 leading-relaxed text-[14px] sm:text-[15px]">
            <span className="text-white font-medium">Section 1</span> walks you through
            the people on a typical building site — site management (PM, site manager,
            foreman, supervisor), the trades reporting to them (electricians, plumbers,
            joiners, plasterers, labourers), and the visitors who turn up uninvited
            (clients, building control, the DNO, HSE), plus a CDM 2015 framework
            walkthrough and the apprenticeship triangle.{' '}
            <span className="text-white font-medium">Section 2</span> covers the
            statutory and regulatory framework — what governs the trade, your personal
            duties under HASAWA + EAWR, HSE vs Local Authority enforcement, and
            Equality Act 2010 fair treatment on site.{' '}
            <span className="text-white font-medium">Section 3</span> dives into the
            workplace information you lean on every shift — drawings and RAMS, COSHH
            data sheets, manufacturer instructions and the apprentice paper trail.{' '}
            <span className="text-white font-medium">Section 4</span> covers the
            customer-facing layer — quotes, certificates, company policies, GDPR / DPA
            for handling customer data, and BS 7671 514.13 warning notices.{' '}
            <span className="text-white font-medium">Section 5</span> closes on
            communication itself — verbal and written methods, comms across
            disabilities and language barriers, defusing conflict, the cost of poor
            comms, and a deep dive on mental health and neurodiversity in the trade.
          </p>
          <p className="text-white/80 leading-relaxed text-[14px] sm:text-[15px]">
            By the end of Module 5 you should be able to walk onto an unfamiliar site,
            work out who's running it, find the documents you need, and talk to anyone on
            the job — from the labourer to the client — without it costing you the
            contract.
          </p>
        </div>
      }
    >
      {sections.map((section, index) => (
        <SectionCard
          key={section.id}
          to={section.href}
          sectionNumber={section.id}
          title={section.title}
          description={section.description}
          icon={section.icon}
          index={index}
        />
      ))}
    </ModuleShell>
  );
}
