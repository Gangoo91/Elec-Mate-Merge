import { ArrowLeft, Bug, Search, Settings, CheckCircle, RotateCcw, FileText, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ModuleCard } from "@/components/apprentice-courses/ModuleCard";
import useSEO from "@/hooks/useSEO";
import { cn } from "@/lib/utils";

const AM2Module5 = () => {
  useSEO(
    "Module 5: Fault Diagnosis and Rectification - AM2 Preparation Course",
    "Systematic fault-finding techniques, test equipment use and rectification procedures for AM2 assessment"
  );

  const sections = [
    {
      id: 1,
      number: "Section 1",
      title: "Typical faults set in the AM2 assessment",
      description: "Common fault scenarios in AM2 examinations",
      icon: Bug,
      path: "section1"
    },
    {
      id: 2,
      number: "Section 2",
      title: "Logical fault-finding process",
      description: "Systematic approach to fault diagnosis",
      icon: Search,
      path: "section2"
    },
    {
      id: 3,
      number: "Section 3",
      title: "Using test equipment efficiently",
      description: "Effective use of test instruments for fault finding",
      icon: Settings,
      path: "section3"
    },
    {
      id: 4,
      number: "Section 4",
      title: "Proving and recording rectification",
      description: "Demonstrating and documenting fault rectification",
      icon: CheckCircle,
      path: "section4"
    },
    {
      id: 5,
      number: "Section 5",
      title: "Re-testing procedures",
      description: "Post-rectification testing and verification",
      icon: RotateCcw,
      path: "section5"
    },
    {
      id: 6,
      number: "Section 6",
      title: "AM2 Fault Diagnosis & Rectification – Quick Reference Sheet",
      description: "Essential reference guide for AM2 fault-finding procedures",
      icon: FileText,
      path: "section6"
    }
  ];

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <header className="sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-xl border-b border-white/10 safe-top">
        <div className="px-4 sm:px-6 py-3">
          <div className="max-w-3xl mx-auto">
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
              <Link to="..">
                <ArrowLeft className="w-5 h-5" />
              </Link>
            </Button>
            <span className="text-ios-footnote text-white/50">AM2 Course</span>
          </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 sm:px-6 py-6 safe-bottom">
        <div className="max-w-3xl mx-auto">
          {/* Hero Section */}
          <div className="pb-6 sm:pb-8">
            {/* Icon with Glow Effect */}
            <div className="relative inline-block mb-4 ios-animate-in">
              <div className="absolute inset-0 bg-elec-yellow/20 rounded-2xl blur-xl scale-150" />
              <div className={cn(
                'relative p-3 sm:p-4 rounded-2xl',
                'bg-gradient-to-br from-elec-yellow/20 to-amber-500/10',
                'border border-elec-yellow/30',
                'shadow-[0_0_30px_-5px_hsl(47_100%_50%/0.3)]'
              )}>
                <Wrench className="w-7 h-7 sm:w-8 sm:h-8 text-elec-yellow" />
              </div>
            </div>

            {/* Title */}
            <h1 className="text-ios-title-1 text-white mb-3 ios-animate-in">
              Module 5: Fault Diagnosis and Rectification
            </h1>

            {/* Description */}
            <p className="text-ios-body text-white/70 leading-relaxed max-w-2xl ios-animate-in">
              Systematic fault-finding techniques, test equipment use and rectification procedures for AM2 assessment.
            </p>
          </div>

          {/* Sections Grid */}
          <div className="grid grid-cols-1 gap-4 ios-stagger-children">
            {sections.map((section) => (
              <ModuleCard
                key={section.id}
                number={section.number}
                title={section.title}
                description={section.description}
                icon={section.icon}
                href={section.path}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AM2Module5;
