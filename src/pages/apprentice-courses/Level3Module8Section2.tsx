import { Clock, Search, CheckSquare, AlertTriangle } from 'lucide-react';
import { SectionCard } from '@/components/upskilling/cards';
import { SectionShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const subsections = [
  {
    id: 1,
    title: 'Time management for the L3 closed-book MC paper',
    icon: Clock,
    description:
      'Pacing strategies for the 60-question / 90-minute and 40-question / 60-minute Level 3 unit papers — minutes-per-question, when to flag and skip, and how to bank time for the calculation-heavy items.',
    href: '../level3-module8-section2-section1',
  },
  {
    id: 2,
    title: 'Question analysis techniques',
    icon: Search,
    description:
      'Reading L3 questions properly — spotting command words, ruling out distractors built from BS 7671 mis-references, and structuring multi-step calculations under time pressure.',
    href: '../level3-module8-section2-section2',
  },
  {
    id: 3,
    title: 'Exam day preparation',
    icon: CheckSquare,
    description:
      'The 24-hour run-up — what to revise the night before, what to pack, what to eat and how to walk into the exam centre with the right mindset for closed-book L3 sittings.',
    href: '../level3-module8-section2-section3',
  },
  {
    id: 4,
    title: 'Common pitfalls and how to avoid them',
    icon: AlertTriangle,
    description:
      'The mistakes that cost L3 candidates a pass — over-reading calculation questions, second-guessing the right answer, EICR coding traps and the recovery techniques that get you back on track.',
    href: '../level3-module8-section2-section4',
  },
];

const Level3Module8Section2 = () => {
  useSEO({
    title:
      'How to pass exams — tips and techniques | Level 3 Mock Examinations Section 2 | Elec-Mate',
    description:
      'Exam strategy for the Level 3 electrical assessment — time management for closed-book MC papers, question analysis, exam-day preparation and common pitfalls to avoid.',
  });

  return (
    <SectionShell
      backTo=".."
      backLabel="Mock Examinations and Assessment"
      moduleNumber={8}
      sectionNumber={2}
      title="How to pass exams — tips and techniques"
      description="Proven exam strategy for the L3 closed-book MC papers — pacing, question analysis, exam-day prep and the common pitfalls — so the work you put into the mocks actually shows up on the day."
      tone="blue"
      subsectionsCount={subsections.length}
      prevSectionHref="../section1"
      prevSectionLabel="Mock examinations"
      aboveGrid={
        <div className="max-w-3xl space-y-3 pt-2">
          <p className="text-white/80 leading-relaxed text-[14px] sm:text-[15px]">
            Section 2 is the L3 exam-technique playbook. The mocks in Section 1 build your
            knowledge and pace — this section is the layer on top that turns that preparation
            into marks on paper. Strong technique can lift a borderline candidate over the
            pass mark and stop a confident one from throwing it away on careless mistakes,
            particularly on the calculation and EICR-coding items the L3 papers are stuffed
            with.
          </p>
          <p className="text-white/80 leading-relaxed text-[14px] sm:text-[15px]">
            <span className="text-white font-medium">Sub 1</span> covers timing — how to plan
            minutes per question on a 60Q / 90min paper and the shorter 40Q / 60min Unit 308
            paper, and when to flag-and-skip.{' '}
            <span className="text-white font-medium">Sub 2</span> covers question analysis —
            command words, distractor patterns and multi-step calculations.{' '}
            <span className="text-white font-medium">Sub 3</span> covers the 24-hour run-up
            to the exam, and <span className="text-white font-medium">Sub 4</span> covers the
            common pitfalls that cost L3 candidates a pass.
          </p>
          <p className="text-white/80 leading-relaxed text-[14px] sm:text-[15px]">
            Read these once early in your revision so you sit the mocks the right way, then
            re-read them in the final week before each unit assessment. The L3 practical
            element is workplace and portfolio-based — built up across the apprenticeship —
            so this section focuses on the closed-book MC papers, with AM2 covered separately
            in the career awareness module.
          </p>
        </div>
      }
    >
      {subsections.map((subsection, index) => (
        <SectionCard
          key={subsection.id}
          to={subsection.href}
          sectionNumber={subsection.id}
          title={subsection.title}
          description={subsection.description}
          icon={subsection.icon}
          index={index}
        />
      ))}
    </SectionShell>
  );
};

export default Level3Module8Section2;
