import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import useSEO from "@/hooks/useSEO";

const Level3Module4Section6_2 = () => {
  useSEO(
    "Working Under Pressure and Meeting Deadlines - Level 3 Fault Diagnosis",
    "Managing time effectively and working efficiently under pressure situations"
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border/20 bg-card/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button variant="ghost" className="text-muted-foreground hover:text-foreground active:text-foreground p-0 -ml-1" asChild>
            <Link to="../section6">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section 6
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-2xl md:text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-6">
          6.2 Working Under Pressure and Meeting Deadlines
        </h1>
        <p className="text-xl text-muted-foreground mb-8">
          Managing time effectively and working efficiently under pressure situations
        </p>

        <div className="prose prose-invert max-w-none">
          <p>Content for Working Under Pressure and Meeting Deadlines will be added here.</p>
        </div>
      </div>
    </div>
  );
};

export default Level3Module4Section6_2;