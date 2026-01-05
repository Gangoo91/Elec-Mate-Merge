import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2 } from 'lucide-react';

export const EmergencyLightingSummary4_4 = () => {
  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <CheckCircle2 className="h-5 w-5 text-elec-yellow" />
          Section Summary
        </CardTitle>
      </CardHeader>
      <CardContent className="text-foreground space-y-4">
        <p>
          Proper circuit segregation and fire integrity are fundamental to emergency lighting system reliability. Emergency circuits must be physically separated from normal electrical services and constructed using fire-resistant materials to ensure continued operation throughout evacuation.
        </p>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-blue-600/10 border border-blue-600/40 p-4 rounded-lg">
            <h4 className="font-semibold text-blue-300 mb-2">Critical Requirements</h4>
            <ul className="space-y-1 text-foreground text-sm">
              <li>✓ LSZH enhanced fire-resistant cables (Category F1)</li>
...
            </ul>
          </div>

          <div className="bg-red-600/10 border border-red-600/40 p-4 rounded-lg">
            <h4 className="font-semibold text-red-300 mb-2">Common Installation Mistakes</h4>
            <ul className="space-y-1 text-foreground text-sm">
              <li>✗ Sharing containment with general lighting</li>
              <li>✗ Using standard PVC cables instead of LSZH</li>
              <li>✗ Installing plastic cable clips or fixings</li>
              <li>✗ Inadequate or missing identification labels</li>
              <li>✗ Routing through high-risk areas without protection</li>
            </ul>
          </div>
        </div>

        <div className="bg-green-600/10 border border-green-600/40 p-4 rounded-lg">
          <h4 className="font-semibold text-green-300 mb-3">Regulatory Compliance Checklist</h4>
          <div className="space-y-2 text-foreground">
            <div className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
              <span><strong className="text-foreground">BS 7671 Regulation 521.10.202:</strong> Escape route circuits protected against premature collapse</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
              <span><strong className="text-foreground">BS 5266-1:</strong> Emergency lighting circuits maintain integrity for full emergency duration</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
              <span><strong className="text-foreground">BS EN 50200:</strong> Fire-resistant cables survive 842°C for 120 minutes</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
              <span><strong className="text-foreground">Building Regulations Approved Document B:</strong> Fire safety provisions for means of escape</span>
            </div>
          </div>
        </div>

        <div className="bg-yellow-600/20 border border-yellow-600/40 rounded-lg p-4">
          <h4 className="font-semibold text-yellow-300 mb-2">Installation Best Practice</h4>
          <p className="text-foreground mb-3">
            Plan segregation during the design phase – retrofitting is costly and disruptive. Use dedicated fire-rated shafts in multi-storey buildings, test insulation and continuity after installation, and provide comprehensive as-built documentation. Regular maintenance inspection must verify no unauthorised connections have been made to emergency circuits.
          </p>
          <p className="text-foreground">
            Remember: Emergency lighting circuit integrity is a life-safety issue. Never compromise on segregation, cable specification, or installation methods.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
