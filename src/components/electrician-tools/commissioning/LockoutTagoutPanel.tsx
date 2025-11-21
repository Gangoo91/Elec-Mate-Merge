import { Lock, AlertTriangle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { LockoutTagout } from "@/types/commissioning-response";

interface LockoutTagoutPanelProps {
  lockoutTagout: LockoutTagout;
}

const LockoutTagoutPanel = ({ lockoutTagout }: LockoutTagoutPanelProps) => {
  if (!lockoutTagout.required) {
    return (
      <Card className="bg-green-500/10 border-green-500/30 p-4">
        <div className="flex items-center gap-2">
          <Lock className="h-5 w-5 text-green-400" />
          <div>
            <h4 className="text-sm font-semibold text-green-300">Lockout/Tagout</h4>
            <p className="text-xs text-white/70">Not required for this procedure</p>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="bg-red-500/10 border-2 border-red-500 p-5">
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 p-3 rounded-lg bg-red-500/20 border border-red-500">
            <AlertTriangle className="h-6 w-6 text-red-300" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Badge className="bg-red-500 text-white">Required</Badge>
              <h3 className="text-lg font-bold text-red-300">Lockout/Tagout Procedure</h3>
            </div>
            <p className="text-sm text-red-200">
              This procedure requires complete electrical isolation. Follow all steps before beginning work.
            </p>
          </div>
        </div>

        {/* Isolation Procedure */}
        {lockoutTagout.procedure && lockoutTagout.procedure.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-sm font-semibold text-white flex items-center gap-2">
              <Lock className="h-4 w-4 text-red-400" />
              Isolation Steps
            </h4>
            <ol className="space-y-2">
              {lockoutTagout.procedure.map((step, idx) => (
                <li key={idx} className="flex items-start gap-3 text-sm text-white/80">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-red-500/20 border border-red-500/50 flex items-center justify-center text-xs font-semibold text-red-300">
                    {idx + 1}
                  </span>
                  <span className="flex-1 pt-0.5">{step}</span>
                </li>
              ))}
            </ol>
          </div>
        )}

        {/* Isolation Points */}
        {lockoutTagout.isolationPoints && lockoutTagout.isolationPoints.length > 0 && (
          <div className="space-y-2 bg-red-500/10 rounded-lg p-4 border border-red-500/30">
            <h4 className="text-sm font-semibold text-red-300">Isolation Points to Lock</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {lockoutTagout.isolationPoints.map((point, idx) => (
                <div key={idx} className="flex items-center gap-2 text-sm text-white/80">
                  <Lock className="h-3 w-3 text-red-400" />
                  <span>{point}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Warning Footer */}
        <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-3">
          <p className="text-xs text-red-200">
            <strong>Warning:</strong> Only authorized personnel should perform lockout/tagout. Verify all energy sources are isolated and locked before beginning work.
          </p>
        </div>
      </div>
    </Card>
  );
};

export default LockoutTagoutPanel;
