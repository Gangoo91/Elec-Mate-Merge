import { MapPin, AlertTriangle, CheckCircle, Lightbulb } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const EmergencyLightingRealWorldSection3_3 = () => {
  return (
    <Card className="bg-gradient-to-br from-amber-600/20 to-amber-800/10 border border-amber-500/40 shadow-lg">
      <CardHeader>
        <CardTitle className="text-amber-300 flex items-center gap-2">
          <MapPin className="h-5 w-5 text-amber-400 drop-shadow-md" />
          Real-World Example
        </CardTitle>
      </CardHeader>
      <CardContent className="text-foreground space-y-4">
        <div className="p-4 bg-gradient-to-br from-red-600/20 to-red-800/10 border border-red-500/40 rounded-lg">
          <h4 className="text-red-300 font-semibold mb-3 flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-red-400" />
            The Problem: Distribution Centre in Leeds
          </h4>
          <p className="text-foreground mb-3">
            A distribution centre in Leeds installed emergency luminaires at a 10-metre ceiling height without properly consulting manufacturer spacing tables or considering the beam spread characteristics of the selected fittings.
          </p>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-3 bg-red-700/20 rounded border border-red-500/40">
              <h5 className="text-red-200 font-medium mb-2">Installation Issues:</h5>
              <ul className="text-foreground text-sm space-y-1">
                <li>• Standard office-type fittings used at industrial height</li>
                <li>• Spacing based on guesswork rather than photometric data</li>
                <li>• No consideration of beam angle vs mounting height</li>
                <li>• Emergency mode output not verified</li>
              </ul>
            </div>
            
            <div className="p-3 bg-red-700/20 rounded border border-red-500/40">
              <h5 className="text-red-200 font-medium mb-2">Discovered Problems:</h5>
              <ul className="text-foreground text-sm space-y-1">
                <li>• Lux levels on escape routes below 1 lux</li>
                <li>• Large shadowed areas between luminaires</li>
                <li>• Compliance failure during testing</li>
                <li>• Safety risk for evacuation procedures</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="p-4 bg-gradient-to-br from-green-600/20 to-green-800/10 border border-green-500/40 rounded-lg">
          <h4 className="text-green-300 font-semibold mb-3 flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-green-400" />
            The Solution: Proper Photometric Design
          </h4>
          <p className="text-foreground mb-3">
            The system had to be completely redesigned using appropriate high-output wide-beam fittings specifically designed for tall ceiling applications.
          </p>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-3 bg-green-700/20 rounded border border-green-500/40">
              <h5 className="text-green-200 font-medium mb-2">Design Changes:</h5>
              <ul className="text-foreground text-sm space-y-1">
                <li>• High-bay emergency luminaires with 60° beam angle</li>
                <li>• Spacing calculated using manufacturer data</li>
                <li>• Emergency mode output verified at 10m height</li>
                <li>• Point-by-point lux calculations performed</li>
              </ul>
            </div>
            
            <div className="p-3 bg-green-700/20 rounded border border-green-500/40">
              <h5 className="text-green-200 font-medium mb-2">Results Achieved:</h5>
              <ul className="text-foreground text-sm space-y-1">
                <li>• Consistent 1+ lux along all escape routes</li>
                <li>• Uniform coverage with minimal dark spots</li>
                <li>• Full compliance with BS 5266-1</li>
                <li>• Reduced total number of fittings required</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="p-4 bg-gradient-to-br from-blue-600/20 to-blue-800/10 border border-blue-500/40 rounded-lg">
          <h4 className="text-blue-300 font-semibold mb-3 flex items-center gap-2">
            <Lightbulb className="h-4 w-4 text-blue-400" />
            Key Learning Points
          </h4>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h5 className="text-blue-200 font-medium mb-2">Design Phase:</h5>
              <ul className="text-foreground text-sm space-y-1">
                <li>• Always consult manufacturer photometric data</li>
                <li>• Match luminaire type to application requirements</li>
                <li>• Consider mounting height from the start</li>
                <li>• Perform calculations rather than estimating</li>
              </ul>
            </div>
            <div>
              <h5 className="text-blue-200 font-medium mb-2">Installation Phase:</h5>
              <ul className="text-foreground text-sm space-y-1">
                <li>• Verify actual mounting heights during installation</li>
                <li>• Test emergency mode performance on site</li>
                <li>• Conduct full commissioning with lux measurements</li>
                <li>• Document results for compliance records</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-amber-700/20 border border-amber-500/40 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="h-4 w-4 text-amber-400" />
            <span className="text-amber-300 font-semibold">Industry Impact</span>
          </div>
          <p className="text-foreground text-sm">
            This example highlights the importance of matching luminaire type and mounting height during the design phase. The additional cost of remedial work was significantly higher than the cost difference between standard and high-bay fittings, demonstrating that proper photometric design saves money and ensures compliance.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};