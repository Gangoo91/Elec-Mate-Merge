import {
  ArrowLeft,
  Target,
  Brain,
  Crosshair,
  Repeat,
  TrendingUp,
  FileText,
  GraduationCap,
  BookOpen,
  Clock,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ModuleCard } from '@/components/upskilling/cards';
import useSEO from '@/hooks/useSEO';

const modules = [
  {
    moduleNumber: 1,
    title: 'Understanding Goals & Growth Mindset',
    description:
      'Fixed vs growth mindset, why goal setting matters for tradespeople, types of goals, and overcoming barriers to growth',
    icon: Brain,
    duration: '40 mins',
    link: '../gs-module-1',
  },
  {
    moduleNumber: 2,
    title: 'Setting Effective Goals',
    description:
      'The SMART framework for trade careers, short/medium/long-term planning, career goals for electricians, and your personal goal map',
    icon: Crosshair,
    duration: '40 mins',
    link: '../gs-module-2',
  },
  {
    moduleNumber: 3,
    title: 'Building Habits That Stick',
    description:
      'The science of habit formation, building professional habits on site, breaking bad habits, and habit stacking',
    icon: Repeat,
    duration: '40 mins',
    link: '../gs-module-3',
  },
  {
    moduleNumber: 4,
    title: 'Tracking Progress & Continuous Improvement',
    description:
      'Measuring progress, reflective practice, CPD and continuous professional development, and accountability systems',
    icon: TrendingUp,
    duration: '40 mins',
    link: '../gs-module-4',
  },
  {
    moduleNumber: 5,
    title: 'Your Growth Action Plan',
    description:
      'Pulling it all together, creating your 90-day plan, annual review and goal resetting, and staying motivated long-term',
    icon: FileText,
    duration: '40 mins',
    link: '../gs-module-5',
  },
  {
    moduleNumber: 6,
    title: 'Mock Exam',
    description:
      '200-question bank, 20 random questions per attempt, 30-minute timer, 80% pass mark',
    icon: GraduationCap,
    duration: '30 mins',
    link: '../gs-module-6',
    isExam: true,
  },
];

export default function GoalSettingGrowthCourse() {
  useSEO({
    title: 'Goal Setting & Continuous Growth | Personal Development',
    description:
      'Complete goal setting and continuous growth course for electricians and tradespeople. Based on FranklinCovey 7 Habits, Carol Dweck growth mindset research, and UK trade CPD frameworks.',
  });

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      <header className="sticky top-0 z-10 bg-[#1a1a1a]/95 backdrop-blur-sm px-4 sm:px-8 lg:px-12 pt-6 pb-4">
        <div className="max-w-5xl mx-auto">
          <Link to="/study-centre/personal-development">
            <Button
              variant="ghost"
              className="text-muted-foreground hover:text-foreground transition-colors p-0 h-auto touch-manipulation active:scale-[0.98]"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Personal Development
            </Button>
          </Link>
        </div>
      </header>

      <main className="px-4 sm:px-8 lg:px-12 pb-12">
        <div className="max-w-5xl mx-auto space-y-6 sm:space-y-8">
          {/* Course Header */}
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-rose-500/10 via-rose-400/5 to-transparent border border-rose-500/15 p-5 sm:p-8">
            <div className="absolute top-0 right-0 w-48 h-48 bg-rose-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2.5 rounded-xl bg-gradient-to-br from-rose-500/20 to-rose-400/20 border border-rose-500/20">
                  <Target className="h-6 w-6 text-rose-400" />
                </div>
                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-rose-500/10 text-rose-400 border border-rose-500/20">
                  Foundation
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-foreground tracking-tight">
                Goal Setting &amp; Continuous Growth
              </h1>
              <p className="text-sm sm:text-base lg:text-lg text-white mt-1 max-w-2xl">
                Setting goals, building habits, tracking progress &mdash; based on FranklinCovey 7
                Habits, Carol Dweck&rsquo;s growth mindset research, and UK trade CPD frameworks
              </p>
            </div>
          </div>

          {/* Course Stats Bar */}
          <div className="grid grid-cols-3 gap-3 sm:gap-4">
            <div className="flex items-center gap-3 rounded-xl bg-white/[0.03] border border-white/[0.06] p-3 sm:p-4">
              <div className="p-2 rounded-lg bg-blue-500/10">
                <BookOpen className="h-4 w-4 sm:h-5 sm:w-5 text-blue-400" />
              </div>
              <div>
                <p className="text-lg sm:text-xl font-bold text-foreground">6</p>
                <p className="text-[10px] sm:text-xs text-white">Modules</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-xl bg-white/[0.03] border border-white/[0.06] p-3 sm:p-4">
              <div className="p-2 rounded-lg bg-rose-500/10">
                <FileText className="h-4 w-4 sm:h-5 sm:w-5 text-rose-400" />
              </div>
              <div>
                <p className="text-lg sm:text-xl font-bold text-foreground">200+</p>
                <p className="text-[10px] sm:text-xs text-white">Pages</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-xl bg-white/[0.03] border border-white/[0.06] p-3 sm:p-4">
              <div className="p-2 rounded-lg bg-rose-500/10">
                <Clock className="h-4 w-4 sm:h-5 sm:w-5 text-rose-400" />
              </div>
              <div>
                <p className="text-lg sm:text-xl font-bold text-foreground">4h</p>
                <p className="text-[10px] sm:text-xs text-white">Total</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-2.5 sm:gap-3 md:gap-4">
            {modules.map((mod, index) => (
              <ModuleCard
                key={mod.moduleNumber}
                to={mod.link}
                moduleNumber={mod.moduleNumber}
                title={mod.title}
                description={mod.description}
                icon={mod.icon}
                duration={mod.duration}
                isExam={mod.isExam}
                index={index}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
