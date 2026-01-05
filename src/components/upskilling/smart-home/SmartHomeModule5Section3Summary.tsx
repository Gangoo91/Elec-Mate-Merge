import { Target, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const SmartHomeModule5Section3Summary = () => {
  return (
    <Card className="bg-elec-gray border-transparent">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Target className="h-6 w-6 text-elec-yellow" />
          Section Summary
        </CardTitle>
      </CardHeader>
      <CardContent className="text-foreground space-y-6">
        <p className="text-base leading-relaxed">
          This section explored door/window contact sensors and PIR motion detectors as essential 
          components of smart home security systems, demonstrating how these technologies create 
          effective layered detection for comprehensive perimeter and interior monitoring.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-elec-dark p-4 rounded-lg">
            <h4 className="text-foreground font-semibold mb-3 flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              Key Technologies Covered
            </h4>
            <ul className="text-sm space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow mt-1">•</span>
                <span>Contact sensors: magnetic switch operation and immediate entry detection</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow mt-1">•</span>
                <span>PIR sensors: passive infrared technology for motion detection</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow mt-1">•</span>
                <span>Layered security: perimeter and interior detection strategies</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow mt-1">•</span>
                <span>Smart integration: automation triggers and system coordination</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow mt-1">•</span>
                <span>Installation best practices: placement, alignment, and environmental considerations</span>
              </li>
            </ul>
          </div>
          
          <div className="bg-elec-dark p-4 rounded-lg">
            <h4 className="text-foreground font-semibold mb-3 flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-blue-500" />
              Practical Applications
            </h4>
            <ul className="text-sm space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow mt-1">•</span>
                <span>Perimeter security with immediate entry point detection</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow mt-1">•</span>
                <span>Interior monitoring for comprehensive coverage</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow mt-1">•</span>
                <span>Automation integration for lighting and CCTV systems</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow mt-1">•</span>
                <span>Energy management through occupancy detection</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow mt-1">•</span>
                <span>Professional monitoring system integration</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="bg-blue-600/10 p-4 rounded-lg border border-blue-600/30">
          <h4 className="text-blue-400 font-semibold mb-3">Key Installation Considerations</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-foreground font-semibold text-sm mb-2">Contact Sensors:</p>
              <ul className="text-xs space-y-1">
                <li>• Maximum 15mm gap alignment for reliable operation</li>
                <li>• Secure mounting to prevent tampering</li>
                <li>• Coverage of all accessible entry points</li>
                <li>• Weather protection for external installations</li>
              </ul>
            </div>
            <div>
              <p className="text-foreground font-semibold text-sm mb-2">PIR Sensors:</p>
              <ul className="text-xs space-y-1">
                <li>• 2.4-3m mounting height for optimal coverage</li>
                <li>• Avoid direct heat sources and sunlight</li>
                <li>• Corner positioning for maximum room coverage</li>
                <li>• Pet-immune settings to reduce false alarms</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="bg-green-600/10 p-4 rounded-lg border border-green-600/30">
          <h4 className="text-green-400 font-semibold mb-2">Next Steps in Your Smart Home Security Journey</h4>
          <p className="text-sm text-foreground mb-3">
            Having mastered contact sensors and PIR technology, you're ready to explore advanced 
            security integration, including CCTV systems, smart locks, and comprehensive monitoring platforms.
          </p>
          <p className="text-sm text-foreground">
            Continue to the next section to learn about complete security ecosystem design 
            and professional-grade integration strategies for maximum protection.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};