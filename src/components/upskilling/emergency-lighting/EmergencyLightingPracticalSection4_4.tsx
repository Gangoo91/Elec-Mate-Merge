import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Wrench } from 'lucide-react';

export const EmergencyLightingPracticalSection4_4 = () => {
  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Wrench className="h-5 w-5 text-elec-yellow" />
          Practical Guidance
        </CardTitle>
      </CardHeader>
      <CardContent className="text-foreground space-y-4">
        <p>
          Proper planning and installation methods are essential to ensure emergency lighting circuits maintain integrity under fire conditions. Follow these practical guidelines:
        </p>

        <div className="grid gap-4">
          <div className="bg-blue-600/10 border-l-4 border-blue-600 p-4 rounded-r">
            <h4 className="font-semibold text-blue-300 mb-2">Plan Routes During Design Phase</h4>
            <p className="text-foreground mb-2">
              Retrofitting segregation is costly and disruptive. During initial design:
            </p>
            <ul className="list-disc list-inside space-y-1 text-foreground">
              <li>Identify dedicated routes for emergency lighting circuits</li>
              <li>Avoid areas with high fire risk or mechanical damage potential</li>
              <li>Plan for future maintenance access without affecting other services</li>
              <li>Coordinate with other building services to prevent conflicts</li>
            </ul>
          </div>

          <div className="bg-green-600/10 border-l-4 border-green-600 p-4 rounded-r">
            <h4 className="font-semibold text-green-300 mb-2">Multi-Storey Building Considerations</h4>
            <p className="text-foreground mb-2">
              In multi-storey buildings, run emergency circuits in protected shafts or risers:
            </p>
            <ul className="list-disc list-inside space-y-1 text-foreground">
              <li>Use dedicated fire-rated shafts for vertical distribution</li>
              <li>Provide adequate fire stopping at floor penetrations</li>
              <li>Install horizontal distribution from shaft to luminaires using fire-resistant methods</li>
              <li>Label all circuits at each floor level for identification</li>
            </ul>
          </div>

          <div className="bg-purple-600/10 border-l-4 border-purple-600 p-4 rounded-r">
            <h4 className="font-semibold text-purple-300 mb-2">Testing and Verification</h4>
            <p className="text-foreground mb-2">
              After installation, conduct comprehensive testing:
            </p>
            <ul className="list-disc list-inside space-y-1 text-foreground">
              <li>Test insulation resistance to confirm cable integrity (minimum 1 MΩ)</li>
              <li>Verify continuity of all protective conductors</li>
              <li>Check segregation is maintained throughout the installation</li>
              <li>Confirm all identification labels are in place and legible</li>
            </ul>
          </div>

          <div className="bg-yellow-600/10 border-l-4 border-yellow-600 p-4 rounded-r">
            <h4 className="font-semibold text-yellow-300 mb-2">As-Built Documentation</h4>
            <p className="text-foreground mb-2">
              Provide clear as-built drawings marking all emergency circuit routes:
            </p>
            <ul className="list-disc list-inside space-y-1 text-foreground">
              <li>Show all cable routes with containment types</li>
              <li>Mark distribution board locations and circuit numbers</li>
              <li>Identify fire-rated shaft locations and floor penetrations</li>
              <li>Document cable specifications and fire performance ratings</li>
            </ul>
          </div>

          <div className="bg-red-600/10 border-l-4 border-red-600 p-4 rounded-r">
            <h4 className="font-semibold text-red-300 mb-2">Ongoing Maintenance Verification</h4>
            <p className="text-foreground mb-2">
              During inspection, verify that no unauthorised connections have been made:
            </p>
            <ul className="list-disc list-inside space-y-1 text-foreground">
              <li>Check containment remains dedicated to emergency circuits only</li>
              <li>Verify no additional cables have been added to emergency routes</li>
              <li>Confirm all identification labels remain in place</li>
              <li>Test circuit integrity annually as part of routine maintenance</li>
            </ul>
          </div>
        </div>

        <div className="bg-orange-600/20 border border-orange-600/40 rounded-lg p-4">
          <h4 className="font-semibold text-orange-300 mb-2">Installation Best Practice Checklist</h4>
          <div className="space-y-2 text-foreground">
            <div className="flex items-start gap-2">
              <span className="text-green-400">✓</span>
              <span>Use LSZH enhanced fire-resistant cables (Category F1) throughout</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-green-400">✓</span>
              <span>Install metal fixings only – no plastic cable clips or ties</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-green-400">✓</span>
              <span>Maintain minimum 300mm separation if sharing cable trays</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-green-400">✓</span>
              <span>Label circuits every 3 metres and at all access points</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-green-400">✓</span>
              <span>Provide dedicated distribution boards or clearly marked sections</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-green-400">✓</span>
              <span>Test insulation resistance and continuity after installation</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-green-400">✓</span>
              <span>Provide comprehensive as-built documentation</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
