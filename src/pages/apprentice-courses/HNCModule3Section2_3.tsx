import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import useSEO from "@/hooks/useSEO";

const HNCModule3Section2_3 = () => {
  useSEO(
    "Phase angle and phasor diagrams - HNC Module 3",
    "Learn vector representation of AC quantities and phase relationships between voltage and current"
  );

  return (
    <div className="bg-background">
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
          3.2.3 Phase angle and phasor diagrams
        </h1>
        <p className="text-xl text-muted-foreground mb-8">
          Vector representation of AC quantities and phase relationships between voltage and current
        </p>

        <div className="prose prose-invert max-w-none">
          <p>Develop skills in phasor diagram construction and phase angle analysis. Learn how to represent AC voltages and currents as rotating vectors and understand leading and lagging phase relationships. These graphical techniques are essential for analysing complex AC circuits and understanding power factor in building electrical systems.</p>
        </div>
      </div>
    </div>
  );
};

export default HNCModule3Section2_3;