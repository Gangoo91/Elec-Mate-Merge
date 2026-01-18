import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import useSEO from "@/hooks/useSEO";

const HNCModule2Section1_5 = () => {
  useSEO(
    "Heat Gains and Losses in Building Envelopes - HNC Module 2",
    "Building fabric heat transfer analysis and energy performance"
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
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-12">
          <h1 className="text-2xl md:text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-6">
            1.5 Heat Gains and Losses in Building Envelopes
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            Comprehensive analysis of building fabric heat transfer and its impact on energy performance.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HNCModule2Section1_5;