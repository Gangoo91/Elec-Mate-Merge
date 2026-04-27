import { Clock, Search, CheckSquare, AlertTriangle } from 'lucide-react';
import { SectionCard } from '@/components/upskilling/cards';
import { SectionShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const subsections = [
  {
    id: 1,
    title: 'Time management mastery',
    icon: Clock,
    description:
      'Pacing strategies for the Level 2 paper — minutes-per-question, when to flag and skip, and how to bank time for the long-form items.',
    href: 'section1',
  },
  {
    id: 2,
    title: 'Question analysis techniques',
    icon: Search,
    description:
      'Reading the question properly — spotting command words, ruling out distractors, and structuring an answer that earns every available mark.',
    href: 'section2',
  },
  {
    id: 3,
    title: 'Exam day preparation',
    icon: CheckSquare,
    description:
      'The 24-hour run-up — what to revise, what to pack, what to eat and how to walk into the exam room with the right mindset.',
    href: 'section3',
  },
  {
    id: 4,
    title: 'Common pitfalls and how to avoid them',
    icon: AlertTriangle,
    description:
      'The mistakes that cost candidates a pass — misreading the question, running out of time, second-guessing the right answer.',
    href: 'section4',
  },
];

const Level2Module8Section2 = () => {
  useSEO({
    title: 'How to pass exams — tips and techniques | Mock Examinations Section 2 | Elec-Mate',
    description:
      'Exam strategy for the Level 2 electrical assessment — time management, question analysis, exam-day preparation and common pitfalls to avoid.',
  });

  return (
    <SectionShell
      backTo=".."
      backLabel="Mock Examinations and Assessment"
      moduleNumber={6}
      sectionNumber={2}
      title="How to pass exams — tips and techniques"
      description="Proven exam strategy — pacing, question analysis, exam-day prep and the common pitfalls — so the work you put into the mocks actually shows up on the day."
      tone="emerald"
      subsectionsCount={subsections.length}
      prevSectionHref="../section1"
      prevSectionLabel="Mock examinations"
      aboveGrid={
        <div className="max-w-3xl space-y-3 pt-2">
          <p className="text-white/80 leading-relaxed text-[14px] sm:text-[15px]">
            Section 2 is the exam-technique playbook. The mocks in Section 1 build your knowledge
            and pace — this section is the layer on top that turns that preparation into marks
            on paper. Strong technique can lift a borderline candidate over the pass mark and
            stop a confident one from throwing it away on careless mistakes.
          </p>
          <p className="text-white/80 leading-relaxed text-[14px] sm:text-[15px]">
            <span className="text-white font-medium">Sub 1</span> covers timing — how to plan
            minutes per question and when to flag-and-skip. <span className="text-white font-medium">Sub 2</span>{' '}
            covers question analysis — reading command words, ruling out distractors and earning
            every mark. <span className="text-white font-medium">Sub 3</span> covers the
            24-hour run-up to the exam, and <span className="text-white font-medium">Sub 4</span>{' '}
            covers the common pitfalls that cost candidates a pass.
          </p>
          <p className="text-white/80 leading-relaxed text-[14px] sm:text-[15px]">
            Read these once early in your revision so you sit the mocks the right way, then
            re-read them in the final week before your assessment.
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

export default Level2Module8Section2;
