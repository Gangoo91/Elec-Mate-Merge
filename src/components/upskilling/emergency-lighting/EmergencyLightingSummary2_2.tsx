import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2, Wrench } from 'lucide-react';

export const EmergencyLightingSummary2_2 = () => {
  const practicalGuidance = [
    "Walk the space after installation to identify shadows or blind spots.",
    "Always use fittings certified for emergency use, not standard luminaires.",
    "Ensure the emergency supply is separate and reliable.",
    "Keep the emergency lighting logbook on-site and up to date for compliance inspections."
  ];

  return (
    <div className="space-y-6">
      {/* Practical Guidance */}
      <Card className="bg-elec-yellow/10 border-elec-yellow/30">
        <CardHeader className="pb-4">
          <CardTitle className="text-foreground flex items-center gap-2">
            <Wrench className="h-5 w-5 text-elec-yellow" />
            Practical Guidance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {practicalGuidance.map((item, index) => (
              <li key={index} className="flex items-start gap-3">
                <CheckCircle2 className="h-4 w-4 text-elec-yellow mt-1 flex-shrink-0" />
                <span className="text-foreground leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Key Takeaways */}
      <Card className="bg-slate-200/20 border-elec-yellow/20">
        <CardHeader className="pb-4">
          <CardTitle className="text-foreground flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-elec-yellow" />
            Section Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <h4 className="text-elec-yellow font-semibold">Technical Requirements</h4>
              <ul className="space-y-2 text-foreground text-sm">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></span>
                  Minimum 0.5 lux illuminance in central core
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></span>
                  Uniform coverage with no dark patches
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></span>
                  1-3 hour emergency duration
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="text-elec-yellow font-semibold">Maintenance Schedule</h4>
              <ul className="space-y-2 text-foreground text-sm">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></span>
                  Monthly functional testing
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></span>
                  Annual full duration testing
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></span>
                  Complete logbook records
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};