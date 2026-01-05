import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import useSEO from "@/hooks/useSEO";

const HNCModule3Section2_5 = () => {
  useSEO(
    "Power factor correction methods (capacitors, active filters) - HNC Module 3",
    "Learn techniques for improving power factor using capacitor banks and electronic correction systems"
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
      <div className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-2xl md:text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-6">
          3.2.5 Power factor correction methods (capacitors, active filters)
        </h1>
        <p className="text-xl text-muted-foreground mb-8">
          Techniques for improving power factor using capacitor banks and electronic correction systems
        </p>

        <div className="prose prose-invert max-w-none">
          <p>Explore practical methods for improving power factor in building electrical systems. Learn about fixed and automatic capacitor banks, active power factor correction systems, and modern electronic filters. Understand sizing calculations, installation requirements, and the economic benefits of power factor improvement in commercial and industrial buildings.</p>
        </div>
      </div>
    </div>
  );
};

export default HNCModule3Section2_5;