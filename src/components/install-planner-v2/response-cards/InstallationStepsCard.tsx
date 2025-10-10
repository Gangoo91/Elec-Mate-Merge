import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { Wrench, CheckCircle2, ChevronDown } from "lucide-react";
import { useState } from "react";

interface InstallationStepsData {
  installationSteps?: string[];
  supportIntervals?: string;
  safeZones?: string[];
  specialRequirements?: string[];
}

interface InstallationStepsCardProps {
  data: InstallationStepsData;
}

export const InstallationStepsCard = ({ data }: InstallationStepsCardProps) => {
  const [showAllSteps, setShowAllSteps] = useState(false);
  
  return (
    <Card className="border-elec-yellow/20 bg-gradient-to-br from-purple-500/5 to-transparent hover:border-elec-yellow/30 transition-all">
      <CardContent className="p-4 space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <Badge variant="outline" className="bg-purple-500/10 text-purple-400 border-purple-500/30">
            🔧 Installation Guide
          </Badge>
        </div>

        {/* Installation Steps Summary (First 3) */}
        {data.installationSteps && data.installationSteps.length > 0 && (
          <div className="space-y-3">
            <p className="text-xs font-semibold text-foreground">Installation Sequence</p>
            <ol className="space-y-2">
              {data.installationSteps.slice(0, 3).map((step, idx) => (
                <li key={idx} className="flex items-start gap-3 text-sm">
                  <div className="flex items-center justify-center h-6 w-6 rounded-full bg-purple-500/20 text-purple-400 text-xs font-bold flex-shrink-0 mt-0.5">
                    {idx + 1}
                  </div>
                  <span className="text-foreground flex-1 leading-relaxed">{step}</span>
                </li>
              ))}
            </ol>
            {data.installationSteps.length > 3 && (
              <Collapsible open={showAllSteps} onOpenChange={setShowAllSteps}>
                <CollapsibleTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="w-full justify-between text-xs h-8 mt-2"
                  >
                    <span>View All {data.installationSteps.length} Steps</span>
                    <ChevronDown className={`h-4 w-4 transition-transform ${showAllSteps ? 'rotate-180' : ''}`} />
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="pt-2">
                  <ol className="space-y-2" start={4}>
                    {data.installationSteps.slice(3).map((step, idx) => (
                      <li key={idx + 3} className="flex items-start gap-3 text-sm">
                        <div className="flex items-center justify-center h-6 w-6 rounded-full bg-purple-500/20 text-purple-400 text-xs font-bold flex-shrink-0 mt-0.5">
                          {idx + 4}
                        </div>
                        <span className="text-foreground flex-1 leading-relaxed">{step}</span>
                      </li>
                    ))}
                  </ol>
                </CollapsibleContent>
              </Collapsible>
            )}
          </div>
        )}

        {/* Support Intervals */}
        {data.supportIntervals && (
          <div className="bg-muted/30 rounded p-3">
            <div className="flex items-center gap-2 mb-1">
              <Wrench className="h-3 w-3 text-muted-foreground" />
              <p className="text-xs font-semibold text-foreground">Support Intervals</p>
            </div>
            <p className="text-sm text-foreground">{data.supportIntervals}</p>
          </div>
        )}

        {/* Safe Zones */}
        {data.safeZones && data.safeZones.length > 0 && (
          <div className="border border-elec-yellow/30 rounded p-3 bg-elec-yellow/5">
            <p className="text-xs font-semibold text-elec-yellow mb-2">⚡ Safe Zones (BS 7671 Section 522)</p>
            <ul className="space-y-1">
              {data.safeZones.map((zone, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs text-foreground">
                  <CheckCircle2 className="h-3 w-3 text-elec-yellow mt-0.5 flex-shrink-0" />
                  {zone}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Special Requirements */}
        {data.specialRequirements && data.specialRequirements.length > 0 && (
          <div className="border-t border-border/50 pt-3">
            <p className="text-xs font-semibold text-foreground mb-2">Special Requirements</p>
            <ul className="space-y-1">
              {data.specialRequirements.map((req, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs text-muted-foreground">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-elec-yellow flex-shrink-0" />
                  {req}
                </li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
