import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import useSEO from "@/hooks/useSEO";

const HNCModule2Section4_2 = () => {
  useSEO(
    "Lighting Quantities and Units - HNC Module 2",
    "Luminous flux, luminous intensity, illuminance and luminance fundamentals"
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border/20 bg-card/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button variant="ghost" className="text-muted-foreground hover:text-foreground active:text-foreground p-0 -ml-1" asChild>
            <Link to="../section4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section 4
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-12">
          <h1 className="text-2xl md:text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-6">
            4.2 Luminous Flux, Luminous Intensity, Illuminance and Luminance
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            Fundamental lighting quantities and units for building services lighting design.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HNCModule2Section4_2;