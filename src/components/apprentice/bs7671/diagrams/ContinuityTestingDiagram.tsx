
import { Cable, Zap, CheckCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface ContinuityTestingDiagramProps {
  systemType?: string;
  installationType?: string;
}

const ContinuityTestingDiagram = ({ systemType, installationType }: ContinuityTestingDiagramProps) => {
  return (
    <div className="space-y-4">
      <div className="text-sm text-indigo-200 mb-4">
        R1+R2 Continuity Testing Setup for {installationType || "standard"} installation
      </div>

      {/* MFT Setup */}
      <div className="bg-blue-600/20 p-4 rounded border border-blue-500/30">
        <h4 className="font-medium text-blue-200 mb-3 flex items-center gap-2">
          <Zap className="h-4 w-4" />
          MFT Configuration
        </h4>
        <div className="grid grid-cols-2 gap-4 text-xs">
          <div>
            <span className="text-blue-300 font-medium">Function:</span>
            <p className="text-blue-100">Low Resistance/Continuity</p>
          </div>
          <div>
            <span className="text-blue-300 font-medium">Test Current:</span>
            <p className="text-blue-100">≥200mA DC</p>
          </div>
          <div>
            <span className="text-blue-300 font-medium">Lead Nulling:</span>
            <p className="text-blue-100">Essential - short leads together</p>
          </div>
          <div>
            <span className="text-blue-300 font-medium">Range:</span>
            <p className="text-blue-100">0.01Ω to 200Ω</p>
          </div>
        </div>
      </div>

      {/* Connection Diagram */}
      <div className="bg-green-600/20 p-4 rounded border border-green-500/30">
        <h4 className="font-medium text-green-200 mb-3 flex items-center gap-2">
          <Cable className="h-4 w-4" />
          Test Lead Connections
        </h4>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs text-green-100">Consumer Unit End:</span>
            <Badge variant="outline" className="text-red-300 border-red-400/30">Red Lead → Line Terminal</Badge>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-green-100">Circuit End:</span>
            <Badge variant="outline" className="text-black-300 border-gray-400/30">Black Lead → Earth Terminal</Badge>
          </div>
          <div className="text-xs text-green-200 bg-green-500/10 p-2 rounded">
            <CheckCircle className="h-3 w-3 inline mr-1" />
            This tests the complete L+CPC path resistance (R1+R2)
          </div>
        </div>
      </div>

      {/* Ring Circuit Testing */}
      <div className="bg-purple-600/20 p-4 rounded border border-purple-500/30">
        <h4 className="font-medium text-purple-200 mb-3">Ring Circuit Testing Sequence</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
          <div className="space-y-2">
            <h5 className="font-medium text-purple-300">Step 1: End-to-End</h5>
            <div className="space-y-1">
              <Badge variant="outline" className="text-purple-200 border-purple-400/30 block text-center">L-L</Badge>
              <Badge variant="outline" className="text-purple-200 border-purple-400/30 block text-center">N-N</Badge>
              <Badge variant="outline" className="text-purple-200 border-purple-400/30 block text-center">E-E</Badge>
            </div>
            <p className="text-purple-100">Values should be similar</p>
          </div>
          <div className="space-y-2">
            <h5 className="font-medium text-purple-300">Step 2: Cross-Connect</h5>
            <div className="space-y-1">
              <Badge variant="outline" className="text-purple-200 border-purple-400/30 block text-center">L1-N2</Badge>
              <Badge variant="outline" className="text-purple-200 border-purple-400/30 block text-center">L2-N1</Badge>
              <Badge variant="outline" className="text-purple-200 border-purple-400/30 block text-center">Similar for E</Badge>
            </div>
            <p className="text-purple-100">Detects spurs and breaks</p>
          </div>
          <div className="space-y-2">
            <h5 className="font-medium text-purple-300">Step 3: R1+R2 Test</h5>
            <div className="space-y-1">
              <Badge variant="outline" className="text-purple-200 border-purple-400/30 block text-center">L-E at CU</Badge>
              <Badge variant="outline" className="text-purple-200 border-purple-400/30 block text-center">Test each outlet</Badge>
            </div>
            <p className="text-purple-100">Record all readings</p>
          </div>
        </div>
      </div>

      {/* Expected Values */}
      <div className="bg-yellow-600/20 p-4 rounded border border-yellow-500/30">
        <h4 className="font-medium text-yellow-200 mb-2">Typical R1+R2 Values</h4>
        <div className="grid grid-cols-2 gap-4 text-xs">
          <div>
            <span className="text-yellow-300 font-medium">2.5mm² T&E:</span>
            <p className="text-yellow-100">~7.41mΩ/m (L) + 7.41mΩ/m (CPC)</p>
          </div>
          <div>
            <span className="text-yellow-300 font-medium">1.5mm² T&E:</span>
            <p className="text-yellow-100">~12.02mΩ/m (L) + 12.02mΩ/m (CPC)</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContinuityTestingDiagram;
