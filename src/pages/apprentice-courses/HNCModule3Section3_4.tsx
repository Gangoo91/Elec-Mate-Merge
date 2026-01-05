import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import useSEO from "@/hooks/useSEO";

const HNCModule3Section3_4 = () => {
  useSEO(
    "Sinusoidal, non-sinusoidal and distorted waveforms - HNC Module 3",
    "Learn analysis of different waveform types and distortion effects in electrical systems"
  );

  return (
    <div className="min-h-screen bg-background">
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
          3.3.4 Sinusoidal, non-sinusoidal and distorted waveforms
        </h1>
        <p className="text-xl text-muted-foreground mb-8">
          Analysis of different waveform types and distortion effects in electrical systems
        </p>

        <div className="prose prose-invert max-w-none">
          <p>Understand the characteristics of sinusoidal waveforms and learn to identify non-sinusoidal and distorted waveforms commonly found in modern electrical installations. Explore causes of waveform distortion including electronic loads, variable speed drives, and switch-mode power supplies. This knowledge is crucial for power quality assessment and equipment selection in building services.</p>
        </div>
      </div>
    </div>
  );
};

export default HNCModule3Section3_4;