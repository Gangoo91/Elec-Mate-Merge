import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import useSEO from "@/hooks/useSEO";

const HNCModule3Section5_8 = () => {
  useSEO(
    "Maintenance, Testing and Fault Diagnosis - HNC Module 3 Section 5.8",
    "Preventive maintenance practices and diagnostic techniques for electrical machines"
  );

  return (
    <div className="bg-background">
      {/* Header */}
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

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-2xl md:text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-6">
          3.5.8 Maintenance, Testing and Fault Diagnosis
        </h1>
        <p className="text-xl text-muted-foreground mb-8">
          Preventive maintenance practices and diagnostic techniques for electrical machines
        </p>

        <div className="prose prose-invert max-w-none">
          <p>Content for Maintenance, Testing and Fault Diagnosis will be added here.</p>
        </div>
      </div>
    </div>
  );
};

export default HNCModule3Section5_8;