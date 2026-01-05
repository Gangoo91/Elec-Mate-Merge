import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import useSEO from "@/hooks/useSEO";

const HNCModule3Section2_7 = () => {
  useSEO(
    "Applications in lighting, HVAC and motors - HNC Module 3",
    "Learn practical application of reactive component principles in building services equipment"
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border/20 bg-card/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button variant="ghost" className="text-muted-foreground hover:text-foreground active:text-foreground p-0 -ml-1" asChild>
            <Link to="../section2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section 2
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-2xl md:text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-6">
          3.2.7 Applications in lighting, HVAC and motors
        </h1>
        <p className="text-xl text-muted-foreground mb-8">
          Practical application of reactive component principles in building services equipment
        </p>

        <div className="prose prose-invert max-w-none">
          <p>Apply reactive component theory to real-world building services applications. Explore how inductance and capacitance affect fluorescent lighting ballasts, motor starting and running characteristics, and HVAC system performance. Learn to specify appropriate reactive components for optimal system efficiency and reliability in commercial building installations.</p>
        </div>
      </div>
    </div>
  );
};

export default HNCModule3Section2_7;