import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import useSEO from "@/hooks/useSEO";

const HNCModule2Section5_1 = () => {
  useSEO(
    "Internal Heat Gains - HNC Module 2",
    "Heat sources from occupants, lighting and equipment in buildings"
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b border-border/20 bg-card/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button variant="ghost" className="text-muted-foreground hover:text-foreground active:text-foreground p-0 -ml-1" asChild>
            <Link to="../section5">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section 5
            </Link>
          </Button>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-12">
          <h1 className="text-2xl md:text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-6">
            5.1 Internal Heat Gains (Occupants, Lighting, Equipment)
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            Heat sources within buildings and their impact on HVAC load calculations.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HNCModule2Section5_1;