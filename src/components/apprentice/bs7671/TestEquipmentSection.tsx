
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Settings, Gauge, Zap, Battery } from "lucide-react";
import { Button } from "@/components/ui/button";

const TestEquipmentSection = () => {
  return (
    <Card className="border-elec-yellow/20 bg-elec-gray h-full">
      <CardHeader>
        <CardTitle className="text-elec-yellow flex items-center gap-2">
          <Settings className="h-5 w-5" />
          Test Equipment Setup
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-muted-foreground">
          Proper test equipment setup and calibration is essential for accurate and safe testing results.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="flex items-start gap-3 p-3 border border-gray-600 rounded-lg bg-elec-dark/50">
            <Gauge className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-medium text-blue-300">MFT Setup</h4>
              <p className="text-sm text-muted-foreground">Multifunction tester configuration and lead selection</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3 p-3 border border-gray-600 rounded-lg bg-elec-dark/50">
            <Zap className="h-5 w-5 text-purple-400 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-medium text-purple-300">Test Voltages</h4>
              <p className="text-sm text-muted-foreground">250V, 500V, 1000V test voltage selection</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3 p-3 border border-gray-600 rounded-lg bg-elec-dark/50">
            <Battery className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-medium text-green-300">Calibration</h4>
              <p className="text-sm text-muted-foreground">Annual calibration and daily function checks</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3 p-3 border border-gray-600 rounded-lg bg-elec-dark/50">
            <Settings className="h-5 w-5 text-amber-400 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-medium text-amber-300">Test Leads</h4>
              <p className="text-sm text-muted-foreground">Correct lead selection for each test procedure</p>
            </div>
          </div>
        </div>

        <div className="mt-4 p-4 border border-blue-500/30 rounded-lg bg-blue-500/10">
          <h4 className="font-medium text-blue-300 mb-2">Equipment Checklist</h4>
          <ul className="text-sm text-blue-200 space-y-1">
            <li>• Multifunction tester (calibrated within 12 months)</li>
            <li>• Test leads and probes (GS38 compliant)</li>
            <li>• Voltage indicator and proving unit</li>
            <li>• Earth electrode resistance tester (if required)</li>
            <li>• RCD tester and loop impedance tester</li>
          </ul>
        </div>

        <Button className="w-full mt-4 bg-elec-yellow text-black hover:bg-elec-yellow/90">
          Equipment Setup Guide
        </Button>
      </CardContent>
    </Card>
  );
};

export default TestEquipmentSection;
