
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Lock, CheckCircle, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

const SafeIsolationSection = () => {
  return (
    <Card className="border-elec-yellow/20 bg-elec-gray h-full">
      <CardHeader>
        <CardTitle className="text-elec-yellow flex items-center gap-2">
          <Shield className="h-5 w-5" />
          Safe Isolation Procedures
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-muted-foreground">
          Safe isolation is the first and most critical step before any electrical testing. 
          Follow these procedures to ensure complete isolation and prove dead before testing.
        </p>
        
        <div className="space-y-3">
          <div className="flex items-start gap-3 p-3 border border-gray-600 rounded-lg bg-elec-dark/50">
            <Lock className="h-5 w-5 text-red-400 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-medium text-red-300">Secure Isolation</h4>
              <p className="text-sm text-muted-foreground">Switch off supply at origin, lock off, and secure isolation point</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3 p-3 border border-gray-600 rounded-lg bg-elec-dark/50">
            <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-medium text-green-300">Prove Dead</h4>
              <p className="text-sm text-muted-foreground">Test with approved voltage indicator and prove functionality</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3 p-3 border border-gray-600 rounded-lg bg-elec-dark/50">
            <AlertTriangle className="h-5 w-5 text-amber-400 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-medium text-amber-300">Warning Signs</h4>
              <p className="text-sm text-muted-foreground">Display appropriate warning notices and barrier protection</p>
            </div>
          </div>
        </div>

        <div className="mt-4 p-4 border border-red-500/30 rounded-lg bg-red-500/10">
          <h4 className="font-medium text-red-300 mb-2">Critical Safety Steps</h4>
          <ol className="text-sm text-red-200 space-y-1">
            <li>1. Identify and secure all supply sources</li>
            <li>2. Test voltage indicator on known live source</li>
            <li>3. Test on installation to prove dead</li>
            <li>4. Re-test voltage indicator on known live source</li>
            <li>5. Fit warning notices and barriers</li>
          </ol>
        </div>

        <Button className="w-full mt-4 bg-elec-yellow text-black hover:bg-elec-yellow/90">
          Start Safe Isolation Guide
        </Button>
      </CardContent>
    </Card>
  );
};

export default SafeIsolationSection;
