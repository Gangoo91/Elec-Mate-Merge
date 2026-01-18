import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import useSEO from "@/hooks/useSEO";

const HNCModule2Section3_6 = () => {
  useSEO(
    "HVAC Load Calculations - HNC Module 2",
    "Applications of psychrometrics to air-conditioning and HVAC load calculations"
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
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-12">
          <h1 className="text-2xl md:text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-6">
            3.6 Applications to Air-Conditioning and HVAC Load Calcs
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            Practical applications of psychrometrics to air-conditioning and HVAC load calculations.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HNCModule2Section3_6;