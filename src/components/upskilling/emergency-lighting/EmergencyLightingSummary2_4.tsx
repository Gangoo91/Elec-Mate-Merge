import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookmarkIcon, CheckCircle, AlertTriangle, Route } from 'lucide-react';

export const EmergencyLightingSummary2_4 = () => {
  const keyPoints = [
    "Escape route lighting ensures safe evacuation by illuminating designated exit paths during mains failure",
    "BS 5266 requires minimum 1 lux along centre line of escape routes with 0.5 lux minimum anywhere",
    "Luminaires must be positioned at exits, direction changes, intersections, and fire equipment locations",
    "All escape routes including corridors, staircases, and exit doors must have adequate illumination",
    "Monthly functional testing and annual full-duration testing are mandatory for compliance",
    "Exit signs must be illuminated and maintained type in public buildings for continuous visibility",
    "Proper documentation including test records and maintenance logs is essential for regulatory compliance"
  ];

  return (
    <Card className="bg-elec-gray/50 border-elec-yellow/20">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <BookmarkIcon className="h-6 w-6 text-elec-yellow" />
          Section Summary: Escape Route Lighting
        </CardTitle>
      </CardHeader>
      <CardContent className="text-foreground space-y-6">
        <p className="text-lg text-foreground leading-relaxed">
          Escape route lighting is a critical life safety system that ensures safe evacuation during emergencies. 
          This section has covered the essential requirements, design principles, and compliance standards needed 
          for effective escape route lighting installations.
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
              <Route className="h-4 w-4" />
              Design Essentials
            </h4>
            <ul className="space-y-2 text-foreground text-sm">
              <li>• 1 lux minimum on escape route centre line</li>
              <li>• Luminaires at all direction changes</li>
              <li>• Enhanced lighting at fire equipment</li>
              <li>• Continuous illumination without dark zones</li>
              <li>• Integration with exit signage systems</li>
            </ul>
          </div>

          <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
            <h4 className="font-semibold text-green-400 mb-3 flex items-center gap-2">
              <CheckCircle className="h-4 w-4" />
              Compliance Requirements
            </h4>
            <ul className="space-y-2 text-foreground text-sm">
              <li>• BS 5266-1 standard compliance</li>
              <li>• Monthly functional testing</li>
              <li>• Annual full-duration testing</li>
              <li>• Comprehensive documentation</li>
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
                As an electrician, your escape route lighting installations directly impact life safety. 
                Always prioritise compliance with BS 5266, conduct thorough site assessments, and maintain 
                detailed records. Lives depend on the quality and reliability of your work.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
          <h4 className="font-semibold text-yellow-400 mb-2">Next Steps</h4>
          <p className="text-foreground">
            Test your understanding of escape route lighting principles with the comprehensive quiz below. 
            This will help reinforce the key concepts and ensure you're ready to design, install, and maintain 
            compliant escape route lighting systems.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};