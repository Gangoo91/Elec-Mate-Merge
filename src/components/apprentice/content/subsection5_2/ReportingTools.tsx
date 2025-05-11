
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
      
      <div className="grid grid-cols-1 gap-6">
        <Card className="bg-elec-dark/50 border border-elec-yellow/20">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <FileWarning className="h-5 w-5 text-elec-yellow" />
              <CardTitle className="text-lg text-elec-yellow">Reporting Methods</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-3 rounded bg-elec-dark border border-elec-yellow/10 space-y-2">
                <h4 className="font-medium text-elec-yellow">Paper-Based Systems</h4>
                <ul className="list-disc list-inside text-sm space-y-1">
                  <li>Traditional hazard report forms</li>
                  <li>Near-miss report cards</li>
                  <li>Safety observation booklets</li>
                  <li>Hazard notification tags</li>
                </ul>
                <p className="mt-2 text-sm italic">Best for: Sites with limited digital infrastructure or as backup systems</p>
              </div>
              
              <div className="p-3 rounded bg-elec-dark border border-elec-yellow/10 space-y-2">
                <h4 className="font-medium text-elec-yellow">Digital Systems</h4>
                <ul className="list-disc list-inside text-sm space-y-1">
                  <li>Health & safety software platforms</li>
                  <li>Mobile reporting applications</li>
                  <li>QR code scanning systems</li>
                  <li>Company intranet forms</li>
                </ul>
                <p className="mt-2 text-sm italic">Best for: Large organisations or companies with multiple sites</p>
              </div>
              
              <div className="p-3 rounded bg-elec-dark border border-elec-yellow/10 space-y-2">
                <h4 className="font-medium text-elec-yellow">Integrated Approaches</h4>
                <ul className="list-disc list-inside text-sm space-y-1">
                  <li>Toolbox talk reporting</li>
                  <li>Safety committee reviews</li>
                  <li>Regular workplace inspections</li>
                  <li>Anonymous reporting channels</li>
                </ul>
                <p className="mt-2 text-sm italic">Best for: Creating a comprehensive safety culture</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="bg-elec-dark/50 border border-elec-yellow/20">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-elec-yellow" />
                <CardTitle className="text-lg text-elec-yellow">Effective Reporting Practices</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm">To ensure hazard reports are effective and lead to appropriate action:</p>
              
              <div className="space-y-3">
                <div className="p-3 rounded bg-elec-dark border border-elec-yellow/10">
                  <h4 className="font-medium text-elec-yellow mb-1">Be Specific</h4>
                  <p className="text-sm">Provide exact location, equipment involved, and detailed description of the hazard. "Exposed wiring near workstation 3 in the east workshop" is better than "Dangerous wiring in workshop."</p>
                </div>
                
                <div className="p-3 rounded bg-elec-dark border border-elec-yellow/10">
                  <h4 className="font-medium text-elec-yellow mb-1">Include Evidence</h4>
                  <p className="text-sm">Whenever possible, attach photographs or videos of the hazard to provide visual context. This helps those assessing the report to understand the exact nature of the problem.</p>
                </div>
                
                <div className="p-3 rounded bg-elec-dark border border-elec-yellow/10">
                  <h4 className="font-medium text-elec-yellow mb-1">Suggest Solutions</h4>
                  <p className="text-sm">If you have ideas for how the hazard might be controlled, include these in your report. Workers often have valuable practical insights about effective solutions.</p>
                </div>
                
                <div className="p-3 rounded bg-elec-dark border border-elec-yellow/10">
                  <h4 className="font-medium text-elec-yellow mb-1">Follow Up</h4>
                  <p className="text-sm">If no action appears to be taken within a reasonable timeframe, follow up through appropriate channels. Persistence is sometimes necessary to ensure hazards are addressed.</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-elec-dark/50 border border-elec-yellow/20">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-elec-yellow" />
                <CardTitle className="text-lg text-elec-yellow">Common Reporting Barriers</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm">Understanding and addressing barriers to hazard reporting is essential for maintaining safety:</p>
              
              <div className="space-y-3">
                <div className="p-3 rounded bg-elec-dark border border-elec-yellow/10">
                  <h4 className="font-medium text-elec-yellow mb-1">Fear of Blame</h4>
                  <p className="text-sm">Workers may hesitate to report hazards if they fear being blamed for the situation. Management should promote a no-blame culture that focuses on fixing problems rather than finding fault.</p>
                </div>
                
                <div className="p-3 rounded bg-elec-dark border border-elec-yellow/10">
                  <h4 className="font-medium text-elec-yellow mb-1">Perceived Lack of Action</h4>
                  <p className="text-sm">If previous reports have not resulted in visible action, workers may become discouraged from reporting new hazards. Ensure all reports receive acknowledgment and feedback about actions taken.</p>
                </div>
                
                <div className="p-3 rounded bg-elec-dark border border-elec-yellow/10">
                  <h4 className="font-medium text-elec-yellow mb-1">Time Constraints</h4>
                  <p className="text-sm">Complex or time-consuming reporting processes can discourage reporting, especially in busy work environments. Implement simple, quick reporting methods that can be completed in a few minutes.</p>
                </div>
                
                <div className="p-3 rounded bg-elec-dark border border-elec-yellow/10">
                  <h4 className="font-medium text-elec-yellow mb-1">Lack of Understanding</h4>
                  <p className="text-sm">Workers may not recognise certain conditions as hazards or may not understand the reporting procedure. Regular training on hazard identification and reporting processes is essential.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="bg-elec-dark/70 border border-elec-yellow/15 rounded-lg p-4 mt-2">
          <h4 className="font-medium text-elec-yellow mb-3">Case Study: Effective Hazard Reporting in Action</h4>
          
          <div className="space-y-4">
            <p className="text-sm">
              On a commercial electrical installation project in Birmingham, an apprentice electrician noticed that several temporary 
              power cables running across a walkway were creating a trip hazard. The situation was complicated because the cables 
              needed to power essential equipment.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-3 rounded bg-elec-dark border border-elec-yellow/10">
                <h4 className="font-medium text-elec-yellow mb-1">The Reporting Process:</h4>
                <ol className="list-decimal list-inside text-sm space-y-1">
                  <li>The apprentice took photos of the hazard on a mobile device</li>
                  <li>Completed the company's digital hazard report form, including the photos</li>
                  <li>Verbally informed the site supervisor about the immediate concern</li>
                  <li>Suggested a temporary cable protection cover as an interim solution</li>
                </ol>
              </div>
              
              <div className="p-3 rounded bg-elec-dark border border-elec-yellow/10">
                <h4 className="font-medium text-elec-yellow mb-1">The Response:</h4>
                <ol className="list-decimal list-inside text-sm space-y-1">
                  <li>The supervisor acknowledged the report and thanked the apprentice</li>
                  <li>A temporary solution was implemented within two hours</li>
                  <li>The report triggered a site-wide cable management review</li>
                  <li>The apprentice received positive recognition at the next toolbox talk</li>
                </ol>
              </div>
            </div>
            
            <p className="text-sm italic">
              This example demonstrates how proper hazard reporting can lead to both immediate action and longer-term improvements to workplace safety.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportingTools;
