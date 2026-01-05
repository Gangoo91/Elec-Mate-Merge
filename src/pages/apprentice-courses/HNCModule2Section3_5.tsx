import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import useSEO from "@/hooks/useSEO";

const HNCModule2Section3_5 = () => {
  useSEO(
    "Ventilation Requirements for Occupancy - HNC Module 2",
    "Fresh air requirements and indoor air quality standards for building design"
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
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-12">
          <h1 className="text-2xl md:text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-6">
            3.5 Ventilation Requirements for Occupancy
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            Fresh air requirements and indoor air quality standards for healthy building environments.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HNCModule2Section3_5;