import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, Package, Calendar, AlertTriangle } from "lucide-react";
import { addDays, format } from "date-fns";

interface CriticalActionsCardProps {
  materialProcurement?: {
    orderNow?: Array<{
      item: string;
      leadTime: string;
      supplier?: string;
      cost?: number;
      criticalPath?: boolean;
    }>;
  };
  complianceTimeline?: {
    beforeWork?: Array<{
      what: string;
      when: string;
      consequence?: string;
    }>;
  };
  clientImpact?: Array<{
    when: string;
    what: string;
    duration: string;
  }>;
  startDate?: string;
}

const CriticalActionsCard = ({
  materialProcurement,
  complianceTimeline,
  clientImpact,
  startDate
}: CriticalActionsCardProps) => {
  const hasOrderNow = materialProcurement?.orderNow && materialProcurement.orderNow.length > 0;
  const hasBeforeWork = complianceTimeline?.beforeWork && complianceTimeline.beforeWork.length > 0;
  const hasClientImpact = clientImpact && clientImpact.length > 0;

  if (!hasOrderNow && !hasBeforeWork && !hasClientImpact) {
    return null;
  }

  const calculateDeadline = (relativeDays: number) => {
    if (!startDate) return null;
    const base = new Date(startDate);
    return format(addDays(base, relativeDays), 'EEE d MMM');
  };

  return (
    <Card className="border-2 border-pink-400/40 bg-gradient-to-br from-pink-500/10 via-background to-background overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-pink-500/5 to-transparent animate-pulse pointer-events-none" />
      <CardHeader className="relative pb-3">
        <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
          <div className="bg-pink-400 p-2 rounded-lg">
            <AlertCircle className="h-5 w-5 text-elec-dark" />
          </div>
          Take Action Now
        </CardTitle>
        <p className="text-sm text-muted-foreground">Critical items requiring immediate attention</p>
      </CardHeader>
      <CardContent className="relative space-y-4">
        {/* Order Today */}
        {hasOrderNow && (
          <div className="space-y-2">
            <div className="flex items-center gap-2 mb-3">
              <Package className="h-4 w-4 text-destructive" />
              <h5 className="font-semibold text-sm">🔴 Order Today</h5>
              <Badge variant="destructive" className="text-xs">Long Lead Time</Badge>
            </div>
            <div className="space-y-2">
              {materialProcurement.orderNow!.map((item, idx) => (
                <div 
                  key={idx}
                  className="p-3 rounded-lg bg-destructive/10 border border-destructive/30 space-y-1"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1">
                      <div className="font-medium text-sm text-foreground">{item.item}</div>
                      {item.supplier && (
                        <div className="text-xs text-foreground/60">Supplier: {item.supplier}</div>
                      )}
                    </div>
                    {item.cost && (
                      <div className="text-sm font-semibold text-pink-400">£{item.cost}</div>
                    )}
                  </div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <Badge variant="outline" className="text-xs bg-destructive/20 border-destructive/40">
                      {item.leadTime} lead time
                    </Badge>
                    {item.criticalPath && (
                      <Badge variant="outline" className="text-xs bg-pink-400/20 border-pink-400/40">
                        Critical Path
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Schedule This Week */}
        {hasBeforeWork && (
          <div className="space-y-2">
            <div className="flex items-center gap-2 mb-3">
              <Calendar className="h-4 w-4 text-warning" />
              <h5 className="font-semibold text-sm">📅 Schedule Before Start</h5>
              <Badge variant="outline" className="text-xs bg-warning/20 border-warning/40">
                Mandatory
              </Badge>
            </div>
            <div className="space-y-2">
              {complianceTimeline.beforeWork!.map((item, idx) => (
                <div 
                  key={idx}
                  className="p-3 rounded-lg bg-warning/10 border border-warning/30 space-y-1"
                >
                  <div className="font-medium text-sm text-foreground">{item.what}</div>
                  <div className="text-xs text-foreground/60">{item.when}</div>
                  {item.consequence && (
                    <div className="text-xs text-destructive flex items-start gap-1 mt-1">
                      <AlertTriangle className="h-3 w-3 mt-0.5 flex-shrink-0" />
                      {item.consequence}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Client Warnings */}
        {hasClientImpact && (
          <div className="space-y-2">
            <div className="flex items-center gap-2 mb-3">
              <AlertTriangle className="h-4 w-4 text-orange-500" />
              <h5 className="font-semibold text-sm">⚠️ Client Warnings</h5>
              <Badge variant="outline" className="text-xs bg-orange-500/20 border-orange-500/40">
                Service Disruption
              </Badge>
            </div>
            <div className="space-y-2">
              {clientImpact.slice(0, 3).map((item, idx) => (
                <div 
                  key={idx}
                  className="p-3 rounded-lg bg-orange-500/10 border border-orange-500/30 space-y-1"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="font-medium text-sm text-foreground">{item.what}</div>
                    <div className="text-xs text-foreground/60 whitespace-nowrap">{item.when}</div>
                  </div>
                  <div className="text-xs text-foreground/60">Duration: {item.duration}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CriticalActionsCard;
