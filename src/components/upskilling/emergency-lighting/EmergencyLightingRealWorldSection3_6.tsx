import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Building2, AlertCircle, Lightbulb } from 'lucide-react';

export const EmergencyLightingRealWorldSection3_6 = () => {
  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Building2 className="h-5 w-5 text-elec-yellow" />
          Real-World Example
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        
        {/* Case Study */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground">Case Study: Birmingham Factory Design</h3>
          <p className="text-foreground leading-relaxed">
            An engineering firm in Birmingham designed a new factory using DIALux. The software showed that the escape routes achieved 1 lux minimum throughout the building. The design looked professional, with detailed lux contour maps and comprehensive reports showing full compliance with BS 5266-1.
          </p>
        </div>

        {/* The Problem */}
        <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-red-400 mt-1 flex-shrink-0" />
            <div>
              <h4 className="text-red-300 font-semibold mb-2">The Problem Discovered</h4>
              <p className="text-foreground text-sm leading-relaxed">
                However, during commissioning, on-site lux testing found shadows caused by tall racking that the software model did not include. The escape route lighting dropped to 0.3 lux in several critical areas, well below the 1 lux minimum requirement.
              </p>
            </div>
          </div>
        </div>

        {/* The Solution */}
        <div className="space-y-3">
          <h4 className="text-foreground font-semibold">The Resolution</h4>
          <ul className="space-y-2 text-foreground text-sm">
            <li className="flex items-start gap-2">
              <span className="text-elec-yellow font-bold">•</span>
              <span>Additional fittings were installed between racking to eliminate shadows</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-elec-yellow font-bold">•</span>
              <span>The software model was updated to include accurate rack positioning</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-elec-yellow font-bold">•</span>
              <span>Final lux testing confirmed compliance across all escape routes</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-elec-yellow font-bold">•</span>
              <span>Project completion was delayed by 2 weeks and additional costs incurred</span>
            </li>
          </ul>
        </div>

        {/* Financial Impact */}
        <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-4">
          <h4 className="text-orange-300 font-semibold mb-2">Financial and Operational Impact</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-foreground">
            <div>
              <p className="font-medium mb-1">Additional Costs:</p>
              <ul className="space-y-1">
                <li>• Extra luminaires: £2,400</li>
                <li>• Additional labour: £1,800</li>
                <li>• Delayed occupancy: £8,000</li>
              </ul>
            </div>
            <div>
              <p className="font-medium mb-1">Lessons Learned:</p>
              <ul className="space-y-1">
                <li>• Include all obstructions in 3D models</li>
                <li>• Add safety margins to calculations</li>
                <li>• Plan for verification testing</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Key Learning Points */}
        <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <Lightbulb className="h-5 w-5 text-green-400 mt-1 flex-shrink-0" />
            <div>
              <h4 className="text-green-300 font-semibold mb-2">Key Learning Points</h4>
              <p className="text-foreground text-sm leading-relaxed">
                This case reinforced the need to combine software modelling with real-world verification. Software is an excellent design tool, but it cannot replace the engineer's understanding of how buildings will be used and how obstructions will affect lighting performance.
              </p>
            </div>
          </div>
        </div>

        {/* Best Practice */}
        <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
          <h4 className="text-blue-300 font-semibold mb-2">Best Practice Recommendations</h4>
          <ul className="space-y-2 text-foreground text-sm">
            <li className="flex items-start gap-2">
              <span className="text-blue-400">1.</span>
              <span>Always visit the site before starting software design work</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-400">2.</span>
              <span>Include all known equipment, furniture, and storage in your 3D model</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-400">3.</span>
              <span>Apply a 20% safety margin to critical escape route areas</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-400">4.</span>
              <span>Schedule verification testing as part of the project timeline</span>
            </li>
          </ul>
        </div>

      </CardContent>
    </Card>
  );
};