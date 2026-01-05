import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import useSEO from "@/hooks/useSEO";

const HNCModule2Section2_1 = () => {
  useSEO(
    "Principles of Fluid Pressure and Flow - HNC Module 2",
    "Fundamental fluid mechanics principles and flow behaviour in building services"
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
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-12">
          <h1 className="text-2xl md:text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-6">
            2.1 Principles of Fluid Pressure and Flow
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            Fundamental fluid mechanics principles and flow behaviour in building services applications.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HNCModule2Section2_1;