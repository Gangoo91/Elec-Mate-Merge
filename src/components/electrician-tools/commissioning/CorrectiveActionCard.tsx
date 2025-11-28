import { Wrench, Clock, CheckCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { CorrectiveAction } from "@/types/commissioning-response";

interface CorrectiveActionCardProps {
  action: CorrectiveAction;
  index: number;
}

const CorrectiveActionCard = ({ action, index }: CorrectiveActionCardProps) => {
  return (
    <Card className="bg-elec-dark/80 border-blue-500/30 p-4 hover:border-blue-500/60 transition-colors">
      <div className="space-y-3">
        {/* Header */}
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 p-2 rounded-lg bg-blue-500/20 border border-blue-500/50">
            <Wrench className="h-4 w-4 text-blue-400" />
          </div>
          <div className="flex-1 min-w-0">
            <Badge variant="outline" className="text-blue-300 border-blue-500/50 mb-2">
              Fix #{index + 1}
            </Badge>
            <h4 className="text-sm font-semibold text-white mb-1">
              For: {action.forSymptom}
            </h4>
          </div>
        </div>

        {/* Action */}
        <div className="space-y-2">
          <p className="text-sm text-white/80 leading-relaxed text-left">
            {action.action}
          </p>
        </div>

        {/* Tools & Time */}
        <div className="flex flex-wrap gap-2">
          {action.tools && action.tools.length > 0 && (
            <div className="flex-1 min-w-[150px]">
              <h5 className="text-xs text-white/60 mb-1">Tools Required</h5>
              <div className="flex flex-wrap gap-1">
                {action.tools.map((tool, idx) => (
                  <Badge key={idx} variant="secondary" className="text-xs">
                    {tool}
                  </Badge>
                ))}
              </div>
            </div>
          )}
          
          {action.estimatedTime && (
            <div className="flex items-center gap-1 bg-elec-dark/50 rounded-lg px-3 py-2">
              <Clock className="h-3 w-3 text-blue-400" />
              <span className="text-xs text-white/70">{action.estimatedTime}</span>
            </div>
          )}
        </div>

        {/* Verification */}
        {action.verificationTest && (
          <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3">
            <div className="flex items-start gap-2">
              <CheckCircle className="h-4 w-4 text-green-400 flex-shrink-0 mt-0.5" />
              <div>
                <h5 className="text-xs font-semibold text-green-300 mb-1">Verification</h5>
                <p className="text-xs text-white/80">{action.verificationTest}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};

export default CorrectiveActionCard;
