import { Wrench, AlertTriangle, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const EmergencyLightingPracticalSection3_4 = () => {
  return (
    <Card className="bg-gradient-to-br from-green-600/20 to-green-800/10 border border-green-500/40 shadow-lg">
      <CardHeader>
        <CardTitle className="text-green-300 flex items-center gap-2">
          <Wrench className="h-5 w-5 text-green-400 drop-shadow-md" />
          Practical Guidance
        </CardTitle>
      </CardHeader>
      <CardContent className="text-foreground space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-4">
            <div className="p-4 bg-gradient-to-br from-blue-600/20 to-blue-800/10 border border-blue-500/40 rounded-lg">
              <h4 className="text-blue-300 font-semibold mb-2 flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-blue-400" />
                Pre-Design Assessment
              </h4>
              <ul className="text-foreground text-sm space-y-1">
                <li>• Always review the fire risk assessment before finalising lighting design</li>
                <li>• Walk through the building during design phase to identify unique challenges</li>
                <li>• Interview building managers about specific occupant needs and procedures</li>
                <li>• Check for any Personal Emergency Evacuation Plans (PEEPs) in place</li>
              </ul>
            </div>
            
            <div className="p-4 bg-gradient-to-br from-purple-600/20 to-purple-800/10 border border-purple-500/40 rounded-lg">
              <h4 className="text-purple-300 font-semibold mb-2 flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-purple-400" />
                Stakeholder Engagement
              </h4>
              <ul className="text-foreground text-sm space-y-1">
                <li>• Liaise with building managers to understand occupant needs (e.g. mobility impairments)</li>
                <li>• Consult with care staff in healthcare settings</li>
                <li>• Engage with security teams for sensitive areas</li>
                <li>• Consider maintenance staff requirements for ongoing service</li>
              </ul>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="p-4 bg-gradient-to-br from-teal-600/20 to-teal-800/10 border border-teal-500/40 rounded-lg">
              <h4 className="text-teal-300 font-semibold mb-2 flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-teal-400" />
                Design Philosophy
              </h4>
              <ul className="text-foreground text-sm space-y-1">
                <li>• Avoid "designing to the bare minimum" — add safety margins where risks justify them</li>
                <li>• Consider worst-case scenarios (power outage during peak occupancy)</li>
                <li>• Plan for future changes in building use or occupant profile</li>
                <li>• Balance enhanced safety with cost-effectiveness</li>
              </ul>
            </div>
            
            <div className="p-4 bg-gradient-to-br from-orange-600/20 to-orange-800/10 border border-orange-500/40 rounded-lg">
              <h4 className="text-orange-300 font-semibold mb-2 flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-orange-400" />
                Documentation Requirements
              </h4>
              <ul className="text-foreground text-sm space-y-1">
                <li>• Document all risk-based adjustments in design drawings and handover notes</li>
                <li>• Reference specific FRA findings that influenced design decisions</li>
                <li>• Provide clear justification for exceeding minimum standards</li>
                <li>• Include maintenance schedules appropriate for the building's risk profile</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="bg-amber-600/20 border border-amber-500/40 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="h-4 w-4 text-amber-400" />
            <span className="text-amber-300 font-semibold">Golden Rule</span>
          </div>
          <p className="text-foreground text-sm">
            Remember: the safest design is the one tailored to the building, not just the standard. Generic minimum compliance may not provide adequate safety for specific risks and vulnerable occupants. Always design with the actual evacuation scenario in mind.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};