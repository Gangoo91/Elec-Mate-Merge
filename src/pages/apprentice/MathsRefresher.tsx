
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calculator, Percent, SquareDot, Pi, Divide } from "lucide-react";
import { Link } from "react-router-dom";
import BackButton from "@/components/common/BackButton";

const MathsRefresher = () => {
  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-fade-in">
      <div className="flex flex-col items-center justify-center mb-4">
        <h1 className="text-3xl font-bold tracking-tight mb-4">Maths Refresher</h1>
        <BackButton customUrl="/apprentice/study" label="Back to Study Centre" />
      </div>
      
      <div className="text-center mb-8">
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Refresh your mathematical skills essential for electrical work, from basic arithmetic to 
          complex calculations needed for electrical theory and installation work.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="border-elec-yellow/20 bg-gradient-to-b from-elec-gray to-elec-gray/80 hover:from-elec-gray/90 hover:to-elec-gray/70 transition-all duration-300 shadow-lg shadow-black/20">
          <CardContent className="flex flex-col items-center justify-center p-6 h-full">
            <Calculator className="h-12 w-12 text-elec-yellow mb-4" />
            <h2 className="text-xl font-bold mb-2">Basic Arithmetic</h2>
            <p className="text-center text-muted-foreground mb-4">
              Review addition, subtraction, multiplication, and division - the foundation for all electrical calculations.
            </p>
            <Button variant="study" className="mt-auto">Study Now</Button>
          </CardContent>
        </Card>
        
        <Card className="border-elec-yellow/20 bg-gradient-to-b from-elec-gray to-elec-gray/80 hover:from-elec-gray/90 hover:to-elec-gray/70 transition-all duration-300 shadow-lg shadow-black/20">
          <CardContent className="flex flex-col items-center justify-center p-6 h-full">
            <Percent className="h-12 w-12 text-elec-yellow mb-4" />
            <h2 className="text-xl font-bold mb-2">Percentages & Ratios</h2>
            <p className="text-center text-muted-foreground mb-4">
              Learn how to calculate percentages and work with ratios, essential for voltage drop calculations.
            </p>
            <Button variant="study" className="mt-auto">Study Now</Button>
          </CardContent>
        </Card>
        
        <Card className="border-elec-yellow/20 bg-gradient-to-b from-elec-gray to-elec-gray/80 hover:from-elec-gray/90 hover:to-elec-gray/70 transition-all duration-300 shadow-lg shadow-black/20">
          <CardContent className="flex flex-col items-center justify-center p-6 h-full">
            <SquareDot className="h-12 w-12 text-elec-yellow mb-4" />
            <h2 className="text-xl font-bold mb-2">Powers & Roots</h2>
            <p className="text-center text-muted-foreground mb-4">
              Master powers, square roots and other operations used in power calculations.
            </p>
            <Button variant="study" className="mt-auto">Study Now</Button>
          </CardContent>
        </Card>
        
        <Card className="border-elec-yellow/20 bg-gradient-to-b from-elec-gray to-elec-gray/80 hover:from-elec-gray/90 hover:to-elec-gray/70 transition-all duration-300 shadow-lg shadow-black/20">
          <CardContent className="flex flex-col items-center justify-center p-6 h-full">
            <Pi className="h-12 w-12 text-elec-yellow mb-4" />
            <h2 className="text-xl font-bold mb-2">Algebra Basics</h2>
            <p className="text-center text-muted-foreground mb-4">
              Understand how to rearrange formulas and solve equations crucial for electrical formulas.
            </p>
            <Button variant="study" className="mt-auto">Study Now</Button>
          </CardContent>
        </Card>
        
        <Card className="border-elec-yellow/20 bg-gradient-to-b from-elec-gray to-elec-gray/80 hover:from-elec-gray/90 hover:to-elec-gray/70 transition-all duration-300 shadow-lg shadow-black/20">
          <CardContent className="flex flex-col items-center justify-center p-6 h-full">
            <Divide className="h-12 w-12 text-elec-yellow mb-4" />
            <h2 className="text-xl font-bold mb-2">Electrical Formula Practice</h2>
            <p className="text-center text-muted-foreground mb-4">
              Practice with formulas like Ohm's Law, power calculations, and voltage drop equations.
            </p>
            <Button variant="study" className="mt-auto">Study Now</Button>
          </CardContent>
        </Card>
        
        <Card className="border-elec-yellow/20 bg-gradient-to-b from-elec-gray to-elec-gray/80 hover:from-elec-gray/90 hover:to-elec-gray/70 transition-all duration-300 shadow-lg shadow-black/20">
          <CardContent className="flex flex-col items-center justify-center p-6 h-full">
            <Calculator className="h-12 w-12 text-elec-yellow mb-4" />
            <h2 className="text-xl font-bold mb-2">Practice Exercises</h2>
            <p className="text-center text-muted-foreground mb-4">
              Test your skills with practical exercises based on real electrical scenarios.
            </p>
            <Button variant="study" className="mt-auto">Study Now</Button>
          </CardContent>
        </Card>
      </div>
      
      <div className="bg-amber-950/20 border border-amber-600/30 rounded-md p-6 mt-8">
        <h3 className="text-lg font-semibold text-elec-yellow mb-2">Why Maths Matters in Electrical Work</h3>
        <p className="text-sm text-amber-200/90 mb-4">
          Strong mathematical skills are critical for electricians to accurately calculate electrical loads, 
          determine proper wire sizes, measure voltage drop, and ensure installations meet safety standards. 
          This refresher course helps you build the mathematical foundation needed for successful electrical work.
        </p>
        <Button variant="outline" className="border-amber-600/30 hover:bg-amber-950/30">
          Download Formula Sheet
        </Button>
      </div>
    </div>
  );
};

export default MathsRefresher;
