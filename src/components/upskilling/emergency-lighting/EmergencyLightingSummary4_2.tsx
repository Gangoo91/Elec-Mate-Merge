import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileCheck } from 'lucide-react';

export const EmergencyLightingSummary4_2 = () => {
  return (
    <Card className="bg-gradient-to-br from-elec-yellow/10 to-elec-yellow/5 border-elec-yellow/30">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <FileCheck className="h-5 w-5 text-elec-yellow" />
          Section Summary
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-foreground leading-relaxed">
          Self-contained and central battery emergency lighting systems both comply with BS 5266-1, but each has distinct advantages that make them suitable for different applications. Self-contained systems offer simplicity, low installation costs, and independent operation — ideal for small to medium buildings like offices, schools, and retail spaces. Central battery systems provide longer battery life, easier maintenance, and higher reliability — essential for large, complex, or critical infrastructure such as hospitals, airports, and shopping centres.
        </p>

        <div className="grid md:grid-cols-2 gap-4 mt-4">
          <div className="bg-elec-gray/80 border border-gray-600 rounded-lg p-4">
            <h4 className="text-elec-yellow font-semibold mb-3">Key Decision Factors</h4>
            <ul className="space-y-2 text-foreground text-sm">
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow mt-1">✓</span>
                <span>Building size and complexity</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow mt-1">✓</span>
                <span>Installation budget vs long-term costs</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow mt-1">✓</span>
                <span>Maintenance resource availability</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow mt-1">✓</span>
                <span>Criticality of operations</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow mt-1">✓</span>
                <span>Available space for battery rooms</span>
              </li>
            </ul>
          </div>

          <div className="bg-elec-gray/80 border border-gray-600 rounded-lg p-4">
            <h4 className="text-elec-yellow font-semibold mb-3">Compliance Requirements</h4>
            <ul className="space-y-2 text-foreground text-sm">
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow mt-1">✓</span>
                <span>BS 5266-1 design standards</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow mt-1">✓</span>
                <span>BS 5266-8 testing procedures</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow mt-1">✓</span>
                <span>Fire-resistant cabling for central systems</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow mt-1">✓</span>
                <span>Monthly and annual testing regime</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow mt-1">✓</span>
                <span>Proper maintenance records</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="bg-elec-yellow/20 border border-elec-yellow/40 rounded-lg p-4 mt-4">
          <p className="text-foreground font-medium text-center">
            Understanding both system types enables electricians to recommend solutions that balance regulatory compliance, client budgets, and operational requirements whilst ensuring reliable emergency illumination when it matters most.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
