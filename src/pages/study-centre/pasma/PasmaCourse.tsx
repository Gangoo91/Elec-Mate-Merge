import { ArrowLeft, Scale, Layers, Wrench, ArrowDownToLine, ClipboardCheck, AlertTriangle, GraduationCap, HardHat, BookOpen, Clock, FileText } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ModuleCard } from "@/components/upskilling/cards";
import useSEO from "@/hooks/useSEO";

const modules = [
  {
    moduleNumber: 1,
    title: "Legislation & PASMA Standards",
    description: "Work at Height Regulations 2005, HSWA 1974, EN 1004:2020, PASMA Code of Practice, and CDM 2015",
    icon: Scale,
    duration: "35 mins",
    link: "../pasma-module-1",
  },
  {
    moduleNumber: 2,
    title: "Tower Types & Components",
    description: "Tower classifications, structural and safety components, selection planning, and tower anatomy",
    icon: Layers,
    duration: "35 mins",
    link: "../pasma-module-2",
  },
  {
    moduleNumber: 3,
    title: "Assembly Methods",
    description: "Pre-assembly planning, 3T Through The Trap method, AGR Advance Guard Rail method, and stability",
    icon: Wrench,
    duration: "40 mins",
    link: "../pasma-module-3",
  },
  {
    moduleNumber: 4,
    title: "Dismantling, Moving & Storage",
    description: "Safe dismantling procedures, moving and repositioning, storage, maintenance, and post-use checks",
    icon: ArrowDownToLine,
    duration: "30 mins",
    link: "../pasma-module-4",
  },
  {
    moduleNumber: 5,
    title: "Inspection & Compliance",
    description: "Pre-use visual checks, formal 7-day inspections, records and documentation, TowerSure app",
    icon: ClipboardCheck,
    duration: "35 mins",
    link: "../pasma-module-5",
  },
  {
    moduleNumber: 6,
    title: "Safety, Hazards & Rescue",
    description: "Common hazards, risk assessment, rescue procedures, physical fitness and safe working practices",
    icon: AlertTriangle,
    duration: "35 mins",
    link: "../pasma-module-6",
  },
  {
    moduleNumber: 7,
    title: "Mock Exam",
    description: "200-question bank, 20 random questions per attempt, 30-minute timer, 80% pass mark",
    icon: GraduationCap,
    duration: "30 mins",
    link: "../pasma-module-7",
    isExam: true,
  },
];

export default function PasmaCourse() {
  useSEO({
    title: "PASMA Towers for Users Training | General Upskilling",
    description: "Complete PASMA Towers for Users training covering legislation, tower types, assembly methods, dismantling, inspections, safety, and mock exam preparation.",
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
          {/* Course Header - BLUE theme */}
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-500/10 via-sky-500/5 to-transparent border border-blue-500/15 p-5 sm:p-8">
            <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2.5 rounded-xl bg-gradient-to-br from-blue-500/20 to-sky-500/20 border border-blue-500/20">
                  <HardHat className="h-6 w-6 text-blue-400" />
                </div>
                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-blue-500/10 text-blue-400 border border-blue-500/20">
                  Foundation
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-foreground tracking-tight">
                PASMA Towers for Users
              </h1>
              <p className="text-sm sm:text-base lg:text-lg text-muted-foreground mt-1 max-w-2xl">
                PASMA-certified training for mobile access tower assembly, inspection, and safe use
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
                <p className="text-lg sm:text-xl font-bold text-foreground">7</p>
                <p className="text-[10px] sm:text-xs text-muted-foreground">Modules</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-xl bg-white/[0.03] border border-white/[0.06] p-3 sm:p-4">
              <div className="p-2 rounded-lg bg-amber-500/10">
                <FileText className="h-4 w-4 sm:h-5 sm:w-5 text-amber-400" />
              </div>
              <div>
                <p className="text-lg sm:text-xl font-bold text-foreground">250+</p>
                <p className="text-[10px] sm:text-xs text-muted-foreground">Pages</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-xl bg-white/[0.03] border border-white/[0.06] p-3 sm:p-4">
              <div className="p-2 rounded-lg bg-blue-500/10">
                <Clock className="h-4 w-4 sm:h-5 sm:w-5 text-blue-400" />
              </div>
              <div>
                <p className="text-lg sm:text-xl font-bold text-foreground">4.5h</p>
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
