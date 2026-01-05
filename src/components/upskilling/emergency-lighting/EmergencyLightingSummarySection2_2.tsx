import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, BookOpen, Key } from 'lucide-react';

export const EmergencyLightingSummarySection2_2 = () => {
  const keyPoints = [
    "Anti-panic lighting required in open areas exceeding 60m² to prevent panic and confusion",
    "Minimum 0.5 lux illumination must be maintained across the entire open area",
    "Maximum uniformity ratio of 40:1 between brightest and darkest points",
    "Maximum luminaire spacing of 4 x mounting height with proper overlap",
    "Must enable occupants to identify and move towards escape routes safely",
    "Can be integrated with normal lighting using maintained emergency systems",
    "Calculation grid approach (2m x 2m) used for verification of coverage",
    "Coordination with escape lighting ensures comprehensive emergency provision"
  ];

  const applications = [
    "Retail floors > 60m²",
    "Assembly areas and halls", 
    "Industrial warehouses",
    "Exhibition spaces",
    "Sports facilities",
    "Conference centres"
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
          <h3 className="text-foreground font-semibold mb-3">Typical Applications</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {applications.map((app, index) => (
              <Badge key={index} variant="outline" className="border-elec-yellow/50 text-elec-yellow justify-center p-2">
                {app}
              </Badge>
            ))}
          </div>
        </div>

        <div className="bg-elec-yellow/10 border border-elec-yellow/30 rounded-lg p-4">
          <p className="text-elec-yellow font-medium mb-2">Next Steps:</p>
          <p className="text-gray-300 text-sm">
            Continue to Section 3 to explore High-Risk Task Area Lighting requirements 
            and specialized emergency lighting applications.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};