import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import useSEO from "@/hooks/useSEO";

const HNCModule3Section1_1 = () => {
  useSEO(
    "Ohm's Law, Kirchhoff's Voltage & Current Laws - HNC Module 3",
    "Learn fundamental electrical laws governing voltage, current and resistance relationships in circuits"
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
      <div className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-2xl md:text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-6">
          3.1.1 Ohm's Law, Kirchhoff's Voltage & Current Laws
        </h1>
        <p className="text-xl text-muted-foreground mb-8">
          Fundamental electrical laws governing voltage, current and resistance relationships in circuits
        </p>

        <div className="prose prose-invert max-w-none">
          <p>This section covers the fundamental electrical laws that form the foundation of circuit analysis. You'll learn how voltage, current and resistance interact according to Ohm's Law, and understand how Kirchhoff's Voltage and Current Laws enable systematic analysis of complex electrical circuits in building services applications.</p>
        </div>
      </div>
    </div>
  );
};

export default HNCModule3Section1_1;