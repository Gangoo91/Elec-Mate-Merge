
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ListOrdered, ShieldAlert } from "lucide-react";

const HazardRecognition = () => {
  return (
    <div className="border border-elec-yellow/30 rounded-lg p-4 md:p-6 space-y-4">
      <h3 className="text-xl font-bold text-elec-yellow">Hazard Recognition and Risk Assessment</h3>
      
      <p className="text-sm md:text-base mb-4">
        Developing the ability to recognise hazards requires both formal training and practical experience. 
        Understanding how to assess the risk level of identified hazards is crucial for prioritising control measures.
      </p>
      
      <Card className="bg-elec-dark/50 border border-elec-yellow/20">
        <CardHeader className="pb-2">
          <div className="flex items-center gap-2">
            <ListOrdered className="h-5 w-5 text-elec-yellow" />
            <CardTitle className="text-lg text-elec-yellow">The Hazard Identification Process</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="border-l-4 border-elec-yellow/40 pl-3 space-y-2 p-3 rounded bg-elec-dark/40">
              <h4 className="font-medium text-elec-yellow">1. Pre-Work Assessment</h4>
              <ul className="space-y-1 pl-4 text-sm list-disc">
                <li>Review work order and scope</li>
                <li>Gather information about the environment</li>
                <li>Check existing risk assessments</li>
                <li>Review site-specific procedures</li>
                <li>Consider previous incidents</li>
              </ul>
            </div>
            
            <div className="border-l-4 border-elec-yellow/40 pl-3 space-y-2 p-3 rounded bg-elec-dark/40">
              <h4 className="font-medium text-elec-yellow">2. Active Inspection</h4>
              <ul className="space-y-1 pl-4 text-sm list-disc">
                <li>Conduct point-of-work risk assessment</li>
                <li>Look for visible warning signs</li>
                <li>Test equipment condition</li>
                <li>Check for unexpected conditions</li>
                <li>Verify isolation procedures</li>
              </ul>
            </div>
            
            <div className="border-l-4 border-elec-yellow/40 pl-3 space-y-2 p-3 rounded bg-elec-dark/40">
              <h4 className="font-medium text-elec-yellow">3. Continuous Monitoring</h4>
              <ul className="space-y-1 pl-4 text-sm list-disc">
                <li>Remain vigilant during work</li>
                <li>Reassess if conditions change</li>
                <li>Stop work if new hazards arise</li>
                <li>Report hazards to supervisor</li>
                <li>Document findings</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
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
            <CardTitle className="text-lg text-elec-yellow">Warning Signs of Electrical Hazards</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-3 text-sm">Being able to recognise early warning signs can help prevent accidents:</p>
            
            <div className="grid grid-cols-1 gap-2">
              <div className="p-3 rounded bg-elec-dark border border-elec-yellow/10">
                <h4 className="font-medium text-elec-yellow mb-1">Physical Signs</h4>
                <ul className="space-y-1 pl-4 text-sm list-disc">
                  <li>Unusual odours (burning smell)</li>
                  <li>Visual damage to cables or outlets</li>
                  <li>Discoloration of outlets or plugs</li>
                  <li>Warm outlets or switches</li>
                </ul>
              </div>
              
              <div className="p-3 rounded bg-elec-dark border border-elec-yellow/10">
                <h4 className="font-medium text-elec-yellow mb-1">Operational Signs</h4>
                <ul className="space-y-1 pl-4 text-sm list-disc">
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
      
      <Card className="bg-elec-dark/50 border border-elec-yellow/20 mt-6">
        <CardHeader className="pb-2">
          <div className="flex items-center gap-2">
            <ListOrdered className="h-5 w-5 text-elec-yellow" />
            <CardTitle className="text-lg text-elec-yellow">Hierarchy of Controls</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <p className="mb-4 text-sm">When addressing identified hazards, follow the hierarchy of controls in this order:</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
            <div className="p-3 rounded bg-elec-dark border border-elec-yellow/10">
              <div className="flex items-center gap-2 mb-1">
                <span className="bg-elec-yellow text-elec-dark rounded-full w-6 h-6 flex items-center justify-center font-bold">1</span>
                <span className="font-medium">Elimination</span>
              </div>
              <p className="text-xs">Remove the hazard completely</p>
            </div>
            
            <div className="p-3 rounded bg-elec-dark border border-elec-yellow/10">
              <div className="flex items-center gap-2 mb-1">
                <span className="bg-elec-yellow text-elec-dark rounded-full w-6 h-6 flex items-center justify-center font-bold">2</span>
                <span className="font-medium">Substitution</span>
              </div>
              <p className="text-xs">Replace with something less hazardous</p>
            </div>
            
            <div className="p-3 rounded bg-elec-dark border border-elec-yellow/10">
              <div className="flex items-center gap-2 mb-1">
                <span className="bg-elec-yellow text-elec-dark rounded-full w-6 h-6 flex items-center justify-center font-bold">3</span>
                <span className="font-medium">Engineering Controls</span>
              </div>
              <p className="text-xs">Isolate people from the hazard</p>
            </div>
            
            <div className="p-3 rounded bg-elec-dark border border-elec-yellow/10">
              <div className="flex items-center gap-2 mb-1">
                <span className="bg-elec-yellow text-elec-dark rounded-full w-6 h-6 flex items-center justify-center font-bold">4</span>
                <span className="font-medium">Administrative Controls</span>
              </div>
              <p className="text-xs">Change work procedures & training</p>
            </div>
            
            <div className="p-3 rounded bg-elec-dark border border-elec-yellow/10">
              <div className="flex items-center gap-2 mb-1">
                <span className="bg-elec-yellow text-elec-dark rounded-full w-6 h-6 flex items-center justify-center font-bold">5</span>
                <span className="font-medium">PPE</span>
              </div>
              <p className="text-xs">Personal protective equipment (last resort)</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HazardRecognition;
