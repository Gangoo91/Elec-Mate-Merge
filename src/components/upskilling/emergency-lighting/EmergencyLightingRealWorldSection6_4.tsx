import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Building2, AlertTriangle } from 'lucide-react';

export const EmergencyLightingRealWorldSection6_4 = () => {
  return (
    <Card className="bg-gradient-to-br from-orange-500/10 to-red-500/10 border-orange-500/30">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Building2 className="h-5 w-5 text-orange-400" />
          Real-World Example: Liverpool Hotel Case Study
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-start gap-3 bg-red-500/10 border border-red-500/30 rounded-lg p-4">
          <AlertTriangle className="h-6 w-6 text-red-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-foreground leading-relaxed mb-3">
              During a fire safety audit of a hotel in Liverpool, the Fire Authority found that while all emergency lights were functional, 
              the logbook had not been updated for nine months and several test certificates were missing.
            </p>
            <p className="text-foreground leading-relaxed mb-3">
              The Responsible Person was issued with an enforcement notice and had to commission a full re-inspection.
            </p>
            <p className="text-foreground leading-relaxed font-semibold">
              The cost of the audit failure and re-certification exceeded £6,000 — highlighting that missing paperwork is treated 
              the same as a failed system.
            </p>
          </div>
        </div>

        <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-4">
          <h4 className="font-semibold text-foreground mb-2">Key Lesson</h4>
          <p className="text-foreground text-sm leading-relaxed">
            Even a fully functional emergency lighting system can result in significant financial penalties and legal consequences 
            if documentation is incomplete. The paper trail is just as important as the physical installation.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
