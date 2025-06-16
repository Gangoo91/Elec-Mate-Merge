
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calculator, Zap, Activity, PlugZap, Cable } from "lucide-react";
import OhmsLawCalculator from "@/components/electrician-tools/OhmsLawCalculator";
import VoltageDropCalculator from "@/components/electrician-tools/VoltageDropCalculator";
import { PowerFactorCalculator } from "@/components/electrician-tools/PowerFactorCalculator";
import LoadCalculator from "@/components/electrician-tools/LoadCalculator";
import CalculatorCards from "@/components/electrician-tools/CalculatorCards";

const Calculations = () => {
  const [activeCalculator, setActiveCalculator] = useState<string | null>(null);

  const calculators = [
    {
      id: "ohms-law",
      title: "Ohm's Law Calculator",
      description: "Calculate voltage, current, resistance, or power using Ohm's Law",
      icon: <Zap className="h-6 w-6" />,
      component: <OhmsLawCalculator />
    },
    {
      id: "voltage-drop",
      title: "Voltage Drop Calculator",
      description: "Calculate voltage drop across cable runs",
      icon: <Activity className="h-6 w-6" />,
      component: <VoltageDropCalculator />
    },
    {
      id: "power-factor",
      title: "Power Factor Calculator",
      description: "Calculate power factor and related electrical parameters",
      icon: <PlugZap className="h-6 w-6" />,
      component: <PowerFactorCalculator />
    },
    {
      id: "load",
      title: "Load Calculator",
      description: "Calculate total electrical load for installations",
      icon: <Calculator className="h-6 w-6" />,
      component: <LoadCalculator />
    }
  ];

  if (activeCalculator) {
    const calculator = calculators.find(calc => calc.id === activeCalculator);
    if (calculator) {
      return (
        <div className="space-y-6 animate-fade-in">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold tracking-tight">{calculator.title}</h1>
            <button
              onClick={() => setActiveCalculator(null)}
              className="px-4 py-2 bg-elec-yellow text-black rounded-lg hover:bg-elec-yellow/90 transition-colors"
            >
              Back to Calculators
            </button>
          </div>
          {calculator.component}
        </div>
      );
    }
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold tracking-tight flex items-center justify-center gap-3">
          <Calculator className="h-8 w-8 text-elec-yellow" />
          Electrical Calculations
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Essential electrical calculations for professional work. Choose a calculator to get started.
        </p>
      </div>

      {/* Main Calculator Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {calculators.map((calculator) => (
          <Card 
            key={calculator.id}
            className="cursor-pointer transition-all duration-200 hover:scale-105 hover:shadow-lg border-elec-yellow/20 bg-elec-gray/50"
            onClick={() => setActiveCalculator(calculator.id)}
          >
            <CardHeader className="text-center pb-3">
              <div className="flex justify-center mb-3">
                <div className="p-3 rounded-full bg-elec-yellow/10">
                  {calculator.icon}
                </div>
              </div>
              <CardTitle className="text-lg">{calculator.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground text-center mb-4">
                {calculator.description}
              </p>
              <button 
                className="w-full bg-elec-yellow text-black hover:bg-elec-yellow/90 px-4 py-2 rounded-lg transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveCalculator(calculator.id);
                }}
              >
                Open Calculator
              </button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Additional Calculator Cards */}
      <CalculatorCards />

      {/* Quick Info */}
      <Card className="bg-elec-gray/30 border-elec-yellow/20">
        <CardContent className="p-6">
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-2">Professional Electrical Calculations</h3>
            <p className="text-sm text-muted-foreground">
              These calculators follow BS 7671 and industry standards. Always verify results 
              with appropriate testing and professional judgement.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Calculations;
