import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, AlertTriangle, TrendingUp, CheckCircle, XCircle, Clock } from 'lucide-react';

export const EmergencyLightingRealWorldSection3_1 = () => {
  return (
    <Card className="bg-slate-200/20 border-elec-yellow/20">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <MapPin className="h-6 w-6 text-elec-yellow" />
          Real-World Example: Birmingham College Emergency Lighting Upgrade
        </CardTitle>
      </CardHeader>
      <CardContent className="text-foreground space-y-8">
        <div className="bg-elec-dark/40 p-4 rounded-lg border border-gray-600">
          <h3 className="text-elec-yellow font-semibold mb-3 flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            The Challenge
          </h3>
          <p className="text-foreground mb-4">
            A college in Birmingham installed emergency lighting with 1-hour batteries throughout their campus. 
            During an evacuation drill, it became clear that full evacuation of the site could take over an hour 
            due to the number of students and complex building layout with multiple wings and levels.
          </p>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
              <h4 className="text-red-400 font-medium mb-2 flex items-center gap-2">
                <XCircle className="h-4 w-4" />
                Initial Problems
              </h4>
              <ul className="text-sm space-y-1">
                <li>• 1-hour battery duration insufficient</li>
                <li>• Complex multi-building evacuation routes</li>
                <li>• 2,500+ students and staff to evacuate</li>
                <li>• Some areas had barely adequate lux levels</li>
                <li>• Poor uniformity in older building sections</li>
              </ul>
            </div>
            
            <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-3">
              <h4 className="text-orange-400 font-medium mb-2 flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Evacuation Timeline
              </h4>
              <ul className="text-sm space-y-1">
                <li>• 0-15 mins: Initial alarm and mustering</li>
                <li>• 15-45 mins: Main evacuation flow</li>
                <li>• 45-75 mins: Final checks and disabled assistance</li>
                <li>• 75+ mins: Emergency services coordination</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-elec-dark/40 p-4 rounded-lg border border-gray-600">
          <h3 className="text-blue-400 font-semibold mb-3 flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            The Solution
          </h3>
          <p className="text-foreground mb-4">
            After consultation with the emergency services and risk assessment review, all luminaires were upgraded 
            to 3-hour units. Additionally, lux levels were increased in critical areas and uniformity was improved 
            through additional fittings.
          </p>

          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3">
              <h4 className="text-blue-400 font-medium mb-2">Duration Upgrade</h4>
              <ul className="text-sm space-y-1">
                <li>• All fittings upgraded to 3-hour</li>
                <li>• Li-ion batteries for faster recharge</li>
                <li>• Improved battery monitoring systems</li>
              </ul>
            </div>
            
            <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3">
              <h4 className="text-green-400 font-medium mb-2">Lux Enhancement</h4>
              <ul className="text-sm space-y-1">
                <li>• Escape routes: 1.5 lux minimum</li>
                <li>• Assembly areas: 1 lux minimum</li>
                <li>• Stairwells: 2 lux for safety</li>
              </ul>
            </div>
            
            <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-3">
              <h4 className="text-purple-400 font-medium mb-2">Additional Fittings</h4>
              <ul className="text-sm space-y-1">
                <li>• 45 additional luminaires installed</li>
                <li>• Improved uniformity ratios</li>
                <li>• Better coverage of problem areas</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-green-900/30 p-4 rounded-lg border border-green-600/30">
          <h3 className="text-green-400 font-semibold mb-3 flex items-center gap-2">
            <CheckCircle className="h-5 w-5" />
            Results and Benefits
          </h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-foreground font-medium mb-3">Performance Improvements</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>Full 3-hour operation confirmed during testing</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>Lux levels exceeded minimum requirements</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>Uniformity ratios improved to better than 20:1</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>Faster recharge times reduced maintenance</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-foreground font-medium mb-3">Stakeholder Benefits</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>Reassurance to students, staff, and parents</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>Compliance with all regulatory requirements</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>Improved insurance ratings and reduced premiums</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>Future-proofed for building expansion plans</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
          <h4 className="text-yellow-400 font-semibold mb-3">Key Lessons Learned</h4>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h5 className="text-foreground font-medium mb-2">Design Phase</h5>
              <ul className="text-sm space-y-1">
                <li>• Always consider worst-case evacuation scenarios</li>
                <li>• Consult with emergency services during planning</li>
                <li>• Factor in building complexity and occupant numbers</li>
                <li>• Plan for future building changes and expansion</li>
              </ul>
            </div>
            <div>
              <h5 className="text-foreground font-medium mb-2">Practical Application</h5>
              <ul className="text-sm space-y-1">
                <li>• Test evacuation procedures with lighting systems</li>
                <li>• Document all calculations and assumptions</li>
                <li>• Consider using 3-hour fittings as standard</li>
                <li>• Regular testing ensures continued compliance</li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};