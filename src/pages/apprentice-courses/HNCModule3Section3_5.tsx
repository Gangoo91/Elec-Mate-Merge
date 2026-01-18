import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import useSEO from "@/hooks/useSEO";

const HNCModule3Section3_5 = () => {
  useSEO(
    "Harmonics – sources, effects and mitigation - HNC Module 3",
    "Learn about harmonic distortion, sources and methods for harmonic control"
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
          3.3.5 Harmonics – sources, effects and mitigation
        </h1>
        <p className="text-xl text-muted-foreground mb-8">
          Understanding harmonic distortion, sources and methods for harmonic control
        </p>

        <div className="prose prose-invert max-w-none">
          <p>Master harmonic theory and its practical implications for building electrical systems. Learn about harmonic sources including computers, LED lighting, and variable frequency drives. Understand the effects of harmonics on equipment performance, energy efficiency, and electromagnetic compatibility. Explore mitigation techniques including harmonic filters and equipment selection strategies.</p>
        </div>
      </div>
    </div>
  );
};

export default HNCModule3Section3_5;