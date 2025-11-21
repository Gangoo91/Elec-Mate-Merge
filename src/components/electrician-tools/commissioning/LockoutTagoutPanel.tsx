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
    <Card className="bg-red-500/10 border-2 border-red-500 p-5 sm:p-5">
      <div className="space-y-5 sm:space-y-4">
        {/* Header - Mobile: Stacked & Centered, Desktop: Side-by-side */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-3">
          <div className="flex-shrink-0 p-4 sm:p-3 rounded-xl sm:rounded-lg bg-red-500/20 border-2 sm:border border-red-500">
            <AlertTriangle className="h-10 w-10 sm:h-6 sm:w-6 text-red-300" />
          </div>
          <div className="flex-1 w-full text-center sm:text-left">
            <div className="flex flex-col sm:flex-row items-center sm:items-center gap-2 mb-3 sm:mb-2">
              <Badge className="bg-red-500 text-white text-base sm:text-sm px-4 py-1.5 sm:px-3 sm:py-1">Required</Badge>
              <h3 className="text-xl sm:text-lg font-bold text-red-300">Lockout/Tagout Procedure</h3>
            </div>
            <p className="text-base sm:text-sm text-red-200 leading-relaxed">
              This procedure requires complete electrical isolation. Follow all steps before beginning work.
            </p>
          </div>
        </div>

        {/* Isolation Procedure */}
        {lockoutTagout.procedure && lockoutTagout.procedure.length > 0 && (
          <div className="space-y-3 sm:space-y-2">
            <h4 className="text-lg sm:text-sm font-bold sm:font-semibold text-white flex items-center justify-center sm:justify-start gap-2">
              <Lock className="h-5 w-5 sm:h-4 sm:w-4 text-red-400" />
              Isolation Steps
            </h4>
            <ol className="space-y-3 sm:space-y-2">
              {lockoutTagout.procedure.map((step, idx) => (
                <li key={idx} className="flex items-start gap-4 sm:gap-3 text-base sm:text-sm text-white leading-relaxed text-left">
                  <span className="flex-shrink-0 w-8 h-8 sm:w-6 sm:h-6 rounded-full bg-red-500/20 border-2 sm:border border-red-500/50 flex items-center justify-center text-sm sm:text-xs font-bold sm:font-semibold text-red-300">
                    {idx + 1}
                  </span>
                  <span className="flex-1 pt-1 sm:pt-0.5">{step}</span>
                </li>
              ))}
            </ol>
          </div>
        )}

        {/* Isolation Points */}
        {lockoutTagout.isolationPoints && lockoutTagout.isolationPoints.length > 0 && (
          <div className="space-y-3 sm:space-y-2 bg-red-500/10 rounded-lg p-5 sm:p-4 border-2 sm:border border-red-500/30">
            <h4 className="text-lg sm:text-sm font-bold sm:font-semibold text-red-300 text-center sm:text-left">Isolation Points to Lock</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-2">
              {lockoutTagout.isolationPoints.map((point, idx) => (
                <div key={idx} className="flex items-center justify-center sm:justify-start gap-2 text-base sm:text-sm text-white">
                  <Lock className="h-4 w-4 sm:h-3 sm:w-3 text-red-400" />
                  <span>{point}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Warning Footer */}
        <div className="bg-red-500/20 border-2 sm:border border-red-500/50 rounded-lg p-4 sm:p-3">
          <p className="text-sm sm:text-xs text-red-200 text-center sm:text-left leading-relaxed">
            <strong>Warning:</strong> Only authorized personnel should perform lockout/tagout. Verify all energy sources are isolated and locked before beginning work.
          </p>
        </div>
      </div>
    </Card>
  );
};

export default LockoutTagoutPanel;
