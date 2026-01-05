import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Building, Lightbulb, CheckCircle, AlertTriangle } from 'lucide-react';

export const SmartHomeModule3Section5RealWorld = () => {
  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <MapPin className="h-6 w-6 text-elec-yellow" />
          Real-World Scenario
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="bg-elec-gray p-4 rounded-lg border border-gray-600">
          <h3 className="text-foreground font-semibold mb-3 flex items-center gap-2">
            <Building className="h-5 w-5 text-blue-400" />
            Smart Office Implementation
          </h3>
          <p className="text-gray-300 mb-4">
            An office building installs smart lighting grouped into zones (meeting rooms, corridors, open-plan area). 
            Motion sensors control corridor lights for energy savings, while meeting room lights link with the 
            booking system — lights automatically switch on when a room is reserved and switch off when meetings end.
          </p>
          <p className="text-gray-300">
            The open-plan area uses adaptive lighting that adjusts throughout the day based on natural light levels 
            and occupancy, whilst maintaining manual override controls at each workstation.
          </p>
        </div>

        <div className="bg-blue-900/20 border border-blue-600/50 p-4 rounded-lg">
          <h3 className="text-blue-300 font-semibold mb-3">💭 Think About It</h3>
          <p className="text-blue-200 text-sm">
            What are the benefits of this setup? What issues might arise, and how could they be prevented?
          </p>
        </div>

        <div className="space-y-4">
          <div className="bg-green-900/20 border border-green-600/50 p-4 rounded-lg">
            <h4 className="text-green-300 font-semibold mb-2 flex items-center gap-2">
              <CheckCircle className="h-4 w-4" />
              System Benefits
            </h4>
            <ul className="text-green-200 text-sm space-y-1">
              <li>• Energy savings: corridors only lit when in use</li>
              <li>• Convenience: meeting rooms ready when booked</li>
              <li>• Productivity: optimal lighting throughout the day</li>
              <li>• Professional image: automated, responsive environment</li>
              <li>• Cost reduction: significant energy bill savings</li>
              <li>• Future-ready: foundation for additional smart features</li>
            </ul>
          </div>

          <div className="bg-red-900/20 border border-red-600/50 p-4 rounded-lg">
            <h4 className="text-red-300 font-semibold mb-2 flex items-center gap-2">
              <AlertTriangle className="h-4 w-4" />
              Potential Issues
            </h4>
            <ul className="text-red-200 text-sm space-y-1">
              <li>• Corridor sensors triggering from air conditioning movement</li>
              <li>• Meeting room lights not responding if booking system fails</li>
              <li>• Open-plan adaptive lighting conflicting with personal preferences</li>
              <li>• Network connectivity issues causing delayed responses</li>
              <li>• Staff unfamiliarity with override procedures</li>
              <li>• Cleaning staff working outside normal hours without lighting</li>
            </ul>
          </div>

          <div className="bg-amber-900/20 border border-amber-600/50 p-4 rounded-lg">
            <h4 className="text-amber-300 font-semibold mb-2 flex items-center gap-2">
              <Lightbulb className="h-4 w-4" />
              Prevention & Solutions
            </h4>
            <p className="text-amber-200 text-sm mb-2">
              How to prevent and address these issues:
            </p>
            <ul className="text-amber-200 text-sm space-y-1">
              <li>• Carefully position motion sensors away from air vents</li>
              <li>• Provide manual override switches in all meeting rooms</li>
              <li>• Allow individual workstation lighting adjustments</li>
              <li>• Install backup local controllers for critical areas</li>
              <li>• Train facilities staff on system operation</li>
              <li>• Create after-hours mode for cleaning and security</li>
              <li>• Regular maintenance schedule for sensors and connectivity</li>
            </ul>
          </div>
        </div>

        <div className="bg-elec-gray p-4 rounded-lg border border-gray-600">
          <h4 className="text-foreground font-semibold mb-2">Key Lessons</h4>
          <p className="text-gray-300 text-sm">
            This scenario demonstrates how thoughtful integration of grouping, linking, and motion logic can create 
            significant value. Success depends on careful planning, quality implementation, comprehensive testing, 
            and ongoing support to address edge cases and user needs.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};