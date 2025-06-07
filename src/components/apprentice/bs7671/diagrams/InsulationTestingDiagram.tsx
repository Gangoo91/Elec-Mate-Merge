
import { Shield, Zap, AlertTriangle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface InsulationTestingDiagramProps {
  systemType?: string;
  installationType?: string;
}

const InsulationTestingDiagram = ({ systemType, installationType }: InsulationTestingDiagramProps) => {
  return (
    <div className="space-y-4">
      <div className="text-sm text-indigo-200 mb-4">
        Insulation resistance testing for {systemType || "electrical"} systems
      </div>

      {/* Test Voltage Selection */}
      <div className="bg-blue-600/20 p-4 rounded border border-blue-500/30">
        <h4 className="font-medium text-blue-200 mb-3 flex items-center gap-2">
          <Zap className="h-4 w-4" />
          Test Voltage Selection
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
          <div className="text-center p-2 bg-blue-500/10 rounded">
            <div className="font-medium text-blue-300">SELV/PELV</div>
            <div className="text-blue-100">≤50V: Use 250V test</div>
          </div>
          <div className="text-center p-2 bg-blue-500/10 rounded">
            <div className="font-medium text-blue-300">Low Voltage</div>
            <div className="text-blue-100">50V-500V: Use 500V test</div>
          </div>
          <div className="text-center p-2 bg-blue-500/10 rounded">
            <div className="font-medium text-blue-300">High Voltage</div>
            <div className="text-blue-100">>500V: Use 1000V test</div>
          </div>
        </div>
      </div>

      {/* Test Combinations */}
      <div className="bg-green-600/20 p-4 rounded border border-green-500/30">
        <h4 className="font-medium text-green-200 mb-3 flex items-center gap-2">
          <Shield className="h-4 w-4" />
          Required Test Combinations
        </h4>
        <div className="space-y-3">
          {systemType === "three-phase" ? (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              <Badge variant="outline" className="text-green-300 border-green-400/30">L1-L2</Badge>
              <Badge variant="outline" className="text-green-300 border-green-400/30">L1-L3</Badge>
              <Badge variant="outline" className="text-green-300 border-green-400/30">L2-L3</Badge>
              <Badge variant="outline" className="text-green-300 border-green-400/30">L1-N</Badge>
              <Badge variant="outline" className="text-green-300 border-green-400/30">L2-N</Badge>
              <Badge variant="outline" className="text-green-300 border-green-400/30">L3-N</Badge>
              <Badge variant="outline" className="text-green-300 border-green-400/30">L1-E</Badge>
              <Badge variant="outline" className="text-green-300 border-green-400/30">L2-E</Badge>
              <Badge variant="outline" className="text-green-300 border-green-400/30">L3-E</Badge>
              <Badge variant="outline" className="text-green-300 border-green-400/30">N-E</Badge>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
              <Badge variant="outline" className="text-green-300 border-green-400/30">Line-Neutral</Badge>
              <Badge variant="outline" className="text-green-300 border-green-400/30">Line-Earth</Badge>
              <Badge variant="outline" className="text-green-300 border-green-400/30">Neutral-Earth</Badge>
            </div>
          )}
        </div>
      </div>

      {/* Preparation Requirements */}
      <div className="bg-amber-500/10 p-4 rounded border border-amber-500/30">
        <h4 className="font-medium text-amber-300 mb-3 flex items-center gap-2">
          <AlertTriangle className="h-4 w-4" />
          Pre-Test Preparation
        </h4>
        <div className="space-y-2 text-xs text-amber-200">
          <div className="flex items-start gap-2">
            <span className="text-amber-400 mt-1">1.</span>
            <span>Disconnect or bypass all electronic equipment (LED lights, dimmer switches, etc.)</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-amber-400 mt-1">2.</span>
            <span>Ensure all switches and circuit breakers are closed</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-amber-400 mt-1">3.</span>
            <span>Remove all lamps from lampholders</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-amber-400 mt-1">4.</span>
            <span>Link L and N together for L-E and N-E tests</span>
          </div>
        </div>
      </div>

      {/* Minimum Values Table */}
      <div className="bg-purple-600/20 p-4 rounded border border-purple-500/30">
        <h4 className="font-medium text-purple-200 mb-3">Minimum Acceptable Values</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="space-y-2">
            <h5 className="font-medium text-purple-300">Circuit Voltage</h5>
            <div className="space-y-1">
              <div className="flex justify-between">
                <span className="text-purple-100">SELV (≤50V):</span>
                <span className="text-purple-200">≥0.5MΩ</span>
              </div>
              <div className="flex justify-between">
                <span className="text-purple-100">Low Voltage:</span>
                <span className="text-purple-200">≥1.0MΩ</span>
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <h5 className="font-medium text-purple-300">Typical Values</h5>
            <div className="space-y-1">
              <div className="flex justify-between">
                <span className="text-purple-100">New installation:</span>
                <span className="text-purple-200">10-100MΩ</span>
              </div>
              <div className="flex justify-between">
                <span className="text-purple-100">Older installation:</span>
                <span className="text-purple-200">2-10MΩ</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InsulationTestingDiagram;
