import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, BookOpen, Key } from 'lucide-react';

export const EmergencyLightingSummarySection2_1 = () => {
  const keyPoints = [
    "Emergency escape lighting must provide minimum 1 lux illumination on escape routes",
    "Maximum uniformity ratio of 40:1 between brightest and darkest areas",
    "Luminaires required at exits, direction changes, intersections, and level changes", 
    "Maximum spacing of 2 x mounting height in corridors, 4 x mounting height in open areas",
    "Minimum 1-hour duration for most premises, 3 hours for healthcare and similar",
    "Response time must be within 5 seconds of mains power failure",
    "Regular testing: monthly functional tests and annual duration tests required",
    "Integration with fire alarm systems ensures automatic activation during emergencies"
  ];

  const regulations = [
    "BS 5266-1: Code of practice for emergency lighting of premises",
    "BS EN 1838: Lighting applications - Emergency lighting",
    "Building Regulations Approved Document B (Fire Safety)",
    "BS 5499: Fire safety signs, notices and graphic symbols"
  ];

  return (
    <Card className="bg-gradient-to-br from-elec-gray/50 to-elec-gray/30 border-elec-yellow/30">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-elec-yellow" />
          Section Summary
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="text-foreground font-semibold mb-3 flex items-center gap-2">
            <Key className="h-4 w-4 text-elec-yellow" />
            Key Learning Points
          </h3>
          <div className="space-y-2">
            {keyPoints.map((point, index) => (
              <div key={index} className="flex items-start gap-3">
                <CheckCircle2 className="h-4 w-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                <span className="text-gray-300 text-sm">{point}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-gray-600 pt-4">
          <h3 className="text-foreground font-semibold mb-3">Relevant Standards & Regulations</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {regulations.map((reg, index) => (
              <Badge key={index} variant="outline" className="border-elec-yellow/50 text-elec-yellow justify-start p-2">
                {reg}
              </Badge>
            ))}
          </div>
        </div>

        <div className="bg-elec-yellow/10 border border-elec-yellow/30 rounded-lg p-4">
          <p className="text-elec-yellow font-medium mb-2">Next Steps:</p>
          <p className="text-gray-300 text-sm">
            Continue to Section 2 to learn about Open Area (Anti-Panic) Lighting requirements 
            and how they complement escape route lighting systems.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};