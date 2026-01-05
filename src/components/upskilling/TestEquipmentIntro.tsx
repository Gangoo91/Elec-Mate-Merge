import { Eye } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const TestEquipmentIntro = () => {
  return (
    <Card className="bg-elec-gray border-transparent">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-foreground">
          <Eye className="h-5 w-5 text-elec-yellow" />
          Test Equipment Setup & Safety
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 text-foreground">
          <p>
            This section covers how to safely set up your tester for live testing and protect yourself during high-energy fault tests. Proper equipment setup and safety procedures are essential when working with live circuits.
          </p>
          <div className="bg-elec-dark p-4 rounded-md border-l-4 border-elec-yellow">
            <p className="text-elec-yellow font-semibold">Safety Critical:</p>
            <p>Always follow GS38 standards and use appropriate PPE when conducting live testing.</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};