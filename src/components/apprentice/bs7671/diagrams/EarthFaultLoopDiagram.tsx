
import { Zap, Target, Shield, AlertCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface EarthFaultLoopDiagramProps {
  systemType?: string;
}

const EarthFaultLoopDiagram = ({ systemType }: EarthFaultLoopDiagramProps) => {
  return (
    <div className="space-y-4">
      <div className="text-sm text-indigo-200 mb-4">
        Earth fault loop impedance (Zs) testing for {systemType || "standard"} electrical systems
      </div>

      {/* Zs Concept Diagram */}
      <div className="bg-blue-600/20 p-4 rounded border border-blue-500/30">
        <h4 className="font-medium text-blue-200 mb-3 flex items-center gap-2">
          <Target className="h-4 w-4" />
          Earth Fault Loop Path
        </h4>
        <div className="space-y-3">
          <div className="text-xs text-blue-100">
            Zs = Ze + (R1 + R2) where:
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-xs">
            <div className="bg-blue-500/20 p-2 rounded">
              <div className="font-medium text-blue-300">Ze</div>
              <div className="text-blue-100">External earth loop impedance</div>
            </div>
            <div className="bg-blue-500/20 p-2 rounded">
              <div className="font-medium text-blue-300">R1</div>
              <div className="text-blue-100">Line conductor resistance</div>
            </div>
            <div className="bg-blue-500/20 p-2 rounded">
              <div className="font-medium text-blue-300">R2</div>
              <div className="text-blue-100">Earth conductor resistance</div>
            </div>
          </div>
        </div>
      </div>

      {/* Test Points */}
      <div className="bg-green-600/20 p-4 rounded border border-green-500/30">
        <h4 className="font-medium text-green-200 mb-3 flex items-center gap-2">
          <Zap className="h-4 w-4" />
          Key Test Points
        </h4>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-green-100">Origin (Consumer Unit):</span>
            <Badge variant="outline" className="text-green-300 border-green-400/30">Measure Ze</Badge>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-green-100">Each Socket Outlet:</span>
            <Badge variant="outline" className="text-green-300 border-green-400/30">Measure Zs</Badge>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-green-100">Fixed Equipment:</span>
            <Badge variant="outline" className="text-green-300 border-green-400/30">Measure Zs</Badge>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-green-100">Distribution Boards:</span>
            <Badge variant="outline" className="text-green-300 border-green-400/30">Measure Zs</Badge>
          </div>
        </div>
      </div>

      {/* Maximum Zs Values */}
      <div className="bg-purple-600/20 p-4 rounded border border-purple-500/30">
        <h4 className="font-medium text-purple-200 mb-3 flex items-center gap-2">
          <Shield className="h-4 w-4" />
          Maximum Zs Values (Common Protective Devices)
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="space-y-2">
            <h5 className="font-medium text-purple-300">MCBs (Type B)</h5>
            <div className="space-y-1">
              <div className="flex justify-between">
                <span className="text-purple-100">6A:</span>
                <span className="text-purple-200">7.28Ω</span>
              </div>
              <div className="flex justify-between">
                <span className="text-purple-100">16A:</span>
                <span className="text-purple-200">2.73Ω</span>
              </div>
              <div className="flex justify-between">
                <span className="text-purple-100">32A:</span>
                <span className="text-purple-200">1.37Ω</span>
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <h5 className="font-medium text-purple-300">MCBs (Type C)</h5>
            <div className="space-y-1">
              <div className="flex justify-between">
                <span className="text-purple-100">6A:</span>
                <span className="text-purple-200">3.64Ω</span>
              </div>
              <div className="flex justify-between">
                <span className="text-purple-100">16A:</span>
                <span className="text-purple-200">1.37Ω</span>
              </div>
              <div className="flex justify-between">
                <span className="text-purple-100">32A:</span>
                <span className="text-purple-200">0.68Ω</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Test Method Notes */}
      <div className="bg-amber-500/10 p-4 rounded border border-amber-500/30">
        <h4 className="font-medium text-amber-300 mb-3 flex items-center gap-2">
          <AlertCircle className="h-4 w-4" />
          Test Method Considerations
        </h4>
        <div className="space-y-2 text-xs text-amber-200">
          <div className="flex items-start gap-2">
            <span className="text-amber-400 mt-1">•</span>
            <span>Test current typically 15-25A for accurate results</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-amber-400 mt-1">•</span>
            <span>RCDs may trip during testing - use no-trip facility if available</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-amber-400 mt-1">•</span>
            <span>High current may affect sensitive electronic equipment</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-amber-400 mt-1">•</span>
            <span>Temperature coefficient: readings increase with conductor temperature</span>
          </div>
        </div>
      </div>

      {/* Fault Current Calculation */}
      <div className="bg-red-500/10 p-4 rounded border border-red-500/30">
        <h4 className="font-medium text-red-300 mb-2">Earth Fault Current</h4>
        <div className="text-xs text-red-200">
          <div className="mb-2">If = 0.8 × Uo / Zs</div>
          <div className="text-red-100">
            Where If = fault current, Uo = nominal voltage to earth (230V), Zs = measured loop impedance
          </div>
        </div>
      </div>
    </div>
  );
};

export default EarthFaultLoopDiagram;
