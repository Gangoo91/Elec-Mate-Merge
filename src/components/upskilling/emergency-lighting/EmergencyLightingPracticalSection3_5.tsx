import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Wrench, CheckCircle } from 'lucide-react';

export const EmergencyLightingPracticalSection3_5 = () => {
  const practicalPoints = [
    "Always mark final exit routes in bold with directional arrows to make escape paths unambiguous",
    "Use consistent drawing scales (1:100 for general layouts, 1:50 for detailed areas) and clearly indicate scale on all drawings",
    "Organise drawings using separate layers for different systems (power, lighting, emergency lighting) to improve readability and coordination",
    "Update as-built drawings immediately after any installation changes - missing documentation is the leading cause of compliance failures",
    "Ensure all software files are provided in accessible formats (PDF for viewing, DWG/IFC for future modifications)",
    "Include comprehensive legends with all symbols, abbreviations, and technical notes used on the drawing",
    "Mark all testing points clearly and ensure they are accessible for ongoing maintenance procedures",
    "Coordinate with other building services to avoid conflicts and ensure integration with fire alarm systems",
    "Use standardised templates and symbol libraries to maintain consistency across projects and team members",
    "Implement quality checking procedures with peer reviews before final issue to prevent costly errors"
  ];

  return (
    <Card className="bg-slate-200/20 border-slate-600">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Wrench className="h-5 w-5 text-elec-yellow" />
          Practical Guidance
        </CardTitle>
      </CardHeader>
      <CardContent className="text-foreground">
        <ul className="space-y-3">
          {practicalPoints.map((point, index) => (
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