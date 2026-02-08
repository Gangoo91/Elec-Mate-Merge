import { ArrowLeft, FileText, BarChart3, AlertTriangle, X, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ModuleCard } from "@/components/apprentice-courses/ModuleCard";
import useSEO from "@/hooks/useSEO";
import { cn } from "@/lib/utils";

const AM2Module1 = () => {
  useSEO(
    "Module 1: Introduction to the AM2 - AM2 Preparation Course",
    "Understanding the purpose, structure, marking criteria and common failure reasons for the AM2 assessment"
  );

  const sections = [
    {
      id: 1,
      number: "Section 1",
      title: "Purpose of the AM2 and who it's for",
      description: "Understanding the AM2 assessment objectives and target candidates",
      icon: FileText,
      path: "section1"
    },
    {
      id: 2,
      number: "Section 2",
      title: "Structure and timings of the assessment",
      description: "Breakdown of AM2 components and time allocations",
      icon: BarChart3,
      path: "section2"
    },
    {
      id: 3,
      number: "Section 3",
      title: "Marking criteria and pass/fail thresholds",
      description: "How the AM2 is marked and what constitutes a pass",
      icon: AlertTriangle,
      path: "section3"
    },
    {
      id: 4,
      number: "Section 4",
      title: "Common reasons for failure",
      description: "Typical mistakes and areas where candidates fail",
      icon: X,
      path: "section4"
    }
  ];

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <header className="sticky top-0 z-30 bg-[#1a1a1a]/95 backdrop-blur-xl border-b border-white/10 safe-top">
        <div className="px-4 sm:px-6 py-3">
          <div className="max-w-5xl mx-auto">
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
              <Link to="/study-centre/apprentice/am2">
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
        <div className="max-w-5xl mx-auto">
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
                <BookOpen className="w-7 h-7 sm:w-8 sm:h-8 text-elec-yellow" />
              </div>
            </div>

            {/* Title */}
            <h1 className="text-ios-title-1 text-white mb-3 ios-animate-in">
              Module 1: Introduction to the AM2
            </h1>

            {/* Description */}
            <p className="text-ios-body text-white/70 leading-relaxed max-w-2xl ios-animate-in">
              Understanding the purpose, structure, marking criteria and common failure reasons for the AM2 assessment.
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

export default AM2Module1;
