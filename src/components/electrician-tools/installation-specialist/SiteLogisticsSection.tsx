import { Card } from "@/components/ui/card";
import { Truck, ParkingCircle, Package, Trash2, Users, AlertTriangle, GraduationCap } from "lucide-react";

interface SiteLogistics {
  vehicleAccess?: string;
  parking?: string;
  materialStorage?: string;
  wasteManagement?: string;
  welfareFacilities?: string;
  restrictions?: string[];
}

interface CompetencyRequirements {
  competencyRequirements?: string;
  trainingRequired?: string;
  supervisionLevel?: string;
}

interface SiteLogisticsSectionProps {
  logistics?: SiteLogistics;
  competency?: CompetencyRequirements;
}

export const SiteLogisticsSection = ({ logistics, competency }: SiteLogisticsSectionProps) => {
  if (!logistics && !competency) return null;

  return (
    <Card className="p-4 sm:p-6 space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-1">Site Requirements & Logistics</h3>
        <p className="text-sm text-muted-foreground">Access, welfare, and competency information</p>
      </div>

      {/* Access & Logistics */}
      {logistics && (
        <div className="space-y-4">
          {logistics.vehicleAccess && (
            <div className="flex gap-3">
              <div className="p-2 rounded-lg bg-primary/10 h-fit">
                <Truck className="h-4 w-4 text-primary" />
              </div>
              <div className="flex-1">
                <div className="text-sm font-semibold text-foreground mb-1">Vehicle Access</div>
                <div className="text-sm text-muted-foreground">{logistics.vehicleAccess}</div>
              </div>
            </div>
          )}

          {logistics.parking && (
            <div className="flex gap-3">
              <div className="p-2 rounded-lg bg-primary/10 h-fit">
                <ParkingCircle className="h-4 w-4 text-primary" />
              </div>
              <div className="flex-1">
                <div className="text-sm font-semibold text-foreground mb-1">Parking</div>
                <div className="text-sm text-muted-foreground">{logistics.parking}</div>
              </div>
            </div>
          )}

          {logistics.materialStorage && (
            <div className="flex gap-3">
              <div className="p-2 rounded-lg bg-primary/10 h-fit">
                <Package className="h-4 w-4 text-primary" />
              </div>
              <div className="flex-1">
                <div className="text-sm font-semibold text-foreground mb-1">Material Storage</div>
                <div className="text-sm text-muted-foreground">{logistics.materialStorage}</div>
              </div>
            </div>
          )}

          {logistics.wasteManagement && (
            <div className="flex gap-3">
              <div className="p-2 rounded-lg bg-primary/10 h-fit">
                <Trash2 className="h-4 w-4 text-primary" />
              </div>
              <div className="flex-1">
                <div className="text-sm font-semibold text-foreground mb-1">Waste Management</div>
                <div className="text-sm text-muted-foreground">{logistics.wasteManagement}</div>
              </div>
            </div>
          )}

          {logistics.welfareFacilities && (
            <div className="flex gap-3">
              <div className="p-2 rounded-lg bg-primary/10 h-fit">
                <Users className="h-4 w-4 text-primary" />
              </div>
              <div className="flex-1">
                <div className="text-sm font-semibold text-foreground mb-1">Welfare Facilities</div>
                <div className="text-sm text-muted-foreground">{logistics.welfareFacilities}</div>
              </div>
            </div>
          )}

          {logistics.restrictions && logistics.restrictions.length > 0 && (
            <div className="flex gap-3">
              <div className="p-2 rounded-lg bg-warning/10 h-fit">
                <AlertTriangle className="h-4 w-4 text-warning" />
              </div>
              <div className="flex-1">
                <div className="text-sm font-semibold text-foreground mb-2">Site Restrictions</div>
                <ul className="space-y-1">
                  {logistics.restrictions.map((restriction, idx) => (
                    <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                      <span className="text-warning mt-0.5">•</span>
                      {restriction}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Competency Requirements */}
      {competency && (
        <div className="pt-4 border-t border-border">
          <div className="flex gap-3 mb-4">
            <div className="p-2 rounded-lg bg-primary/10 h-fit">
              <GraduationCap className="h-4 w-4 text-primary" />
            </div>
            <div className="flex-1">
              <div className="text-sm font-semibold text-foreground mb-3">Competency Requirements</div>
              
              {competency.competencyRequirements && (
                <div className="mb-3">
                  <div className="text-xs text-muted-foreground mb-1">Minimum Qualifications</div>
                  <div className="text-sm text-foreground">{competency.competencyRequirements}</div>
                </div>
              )}

              {competency.trainingRequired && (
                <div className="mb-3">
                  <div className="text-xs text-muted-foreground mb-1">Training Required</div>
                  <div className="text-sm text-foreground">{competency.trainingRequired}</div>
                </div>
              )}

              {competency.supervisionLevel && (
                <div>
                  <div className="text-xs text-muted-foreground mb-1">Supervision Requirements</div>
                  <div className="text-sm text-foreground">{competency.supervisionLevel}</div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </Card>
  );
};
