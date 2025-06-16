
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Cable, BarChart4, PlugZap } from "lucide-react";
import { Link } from "react-router-dom";

const CalculatorCards = () => {
  return (
    <>
      <h2 className="text-2xl font-semibold mt-4">Specialised Calculators</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <Link to="/electrician-tools/cable-sizing">
          <Card className="border-elec-yellow/20 bg-elec-gray hover:border-elec-yellow/40 transition-all">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <Cable className="h-5 w-5 text-elec-yellow" />
                <CardTitle className="text-base">Cable Sizing</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Calculate proper cable sizes based on current, distance, and voltage drop requirements.
              </p>
              <Button variant="outline" className="w-full">Open Calculator</Button>
            </CardContent>
          </Card>
        </Link>
        
        <Card className="border-elec-yellow/20 bg-elec-gray">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <BarChart4 className="h-5 w-5 text-elec-yellow" />
              <CardTitle className="text-base">Load Assessment</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Calculate total load requirements for domestic and commercial installations.
            </p>
            <Button variant="outline" className="w-full" onClick={() => {
              document.getElementById('load-calculator')?.scrollIntoView({ behavior: 'smooth' });
            }}>View Calculator</Button>
          </CardContent>
        </Card>
        
        <Card className="border-elec-yellow/20 bg-elec-gray">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <PlugZap className="h-5 w-5 text-elec-yellow" />
              <CardTitle className="text-base">Power Factor</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Calculate power factor and related electrical parameters for efficient power usage.
            </p>
            <Button variant="outline" className="w-full" onClick={() => {
              document.getElementById('power-factor-calculator')?.scrollIntoView({ behavior: 'smooth' });
            }}>View Calculator</Button>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default CalculatorCards;
