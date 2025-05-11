
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ListOrdered, ShieldAlert, AlertTriangle } from "lucide-react";

const HazardRecognition = () => {
  return (
    <div className="border border-elec-yellow/30 rounded-lg p-4 md:p-6 space-y-4">
      <h3 className="text-xl font-bold text-elec-yellow">Hazard Recognition and Risk Assessment</h3>
      
      <div className="space-y-4 md:space-y-6">
        <p className="text-sm md:text-base">
          Developing the ability to recognise hazards requires both formal training and practical experience. Understanding how to assess the risk level of identified hazards is crucial for prioritising control measures.
        </p>
        
        <Card className="bg-elec-dark/50 border border-elec-yellow/20">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <ListOrdered className="h-5 w-5 text-elec-yellow" />
              <CardTitle className="text-lg text-elec-yellow">The Hazard Identification Process</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 text-sm">
              <div className="border-l-4 border-elec-yellow/40 pl-3 space-y-2 bg-elec-dark/40 p-3 rounded">
                <h4 className="font-medium text-elec-yellow">1. Pre-Work Assessment</h4>
                <ul className="list-disc pl-4 space-y-1">
                  <li>Review work order and scope of work</li>
                  <li>Gather information about the location/environment</li>
                  <li>Check for existing risk assessments</li>
                  <li>Review site-specific safety procedures</li>
                  <li>Consider previous incidents or near misses</li>
                </ul>
              </div>
              
              <div className="border-l-4 border-elec-yellow/40 pl-3 space-y-2 bg-elec-dark/40 p-3 rounded">
                <h4 className="font-medium text-elec-yellow">2. Active Inspection</h4>
                <ul className="list-disc pl-4 space-y-1">
                  <li>Conduct point-of-work risk assessment</li>
                  <li>Look for visible warning signs</li>
                  <li>Test equipment condition before use</li>
                  <li>Check for unexpected conditions</li>
                  <li>Verify isolation procedures</li>
                </ul>
              </div>
              
              <div className="border-l-4 border-elec-yellow/40 pl-3 space-y-2 bg-elec-dark/40 p-3 rounded">
                <h4 className="font-medium text-elec-yellow">3. Continuous Monitoring</h4>
                <ul className="list-disc pl-4 space-y-1">
                  <li>Remain vigilant throughout the work</li>
                  <li>Reassess if conditions change</li>
                  <li>Stop work if new hazards arise</li>
                  <li>Report hazards to supervisor</li>
                  <li>Document findings for future reference</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="bg-elec-dark/50 border border-elec-yellow/20">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <ShieldAlert className="h-5 w-5 text-elec-yellow" />
                <CardTitle className="text-lg text-elec-yellow">Risk Assessment Matrix</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-sm">Risk is typically calculated by multiplying the likelihood of a hazard occurring by the severity of potential harm.</p>
              
              <div className="overflow-x-auto">
                <table className="min-w-full border-collapse text-sm">
                  <thead>
                    <tr>
                      <th className="bg-elec-yellow/20 text-elec-yellow border border-elec-yellow/30 px-3 py-2 text-left">Risk Level</th>
                      <th className="bg-elec-yellow/20 text-elec-yellow border border-elec-yellow/30 px-3 py-2 text-left">Required Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-elec-yellow/30 px-3 py-2 bg-red-900/20 font-medium">High</td>
                      <td className="border border-elec-yellow/30 px-3 py-2">Work must not proceed until risk is reduced</td>
                    </tr>
                    <tr>
                      <td className="border border-elec-yellow/30 px-3 py-2 bg-orange-800/20 font-medium">Medium</td>
                      <td className="border border-elec-yellow/30 px-3 py-2">Implement risk reduction measures within a set timeframe</td>
                    </tr>
                    <tr>
                      <td className="border border-elec-yellow/30 px-3 py-2 bg-green-900/20 font-medium">Low</td>
                      <td className="border border-elec-yellow/30 px-3 py-2">Monitor and ensure existing controls are maintained</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-elec-dark/50 border border-elec-yellow/20">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-elec-yellow" />
                <CardTitle className="text-lg text-elec-yellow">Warning Signs of Electrical Hazards</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="mb-3 text-sm">Being able to recognise early warning signs can help prevent accidents:</p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <div className="bg-elec-dark p-3 rounded border border-elec-yellow/20">
                  <ul className="list-disc pl-4 space-y-1 text-sm">
                    <li>Unusual odours (burning smell)</li>
                    <li>Visual damage to cables or outlets</li>
                    <li>Discoloration of outlets or plugs</li>
                    <li>Warm outlets or switches</li>
                  </ul>
                </div>
                <div className="bg-elec-dark p-3 rounded border border-elec-yellow/20">
                  <ul className="list-disc pl-4 space-y-1 text-sm">
                    <li>Circuit breakers that frequently trip</li>
                    <li>Flickering lights</li>
                    <li>Buzzing or crackling sounds</li>
                    <li>Tingling sensation when touching equipment</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Card className="bg-elec-dark/50 border border-elec-yellow/20">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <ListOrdered className="h-5 w-5 text-elec-yellow" />
              <CardTitle className="text-lg text-elec-yellow">Hierarchy of Controls</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="mb-3 text-sm">When addressing identified hazards, follow the hierarchy of controls in this order:</p>
            
            <div className="space-y-2">
              <div className="flex gap-2 items-center bg-elec-dark p-3 rounded border border-elec-yellow/20">
                <span className="bg-elec-yellow text-elec-dark rounded-full w-6 h-6 flex items-center justify-center font-bold">1</span>
                <span className="font-medium">Elimination</span>
                <span className="text-sm text-gray-400 ml-2">- Remove the hazard completely</span>
              </div>
              
              <div className="flex gap-2 items-center bg-elec-dark p-3 rounded border border-elec-yellow/20">
                <span className="bg-elec-yellow text-elec-dark rounded-full w-6 h-6 flex items-center justify-center font-bold">2</span>
                <span className="font-medium">Substitution</span>
                <span className="text-sm text-gray-400 ml-2">- Replace the hazard with something less hazardous</span>
              </div>
              
              <div className="flex gap-2 items-center bg-elec-dark p-3 rounded border border-elec-yellow/20">
                <span className="bg-elec-yellow text-elec-dark rounded-full w-6 h-6 flex items-center justify-center font-bold">3</span>
                <span className="font-medium">Engineering Controls</span>
                <span className="text-sm text-gray-400 ml-2">- Isolate people from the hazard</span>
              </div>
              
              <div className="flex gap-2 items-center bg-elec-dark p-3 rounded border border-elec-yellow/20">
                <span className="bg-elec-yellow text-elec-dark rounded-full w-6 h-6 flex items-center justify-center font-bold">4</span>
                <span className="font-medium">Administrative Controls</span>
                <span className="text-sm text-gray-400 ml-2">- Change work procedures and training</span>
              </div>
              
              <div className="flex gap-2 items-center bg-elec-dark p-3 rounded border border-elec-yellow/20">
                <span className="bg-elec-yellow text-elec-dark rounded-full w-6 h-6 flex items-center justify-center font-bold">5</span>
                <span className="font-medium">PPE</span>
                <span className="text-sm text-gray-400 ml-2">- Personal protective equipment (last resort)</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default HazardRecognition;
