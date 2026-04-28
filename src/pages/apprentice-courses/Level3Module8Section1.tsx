import { FileText, Layers } from 'lucide-react';
import { ModuleCard } from '@/components/upskilling/cards';
import { SectionShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const mockExams = [
  {
    number: 'Mock 1',
    title: 'Health and safety in building services engineering (Unit 201 refresher)',
    description:
      'Refresher paper carried over from Level 2 — HASAWA, EAWR, PPE, safe isolation, working at height and incident response, sat under L3 closed-book conditions.',
    icon: FileText,
    href: '../level3-module8-mock-exam1',
  },
  {
    number: 'Mock 2',
    title: 'Environmental technology systems (Unit 301)',
    description:
      'Renewable and energy-efficient technologies — solar PV, heat pumps, micro-hydro, micro-CHP, MVHR, rainwater and grey-water systems and their interaction with the electrical installation.',
    icon: FileText,
    href: '../level3-module8-mock-exam2',
  },
  {
    number: 'Mock 3',
    title: 'Principles of electrical science (Unit 302)',
    description:
      'AC theory, three-phase systems, motor and transformer principles, power factor, energy efficiency and the maths underneath every L3 design calculation.',
    icon: FileText,
    href: '../level3-module8-mock-exam3',
  },
  {
    number: 'Mock 4',
    title: 'Fault diagnosis and rectification (Unit 303)',
    description:
      'Logical fault-finding on installations and equipment — symptoms to causes, test instruments, safe isolation under fault conditions and rectification recording.',
    icon: FileText,
    href: '../level3-module8-mock-exam4',
  },
  {
    number: 'Mock 5',
    title: 'Inspection, testing and commissioning (Unit 304)',
    description:
      'Initial verification and periodic inspection to BS 7671 — test sequence, instrument selection, EICR coding (C1, C2, C3, FI), certification and limitations.',
    icon: FileText,
    href: '../level3-module8-mock-exam5',
  },
  {
    number: 'Mock 6',
    title: 'Electrical systems design (Unit 305)',
    description:
      'Design of single-phase and three-phase installations — load assessment, cable sizing (CCC, voltage drop, Zs), protective device coordination, earthing and bonding.',
    icon: FileText,
    href: '../level3-module8-mock-exam6',
  },
  {
    number: 'Mock 7',
    title: 'Career awareness and professional development (Unit 308)',
    description:
      'Industry structure, qualification pathways, JIB grading, AM2 and AM2E, professional registration, CPD and the routes from L3 apprentice to approved electrician.',
    icon: FileText,
    href: '../level3-module8-mock-exam7',
  },
  {
    number: 'Mock 8 — Mixed',
    title: 'Mixed mock — full Level 3 paper',
    description:
      'Comprehensive mixed paper drawing on all seven Level 3 units — sat under exam conditions to simulate the spread of the live qualification before the AM2 end-point assessment.',
    icon: Layers,
    href: '../level3-module8-mock-exam8',
  },
];

const Level3Module8Section1 = () => {
  useSEO({
    title:
      'Mock examinations — Level 3 Section 1 | Mock Examinations and Assessment | Elec-Mate',
    description:
      'Eight full Level 3 mock papers — one per unit (201 refresher, 301, 302, 303, 304, 305, 308) plus a mixed paper — sat under realistic closed-book conditions to build pace, accuracy and confidence.',
  });

  return (
    <SectionShell
      backTo=".."
      backLabel="Mock Examinations and Assessment"
      moduleNumber={8}
      sectionNumber={1}
      title="Mock examinations"
      description="Eight full mock papers covering Level 3 Units 201 (refresher), 301, 302, 303, 304, 305 and 308 plus a mixed paper — sat under closed-book conditions to build pace, accuracy and confidence."
      tone="blue"
      subsectionsCount={mockExams.length}
      nextSectionHref="../section2"
      nextSectionLabel="How to pass exams — tips and techniques"
      aboveGrid={
        <div className="max-w-3xl space-y-3 pt-2">
          <p className="text-white/80 leading-relaxed text-[14px] sm:text-[15px]">
            Section 1 is the practice-paper bank for the Level 3 Diploma (2365-03). Each unit
            sits its own closed-book multiple-choice assessment — there is no single combined
            written paper at L3. Mocks 1 to 7 mirror that one-paper-per-unit structure so you
            can pressure-test each unit on its own and spot the topics that need another
            revision pass.
          </p>
          <p className="text-white/80 leading-relaxed text-[14px] sm:text-[15px]">
            The unit assessments are mostly{' '}
            <span className="text-white font-medium">60 questions in 90 minutes</span>{' '}
            (Units 201, 301, 302, 303, 304 and 305) with{' '}
            <span className="text-white font-medium">Unit 308 shorter at 40 questions in 60 minutes</span>.
            All are closed-book — BS 7671, the IET On-Site Guide and your notes are not
            permitted in the exam room. The mocks here match those timings.
          </p>
          <p className="text-white/80 leading-relaxed text-[14px] sm:text-[15px]">
            Once the per-unit mocks feel comfortable, the{' '}
            <span className="text-white font-medium">mixed mock</span> draws questions from all
            seven units in random order — the closest thing to back-to-back unit sittings. Sit
            it timed, no notes, in one go. The L3 practical element is workplace and
            portfolio-based (NVQ-style observed assignments and assessor evidence) — it is
            evidenced over the apprenticeship, not as a separate timed exam. The end-point
            assessment is{' '}
            <span className="text-white font-medium">AM2 (or AM2E)</span>, sat after the
            qualification is complete.
          </p>
          <p className="text-white/80 leading-relaxed text-[14px] sm:text-[15px]">
            Each paper auto-marks at the end with a per-question explanation and a flag and
            review tool. Aim for{' '}
            <span className="text-white font-medium">70%+ on every paper</span> before booking
            the live unit assessment.
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

export default Level3Module8Section1;
