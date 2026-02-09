import {
  ArrowLeft,
  Scale,
  Search,
  CableCar,
  Wrench,
  ShieldAlert,
  LifeBuoy,
  GraduationCap,
  BookOpen,
  Clock,
  FileText,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ModuleCard } from '@/components/upskilling/cards';
import useSEO from '@/hooks/useSEO';

const modules = [
  {
    moduleNumber: 1,
    title: 'Introduction, Legislation & MEWP Types',
    description:
      'Work at Height Regs 2005, LOLER, PUWER, IPAF categories, scissor lifts, boom lifts, spider lifts and power sources',
    icon: Scale,
    duration: '35 mins',
    link: '../mewp-module-1',
  },
  {
    moduleNumber: 2,
    title: 'Risk Assessment, Planning & Selection',
    description:
      'Risk assessment process, the six key hazards, machine selection criteria, ground conditions and weather limits',
    icon: Search,
    duration: '35 mins',
    link: '../mewp-module-2',
  },
  {
    moduleNumber: 3,
    title: 'Pre-Use Inspections, Setup & Fall Protection',
    description:
      'Pre-use inspection checklist, thorough examination, outrigger setup, harnesses, lanyards and PPE',
    icon: Wrench,
    duration: '40 mins',
    link: '../mewp-module-3',
  },
  {
    moduleNumber: 4,
    title: 'Safe Operating Procedures',
    description:
      'Operating controls, travelling, elevating, platform loading, power lines, exclusion zones and banksman duties',
    icon: ShieldAlert,
    duration: '35 mins',
    link: '../mewp-module-4',
  },
  {
    moduleNumber: 5,
    title: 'Emergency Procedures, Rescue & Reporting',
    description:
      'Emergency scenarios, lowering systems, rescue procedures, RIDDOR reporting and lessons learnt',
    icon: LifeBuoy,
    duration: '35 mins',
    link: '../mewp-module-5',
  },
  {
    moduleNumber: 6,
    title: 'Mock Exam',
    description:
      '200-question bank, 20 random questions per attempt, 30-minute timer, 80% pass mark',
    icon: GraduationCap,
    duration: '30 mins',
    link: '../mewp-module-6',
    isExam: true,
  },
];

export default function MewpCourse() {
  useSEO({
    title: 'MEWP Operator Training | General Upskilling',
    description:
      'Complete MEWP operator training covering legislation, risk assessment, inspections, safe operation, emergency procedures and mock exam preparation.',
  });

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      <header className="sticky top-0 z-10 bg-[#1a1a1a]/95 backdrop-blur-sm px-4 sm:px-8 lg:px-12 pt-6 pb-4">
        <div className="max-w-5xl mx-auto">
          <Link to="/study-centre/general-upskilling">
            <Button
              variant="ghost"
              className="text-muted-foreground hover:text-foreground transition-colors p-0 h-auto touch-manipulation active:scale-[0.98]"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to General Upskilling
            </Button>
          </Link>
        </div>
      </header>

      <main className="px-4 sm:px-8 lg:px-12 pb-12">
        <div className="max-w-5xl mx-auto space-y-6 sm:space-y-8">
          {/* Course Header - GREEN theme for MEWP */}
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-500/10 via-teal-500/5 to-transparent border border-emerald-500/15 p-5 sm:p-8">
            <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2.5 rounded-xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border border-emerald-500/20">
                  <CableCar className="h-6 w-6 text-emerald-400" />
                </div>
                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  Intermediate
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-foreground tracking-tight">
                MEWP Operator Training
              </h1>
              <p className="text-sm sm:text-base lg:text-lg text-muted-foreground mt-1 max-w-2xl">
                Mobile elevating work platform operation, safety, pre-use inspections and emergency
                procedures
              </p>
            </div>
          </div>

          {/* Course Stats Bar */}
          <div className="grid grid-cols-3 gap-3 sm:gap-4">
            <div className="flex items-center gap-3 rounded-xl bg-white/[0.03] border border-white/[0.06] p-3 sm:p-4">
              <div className="p-2 rounded-lg bg-emerald-500/10">
                <BookOpen className="h-4 w-4 sm:h-5 sm:w-5 text-emerald-400" />
              </div>
              <div>
                <p className="text-lg sm:text-xl font-bold text-foreground">6</p>
                <p className="text-[10px] sm:text-xs text-muted-foreground">Modules</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-xl bg-white/[0.03] border border-white/[0.06] p-3 sm:p-4">
              <div className="p-2 rounded-lg bg-amber-500/10">
                <FileText className="h-4 w-4 sm:h-5 sm:w-5 text-amber-400" />
              </div>
              <div>
                <p className="text-lg sm:text-xl font-bold text-foreground">200+</p>
                <p className="text-[10px] sm:text-xs text-muted-foreground">Pages</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-xl bg-white/[0.03] border border-white/[0.06] p-3 sm:p-4">
              <div className="p-2 rounded-lg bg-emerald-500/10">
                <Clock className="h-4 w-4 sm:h-5 sm:w-5 text-emerald-400" />
              </div>
              <div>
                <p className="text-lg sm:text-xl font-bold text-foreground">3.5h</p>
                <p className="text-[10px] sm:text-xs text-muted-foreground">Total</p>
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
