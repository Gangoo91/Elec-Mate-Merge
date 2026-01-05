import { Building2, AlertTriangle, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const EmergencyLightingRealWorld = () => {
  return (
    <Card className="bg-accent-green/15 border-accent-green/40 border">
      <CardHeader>
        <CardTitle className="text-accent-green flex items-center gap-2">
          <Building2 className="h-5 w-5" />
          Real-World Example: Office Building Compliance
        </CardTitle>
      </CardHeader>
      <CardContent className="text-gray-200 space-y-4">
        <div className="p-4 bg-elec-gray rounded-md">
          <h4 className="text-foreground font-semibold mb-2">Scenario</h4>
          <p className="text-gray-300 text-sm">
            A 3-storey office building (750m² per floor) undergoes refurbishment. The building owner must ensure compliance with current emergency lighting requirements.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <h5 className="text-foreground font-medium mb-2 flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-amber-400" />
              Legal Requirements
            </h5>
            <ul className="list-disc pl-4 space-y-1 text-sm">
              <li>RRO compliance as responsible person</li>
              <li>Building Regulations for material change</li>
              <li>Fire risk assessment update required</li>
              <li>BS 5266-1 design standards</li>
            </ul>
          </div>
          
          <div>
            <h5 className="text-foreground font-medium mb-2 flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-400" />
              Implementation Steps
            </h5>
            <ul className="list-disc pl-4 space-y-1 text-sm">
              <li>Conduct updated fire risk assessment</li>
              <li>Design system to BS 5266-1</li>
              <li>Install appropriate emergency lighting</li>
              <li>Commission and test system</li>
              <li>Implement maintenance programme</li>
            </ul>
          </div>
        </div>

        <div className="p-3 bg-blue-600/10 border border-blue-600/30 rounded-md">
          <p className="text-blue-400 font-medium text-sm">
            Key Learning: The building owner is legally required to ensure emergency lighting compliance, with potential criminal liability for failures that result in harm.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};