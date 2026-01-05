import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Wrench, CheckCircle2 } from 'lucide-react';

export const EmergencyLightingPracticalSection6_4 = () => {
  const practicalTips = [
    {
      title: "Conduct Internal Audits",
      description: "Conduct internal audits every six months to ensure records are complete and up to date before any official inspection."
    },
    {
      title: "Attach Documentation",
      description: "Always attach testing certificates and logbook extracts to fire risk assessments to demonstrate integration and compliance."
    },
    {
      title: "Digital Backups",
      description: "Keep digital backups in cloud storage or secure company servers to prevent loss of critical documentation."
    },
    {
      title: "Consistent Formatting",
      description: "Use consistent document formatting — inspectors favour clear, standardised layouts that are easy to review."
    },
    {
      title: "Contractor Sign-Off",
      description: "Ensure maintenance contractors sign off every test visit to maintain complete traceability and accountability."
    }
  ];

  return (
    <Card className="bg-slate-800/50 border-slate-600">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Wrench className="h-5 w-5 text-elec-yellow" />
          Practical Guidance
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 gap-4">
          {practicalTips.map((tip, index) => (
            <div key={index} className="bg-gradient-to-br from-elec-gray to-[#1a1a1a] border border-slate-600 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-foreground mb-2">{tip.title}</h4>
                  <p className="text-foreground text-sm leading-relaxed">{tip.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
