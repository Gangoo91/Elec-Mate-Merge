
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Zap, Activity, GitBranch, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";

const TestingSection = () => {
  return (
    <Card className="border-elec-yellow/20 bg-elec-gray h-full">
      <CardHeader>
        <CardTitle className="text-elec-yellow flex items-center gap-2">
          <Zap className="h-5 w-5" />
          Electrical Testing
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-muted-foreground">
          Comprehensive electrical testing procedures following the correct sequence as specified in BS 7671.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="flex items-start gap-3 p-3 border border-gray-600 rounded-lg bg-elec-dark/50">
            <Zap className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-medium text-elec-yellow">Continuity Testing</h4>
              <p className="text-sm text-muted-foreground">R1+R2, ring final circuits, and protective conductor continuity</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3 p-3 border border-gray-600 rounded-lg bg-elec-dark/50">
            <Activity className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-medium text-green-300">Insulation Resistance</h4>
              <p className="text-sm text-muted-foreground">500V or 1000V testing between live conductors and earth</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3 p-3 border border-gray-600 rounded-lg bg-elec-dark/50">
            <GitBranch className="h-5 w-5 text-purple-400 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-medium text-purple-300">Earth Fault Loop</h4>
              <p className="text-sm text-muted-foreground">Zs testing to verify disconnection times for protective devices</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3 p-3 border border-gray-600 rounded-lg bg-elec-dark/50">
            <Settings className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-medium text-blue-300">RCD Testing</h4>
              <p className="text-sm text-muted-foreground">Trip time and operating current testing for all RCDs</p>
            </div>
          </div>
        </div>

        <div className="mt-4 p-4 border border-red-500/30 rounded-lg bg-red-500/10">
          <h4 className="font-medium text-red-300 mb-2">Testing Sequence (Critical Order)</h4>
          <ol className="text-sm text-red-200 space-y-1">
            <li>1. Safe isolation and proving dead</li>
            <li>2. Continuity of protective conductors</li>
            <li>3. Continuity of ring final circuits</li>
            <li>4. Insulation resistance testing</li>
            <li>5. Polarity verification</li>
            <li>6. Earth electrode resistance (if applicable)</li>
            <li>7. Re-energise and test earth fault loop impedance</li>
            <li>8. RCD testing and functional testing</li>
          </ol>
        </div>

        <Button className="w-full mt-4 bg-elec-yellow text-black hover:bg-elec-yellow/90">
          Begin Testing Procedures
        </Button>
      </CardContent>
    </Card>
  );
};

export default TestingSection;
