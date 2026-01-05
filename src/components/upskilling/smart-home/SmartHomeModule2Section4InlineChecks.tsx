import { CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const SmartHomeModule2Section4InlineChecks = () => {
  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <CheckCircle className="h-5 w-5 text-elec-yellow" />
          In-line Checks
        </CardTitle>
      </CardHeader>
      <CardContent className="text-foreground space-y-3">
        <div className="space-y-3">
          <p className="font-semibold text-foreground">Q1: What is wireless interference?</p>
          <p className="font-semibold text-foreground">Q2: Which frequency band is most crowded in homes?</p>
          <p className="font-semibold text-foreground">Q3: Why is Zigbee prone to interference with Wi-Fi?</p>
          <p className="font-semibold text-foreground">Q4: Name one way to reduce wireless interference.</p>
        </div>
      </CardContent>
    </Card>
  );
};