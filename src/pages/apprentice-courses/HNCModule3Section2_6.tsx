import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import useSEO from "@/hooks/useSEO";

const HNCModule3Section2_6 = () => {
  useSEO(
    "Resonance in RLC circuits and practical issues - HNC Module 3", 
    "Learn about series and parallel resonance phenomena and their effects in electrical installations"
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
          3.2.6 Resonance in RLC circuits and practical issues
        </h1>
        <p className="text-xl text-muted-foreground mb-8">
          Series and parallel resonance phenomena and their effects in electrical installations
        </p>

        <div className="prose prose-invert max-w-none">
          <p>Understand resonance phenomena in electrical circuits containing resistance, inductance, and capacitance. Learn about series and parallel resonance conditions, their effects on current and voltage, and potential problems such as overvoltage and overcurrent. This knowledge is essential for avoiding resonance issues in power factor correction systems and filter design.</p>
        </div>
      </div>
    </div>
  );
};

export default HNCModule3Section2_6;