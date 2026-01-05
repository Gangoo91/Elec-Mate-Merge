import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileCheck, AlertCircle } from 'lucide-react';

export const EmergencyLightingIntroSection6_4 = () => {
  return (
    <Card className="bg-slate-800/50 border-slate-600">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <FileCheck className="h-5 w-5 text-elec-yellow" />
          Introduction
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-foreground leading-relaxed">
          Emergency lighting systems are among the first items inspected during a fire safety audit.
          Even a perfectly functioning system can fail an inspection if the required documentation is missing, incomplete, or inconsistent.
        </p>
        <p className="text-foreground leading-relaxed">
          The Regulatory Reform (Fire Safety) Order 2005 (RRO) and BS 5266-1 both require that accurate records, certificates, and test results are maintained and available to Fire and Rescue Authorities at any time.
        </p>
        <p className="text-foreground leading-relaxed">
          For electricians, building managers, and contractors, maintaining a complete and traceable record of all design, installation, and maintenance activity is essential for demonstrating compliance and protecting against legal and insurance liability.
        </p>

        <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 mt-6">
          <div className="flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-foreground mb-2">Why Documentation Equals Compliance</h4>
              <p className="text-foreground text-sm leading-relaxed">
                Without a complete paper trail, compliance cannot be demonstrated—regardless of system performance. 
                Documentation serves as legal evidence that proves your emergency lighting system meets all regulatory requirements.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
          <div className="bg-gradient-to-br from-elec-gray to-[#1a1a1a] border border-slate-600 rounded-lg p-4">
            <h4 className="font-semibold text-elec-yellow mb-2">Legal Requirements</h4>
            <ul className="space-y-2 text-foreground text-sm">
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow mt-1">•</span>
                <span>Regulatory Reform (Fire Safety) Order 2005</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow mt-1">•</span>
                <span>BS 5266-1 documentation standards</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow mt-1">•</span>
                <span>BS 7671 certification requirements</span>
              </li>
            </ul>
          </div>

          <div className="bg-gradient-to-br from-elec-gray to-[#1a1a1a] border border-slate-600 rounded-lg p-4">
            <h4 className="font-semibold text-elec-yellow mb-2">Audit Expectations</h4>
            <ul className="space-y-2 text-foreground text-sm">
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow mt-1">•</span>
                <span>Complete test records and logbooks</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow mt-1">•</span>
                <span>Signed commissioning certificates</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow mt-1">•</span>
                <span>Up-to-date fire risk assessments</span>
              </li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
