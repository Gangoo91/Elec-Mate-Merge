import { ArrowLeft, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ModuleCard } from "@/components/apprentice-courses/ModuleCard";
import useSEO from "@/hooks/useSEO";

const HNCModule9 = () => {
  useSEO(
    "Mock Examinations - HNC Module 9 | Practice Exams",
    "Prepare for your HNC examinations with our comprehensive mock exam system. 500 question bank covering all 8 modules with timed assessments."
  );

  return (
    <div className="bg-background">
      {/* Header */}
      <div className="border-b border-border/20 bg-card/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button variant="ghost" className="text-muted-foreground hover:text-foreground active:text-foreground p-0 -ml-1 touch-manipulation" asChild>
            <Link to="../hnc">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to HNC
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-8">
          Module 9: Mock Examinations
        </h1>

        {/* Mock Exam Card */}
        <div className="max-w-md">
          <ModuleCard
            number="9.1"
            title="HNC Mock Exam"
            description="30 random questions from all modules. 45 minutes. Test your HNC knowledge."
            icon={FileText}
            href="../h-n-c-module9-mock-exam"
          />
        </div>
      </div>
    </div>
  );
};

export default HNCModule9;
