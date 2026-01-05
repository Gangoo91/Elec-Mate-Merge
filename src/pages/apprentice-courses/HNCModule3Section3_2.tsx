import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import useSEO from "@/hooks/useSEO";

const HNCModule3Section3_2 = () => {
  useSEO(
    "Frequency, period and amplitude relationships - HNC Module 3",
    "Learn time-domain characteristics of AC waveforms and their frequency components"
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
          3.3.2 Frequency, period and amplitude relationships
        </h1>
        <p className="text-xl text-muted-foreground mb-8">
          Time-domain characteristics of AC waveforms and their frequency components
        </p>

        <div className="prose prose-invert max-w-none">
          <p>Explore the time-domain properties of AC waveforms including frequency, period, and amplitude. Understand how these parameters relate to each other and affect electrical equipment performance. Learn about the standard 50Hz UK supply frequency and its significance for motor speeds, lighting flicker, and system synchronisation in building services applications.</p>
        </div>
      </div>
    </div>
  );
};

export default HNCModule3Section3_2;