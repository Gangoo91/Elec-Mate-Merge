import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Building, AlertTriangle, CheckCircle, Lightbulb } from 'lucide-react';

export const BMSModule5Section4RealWorld = () => {
  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Building className="h-5 w-5 text-elec-yellow" />
          Real World Example
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-lg p-6">
          <h3 className="text-foreground font-bold text-lg mb-4">High-End Residential Development</h3>
          <p className="text-foreground mb-4">
            In a luxury residential development, electricians installed KNX devices throughout three floors 
            to control lighting, motorised blinds, and underfloor heating systems. The project included over 
            200 devices across multiple lines and required careful coordination between electrical and 
            commissioning teams.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-r from-red-500/10 to-orange-500/10 border border-red-500/20 rounded-lg p-4">
            <h4 className="text-foreground font-semibold flex items-center gap-2 mb-3">
              <AlertTriangle className="h-4 w-4" />
              The Problem
            </h4>
            <div className="space-y-2 text-sm text-foreground">
              <p>• One entire floor of devices failed to communicate during commissioning</p>
              <p>• 60+ devices showing as "offline" in the ETS software</p>
              <p>• Bus voltage present but no data communication</p>
              <p>• Initial assumption was faulty devices or power supply issues</p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/20 rounded-lg p-4">
            <h4 className="text-foreground font-semibold flex items-center gap-2 mb-3">
              <CheckCircle className="h-4 w-4" />
              Investigation Process
            </h4>
            <div className="space-y-2 text-sm text-foreground">
              <p>• Systematic voltage checks at each device location</p>
              <p>• Bus monitor revealed no telegram traffic on affected floor</p>
              <p>• Cable route inspection discovered the problem</p>
              <p>• Found accidental loop created between two junction boxes</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 rounded-lg p-4">
          <h4 className="text-foreground font-semibold mb-3">Root Cause Analysis</h4>
          <div className="space-y-2 text-sm text-foreground">
            <p>
              <strong>The Issue:</strong> During cable installation, a loop had been inadvertently created when 
              connecting two distribution points. The loop caused signal reflections and prevented proper 
              communication on the entire line.
            </p>
            <p>
              <strong>Why It Wasn't Obvious:</strong> The loop provided electrical continuity, so bus voltage 
              was present at all devices. However, the signal reflections corrupted all data telegrams, 
              making communication impossible.
            </p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-lg p-4">
          <h4 className="text-foreground font-semibold mb-3">Solution Implementation</h4>
          <div className="space-y-2 text-sm text-foreground">
            <p>• Identified the loop connection in the second-floor distribution box</p>
            <p>• Disconnected one leg of the loop to restore proper tree topology</p>
            <p>• Rewired affected section to maintain coverage without loops</p>
            <p>• Verified correct operation using bus monitor</p>
            <p>• Updated as-built drawings to reflect correct topology</p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-teal-500/10 to-cyan-500/10 border border-teal-500/20 rounded-lg p-4">
          <h4 className="text-foreground font-semibold flex items-center gap-2 mb-3">
            <Lightbulb className="h-4 w-4 text-elec-yellow" />
            Key Lessons Learned
          </h4>
          <div className="space-y-3 text-sm">
            <div>
              <p className="text-foreground font-medium text-green-400">Prevention Strategies:</p>
              <p className="text-foreground">• Create detailed topology diagrams before installation</p>
              <p className="text-foreground">• Use systematic labelling for all junction points</p>
              <p className="text-foreground">• Implement peer review for complex cable routes</p>
            </div>
            <div>
              <p className="text-foreground font-medium text-blue-400">Troubleshooting Approach:</p>
              <p className="text-foreground">• Always check topology before assuming device failures</p>
              <p className="text-foreground">• Use bus monitoring tools to understand communication patterns</p>
              <p className="text-foreground">• Systematic elimination approach for complex problems</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-indigo-500/10 to-blue-500/10 border border-indigo-500/20 rounded-lg p-4">
          <h4 className="text-foreground font-semibold mb-3">Project Outcome</h4>
          <p className="text-foreground text-sm">
            Once rewired into proper tree topology, communication was immediately restored. All 200+ devices 
            operated reliably throughout commissioning and beyond. The client received a fully functional 
            KNX system controlling lighting scenes, automated blinds, and heating zones. The incident highlighted 
            the critical importance of proper topology in KNX installations and led to improved documentation 
            standards for the electrical contractor.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};