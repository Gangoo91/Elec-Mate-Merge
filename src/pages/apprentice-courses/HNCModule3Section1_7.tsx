import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import useSEO from "@/hooks/useSEO";

const HNCModule3Section1_7 = () => {
  useSEO(
    "Applications of circuit theory in building services - HNC Module 3",
    "Learn practical application of circuit analysis principles in HVAC, lighting and building electrical systems"
  );

  return (
    <div className="bg-background">
      {/* Header */}
      <div className="border-b border-border/20 bg-card/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button variant="ghost" className="text-muted-foreground hover:text-foreground active:text-foreground p-0 -ml-1" asChild>
            <Link to="../section1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section 1
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-2xl md:text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-6">
          3.1.7 Applications of circuit theory in building services
        </h1>
        <p className="text-xl text-muted-foreground mb-8">
          Practical application of circuit analysis principles in HVAC, lighting and building electrical systems
        </p>

        <div className="prose prose-invert max-w-none">
          <p>Apply circuit theory principles to real-world building services scenarios. Explore how fundamental electrical laws apply to HVAC motor control, lighting circuits, fire alarm systems, and building automation networks. This practical application bridges theoretical knowledge with professional engineering practice.</p>
        </div>
      </div>
    </div>
  );
};

export default HNCModule3Section1_7;