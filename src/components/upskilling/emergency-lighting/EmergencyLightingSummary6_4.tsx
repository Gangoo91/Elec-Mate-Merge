import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2, Award } from 'lucide-react';

export const EmergencyLightingSummary6_4 = () => {
  const keyTakeaways = [
    "Documentation is legal evidence of compliance — without it, even a perfect system can fail inspection",
    "Fire Authorities require design drawings, logbooks, certificates, and fire risk assessments",
    "Records must be kept on-site, accessible, and retained for at least six years",
    "Common audit failures include missing logbook entries and unsigned certificates",
    "Enforcement actions can include Improvement Notices, Prohibition Notices, and prosecution",
    "Missing paperwork is treated the same as a failed system — both result in serious consequences"
  ];

  const module6Sections = [
    "Section 1: Key Clauses from BS 5266-1 and EN 1838",
    "Section 2: Integration with Fire Safety Regulations",
    "Section 3: Emergency Lighting in Risk Assessments",
    "Section 4: Documentation for Audits and Fire Authorities"
  ];

  return (
    <div className="space-y-6">
      <Card className="bg-emerald-500/10 border-emerald-500/30">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-emerald-400" />
            Section 4 Summary: Key Takeaways
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {keyTakeaways.map((takeaway, index) => (
              <li key={index} className="flex items-start gap-3 text-foreground">
                <CheckCircle2 className="h-5 w-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span className="leading-relaxed">{takeaway}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-elec-yellow/20 to-yellow-600/20 border-elec-yellow/30">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <Award className="h-6 w-6 text-elec-yellow" />
            Module 6 Complete: Regulatory Compliance and BS 5266
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-foreground leading-relaxed font-semibold text-lg">
            🎉 Congratulations! You've completed Module 6: Regulatory Compliance and BS 5266
          </p>
          <p className="text-foreground leading-relaxed">
            You now understand not just the technical side of emergency lighting, but also the legal, procedural, 
            and documentation obligations that underpin compliance in the UK.
          </p>
          
          <div className="bg-elec-dark/50 border border-elec-yellow/30 rounded-lg p-4 mt-4">
            <h4 className="font-semibold text-elec-yellow mb-3">Module 6 Sections Completed:</h4>
            <ul className="space-y-2">
              {module6Sections.map((section, index) => (
                <li key={index} className="flex items-start gap-2 text-foreground">
                  <CheckCircle2 className="h-4 w-4 text-green-400 flex-shrink-0 mt-1" />
                  <span className="text-sm">{section}</span>
                </li>
              ))}
            </ul>
          </div>

          <p className="text-foreground text-sm leading-relaxed mt-4">
            This module has equipped you with the knowledge to ensure emergency lighting systems meet all UK regulatory requirements, 
            integrate properly with fire safety systems, align with risk assessments, and maintain complete audit-ready documentation.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
