import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import useSEO from "@/hooks/useSEO";

const Level3Module7Section3_2 = () => {
  useSEO(
    "Technical Reporting and Documentation Skills - Level 3 Career Awareness & Professional Development",
    "Creating clear technical reports and maintaining professional documentation"
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border/20 bg-card/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button variant="ghost" className="text-muted-foreground hover:text-foreground p-0 text-sm sm:text-base" asChild>
            <Link to="../section3">
              <ArrowLeft className="w-4 h-4 mr-1 sm:mr-2" />
              Back to Section 3
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8 lg:py-12">
        <h1 className="text-xl sm:text-2xl lg:text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-4 sm:mb-6">
          3.2 Technical Reporting and Documentation Skills
        </h1>
        <p className="text-lg sm:text-xl text-muted-foreground mb-6 sm:mb-8">
          Creating clear technical reports and maintaining professional documentation
        </p>

        <div className="prose prose-invert max-w-none">
          <p>Content for Technical Reporting and Documentation Skills will be added here.</p>
        </div>
      </div>
    </div>
  );
};

export default Level3Module7Section3_2;