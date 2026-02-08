import { BookOpen, Shield, Wrench, TestTube, Search, Monitor, Trophy, Award, ArrowLeft, Zap, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { CourseCard } from "@/components/apprentice-courses/CourseCard";
import useSEO from "@/hooks/useSEO";
import { cn } from "@/lib/utils";

const AM2 = () => {
  useSEO(
    "AM2 Preparation & Guidance Course - Electrical Training",
    "Comprehensive AM2 assessment preparation covering installation, testing, fault diagnosis and exam strategy for electrical qualifications"
  );

  const modules = [
    {
      id: 1,
      number: "Module 1",
      title: "Introduction to the AM2",
      description: "Purpose, structure, marking criteria and common failure reasons",
      icon: BookOpen,
      path: "module1"
    },
    {
      id: 2,
      number: "Module 2",
      title: "Health, Safety and Documentation",
      description: "Safe isolation, RAMS, drawings, paperwork and critical safety procedures",
      icon: Shield,
      path: "module2"
    },
    {
      id: 3,
      number: "Module 3",
      title: "Installation Tasks",
      description: "Cable selection, power circuits, lighting, special installations and time management",
      icon: Wrench,
      path: "module3"
    },
    {
      id: 4,
      number: "Module 4",
      title: "Inspection and Testing",
      description: "Test sequences, instruments, certification, functional testing and compliance",
      icon: TestTube,
      path: "module4"
    },
    {
      id: 5,
      number: "Module 5",
      title: "Fault Diagnosis and Rectification",
      description: "Typical faults, logical processes, test equipment and re-testing procedures",
      icon: Search,
      path: "module5"
    },
    {
      id: 6,
      number: "Module 6",
      title: "Online Knowledge Test",
      description: "Format, core topics, practice questions and time management strategies",
      icon: Monitor,
      path: "module6"
    },
    {
      id: 7,
      number: "Module 7",
      title: "Exam Strategy and Success Tips",
      description: "Time management, pressure handling, safety approach and common mistakes",
      icon: Trophy,
      path: "module7"
    },
    {
      id: 8,
      number: "Module 8",
      title: "Full Mock AM2 Assessment",
      description: "Simulated tasks, practice runs, exam conditions and improvement planning",
      icon: Award,
      path: "module8"
    }
  ];

  const stats = [
    { label: "Sections", value: "6" },
    { label: "Hours", value: "~16.5" },
    { label: "Days", value: "2.5" },
    { label: "Knowledge Pass", value: "70%" },
  ];

  return (
    <div className="bg-background min-h-screen">
      {/* Sticky Header */}
      <header className="sticky top-0 z-30 bg-[#1a1a1a]/95 backdrop-blur-xl border-b border-white/10 safe-top">
        <div className="px-4 sm:px-6 py-3">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              className={cn(
                'min-h-[44px] min-w-[44px] p-2 -ml-2',
                'text-white/70 hover:text-white hover:bg-white/5',
                'touch-manipulation active:scale-[0.98] transition-all duration-ios-normal ease-ios-ease'
              )}
              asChild
            >
              <Link to="/study-centre/apprentice">
                <ArrowLeft className="w-5 h-5" />
              </Link>
            </Button>
            <span className="text-ios-footnote text-white/50">Study Centre</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="safe-bottom">
        <div className="max-w-7xl mx-auto">

          {/* Hero Section */}
          <section className="relative overflow-hidden px-4 sm:px-6 pt-8 pb-6">
            {/* Glowing background blur */}
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full opacity-30 blur-3xl pointer-events-none"
              style={{
                background: 'radial-gradient(circle, rgba(59,130,246,0.5) 0%, rgba(245,158,11,0.4) 60%, transparent 80%)',
              }}
            />
            <div className="relative flex flex-col items-center text-center gap-4">
              <div className="relative">
                <div className="absolute inset-0 rounded-full bg-elec-yellow/20 blur-xl scale-150" />
                <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-elec-yellow/20 to-amber-600/20 border border-elec-yellow/30 flex items-center justify-center">
                  <Zap className="w-8 h-8 text-elec-yellow" />
                </div>
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  AM2 Preparation
                </h1>
                <p className="mt-2 text-sm sm:text-base text-white/60 max-w-xl mx-auto leading-relaxed">
                  Complete preparation for the AM2 practical assessment. Master installation, inspection, testing and fault diagnosis to pass first time.
                </p>
              </div>
            </div>
          </section>

          {/* Stats Bar */}
          <section className="px-4 sm:px-6 pb-6">
            <div className="bg-gray-800/60 border border-white/10 rounded-xl p-3 sm:p-4">
              <div className="flex items-center justify-between sm:justify-center sm:gap-0">
                {stats.map((stat, index) => (
                  <div key={stat.label} className="flex items-center">
                    {index > 0 && (
                      <div className="hidden sm:block w-px h-8 bg-white/10 mx-6" />
                    )}
                    <div className="flex flex-col items-center px-1 sm:px-3">
                      <span className="text-base sm:text-lg font-bold text-elec-yellow">
                        {stat.value}
                      </span>
                      <span className="text-[11px] sm:text-xs text-white/50 whitespace-nowrap">
                        {stat.label}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* NET Info Callout */}
          <section className="px-4 sm:px-6 pb-6">
            <div className="flex gap-3 items-start bg-blue-500/10 border border-blue-500/20 rounded-xl p-4">
              <Info className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
              <p className="text-sm text-white/70 leading-relaxed">
                Overseen by NET (National Electrotechnical Training). Competence-based practical assessment required for NVQ Level 3 Electrotechnical qualification.
              </p>
            </div>
          </section>

          {/* Module Grid */}
          <section className="px-4 sm:px-6 pb-8">
            <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-elec-yellow" />
              Course Modules
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {modules.map((module) => (
                <CourseCard
                  key={module.id}
                  title={module.title}
                  description={module.description}
                  icon={module.icon}
                  href={module.path}
                  number={module.number}
                />
              ))}
            </div>
          </section>

        </div>
      </main>
    </div>
  );
};

export default AM2;
