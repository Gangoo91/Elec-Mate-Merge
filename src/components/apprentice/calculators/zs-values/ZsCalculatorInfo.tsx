
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Info, Lightbulb, AlertTriangle, BookOpen } from "lucide-react";

const ZsCalculatorInfo = () => {
  return (
    <div className="space-y-6">
      <Card className="border-blue-500/30 bg-blue-500/5">
        <CardHeader>
          <CardTitle className="text-blue-300 flex items-center gap-2">
            <Info className="h-5 w-5" />
            What is Zs (Earth Fault Loop Impedance)?
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-blue-200">
          <p>
            Earth fault loop impedance (Zs) is the impedance of the path taken by fault current during an earth fault. 
            It includes the impedance of the supply transformer, the line conductor, and the earth return path.
          </p>
          
          <div className="bg-blue-500/10 border border-blue-500/20 rounded p-4">
            <h4 className="font-medium mb-2">Formula: Zs = Ze + R1 + R2</h4>
            <ul className="space-y-1 text-sm">
              <li><strong>Ze</strong> = External earth fault loop impedance</li>
              <li><strong>R1</strong> = Resistance of the line conductor</li>
              <li><strong>R2</strong> = Resistance of the protective conductor</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      <Card className="border-yellow-500/30 bg-yellow-500/5">
        <CardHeader>
          <CardTitle className="text-yellow-300 flex items-center gap-2">
            <Lightbulb className="h-5 w-5" />
            Why Use 80% Values?
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-yellow-200">
          <p>
            The tabulated Zs values in BS 7671 assume conductors are at their normal operating temperature (70°C for PVC cables). 
            During testing, conductors are typically at ambient temperature, so their resistance is lower.
          </p>
          
          <div className="space-y-3">
            <div className="bg-yellow-500/10 border border-yellow-500/20 rounded p-3">
              <h4 className="font-medium mb-2">Temperature Effect on Resistance</h4>
              <ul className="space-y-1 text-sm">
                <li>• Copper resistance increases by ~0.4% per °C</li>
                <li>• PVC cables operate at 70°C under normal load</li>
                <li>• Testing typically done at 20°C ambient temperature</li>
                <li>• 50°C difference = ~20% resistance increase</li>
              </ul>
            </div>
            
            <div className="bg-yellow-500/10 border border-yellow-500/20 rounded p-3">
              <h4 className="font-medium mb-2">Safety Margin</h4>
              <p className="text-sm">
                Using 80% of tabulated values during testing ensures that when the installation 
                is loaded and conductors heat up to operating temperature, the actual Zs will not exceed 
                the maximum permitted value.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-orange-500/30 bg-orange-500/5">
        <CardHeader>
          <CardTitle className="text-orange-300 flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            Importance of Zs Testing
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-orange-200">
          <p>
            Correct Zs values ensure that protective devices will operate within the required disconnection times 
            to provide protection against electric shock and fire.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-orange-500/10 border border-orange-500/20 rounded p-3">
              <h4 className="font-medium mb-2">Final Circuits ≤32A</h4>
              <ul className="space-y-1 text-sm">
                <li>• Disconnection time: 0.4s maximum</li>
                <li>• Protection against electric shock</li>
                <li>• Reduced fire risk</li>
              </ul>
            </div>
            
            <div className="bg-orange-500/10 border border-orange-500/20 rounded p-3">
              <h4 className="font-medium mb-2">Distribution Circuits {">"}32A</h4>
              <ul className="space-y-1 text-sm">
                <li>• Disconnection time: 5s maximum</li>
                <li>• Fire protection primary concern</li>
                <li>• Supplementary bonding may be required</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-green-500/30 bg-green-500/5">
        <CardHeader>
          <CardTitle className="text-green-300 flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            Testing Best Practices
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-green-200">
          <div className="space-y-4">
            <div className="bg-green-500/10 border border-green-500/20 rounded p-3">
              <h4 className="font-medium mb-2">Before Testing</h4>
              <ul className="space-y-1 text-sm">
                <li>• Ensure circuit is isolated and proved dead</li>
                <li>• Remove or bridge RCDs during testing</li>
                <li>• Check test equipment calibration</li>
                <li>• Verify test leads are in good condition</li>
              </ul>
            </div>
            
            <div className="bg-green-500/10 border border-green-500/20 rounded p-3">
              <h4 className="font-medium mb-2">During Testing</h4>
              <ul className="space-y-1 text-sm">
                <li>• Test at the furthest point of each circuit</li>
                <li>• Include all accessories in the test path</li>
                <li>• Record ambient temperature if significantly different from 20°C</li>
                <li>• Compare results with calculated values</li>
              </ul>
            </div>
            
            <div className="bg-green-500/10 border border-green-500/20 rounded p-3">
              <h4 className="font-medium mb-2">If Values Are Too High</h4>
              <ul className="space-y-1 text-sm">
                <li>• Check connections are tight and clean</li>
                <li>• Verify cable sizes are correct</li>
                <li>• Consider cable route and length</li>
                <li>• Check earth bonding connections</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ZsCalculatorInfo;
