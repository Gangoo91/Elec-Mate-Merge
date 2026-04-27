import { FileText, Layers } from 'lucide-react';
import { ModuleCard } from '@/components/upskilling/cards';
import { SectionShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const mockExams = [
  {
    number: 'Mock 1',
    title: 'Health and safety in building services engineering',
    description:
      'Module 1 paper — regulations, hazards, PPE, safe working procedures and incident response on the electrical site.',
    icon: FileText,
    href: 'mock1',
  },
  {
    number: 'Mock 2',
    title: 'Principles of electrical science',
    description:
      'Module 2 paper — voltage, current, resistance, power, magnetism and the maths underneath every circuit calculation.',
    icon: FileText,
    href: 'mock2',
  },
  {
    number: 'Mock 3',
    title: 'Electrical installations technology',
    description:
      'Module 3 paper — wiring systems, containment, accessories, supplies and the technology that makes a real installation work.',
    icon: FileText,
    href: 'mock3',
  },
  {
    number: 'Mock 4',
    title: 'Installation of wiring systems and enclosures',
    description:
      'Module 4 paper — tools, preparation, fixings, terminations, bonding and the dead-test sequence on a small installation.',
    icon: FileText,
    href: 'mock4',
  },
  {
    number: 'Mock 5',
    title: 'Communicate with others within building services',
    description:
      'Test your knowledge of site roles, statutory framework, workplace and customer information, communication methods and conflict — Unit 210.',
    icon: FileText,
    href: 'mock5',
  },
  {
    number: 'Mock 6 — Mixed',
    title: 'Mixed mock — full Level 2 paper',
    description:
      'Comprehensive mixed paper drawing on Modules 1 to 5 — sat under exam conditions to simulate the real Level 2 assessment.',
    icon: Layers,
    href: 'mock8',
  },
];

const Level2Module8Section1 = () => {
  useSEO({
    title: 'Mock examinations — Level 2 Section 1 | Mock Examinations and Assessment | Elec-Mate',
    description:
      'Six full Level 2 mock papers — one per module plus a mixed paper — sat under realistic exam conditions to build pace, accuracy and confidence before the live assessment.',
  });

  return (
    <SectionShell
      backTo=".."
      backLabel="Mock Examinations and Assessment"
      moduleNumber={6}
      sectionNumber={1}
      title="Mock examinations"
      description="Six full mock papers covering Level 2 Modules 1 to 5 plus a mixed paper — sat under exam conditions to build pace, accuracy and confidence."
      tone="emerald"
      subsectionsCount={mockExams.length}
      nextSectionHref="../section2"
      nextSectionLabel="How to pass exams — tips and techniques"
      aboveGrid={
        <div className="max-w-3xl space-y-3 pt-2">
          <p className="text-white/80 leading-relaxed text-[14px] sm:text-[15px]">
            Section 1 is the practice-paper bank. Each of the first five mocks covers a single
            Level 2 module — health &amp; safety, electrical science, installations technology,
            wiring systems and communication — so you can pressure-test one module at a time and
            spot the topics that need another revision pass.
          </p>
          <p className="text-white/80 leading-relaxed text-[14px] sm:text-[15px]">
            Once the per-module mocks feel comfortable, the{' '}
            <span className="text-white font-medium">mixed mock</span> draws questions from across
            all five modules in random order — the closest thing to the real Level 2 assessment.
            Sit it timed, no notes, in one go.
          </p>
          <p className="text-white/80 leading-relaxed text-[14px] sm:text-[15px]">
            Each paper auto-marks at the end with a per-question explanation and a flag/review
            tool, so the mocks double as a structured revision resource. Aim for{' '}
            <span className="text-white font-medium">70%+ on every paper</span> before booking the
            real exam.
          </p>
        </div>
      }
    >
      {mockExams.map((exam) => (
        <ModuleCard
          key={exam.href}
          to={exam.href}
          moduleNumber={exam.number}
          title={exam.title}
          description={exam.description}
          icon={exam.icon}
          isExam
        />
      ))}
    </SectionShell>
  );
};

export default Level2Module8Section1;
