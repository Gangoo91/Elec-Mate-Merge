
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { FileText, Clipboard, Eye } from "lucide-react";

const DocumentationRequirements = () => {
  return (
    <div className="border border-elec-yellow/30 rounded-lg p-4 md:p-6 space-y-4">
      <h3 className="text-xl font-bold text-elec-yellow">Hazard Documentation Requirements</h3>
      
      <p className="text-sm md:text-base mb-4">
        Proper documentation of hazards is crucial for maintaining safety records, ensuring appropriate action is taken, and meeting legal obligations.
        The following outlines key documentation requirements for effective hazard reporting in electrical work environments.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-elec-dark/50 border border-elec-yellow/20 h-full">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-elec-yellow" />
              <CardTitle className="text-lg text-elec-yellow">Hazard Report Form Contents</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm">A complete hazard report form should include the following information:</p>
            <div className="space-y-3">
              <div className="p-3 rounded bg-elec-dark border border-elec-yellow/10">
                <h4 className="font-medium text-elec-yellow mb-1">Hazard Details</h4>
                <ul className="list-disc list-inside text-sm space-y-1">
                  <li>Specific location of the hazard</li>
                  <li>Detailed description of the hazard</li>
                  <li>Date and time the hazard was identified</li>
                  <li>Potential consequences if not addressed</li>
                </ul>
              </div>
              
              <div className="p-3 rounded bg-elec-dark border border-elec-yellow/10">
                <h4 className="font-medium text-elec-yellow mb-1">Risk Assessment</h4>
                <ul className="list-disc list-inside text-sm space-y-1">
                  <li>Likelihood of incident occurring</li>
                  <li>Potential severity of consequences</li>
                  <li>Overall risk level (high/medium/low)</li>
                  <li>Number of people potentially affected</li>
                </ul>
              </div>
              
              <div className="p-3 rounded bg-elec-dark border border-elec-yellow/10">
                <h4 className="font-medium text-elec-yellow mb-1">Reporter Information</h4>
                <ul className="list-disc list-inside text-sm space-y-1">
                  <li>Name of person reporting the hazard</li>
                  <li>Contact details for follow-up</li>
                  <li>Job role/position</li>
                  <li>Signature and date</li>
                </ul>
              </div>
              
              <div className="p-3 rounded bg-elec-dark border border-elec-yellow/10">
                <h4 className="font-medium text-elec-yellow mb-1">Immediate Actions</h4>
                <ul className="list-disc list-inside text-sm space-y-1">
                  <li>Steps already taken to control the hazard</li>
                  <li>Temporary measures put in place</li>
                  <li>Communication to others about the hazard</li>
                  <li>Any relevant photographs or evidence attached</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <div className="space-y-6">
          <Card className="bg-elec-dark/50 border border-elec-yellow/20">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <Eye className="h-5 w-5 text-elec-yellow" />
                <CardTitle className="text-lg text-elec-yellow">Record-Keeping Requirements</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="p-3 rounded bg-elec-dark border border-elec-yellow/10">
                  <h4 className="font-medium text-elec-yellow mb-1">Retention Period</h4>
                  <p className="text-sm">Hazard reports must be retained for a minimum of 3 years, although 5 years is recommended for electrical work environments.</p>
                </div>
                
                <div className="p-3 rounded bg-elec-dark border border-elec-yellow/10">
                  <h4 className="font-medium text-elec-yellow mb-1">Accessibility</h4>
                  <p className="text-sm">Records must be easily accessible to safety representatives, managers, and regulatory inspectors when required.</p>
                </div>
                
                <div className="p-3 rounded bg-elec-dark border border-elec-yellow/10">
                  <h4 className="font-medium text-elec-yellow mb-1">Storage Format</h4>
                  <p className="text-sm">Both physical and electronic records are acceptable, but electronic systems must have adequate backup procedures.</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-elec-dark/50 border border-elec-yellow/20">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <Clipboard className="h-5 w-5 text-elec-yellow" />
                <CardTitle className="text-lg text-elec-yellow">Management Review Process</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="p-3 rounded bg-elec-dark border border-elec-yellow/10">
                  <h4 className="font-medium text-elec-yellow mb-1">Regular Review</h4>
                  <p className="text-sm">All hazard reports should be reviewed in safety meetings, with trends and recurring issues identified for systemic action.</p>
                </div>
                
                <div className="p-3 rounded bg-elec-dark border border-elec-yellow/10">
                  <h4 className="font-medium text-elec-yellow mb-1">Action Tracking</h4>
                  <p className="text-sm">Document all actions taken in response to reports, including dates completed and by whom.</p>
                </div>
                
                <div className="p-3 rounded bg-elec-dark border border-elec-yellow/10">
                  <h4 className="font-medium text-elec-yellow mb-1">Effectiveness Evaluation</h4>
                  <p className="text-sm">Periodically assess whether implemented control measures have effectively addressed reported hazards.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <div className="bg-elec-dark/70 border border-elec-yellow/15 rounded-lg p-4 mt-6">
        <h4 className="font-medium text-elec-yellow mb-2">Sample Documentation Process Flow</h4>
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 mt-4">
          <div className="bg-elec-dark p-3 rounded border border-elec-yellow/10 text-center">
            <p className="font-medium text-elec-yellow text-sm">Hazard Identified</p>
            <p className="text-xs mt-1">Day 1</p>
          </div>
          <div className="flex items-center justify-center">
            <div className="w-4 h-0.5 bg-elec-yellow/30 hidden sm:block"></div>
            <div className="w-0.5 h-4 bg-elec-yellow/30 block sm:hidden"></div>
          </div>
          <div className="bg-elec-dark p-3 rounded border border-elec-yellow/10 text-center">
            <p className="font-medium text-elec-yellow text-sm">Report Documented</p>
            <p className="text-xs mt-1">Day 1</p>
          </div>
          <div className="flex items-center justify-center">
            <div className="w-4 h-0.5 bg-elec-yellow/30 hidden sm:block"></div>
            <div className="w-0.5 h-4 bg-elec-yellow/30 block sm:hidden"></div>
          </div>
          <div className="bg-elec-dark p-3 rounded border border-elec-yellow/10 text-center">
            <p className="font-medium text-elec-yellow text-sm">Assessment</p>
            <p className="text-xs mt-1">Day 1-2</p>
          </div>
          <div className="flex items-center justify-center">
            <div className="w-0.5 h-4 bg-elec-yellow/30 block sm:hidden"></div>
          </div>
          <div className="bg-elec-dark p-3 rounded border border-elec-yellow/10 text-center">
            <p className="font-medium text-elec-yellow text-sm">Response Plan</p>
            <p className="text-xs mt-1">Day 2-3</p>
          </div>
          <div className="flex items-center justify-center">
            <div className="w-4 h-0.5 bg-elec-yellow/30 hidden sm:block"></div>
            <div className="w-0.5 h-4 bg-elec-yellow/30 block sm:hidden"></div>
          </div>
          <div className="bg-elec-dark p-3 rounded border border-elec-yellow/10 text-center">
            <p className="font-medium text-elec-yellow text-sm">Action Taken</p>
            <p className="text-xs mt-1">By Day 7</p>
          </div>
          <div className="flex items-center justify-center">
            <div className="w-4 h-0.5 bg-elec-yellow/30 hidden sm:block"></div>
            <div className="w-0.5 h-4 bg-elec-yellow/30 block sm:hidden"></div>
          </div>
          <div className="bg-elec-dark p-3 rounded border border-elec-yellow/10 text-center">
            <p className="font-medium text-elec-yellow text-sm">Review & Close</p>
            <p className="text-xs mt-1">Day 14-28</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentationRequirements;
