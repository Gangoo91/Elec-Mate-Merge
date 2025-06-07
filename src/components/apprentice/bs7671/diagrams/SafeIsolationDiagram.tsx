
import { AlertTriangle, Lock, Eye, Zap, Shield } from "lucide-react";
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

      {/* Critical Safety Warning */}
      <div className="bg-red-500/20 p-4 rounded border border-red-500/50">
        <div className="flex items-center gap-2 mb-3">
          <Shield className="h-5 w-5 text-red-400" />
          <h4 className="font-medium text-red-300">CRITICAL SAFETY PRACTICE</h4>
        </div>
        <div className="text-sm text-red-100 space-y-2">
          <p className="font-medium">When proving dead, ALWAYS connect test leads to EARTH FIRST</p>
          <ul className="text-xs space-y-1 ml-4">
            <li>• Connect earth lead before any live conductors</li>
            <li>• This ensures you are earthed before touching potentially live parts</li>
            <li>• Disconnect earth lead LAST when removing test equipment</li>
            <li>• This practice can save your life - make it a habit</li>
          </ul>
        </div>
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

      {/* Detailed Proving Dead Procedure */}
      <div className="bg-amber-500/10 p-4 rounded border border-amber-500/30">
        <h4 className="font-medium text-amber-300 mb-3 flex items-center gap-2">
          <Shield className="h-4 w-4" />
          Detailed Proving Dead Procedure
        </h4>
        <div className="space-y-3">
          <div className="bg-amber-600/20 p-3 rounded">
            <h5 className="font-medium text-amber-200 mb-2">1. Prove Test Equipment on Known Live Source</h5>
            <ul className="text-xs text-amber-100 space-y-1">
              <li>• Test your voltage indicator on a known live supply</li>
              <li>• Verify audible and visual indicators are working</li>
              <li>• Check test leads are in good condition</li>
            </ul>
          </div>
          
          <div className="bg-amber-600/20 p-3 rounded">
            <h5 className="font-medium text-amber-200 mb-2">2. Test the Isolated Installation</h5>
            <div className="bg-red-500/20 p-2 rounded mb-2">
              <p className="text-xs text-red-200 font-medium">⚠️ CRITICAL: Connect EARTH lead FIRST, remove LAST</p>
            </div>
            <ol className="text-xs text-amber-100 space-y-1 list-decimal ml-4">
              <li>Connect earth/CPC lead to earth terminal FIRST</li>
              <li>Test between each live conductor and earth</li>
              <li>Test between live conductors (if applicable)</li>
              <li>Test between neutral and earth</li>
              <li>Remove earth lead LAST</li>
            </ol>
          </div>
          
          <div className="bg-amber-600/20 p-3 rounded">
            <h5 className="font-medium text-amber-200 mb-2">3. Re-prove Test Equipment</h5>
            <ul className="text-xs text-amber-100 space-y-1">
              <li>• Test on the same known live source again</li>
              <li>• Confirm equipment is still functioning correctly</li>
              <li>• This ensures the equipment wasn't damaged during testing</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Testing sequence diagram */}
      <div className="bg-red-500/10 p-4 rounded border border-red-500/30">
        <h4 className="font-medium text-red-300 mb-3 flex items-center gap-2">
          <AlertTriangle className="h-4 w-4" />
          Proving Dead Test Sequence ({systemType === "three-phase" ? "3-Phase" : "Single Phase"})
        </h4>
        
        <div className="mb-3 bg-red-600/20 p-2 rounded">
          <p className="text-xs font-medium text-red-200">Remember: Earth connection FIRST, removal LAST</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-xs">
          {systemType === "three-phase" ? (
            <>
              <Badge variant="outline" className="text-red-300 border-red-400/30 justify-center">1. L1-E</Badge>
              <Badge variant="outline" className="text-red-300 border-red-400/30 justify-center">2. L2-E</Badge>
              <Badge variant="outline" className="text-red-300 border-red-400/30 justify-center">3. L3-E</Badge>
              <Badge variant="outline" className="text-red-300 border-red-400/30 justify-center">4. L1-L2</Badge>
              <Badge variant="outline" className="text-red-300 border-red-400/30 justify-center">5. L2-L3</Badge>
              <Badge variant="outline" className="text-red-300 border-red-400/30 justify-center">6. L1-L3</Badge>
              <Badge variant="outline" className="text-red-300 border-red-400/30 justify-center">7. L1-N</Badge>
              <Badge variant="outline" className="text-red-300 border-red-400/30 justify-center">8. L2-N</Badge>
              <Badge variant="outline" className="text-red-300 border-red-400/30 justify-center">9. L3-N</Badge>
              <Badge variant="outline" className="text-red-300 border-red-400/30 justify-center">10. N-E</Badge>
            </>
          ) : (
            <>
              <Badge variant="outline" className="text-red-300 border-red-400/30 justify-center">1. L-E</Badge>
              <Badge variant="outline" className="text-red-300 border-red-400/30 justify-center">2. L-N</Badge>
              <Badge variant="outline" className="text-red-300 border-red-400/30 justify-center">3. N-E</Badge>
            </>
          )}
        </div>
      </div>

      {/* GS38 Compliance */}
      <div className="bg-blue-500/10 p-4 rounded border border-blue-500/30">
        <h4 className="font-medium text-blue-300 mb-2 flex items-center gap-2">
          <Eye className="h-4 w-4" />
          GS38 Compliance Requirements
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          <div className="space-y-1">
            <h5 className="font-medium text-blue-200">Test Equipment:</h5>
            <ul className="text-blue-100 space-y-1">
              <li>• Use approved voltage indicators</li>
              <li>• Fused test leads maximum 500mA</li>
              <li>• Insulated to at least test voltage</li>
              <li>• Current calibration certificate valid</li>
            </ul>
          </div>
          <div className="space-y-1">
            <h5 className="font-medium text-blue-200">Test Lead Safety:</h5>
            <ul className="text-blue-100 space-y-1">
              <li>• Finger barriers or shrouded probes</li>
              <li>• No more than 2mm exposed metal</li>
              <li>• Robust and flexible leads</li>
              <li>• Visual inspection before each use</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SafeIsolationDiagram;
