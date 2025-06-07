
import { AlertTriangle, Lock, Eye, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface SafeIsolationDiagramProps {
  systemType?: string;
}

const SafeIsolationDiagram = ({ systemType }: SafeIsolationDiagramProps) => {
  return (
    <div className="space-y-4">
      <div className="text-sm text-indigo-200 mb-4">
        Safe isolation procedure for {systemType || "electrical"} systems
      </div>

      {/* Step-by-step visual process */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Step 1: Identify isolation point */}
        <div className="bg-indigo-600/20 p-4 rounded border border-indigo-500/30">
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-indigo-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">1</span>
            <h4 className="font-medium text-indigo-200">Identify Isolation Point</h4>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs text-indigo-100">
              <div className="w-3 h-3 bg-red-500 rounded"></div>
              <span>Main isolator/MCB</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-indigo-100">
              <div className="w-3 h-3 bg-yellow-500 rounded"></div>
              <span>Circuit breaker</span>
            </div>
          </div>
        </div>

        {/* Step 2: Inform parties */}
        <div className="bg-indigo-600/20 p-4 rounded border border-indigo-500/30">
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-indigo-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">2</span>
            <h4 className="font-medium text-indigo-200">Inform All Parties</h4>
          </div>
          <div className="text-xs text-indigo-100">
            Notify building occupants, security, and relevant personnel
          </div>
        </div>

        {/* Step 3: Isolate and lock off */}
        <div className="bg-indigo-600/20 p-4 rounded border border-indigo-500/30">
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-indigo-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">3</span>
            <h4 className="font-medium text-indigo-200">Isolate & Lock Off</h4>
          </div>
          <div className="flex items-center gap-2">
            <Lock className="h-4 w-4 text-red-400" />
            <span className="text-xs text-indigo-100">Use approved lock and tag</span>
          </div>
        </div>

        {/* Step 4: Prove dead */}
        <div className="bg-indigo-600/20 p-4 rounded border border-indigo-500/30">
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-indigo-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">4</span>
            <h4 className="font-medium text-indigo-200">Prove Dead</h4>
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs text-indigo-100">
              <Eye className="h-3 w-3 text-green-400" />
              <span>Prove before</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-indigo-100">
              <Zap className="h-3 w-3 text-red-400" />
              <span>Test all conductors</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-indigo-100">
              <Eye className="h-3 w-3 text-green-400" />
              <span>Prove after</span>
            </div>
          </div>
        </div>
      </div>

      {/* Testing sequence diagram */}
      <div className="bg-red-500/10 p-4 rounded border border-red-500/30">
        <h4 className="font-medium text-red-300 mb-3 flex items-center gap-2">
          <AlertTriangle className="h-4 w-4" />
          Proving Dead Sequence ({systemType === "three-phase" ? "3-Phase" : "Single Phase"})
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-xs">
          {systemType === "three-phase" ? (
            <>
              <Badge variant="outline" className="text-red-300 border-red-400/30">L1-N</Badge>
              <Badge variant="outline" className="text-red-300 border-red-400/30">L2-N</Badge>
              <Badge variant="outline" className="text-red-300 border-red-400/30">L3-N</Badge>
              <Badge variant="outline" className="text-red-300 border-red-400/30">L1-E</Badge>
              <Badge variant="outline" className="text-red-300 border-red-400/30">L2-E</Badge>
              <Badge variant="outline" className="text-red-300 border-red-400/30">L3-E</Badge>
              <Badge variant="outline" className="text-red-300 border-red-400/30">N-E</Badge>
              <Badge variant="outline" className="text-red-300 border-red-400/30">L1-L2</Badge>
              <Badge variant="outline" className="text-red-300 border-red-400/30">L1-L3</Badge>
            </>
          ) : (
            <>
              <Badge variant="outline" className="text-red-300 border-red-400/30">L-N</Badge>
              <Badge variant="outline" className="text-red-300 border-red-400/30">L-E</Badge>
              <Badge variant="outline" className="text-red-300 border-red-400/30">N-E</Badge>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SafeIsolationDiagram;
