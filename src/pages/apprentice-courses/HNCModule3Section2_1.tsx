import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import useSEO from "@/hooks/useSEO";

const HNCModule3Section2_1 = () => {
  useSEO(
    "Principles of inductance and capacitance - HNC Module 3",
    "Learn fundamental concepts of energy storage in magnetic and electric fields"
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
          3.2.1 Principles of inductance and capacitance
        </h1>
        <p className="text-xl text-muted-foreground mb-8">
          Fundamental concepts of energy storage in magnetic and electric fields
        </p>

        <div className="prose prose-invert max-w-none">
          <p>Explore the fundamental principles of inductance and capacitance in electrical circuits. Learn how inductors store energy in magnetic fields and capacitors store energy in electric fields. Understanding these reactive components is essential for analysing AC circuits in building services applications, including motor circuits and power factor correction systems.</p>
        </div>
      </div>
    </div>
  );
};

export default HNCModule3Section2_1;