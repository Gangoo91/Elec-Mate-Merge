import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import useSEO from "@/hooks/useSEO";

const HNCModule3Section6_6 = () => {
  useSEO(
    "BS7671, CIBSE and Part L Requirements for Energy Efficiency - HNC Module 3 Section 6.6",
    "Regulatory frameworks and standards governing energy efficiency in electrical installations"
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border/20 bg-card/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button variant="ghost" className="text-muted-foreground hover:text-foreground active:text-foreground p-0 -ml-1" asChild>
            <Link to="../section6">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section 6
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-2xl md:text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-6">
          3.6.6 BS7671, CIBSE and Part L Requirements for Energy Efficiency
        </h1>
        <p className="text-xl text-muted-foreground mb-8">
          Regulatory frameworks and standards governing energy efficiency in electrical installations
        </p>

        <div className="prose prose-invert max-w-none">
          <p>Content for BS7671, CIBSE and Part L Requirements will be added here.</p>
        </div>
      </div>
    </div>
  );
};

export default HNCModule3Section6_6;