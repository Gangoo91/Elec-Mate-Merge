import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import useSEO from "@/hooks/useSEO";

const HNCModule3Section3_7 = () => {
  useSEO(
    "Power triangle and efficiency - HNC Module 3",
    "Learn graphical representation of power relationships and system efficiency calculations"
  );

  return (
    <div className="bg-background">
      {/* Header */}
      <div className="border-b border-border/20 bg-card/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button variant="ghost" className="text-muted-foreground hover:text-foreground active:text-foreground p-0 -ml-1" asChild>
            <Link to="../section3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section 3
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-2xl md:text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-6">
          3.3.7 Power triangle and efficiency
        </h1>
        <p className="text-xl text-muted-foreground mb-8">
          Graphical representation of power relationships and system efficiency calculations
        </p>

        <div className="prose prose-invert max-w-none">
          <p>Master the power triangle concept for visualising relationships between true, reactive, and apparent power. Learn to calculate power factor and system efficiency using graphical and mathematical methods. Apply these concepts to assess and improve the performance of building electrical systems, including motors, lighting, and HVAC equipment.</p>
        </div>
      </div>
    </div>
  );
};

export default HNCModule3Section3_7;