import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import useSEO from "@/hooks/useSEO";

const HNCModule3Section2_2 = () => {
  useSEO(
    "Reactance and impedance in AC circuits - HNC Module 3",
    "Learn to calculate inductive and capacitive reactance, complex impedance in AC systems"
  );

  return (
    <div className="bg-background">
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
          3.2.2 Reactance and impedance in AC circuits
        </h1>
        <p className="text-xl text-muted-foreground mb-8">
          Calculating inductive and capacitive reactance, complex impedance in AC systems
        </p>

        <div className="prose prose-invert max-w-none">
          <p>Master the calculation of reactance and impedance in AC circuits. Learn how frequency affects reactive components and how to combine resistance, inductance, and capacitance to determine total circuit impedance. These concepts are fundamental for analysing motor circuits, lighting ballasts, and power factor correction systems in building services.</p>
        </div>
      </div>
    </div>
  );
};

export default HNCModule3Section2_2;