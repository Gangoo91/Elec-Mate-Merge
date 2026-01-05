import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookmarkIcon, CheckCircle, AlertTriangle, Signpost } from 'lucide-react';

export const EmergencyLightingSummary2_5 = () => {
  const keyPoints = [
    "Emergency exit signs guide occupants to safety and must be visible from any point on escape routes",
    "All signs must comply with ISO 7010 using the running man symbol and appropriate directional arrows",
    "Signs must be illuminated at all times - either internally or by emergency lighting systems",
    "Maintained signs (always illuminated) are required in public buildings; non-maintained signs suitable for familiar workplaces",
    "Signs must be positioned at all final exits, direction changes, and decision points along escape routes",
    "Monthly functional testing and annual full-duration testing are mandatory for compliance",
    "Directional arrows must point towards actual exit routes - incorrect arrows are a common installation error",
    "Consistency is essential - avoid mixing different signage standards within the same building"
  ];

  return (
    <Card className="bg-elec-gray/50 border-elec-yellow/20">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <BookmarkIcon className="h-6 w-6 text-elec-yellow" />
          Section Summary: Emergency Exit Signs
        </CardTitle>
      </CardHeader>
      <CardContent className="text-foreground space-y-6">
        <p className="text-lg text-foreground leading-relaxed">
          Emergency exit signs are critical life safety components that provide clear guidance to building occupants during emergencies. 
          This section has covered the essential requirements, standards, and best practices for successful exit signage installation and maintenance.
        </p>

        <div className="space-y-3">
          <h3 className="text-xl font-semibold text-foreground">Key Takeaways</h3>
          <ul className="space-y-3">
            {keyPoints.map((point, index) => (
              <li key={index} className="flex items-start gap-3">
                <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                <span className="text-foreground">{point}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
            <h4 className="font-semibold text-blue-400 mb-3 flex items-center gap-2">
              <Signpost className="h-4 w-4" />
              Installation Essentials
            </h4>
            <ul className="space-y-2 text-foreground text-sm">
              <li>• ISO 7010 compliant running man symbols</li>
              <li>• Correct directional arrows pointing to exits</li>
              <li>• Appropriate height for smoke conditions</li>
              <li>• Reliable emergency power backup</li>
              <li>• Consistent signage throughout building</li>
            </ul>
          </div>

          <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
            <h4 className="font-semibold text-green-400 mb-3 flex items-center gap-2">
              <CheckCircle className="h-4 w-4" />
              Compliance Requirements
            </h4>
            <ul className="space-y-2 text-foreground text-sm">
              <li>• BS 5266-1 and ISO 7010 standards</li>
              <li>• Monthly functional testing</li>
              <li>• Annual full-duration testing</li>
              <li>• Legibility checks and documentation</li>
              <li>• Post-alteration reassessment</li>
            </ul>
          </div>
        </div>

        <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-red-400 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-semibold text-red-400 mb-2">Professional Responsibility</h4>
              <p className="text-foreground">
                Exit signage directly impacts evacuation success during emergencies. Poor or incorrect signage has contributed to injuries and fatalities in real incidents. Always verify directional accuracy, ensure reliable illumination, and maintain detailed test records.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
          <h4 className="font-semibold text-yellow-400 mb-2">Next Steps</h4>
          <p className="text-foreground">
            Complete the comprehensive quiz below to test your understanding of emergency exit signage requirements. This will help ensure you can confidently specify, install, and maintain compliant exit signage systems.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};