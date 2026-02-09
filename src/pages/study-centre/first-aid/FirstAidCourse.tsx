import {
  ArrowLeft,
  Scale,
  HeartPulse,
  Droplets,
  Thermometer,
  Bone,
  GraduationCap,
  Heart,
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
    title: "The First Aider's Role, Legislation & Assessment",
    description:
      'Health & Safety (First-Aid) Regulations 1981, scene safety, DR ABC, RIDDOR, accident books, first aid kits and workplace planning',
    icon: Scale,
    duration: '40 mins',
    link: '../first-aid-module-1',
  },
  {
    moduleNumber: 2,
    title: 'Life-Threatening Emergencies — CPR, AED & Choking',
    description:
      'Chain of survival, adult CPR, automated external defibrillators, recovery position, choking management',
    icon: HeartPulse,
    duration: '45 mins',
    link: '../first-aid-module-2',
  },
  {
    moduleNumber: 3,
    title: 'Bleeding, Burns & Shock',
    description:
      'Haemorrhage control, wound management, tourniquets, burns and scalds, shock recognition and anaphylaxis',
    icon: Droplets,
    duration: '40 mins',
    link: '../first-aid-module-3',
  },
  {
    moduleNumber: 4,
    title: 'Medical Emergencies & Environmental Conditions',
    description:
      'Heart attack, stroke, seizures, diabetes, electric shock, heat exhaustion, hypothermia',
    icon: Thermometer,
    duration: '40 mins',
    link: '../first-aid-module-4',
  },
  {
    moduleNumber: 5,
    title: 'Injuries, Specific Conditions & Workplace Protocol',
    description:
      'Fractures, head and spinal injuries, eye injuries, poisoning, COSHH, mental health crises and first aider wellbeing',
    icon: Bone,
    duration: '40 mins',
    link: '../first-aid-module-5',
  },
  {
    moduleNumber: 6,
    title: 'Mock Exam',
    description:
      '200-question bank, 20 random questions per attempt, 30-minute timer, 80% pass mark',
    icon: GraduationCap,
    duration: '30 mins',
    link: '../first-aid-module-6',
    isExam: true,
  },
];

export default function FirstAidCourse() {
  useSEO({
    title: 'First Aid at Work | General Upskilling',
    description:
      'Complete First Aid at Work training covering legislation, CPR, AED, bleeding, burns, shock, medical emergencies, injuries and mock exam preparation.',
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
          {/* Course Header - RED/ROSE theme for First Aid */}
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-rose-500/10 via-red-500/5 to-transparent border border-rose-500/15 p-5 sm:p-8">
            <div className="absolute top-0 right-0 w-48 h-48 bg-rose-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2.5 rounded-xl bg-gradient-to-br from-rose-500/20 to-red-500/20 border border-rose-500/20">
                  <Heart className="h-6 w-6 text-rose-400" />
                </div>
                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-rose-500/10 text-rose-400 border border-rose-500/20">
                  Intermediate
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-foreground tracking-tight">
                First Aid at Work
              </h1>
              <p className="text-sm sm:text-base lg:text-lg text-muted-foreground mt-1 max-w-2xl">
                Workplace first aid procedures, CPR, emergency response, injury management and legal
                requirements
              </p>
            </div>
          </div>

          {/* Course Stats Bar */}
          <div className="grid grid-cols-3 gap-3 sm:gap-4">
            <div className="flex items-center gap-3 rounded-xl bg-white/[0.03] border border-white/[0.06] p-3 sm:p-4">
              <div className="p-2 rounded-lg bg-rose-500/10">
                <BookOpen className="h-4 w-4 sm:h-5 sm:w-5 text-rose-400" />
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
              <div className="p-2 rounded-lg bg-rose-500/10">
                <Clock className="h-4 w-4 sm:h-5 sm:w-5 text-rose-400" />
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
