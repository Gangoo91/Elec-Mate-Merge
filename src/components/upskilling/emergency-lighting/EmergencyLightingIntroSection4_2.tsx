import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Info } from 'lucide-react';

export const EmergencyLightingIntroSection4_2 = () => {
  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Info className="h-5 w-5 text-elec-yellow" />
          Introduction
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-foreground leading-relaxed">
          Emergency lighting requires a reliable backup power source when the mains supply fails. There are two primary system types: self-contained (single-point) systems, where each luminaire has its own battery, and central battery systems, where a single battery bank supplies multiple fittings. Both systems meet regulatory standards, but each has strengths and limitations that affect cost, maintenance, and reliability.
        </p>
        <p className="text-foreground leading-relaxed">
          Electricians must be able to evaluate these systems and recommend the best solution based on building size, use, and risk profile. The choice between self-contained and central battery systems can significantly impact installation costs, ongoing maintenance requirements, and system reliability over the building's lifetime.
        </p>
        <div className="bg-elec-yellow/10 border border-elec-yellow/20 rounded-lg p-4">
          <p className="text-elec-yellow font-medium mb-2">Why This Matters</p>
          <p className="text-foreground text-sm leading-relaxed">
            Selecting the appropriate emergency lighting power system directly affects installation costs, maintenance workload, and long-term reliability. Understanding both options enables electricians to recommend solutions that balance client budgets with regulatory compliance and operational efficiency.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
