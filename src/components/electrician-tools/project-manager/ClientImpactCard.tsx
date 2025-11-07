import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, Lightbulb } from "lucide-react";

interface ClientImpactCardProps {
  clientImpact: Array<{
    when: string;
    what: string;
    duration: string;
    tip?: string;
  }>;
}

const ClientImpactCard = ({ clientImpact }: ClientImpactCardProps) => {
  if (!clientImpact || clientImpact.length === 0) return null;

  return (
    <Card className="border-orange-500/30 bg-gradient-to-br from-orange-500/5 via-background to-background">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <div className="bg-orange-500 p-2 rounded-lg">
            <AlertTriangle className="h-5 w-5 text-white" />
          </div>
          Client Impact Warnings
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Service disruptions the client needs to prepare for
        </p>
      </CardHeader>
      <CardContent className="space-y-3">
        {clientImpact.map((impact, idx) => (
          <div 
            key={idx}
            className="p-4 rounded-lg bg-orange-500/10 border border-orange-500/30 space-y-2"
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1">
                <div className="font-semibold text-sm text-orange-600 dark:text-orange-400">
                  {impact.what}
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  <span className="font-semibold">When:</span> {impact.when}
                </div>
                <div className="text-xs text-muted-foreground">
                  <span className="font-semibold">Duration:</span> {impact.duration}
                </div>
              </div>
            </div>
            
            {impact.tip && (
              <div className="pt-2 border-t border-orange-500/20">
                <div className="flex items-start gap-2 text-sm">
                  <Lightbulb className="h-4 w-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-semibold">Pro Tip:</span> {impact.tip}
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
        
        <div className="text-xs text-muted-foreground bg-muted/30 p-3 rounded-lg">
          💡 <strong>Communication Tip:</strong> Send this list to the client 2-3 days before work starts so they can prepare properly.
        </div>
      </CardContent>
    </Card>
  );
};

export default ClientImpactCard;
