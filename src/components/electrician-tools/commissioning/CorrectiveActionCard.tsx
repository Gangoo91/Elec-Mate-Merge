import { Wrench, Clock, CheckCircle, PoundSterling, GraduationCap, Package, Shield, AlertTriangle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { CorrectiveAction } from "@/types/commissioning-response";

interface CorrectiveActionCardProps {
  action: CorrectiveAction;
  index: number;
}

const CorrectiveActionCard = ({ action, index }: CorrectiveActionCardProps) => {
  const skillLevelConfig = {
    apprentice: { color: 'bg-blue-500/20 text-blue-300 border-blue-500/50', icon: GraduationCap },
    qualified: { color: 'bg-green-500/20 text-green-300 border-green-500/50', icon: CheckCircle },
    specialist: { color: 'bg-purple-500/20 text-purple-300 border-purple-500/50', icon: Shield }
  };

  const skillConfig = action.skillLevel ? skillLevelConfig[action.skillLevel] : null;
  const SkillIcon = skillConfig?.icon;

  return (
    <Card className="bg-elec-dark/80 border-blue-500/30 p-4 hover:border-blue-500/60 transition-colors">
      <div className="space-y-3">
        {/* Header */}
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 p-2 rounded-lg bg-blue-500/20 border border-blue-500/50">
            <Wrench className="h-4 w-4 text-blue-400" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap mb-2">
              <Badge variant="outline" className="text-blue-300 border-blue-500/50">
                Fix #{index + 1}
              </Badge>
              {skillConfig && SkillIcon && (
                <Badge variant="outline" className={skillConfig.color}>
                  <SkillIcon className="h-3 w-3 mr-1" />
                  {action.skillLevel}
                </Badge>
              )}
            </div>
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

        {/* Materials Cost */}
        {action.materialsCost && (
          <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3">
            <div className="flex items-center gap-2">
              <PoundSterling className="h-4 w-4 text-green-400" />
              <span className="text-sm font-semibold text-green-300">Materials Cost:</span>
              <span className="text-sm text-white/80">{action.materialsCost}</span>
            </div>
          </div>
        )}

        {/* Part Numbers & Brands */}
        {(action.partNumbers && action.partNumbers.length > 0) || (action.commonBrands && action.commonBrands.length > 0) && (
          <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-3 space-y-2">
            <div className="flex items-center gap-2">
              <Package className="h-4 w-4 text-blue-400" />
              <h5 className="text-sm font-semibold text-blue-300">Parts & Suppliers</h5>
            </div>
            {action.partNumbers && action.partNumbers.length > 0 && (
              <div className="space-y-1">
                <p className="text-xs text-white/60">Part Numbers:</p>
                <div className="flex flex-wrap gap-1">
                  {action.partNumbers.map((part, idx) => (
                    <Badge key={idx} variant="secondary" className="text-xs font-mono">
                      {part}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
            {action.commonBrands && action.commonBrands.length > 0 && (
              <div className="space-y-1">
                <p className="text-xs text-white/60">Common Brands:</p>
                <div className="flex flex-wrap gap-1">
                  {action.commonBrands.map((brand, idx) => (
                    <Badge key={idx} variant="outline" className="text-xs text-blue-300 border-blue-500/50">
                      {brand}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

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

        {/* Safety Notes */}
        {action.safetyNotes && action.safetyNotes.length > 0 && (
          <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="h-4 w-4 text-red-400" />
              <h5 className="text-sm font-semibold text-red-300">Safety Notes</h5>
            </div>
            <ul className="space-y-1">
              {action.safetyNotes.map((note, idx) => (
                <li key={idx} className="text-sm text-red-200 flex items-start gap-2">
                  <span className="text-red-400">•</span>
                  <span className="text-left">{note}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* BS 7671 Reference */}
        {action.bs7671Reference && (
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-purple-300 border-purple-500/50">
              {action.bs7671Reference}
            </Badge>
          </div>
        )}

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
