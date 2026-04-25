import { ClipboardCheck, Timer, Zap, FileSearch, Shuffle, Clock, Trophy } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ModuleCard } from '@/components/apprentice-courses/ModuleCard';
import { SectionShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const subsections = [
  {
    number: '1.1',
    title: 'Topic-based mock exams',
    description: 'Individual exams for each module — H&S, Science, Testing, Design and more',
    icon: ClipboardCheck,
    href: '../level3-module8-section1-1',
  },
  {
    number: '1.2',
    title: 'Timed module tests',
    description: 'Focused tests on specific modules with realistic time constraints',
    icon: Timer,
    href: '../level3-module8-section1-2',
  },
  {
    number: '1.3',
    title: 'Quick fire questions',
    description: 'Rapid-response questions to test instant recall and knowledge retention',
    icon: Zap,
    href: '../level3-module8-section1-3',
  },
  {
    number: '1.4',
    title: 'Past paper analysis',
    description:
      'Review and analysis of past exam papers to identify common themes and question styles',
    icon: FileSearch,
    href: '../level3-module8-section1-4',
  },
];

const Level3Module8Section1 = () => {
  useSEO(
    'Section 1: Mock Exams - Level 3 Module 8',
    'Practice exams and tests to prepare you for the real Level 3 assessments'
  );

  return (
    <SectionShell
      backTo="/study-centre/apprentice/level3-module8"
      backLabel="Module 8"
      moduleNumber={8}
      sectionNumber={1}
      title="Mock exams"
      description="Practice exams and timed tests to prepare for real assessments."
      tone="blue"
      subsectionsCount={subsections.length}
      nextSectionHref="../level3-module8-section2"
      nextSectionLabel="Practical help"
    >
      {/* Featured: Comprehensive Mock Exam — preserved from previous design */}
      <Link
        to="../level3-module8-mock-exam8"
        className="sm:col-span-2 block touch-manipulation active:scale-[0.99]"
      >
        <div className="relative p-5 rounded-2xl bg-gradient-to-br from-elec-yellow/10 to-amber-600/5 border-2 border-elec-yellow/30 hover:border-elec-yellow/50 transition-all">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-elec-yellow/20 flex items-center justify-center">
              <Shuffle className="h-7 w-7 text-elec-yellow" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-bold text-elec-yellow bg-elec-yellow/20 px-2 py-0.5 rounded">
                  COMPREHENSIVE
                </span>
              </div>
              <h3 className="text-lg font-bold text-white mb-1">Full practice exam</h3>
              <p className="text-sm text-white mb-3">
                40 questions from all 7 modules • 90 minutes • 60% pass mark
              </p>
              <div className="flex items-center gap-4 text-xs text-white">
                <span className="flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" />
                  90 mins
                </span>
                <span className="flex items-center gap-1">
                  <Trophy className="h-3.5 w-3.5" />
                  60% to pass
                </span>
              </div>
            </div>
          </div>
        </div>
      </Link>

      {subsections.map((s, i) => (
        <ModuleCard
          key={i}
          number={s.number}
          title={s.title}
          description={s.description}
          icon={s.icon}
          href={s.href}
        />
      ))}
    </SectionShell>
  );
};

export default Level3Module8Section1;
