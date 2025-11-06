import { AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface EmergencyProceduresSectionProps {
  procedures: string[];
}

export const EmergencyProceduresSection = ({ procedures }: EmergencyProceduresSectionProps) => {
  if (!procedures || procedures.length === 0) return null;

  return (
    <Card className="border-red-500/30 bg-gradient-to-br from-red-500/5 to-orange-500/5">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-red-600">
          <AlertCircle className="h-5 w-5" />
          Emergency Procedures
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {procedures.map((procedure, idx) => (
            <div
              key={idx}
              className="flex items-start gap-3 p-4 bg-white/50 dark:bg-elec-card/50 rounded-lg border border-red-500/20 hover:border-red-500/40 transition-all"
            >
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-red-500 to-orange-500 text-white flex items-center justify-center font-bold text-sm shadow-lg">
                {idx + 1}
              </div>
              <p className="flex-1 text-sm leading-relaxed pt-1">{procedure}</p>
            </div>
          ))}
        </div>

        {/* Emergency Contact Reminder */}
        <div className="mt-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
          <div className="flex items-start gap-2">
            <AlertCircle className="h-4 w-4 text-red-500 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-muted-foreground">
              <span className="font-semibold text-foreground">Important:</span> Ensure all team members are familiar with emergency procedures and know the location of first aid equipment and emergency exits.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
