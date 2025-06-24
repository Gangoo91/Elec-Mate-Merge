
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, AlertCircle, Wrench, CheckSquare } from "lucide-react";
import { Button } from "@/components/ui/button";

const FaultFindingSection = () => {
  return (
    <Card className="border-elec-yellow/20 bg-elec-gray h-full">
      <CardHeader>
        <CardTitle className="text-elec-yellow flex items-center gap-2">
          <Search className="h-5 w-5" />
          Fault Finding & Diagnosis
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-muted-foreground">
          Systematic fault finding techniques to identify and resolve electrical installation issues efficiently.
        </p>
        
        <div className="space-y-3">
          <div className="flex items-start gap-3 p-3 border border-gray-600 rounded-lg bg-elec-dark/50">
            <AlertCircle className="h-5 w-5 text-red-400 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-medium text-red-300">Common Faults</h4>
              <p className="text-sm text-muted-foreground">Open circuits, short circuits, earth faults, and insulation breakdown</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3 p-3 border border-gray-600 rounded-lg bg-elec-dark/50">
            <Search className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-medium text-blue-300">Testing Strategy</h4>
              <p className="text-sm text-muted-foreground">Logical sequence of tests to isolate and identify faults</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3 p-3 border border-gray-600 rounded-lg bg-elec-dark/50">
            <Wrench className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-medium text-green-300">Repair Methods</h4>
              <p className="text-sm text-muted-foreground">Safe repair techniques and remedial actions</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3 p-3 border border-gray-600 rounded-lg bg-elec-dark/50">
            <CheckSquare className="h-5 w-5 text-purple-400 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-medium text-purple-300">Verification</h4>
              <p className="text-sm text-muted-foreground">Post-repair testing to confirm fault resolution</p>
            </div>
          </div>
        </div>

        <div className="mt-4 p-4 border border-amber-500/30 rounded-lg bg-amber-500/10">
          <h4 className="font-medium text-amber-300 mb-2">Fault Finding Process</h4>
          <ol className="text-sm text-amber-200 space-y-1">
            <li>1. Gather information about the fault symptoms</li>
            <li>2. Visual inspection for obvious damage</li>
            <li>3. Safe isolation and initial testing</li>
            <li>4. Systematic testing to isolate fault location</li>
            <li>5. Repair or replace faulty components</li>
            <li>6. Re-test to verify fault clearance</li>
          </ol>
        </div>

        <Button className="w-full mt-4 bg-elec-yellow text-black hover:bg-elec-yellow/90">
          Start Fault Finding Guide
        </Button>
      </CardContent>
    </Card>
  );
};

export default FaultFindingSection;
