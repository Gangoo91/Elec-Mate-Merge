import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen } from 'lucide-react';

export const EmergencyLightingIntroSection4_4 = () => {
  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-elec-yellow" />
          Introduction
        </CardTitle>
      </CardHeader>
      <CardContent className="text-foreground space-y-4">
        <p>
          Emergency lighting circuits cannot be treated the same as normal lighting or power circuits. In a fire, they must remain operational long enough to allow safe evacuation, even if other electrical systems fail. This means emergency circuits must be physically segregated from non-essential services and built using fire-resistant methods to ensure circuit integrity.
        </p>
        
        <p>
          Electricians must understand how to route cables, apply protective measures, and comply with both BS 5266-1 and BS 7671 requirements to guarantee performance under fire conditions. The consequences of poor segregation or inadequate fire protection can be catastrophic – emergency lighting that fails during evacuation puts lives at immediate risk.
        </p>

        <div className="bg-red-600/20 border border-red-600/40 rounded-lg p-4">
          <p className="text-red-100 font-medium">
            <strong>Critical Safety Requirement:</strong> Emergency lighting circuits must maintain integrity throughout the entire emergency duration, even when subjected to fire, water spray, and mechanical shock. This requires dedicated installation methods that go beyond standard electrical practice.
          </p>
        </div>

        <p>
          This section explores the practical requirements for circuit segregation, fire-resistant cable selection, BS 7671 compliance, and installation methods that protect circuit integrity under the most demanding conditions. Understanding these principles is essential for every electrician working with emergency lighting systems.
        </p>
      </CardContent>
    </Card>
  );
};
