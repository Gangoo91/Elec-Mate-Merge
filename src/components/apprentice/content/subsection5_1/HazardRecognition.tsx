
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ListOrdered, ShieldAlert } from "lucide-react";

const HazardRecognition = () => {
  return (
    <div className="border border-elec-yellow/30 rounded-lg p-4 md:p-6 space-y-4">
      <h3 className="text-xl font-bold text-elec-yellow">Hazard Recognition and Risk Levels</h3>
      
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
              <div className="border-l-4 border-elec-yellow/40 pl-3 space-y-2">
                <h4 className="font-medium text-elec-yellow">1. Pre-Work Assessment</h4>
                <ul className="list-disc pl-4 space-y-1">
                  <li>Review work order and scope of work</li>
                  <li>Gather information about the location/environment</li>
                  <li>Check for existing risk assessments</li>
                  <li>Review site-specific safety procedures</li>
                  <li>Consider previous incidents or near misses</li>
                </ul>
              </div>
              
              <div className="border-l-4 border-elec-yellow/40 pl-3 space-y-2">
                <h4 className="font-medium text-elec-yellow">2. Active Inspection</h4>
                <ul className="list-disc pl-4 space-y-1">
                  <li>Conduct point-of-work risk assessment</li>
                  <li>Look for visible warning signs</li>
                  <li>Test equipment condition before use</li>
                  <li>Check for unexpected conditions</li>
                  <li>Verify isolation procedures</li>
                </ul>
              </div>
              
              <div className="border-l-4 border-elec-yellow/40 pl-3 space-y-2">
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
        
        <Card className="bg-elec-dark/50 border border-elec-yellow/20">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <ShieldAlert className="h-5 w-5 text-elec-yellow" />
              <CardTitle className="text-lg text-elec-yellow">Understanding Risk Levels</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-sm">Risk is typically calculated by multiplying the likelihood of a hazard occurring by the severity of potential harm. Understanding risk levels helps prioritise control measures.</p>
            
            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse text-sm">
                <thead>
                  <tr>
                    <th className="bg-elec-yellow/20 text-elec-yellow border border-elec-yellow/30 px-3 py-2 text-left">Risk Level</th>
                    <th className="bg-elec-yellow/20 text-elec-yellow border border-elec-yellow/30 px-3 py-2 text-left">Description</th>
                    <th className="bg-elec-yellow/20 text-elec-yellow border border-elec-yellow/30 px-3 py-2 text-left">Examples in Electrical Work</th>
                    <th className="bg-elec-yellow/20 text-elec-yellow border border-elec-yellow/30 px-3 py-2 text-left">Required Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-elec-yellow/30 px-3 py-2 bg-red-900/20 font-medium">High</td>
                    <td className="border border-elec-yellow/30 px-3 py-2">Likely to cause death or major injury</td>
                    <td className="border border-elec-yellow/30 px-3 py-2">Working on live equipment, exposed conductors, work near overhead lines</td>
                    <td className="border border-elec-yellow/30 px-3 py-2">Work must not proceed until risk is reduced</td>
                  </tr>
                  <tr>
                    <td className="border border-elec-yellow/30 px-3 py-2 bg-orange-800/20 font-medium">Medium</td>
                    <td className="border border-elec-yellow/30 px-3 py-2">Likely to cause minor injury or illness</td>
                    <td className="border border-elec-yellow/30 px-3 py-2">Poorly maintained equipment, inadequate PPE, improper manual handling</td>
                    <td className="border border-elec-yellow/30 px-3 py-2">Implement risk reduction measures within a set timeframe</td>
                  </tr>
                  <tr>
                    <td className="border border-elec-yellow/30 px-3 py-2 bg-green-900/20 font-medium">Low</td>
                    <td className="border border-elec-yellow/30 px-3 py-2">Unlikely to cause significant harm</td>
                    <td className="border border-elec-yellow/30 px-3 py-2">Minor cable management issues, temporary environmental factors</td>
                    <td className="border border-elec-yellow/30 px-3 py-2">Monitor and ensure existing controls are maintained</td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <div className="mt-4 bg-elec-dark p-3 rounded border border-elec-yellow/20 text-sm">
              <p className="font-medium text-elec-yellow">Key warning signs of electrical hazards:</p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>Unusual odours (burning smell)</li>
                <li>Visual damage to cables, outlets or equipment</li>
                <li>Discoloration of outlets or plugs</li>
                <li>Warm outlets or switches</li>
                <li>Circuit breakers that frequently trip</li>
                <li>Flickering lights</li>
                <li>Buzzing or crackling sounds</li>
                <li>Tingling sensation when touching equipment</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default HazardRecognition;
