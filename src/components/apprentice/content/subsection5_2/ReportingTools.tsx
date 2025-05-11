
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { FileWarning, CheckCircle, AlertTriangle } from "lucide-react";

const ReportingTools = () => {
  return (
    <div className="border border-elec-yellow/30 rounded-lg p-4 md:p-6 space-y-4">
      <h3 className="text-xl font-bold text-elec-yellow">Hazard Reporting Tools and Systems</h3>
      
      <p className="text-sm md:text-base mb-4">
        Modern workplaces employ various tools and systems to streamline the hazard reporting process, ensure proper tracking, 
        and facilitate effective resolution. Understanding these systems is essential for electrical workers.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        <Card className="bg-elec-dark border border-elec-yellow/20">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <FileWarning className="h-5 w-5 text-elec-yellow" />
              <CardTitle className="text-lg text-elec-yellow">Reporting Methods</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="p-3 rounded bg-elec-gray border border-elec-yellow/10 space-y-2">
                <h4 className="font-medium text-elec-yellow">Paper-Based Systems</h4>
                <ul className="list-disc list-inside text-sm space-y-1">
                  <li>Traditional hazard report forms</li>
                  <li>Near-miss report cards</li>
                  <li>Safety observation booklets</li>
                </ul>
              </div>
              
              <div className="p-3 rounded bg-elec-gray border border-elec-yellow/10 space-y-2">
                <h4 className="font-medium text-elec-yellow">Digital Systems</h4>
                <ul className="list-disc list-inside text-sm space-y-1">
                  <li>Health & safety software platforms</li>
                  <li>Mobile reporting applications</li>
                  <li>QR code scanning systems</li>
                </ul>
              </div>
              
              <div className="p-3 rounded bg-elec-gray border border-elec-yellow/10 space-y-2">
                <h4 className="font-medium text-elec-yellow">Integrated Approaches</h4>
                <ul className="list-disc list-inside text-sm space-y-1">
                  <li>Toolbox talk reporting</li>
                  <li>Safety committee reviews</li>
                  <li>Anonymous reporting channels</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-elec-dark border border-elec-yellow/20">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-elec-yellow" />
              <CardTitle className="text-lg text-elec-yellow">Effective Reporting</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="p-3 rounded bg-elec-gray border border-elec-yellow/10">
              <h4 className="font-medium text-elec-yellow mb-1">Be Specific</h4>
              <p className="text-sm">Provide exact location and detailed description. "Exposed wiring near workstation 3" is better than "Dangerous wiring."</p>
            </div>
            
            <div className="p-3 rounded bg-elec-gray border border-elec-yellow/10">
              <h4 className="font-medium text-elec-yellow mb-1">Include Evidence</h4>
              <p className="text-sm">Whenever possible, attach photographs or videos of the hazard to provide visual context for assessment.</p>
            </div>
            
            <div className="p-3 rounded bg-elec-gray border border-elec-yellow/10">
              <h4 className="font-medium text-elec-yellow mb-1">Suggest Solutions</h4>
              <p className="text-sm">If you have ideas for how the hazard might be controlled, include these in your report.</p>
            </div>
            
            <div className="p-3 rounded bg-elec-gray border border-elec-yellow/10">
              <h4 className="font-medium text-elec-yellow mb-1">Follow Up</h4>
              <p className="text-sm">If no action is taken within a reasonable timeframe, follow up through appropriate channels.</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-elec-dark border border-elec-yellow/20">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-elec-yellow" />
              <CardTitle className="text-lg text-elec-yellow">Common Barriers</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="p-3 rounded bg-elec-gray border border-elec-yellow/10">
              <h4 className="font-medium text-elec-yellow mb-1">Fear of Blame</h4>
              <p className="text-sm">Workers may hesitate if they fear being blamed. Management should promote a no-blame culture focused on fixing problems.</p>
            </div>
            
            <div className="p-3 rounded bg-elec-gray border border-elec-yellow/10">
              <h4 className="font-medium text-elec-yellow mb-1">Perceived Lack of Action</h4>
              <p className="text-sm">If previous reports haven't led to visible action, workers may become discouraged. Ensure all reports receive feedback.</p>
            </div>
            
            <div className="p-3 rounded bg-elec-gray border border-elec-yellow/10">
              <h4 className="font-medium text-elec-yellow mb-1">Time Constraints</h4>
              <p className="text-sm">Complex reporting processes discourage reporting. Implement simple, quick methods that take just minutes to complete.</p>
            </div>
            
            <div className="p-3 rounded bg-elec-gray border border-elec-yellow/10">
              <h4 className="font-medium text-elec-yellow mb-1">Training Gaps</h4>
              <p className="text-sm">Workers may not recognize certain conditions as hazards. Regular training on hazard identification is essential.</p>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="bg-elec-gray border border-elec-yellow/15 rounded-lg p-4">
        <h4 className="font-medium text-elec-yellow mb-2">Case Study: Effective Hazard Reporting</h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-3 rounded bg-elec-dark border border-elec-yellow/10">
            <h5 className="text-elec-yellow mb-2 text-sm font-medium">The Scenario:</h5>
            <p className="text-sm">
              At a commercial electrical installation site, an apprentice noticed several temporary power cables creating a trip hazard across a walkway.
              The situation was complicated because the cables needed to power essential equipment.
            </p>
          </div>
          
          <div className="p-3 rounded bg-elec-dark border border-elec-yellow/10">
            <h5 className="text-elec-yellow mb-2 text-sm font-medium">The Response:</h5>
            <ol className="list-decimal list-inside text-sm space-y-1">
              <li>Apprentice photographed the hazard and completed the digital report form</li>
              <li>Supervisor acknowledged the report and implemented a temporary solution within hours</li>
              <li>The report triggered a site-wide cable management review</li>
              <li>The apprentice received recognition at the next safety meeting</li>
            </ol>
          </div>
        </div>
        
        <p className="text-sm italic mt-3">
          This example demonstrates how proper hazard reporting can lead to both immediate action and longer-term improvements to workplace safety.
        </p>
      </div>
    </div>
  );
};

export default ReportingTools;
