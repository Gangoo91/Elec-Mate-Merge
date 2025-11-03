import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowUp, Hammer, Flame, Box, Zap } from "lucide-react";

interface ConditionalFlags {
  work_at_height?: boolean;
  services_utilities?: boolean;
  hot_works?: boolean;
  confined_spaces?: boolean;
  live_electrical_work?: boolean;
}

interface ConditionalProceduresSectionProps {
  flags?: ConditionalFlags;
  workAtHeightEquipment?: string[];
}

export const ConditionalProceduresSection = ({ flags, workAtHeightEquipment }: ConditionalProceduresSectionProps) => {
  if (!flags) return null;

  const activeFlags = Object.entries(flags).filter(([_, value]) => value === true);
  
  if (activeFlags.length === 0) return null;

  return (
    <div className="space-y-3">
      {/* Work at Height */}
      {flags.work_at_height && (
        <Card className="p-4 border-warning/40 bg-warning/5">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-warning/20">
              <ArrowUp className="h-5 w-5 text-warning" />
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-sm text-foreground mb-2">Work at Height Procedures</h4>
              
              {workAtHeightEquipment && workAtHeightEquipment.length > 0 && (
                <div className="mb-3">
                  <div className="text-xs text-muted-foreground mb-1">Equipment Required</div>
                  <ul className="space-y-1">
                    {workAtHeightEquipment.map((item, idx) => (
                      <li key={idx} className="text-sm flex items-start gap-2">
                        <span className="text-warning mt-0.5">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="text-xs text-muted-foreground">
                <div className="font-semibold mb-1">Safety Requirements:</div>
                <ul className="space-y-1">
                  <li>• Maintain 3-point contact on ladders</li>
                  <li>• Clear 1m zone around ladder base</li>
                  <li>• Inspect equipment before each use</li>
                  <li>• Wear appropriate PPE (hard hat, safety harness if required)</li>
                </ul>
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* Services & Utilities */}
      {flags.services_utilities && (
        <Card className="p-4 border-warning/40 bg-warning/5">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-warning/20">
              <Zap className="h-5 w-5 text-warning" />
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-sm text-foreground mb-2">Services & Utilities Detection</h4>
              <div className="text-xs text-muted-foreground space-y-1">
                <div>• Use CAT & Genny scan before excavation</div>
                <div>• Review site drawings for buried services</div>
                <div>• Hand tools only within 0.5m of known services</div>
                <div>• Mark detected services clearly on site</div>
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* Hot Works */}
      {flags.hot_works && (
        <Card className="p-4 border-destructive/40 bg-destructive/5">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-destructive/20">
              <Flame className="h-5 w-5 text-destructive" />
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-sm text-foreground mb-2">Hot Works Permit Required</h4>
              <Badge variant="destructive" className="mb-2">High Risk Activity</Badge>
              <div className="text-xs text-muted-foreground space-y-1">
                <div>• Obtain hot works permit before starting</div>
                <div>• Fire extinguisher within 3m of work area</div>
                <div>• Clear combustible materials (5m radius)</div>
                <div>• Fire watch for 60 minutes post-work</div>
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* Confined Spaces */}
      {flags.confined_spaces && (
        <Card className="p-4 border-destructive/40 bg-destructive/5">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-destructive/20">
              <Box className="h-5 w-5 text-destructive" />
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-sm text-foreground mb-2">Confined Space Entry Procedures</h4>
              <Badge variant="destructive" className="mb-2">Permit to Work Required</Badge>
              <div className="text-xs text-muted-foreground space-y-1">
                <div>• Atmosphere testing before entry</div>
                <div>• Forced ventilation system required</div>
                <div>• Continuous gas monitoring during work</div>
                <div>• Trained standby person at entry point</div>
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* Live Electrical Work */}
      {flags.live_electrical_work && (
        <Card className="p-4 border-destructive/40 bg-destructive/5">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-destructive/20">
              <Zap className="h-5 w-5 text-destructive" />
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-sm text-foreground mb-2">Live Electrical Work Authorization</h4>
              <Badge variant="destructive" className="mb-2">Exceptional Circumstances Only</Badge>
              <div className="text-xs text-muted-foreground space-y-1">
                <div>• Written justification required (dead working not feasible)</div>
                <div>• AP certification mandatory (18th Edition insufficient)</div>
                <div>• Approved voltage-rated PPE and tools</div>
                <div>• Second person standby at all times</div>
              </div>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};
