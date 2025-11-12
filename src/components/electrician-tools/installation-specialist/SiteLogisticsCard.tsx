import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Lock, FileCheck, Clock, AlertTriangle } from "lucide-react";

interface SiteLogisticsCardProps {
  siteLogistics: {
    isolationPoints: string[];
    accessRequirements: string;
    permitsRequired: string[];
    workingHours?: string;
  };
}

export const SiteLogisticsCard = ({ siteLogistics }: SiteLogisticsCardProps) => {
  const { isolationPoints, accessRequirements, permitsRequired, workingHours } = siteLogistics;

  return (
    <Card className="border-purple-500/20 bg-gradient-to-br from-purple-500/5 to-background shadow-lg">
      <CardContent className="p-5 sm:p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-purple-500/10">
            <MapPin className="h-5 w-5 text-purple-400" />
          </div>
          <h3 className="font-bold text-lg">Site Logistics & Planning</h3>
        </div>

        <div className="space-y-4">
          {/* Isolation Points */}
          {isolationPoints && isolationPoints.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Lock className="h-4 w-4 text-red-400" />
                <h4 className="font-semibold text-sm text-muted-foreground">Isolation Points</h4>
              </div>
              <ul className="space-y-1.5">
                {isolationPoints.map((point, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm bg-red-500/5 border border-red-500/20 rounded px-3 py-2">
                    <span className="text-red-400 mt-0.5 flex-shrink-0">⚡</span>
                    <span className="text-foreground">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Access Requirements */}
          {accessRequirements && (
            <div className="bg-muted/30 border border-border/50 rounded-lg p-3">
              <div className="flex items-start gap-2">
                <AlertTriangle className="h-4 w-4 text-amber-400 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-sm text-muted-foreground mb-1">Access Requirements</h4>
                  <p className="text-sm text-foreground">{accessRequirements}</p>
                </div>
              </div>
            </div>
          )}

          {/* Permits Required */}
          {permitsRequired && permitsRequired.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-2">
                <FileCheck className="h-4 w-4 text-blue-400" />
                <h4 className="font-semibold text-sm text-muted-foreground">Permits Required</h4>
              </div>
              <div className="flex flex-wrap gap-2">
                {permitsRequired.map((permit, index) => {
                  const isNoPermit = permit.toLowerCase().includes('no permit');
                  return (
                    <Badge 
                      key={index}
                      className={`${
                        isNoPermit 
                          ? 'bg-gradient-to-r from-green-500/20 to-green-600/20 border-green-500/40' 
                          : 'bg-gradient-to-r from-blue-500/20 to-blue-600/20 border-blue-500/40'
                      } text-foreground px-3 py-1 text-xs font-medium`}
                    >
                      {isNoPermit ? '✓' : '⚠'} {permit}
                    </Badge>
                  );
                })}
              </div>
            </div>
          )}

          {/* Working Hours */}
          {workingHours && (
            <div className="bg-gradient-to-r from-purple-500/10 to-purple-600/10 border border-purple-500/30 rounded-lg p-3">
              <div className="flex items-start gap-2">
                <Clock className="h-4 w-4 text-purple-400 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-sm text-purple-400 mb-1">Working Hours & Coordination</h4>
                  <p className="text-sm text-foreground">{workingHours}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Note */}
        <div className="mt-4 pt-3 border-t border-border/50">
          <p className="text-xs text-muted-foreground">
            <strong>Important:</strong> Ensure all permits are obtained before commencing work. 
            Coordinate with site manager, occupants, and other trades as required.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
