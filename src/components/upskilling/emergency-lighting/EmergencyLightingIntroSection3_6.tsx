import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calculator } from 'lucide-react';

export const EmergencyLightingIntroSection3_6 = () => {
  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Calculator className="h-5 w-5 text-elec-yellow" />
          Introduction
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-foreground leading-relaxed">
          Designing emergency lighting by hand is no longer practical for most modern projects. With varying ceiling heights, complex layouts, and strict lux level requirements, electricians increasingly rely on software and calculation tools to model lighting performance accurately.
        </p>
        <p className="text-foreground leading-relaxed">
          These tools allow designers to simulate light distribution, confirm compliance with BS 5266-1, and generate detailed reports to support audits. For electricians, becoming confident with these tools is not just about efficiency — it is about professionalism, accuracy, and future-proofing their skill set.
        </p>
        <div className="bg-elec-yellow/10 border border-elec-yellow/20 rounded-lg p-4 mt-6">
          <p className="text-foreground font-medium mb-2">Why Software Matters:</p>
          <ul className="text-foreground space-y-1 text-sm">
            <li>• Accurate lux level predictions across complex layouts</li>
            <li>• Professional documentation for compliance audits</li>
            <li>• Time savings in design and specification</li>
            <li>• Reduced risk of installation errors and rework</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};