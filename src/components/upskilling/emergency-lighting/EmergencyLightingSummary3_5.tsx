import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, CheckCircle } from 'lucide-react';

export const EmergencyLightingSummary3_5 = () => {
  const keyPoints = [
    "Layout drawings bridge the gap between design intent and installation, providing essential visual documentation for compliance, maintenance, and emergency response",
    "Compliant drawings must include comprehensive information: escape routes, luminaire types/positions, mounting heights, circuit references, testing points, and control systems",
    "Standardised symbols from BS 5266-1 and BS EN ISO 7010 must be used consistently, with complete legends and the running man pictogram for all exit signage",
    "As-built drawings must accurately reflect final installations and be maintained throughout the building's operational life as permanent fire safety documentation",
    "Professional CAD software and BIM integration provide precision, coordination, and data management capabilities essential for modern construction projects",
    "Legal responsibilities under Building Regulations and fire safety legislation require proper handover procedures and ongoing document maintenance",
    "Common errors include missing escape route markings, inconsistent symbols, and inadequate revision control - quality assurance procedures prevent costly compliance failures",
    "Regular drawing reviews, updates, and integration with testing procedures ensure ongoing compliance and reduce operational risks and liability"
  ];

  return (
    <Card className="bg-slate-200/20 border-slate-600">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-elec-yellow" />
          Summary
        </CardTitle>
      </CardHeader>
      <CardContent className="text-foreground">
        <p className="mb-4">Key points from this section:</p>
        <ul className="space-y-3">
          {keyPoints.map((point, index) => (
            <li key={index} className="flex items-start gap-3">
              <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};