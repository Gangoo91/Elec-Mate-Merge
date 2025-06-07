
import { Shield, Timer, Zap, CheckCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface RCDTestingDiagramProps {
  systemType?: string;
}

const RCDTestingDiagram = ({ systemType }: RCDTestingDiagramProps) => {
  return (
    <div className="space-y-4">
      <div className="text-sm text-indigo-200 mb-4">
        RCD testing procedure and requirements
      </div>

      {/* Test Button Check */}
      <div className="bg-green-600/20 p-4 rounded border border-green-500/30">
        <h4 className="font-medium text-green-200 mb-3 flex items-center gap-2">
          <CheckCircle className="h-4 w-4" />
          Initial Functional Test
        </h4>
        <div className="space-y-2 text-xs text-green-100">
          <div className="flex items-start gap-2">
            <span className="text-green-400 mt-1">1.</span>
            <span>Press RCD test button - should trip immediately</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-green-400 mt-1">2.</span>
            <span>Reset RCD by switching back on</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-green-400 mt-1">3.</span>
            <span>If test button fails, RCD requires replacement</span>
          </div>
        </div>
      </div>

      {/* RCD Test Sequence */}
      <div className="bg-blue-600/20 p-4 rounded border border-blue-500/30">
        <h4 className="font-medium text-blue-200 mb-3 flex items-center gap-2">
          <Zap className="h-4 w-4" />
          Electrical Test Sequence
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="bg-blue-500/20 p-3 rounded">
            <h5 className="font-medium text-blue-300 mb-2">Step 1: ½×In Test</h5>
            <ul className="space-y-1 text-xs text-blue-100">
              <li>• 50% of rated current</li>
              <li>• Should NOT trip</li>
              <li>• Tests for nuisance tripping</li>
            </ul>
          </div>
          <div className="bg-blue-500/20 p-3 rounded">
            <h5 className="font-medium text-blue-300 mb-2">Step 2: 1×In Test</h5>
            <ul className="space-y-1 text-xs text-blue-100">
              <li>• 100% of rated current</li>
              <li>• Should trip</li>
              <li>• Record trip time</li>
            </ul>
          </div>
          <div className="bg-blue-500/20 p-3 rounded">
            <h5 className="font-medium text-blue-300 mb-2">Step 3: 5×In Test</h5>
            <ul className="space-y-1 text-xs text-blue-100">
              <li>• 500% of rated current</li>
              <li>• Fast disconnection</li>
              <li>• Record trip time</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Trip Time Requirements */}
      <div className="bg-purple-600/20 p-4 rounded border border-purple-500/30">
        <h4 className="font-medium text-purple-200 mb-3 flex items-center gap-2">
          <Timer className="h-4 w-4" />
          Maximum Disconnection Times
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="space-y-2">
            <h5 className="font-medium text-purple-300">General Purpose RCDs</h5>
            <div className="space-y-1">
              <div className="flex justify-between">
                <span className="text-purple-100">1×In (30mA):</span>
                <span className="text-purple-200">≤300ms</span>
              </div>
              <div className="flex justify-between">
                <span className="text-purple-100">5×In (30mA):</span>
                <span className="text-purple-200">≤40ms</span>
              </div>
              <div className="flex justify-between">
                <span className="text-purple-100">1×In (100mA):</span>
                <span className="text-purple-200">≤300ms</span>
              </div>
              <div className="flex justify-between">
                <span className="text-purple-100">5×In (100mA):</span>
                <span className="text-purple-200">≤40ms</span>
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <h5 className="font-medium text-purple-300">Time Delayed RCDs</h5>
            <div className="space-y-1">
              <div className="flex justify-between">
                <span className="text-purple-100">1×In (S-Type):</span>
                <span className="text-purple-200">130-500ms</span>
              </div>
              <div className="flex justify-between">
                <span className="text-purple-100">5×In (S-Type):</span>
                <span className="text-purple-200">≤150ms</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* RCD Types and Applications */}
      <div className="bg-amber-500/10 p-4 rounded border border-amber-500/30">
        <h4 className="font-medium text-amber-300 mb-3 flex items-center gap-2">
          <Shield className="h-4 w-4" />
          RCD Types and Applications
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="space-y-2">
            <h5 className="font-medium text-amber-200">Type AC</h5>
            <ul className="text-amber-100 space-y-1">
              <li>• Detects AC residual currents</li>
              <li>• General purpose applications</li>
              <li>• Most common type</li>
            </ul>
          </div>
          <div className="space-y-2">
            <h5 className="font-medium text-amber-200">Type A</h5>
            <ul className="text-amber-100 space-y-1">
              <li>• Detects AC and pulsating DC</li>
              <li>• Required for IT equipment</li>
              <li>• Electronic loads</li>
            </ul>
          </div>
          <div className="space-y-2">
            <h5 className="font-medium text-amber-200">Type B</h5>
            <ul className="text-amber-100 space-y-1">
              <li>• Detects all residual currents</li>
              <li>• Required for variable speed drives</li>
              <li>• Solar inverters</li>
            </ul>
          </div>
          <div className="space-y-2">
            <h5 className="font-medium text-amber-200">Type S (Selective)</h5>
            <ul className="text-amber-100 space-y-1">
              <li>• Time delayed operation</li>
              <li>• Discrimination with downstream RCDs</li>
              <li>• Main switch applications</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Test Points */}
      <div className="bg-red-500/10 p-4 rounded border border-red-500/30">
        <h4 className="font-medium text-red-300 mb-2">Test Connection Points</h4>
        <div className="space-y-2 text-xs text-red-200">
          <div className="flex items-center justify-between">
            <span>Line test lead:</span>
            <Badge variant="outline" className="text-red-300 border-red-400/30">Downstream of RCD</Badge>
          </div>
          <div className="flex items-center justify-between">
            <span>Neutral test lead:</span>
            <Badge variant="outline" className="text-red-300 border-red-400/30">Downstream of RCD</Badge>
          </div>
          <div className="flex items-center justify-between">
            <span>Earth reference:</span>
            <Badge variant="outline" className="text-red-300 border-red-400/30">Installation earth</Badge>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RCDTestingDiagram;
