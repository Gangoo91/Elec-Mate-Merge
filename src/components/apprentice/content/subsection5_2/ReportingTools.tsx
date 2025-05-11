
import React from "react";
import { FileWarning, CheckCircle, AlertTriangle } from "lucide-react";

const ReportingTools = () => {
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold text-elec-yellow">Reporting Tools and Systems</h3>
      
      <p className="text-sm md:text-base mb-4">
        Modern workplaces employ various tools and systems to streamline the hazard reporting process, ensure proper tracking, 
        and facilitate effective resolution.
      </p>
      
      <div className="bg-elec-dark border border-elec-yellow/20 rounded-lg p-4 md:p-5">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {/* Reporting Methods */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="p-1.5 bg-elec-yellow/10 rounded">
                <FileWarning className="h-5 w-5 text-elec-yellow" />
              </div>
              <h4 className="font-medium text-elec-yellow">Reporting Methods</h4>
            </div>
            
            <div className="bg-elec-gray rounded-md p-3 mb-3">
              <h5 className="font-medium text-elec-yellow text-sm">Paper-Based Systems</h5>
              <p className="text-sm mt-1">Traditional forms, near-miss cards, and safety observation booklets for manual recording of hazards.</p>
            </div>
            
            <div className="bg-elec-gray rounded-md p-3 mb-3">
              <h5 className="font-medium text-elec-yellow text-sm">Digital Systems</h5>
              <p className="text-sm mt-1">Health & safety software platforms, mobile reporting apps, and QR code scanning for streamlined digital reporting.</p>
            </div>
            
            <div className="bg-elec-gray rounded-md p-3">
              <h5 className="font-medium text-elec-yellow text-sm">Integrated Approaches</h5>
              <p className="text-sm mt-1">Toolbox talks, safety committee reviews, and anonymous reporting channels to ensure comprehensive coverage.</p>
            </div>
          </div>
          
          {/* Effective Reporting */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="p-1.5 bg-elec-yellow/10 rounded">
                <CheckCircle className="h-5 w-5 text-elec-yellow" />
              </div>
              <h4 className="font-medium text-elec-yellow">Effective Reporting</h4>
            </div>
            
            <div className="bg-elec-gray rounded-md p-3 mb-3">
              <h5 className="font-medium text-elec-yellow text-sm">Be Specific</h5>
              <p className="text-sm mt-1">Provide exact location and detailed description. "Exposed wiring near workstation 3" is better than "Dangerous wiring."</p>
            </div>
            
            <div className="bg-elec-gray rounded-md p-3 mb-3">
              <h5 className="font-medium text-elec-yellow text-sm">Include Evidence</h5>
              <p className="text-sm mt-1">Whenever possible, attach photographs or videos of the hazard to provide visual context for assessment.</p>
            </div>
            
            <div className="bg-elec-gray rounded-md p-3">
              <h5 className="font-medium text-elec-yellow text-sm">Suggest Solutions & Follow Up</h5>
              <p className="text-sm mt-1">Include ideas for hazard control and follow up if no action is taken within a reasonable timeframe.</p>
            </div>
          </div>
          
          {/* Common Barriers */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="p-1.5 bg-elec-yellow/10 rounded">
                <AlertTriangle className="h-5 w-5 text-elec-yellow" />
              </div>
              <h4 className="font-medium text-elec-yellow">Common Barriers</h4>
            </div>
            
            <div className="bg-elec-gray rounded-md p-3 mb-3">
              <h5 className="font-medium text-elec-yellow text-sm">Fear of Blame</h5>
              <p className="text-sm mt-1">Workers may hesitate if they fear being blamed. Management should promote a no-blame culture focused on fixing problems.</p>
            </div>
            
            <div className="bg-elec-gray rounded-md p-3 mb-3">
              <h5 className="font-medium text-elec-yellow text-sm">Perceived Lack of Action</h5>
              <p className="text-sm mt-1">If previous reports haven't led to visible action, workers may become discouraged. Ensure all reports receive feedback.</p>
            </div>
            
            <div className="bg-elec-gray rounded-md p-3">
              <h5 className="font-medium text-elec-yellow text-sm">Time Constraints & Training</h5>
              <p className="text-sm mt-1">Use simple reporting processes and provide regular hazard identification training to overcome these barriers.</p>
            </div>
          </div>
        </div>
        
        {/* Case Study - Horizontal */}
        <div className="mt-5 bg-elec-gray rounded-lg p-4">
          <h4 className="font-medium text-elec-yellow mb-3">Case Study: Effective Hazard Reporting</h4>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex gap-3">
              <div className="p-1.5 bg-elec-yellow/10 rounded h-fit">
                <AlertTriangle className="h-5 w-5 text-elec-yellow" />
              </div>
              <div>
                <h5 className="text-elec-yellow mb-1 text-sm font-medium">The Scenario:</h5>
                <p className="text-sm">
                  At a commercial electrical installation site, an apprentice noticed several temporary power cables creating a trip hazard across a walkway.
                  The situation was complicated because the cables needed to power essential equipment.
                </p>
              </div>
            </div>
            
            <div className="flex gap-3">
              <div className="p-1.5 bg-elec-yellow/10 rounded h-fit">
                <CheckCircle className="h-5 w-5 text-elec-yellow" />
              </div>
              <div>
                <h5 className="text-elec-yellow mb-1 text-sm font-medium">The Response:</h5>
                <ol className="list-decimal list-inside text-sm space-y-1">
                  <li>Apprentice photographed the hazard and completed the digital report form</li>
                  <li>Supervisor acknowledged the report and implemented a temporary solution within hours</li>
                  <li>The report triggered a site-wide cable management review</li>
                  <li>The apprentice received recognition at the next safety meeting</li>
                </ol>
              </div>
            </div>
          </div>
          
          <p className="text-sm italic mt-3">
            This example demonstrates how proper hazard reporting can lead to both immediate action and longer-term improvements to workplace safety.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ReportingTools;
