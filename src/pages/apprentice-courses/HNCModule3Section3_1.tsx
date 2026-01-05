import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import useSEO from "@/hooks/useSEO";

const HNCModule3Section3_1 = () => {
  useSEO(
    "AC waveform characteristics (RMS, average, peak values) - HNC Module 3",
    "Learn different AC measurement values and their mathematical relationships"
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
          3.3.1 AC waveform characteristics (RMS, average, peak values)
        </h1>
        <p className="text-xl text-muted-foreground mb-8">
          Understanding different AC measurement values and their mathematical relationships
        </p>

        <div className="prose prose-invert max-w-none">
          <p>Master the fundamental characteristics of AC waveforms including peak, RMS (root mean square), and average values. Learn the mathematical relationships between these values and understand why RMS values are used for AC measurements. This knowledge is essential for proper instrument selection and accurate power calculations in building electrical systems.</p>
        </div>
      </div>
    </div>
  );
};

export default HNCModule3Section3_1;