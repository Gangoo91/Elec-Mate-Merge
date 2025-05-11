
import React from "react";
import { FileText, Eye, Clipboard } from "lucide-react";

const DocumentationRequirements = () => {
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold text-elec-yellow">Documentation Requirements</h3>
      
      <p className="text-sm md:text-base mb-4">
        Proper documentation of hazards is crucial for maintaining safety records, ensuring appropriate action is taken, and meeting legal obligations.
      </p>
      
      <div className="bg-elec-dark border border-elec-yellow/20 rounded-lg p-4 md:p-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {/* Left Column */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="p-1.5 bg-elec-yellow/10 rounded">
                <FileText className="h-5 w-5 text-elec-yellow" />
              </div>
              <h4 className="font-medium text-elec-yellow">Hazard Report Form Contents</h4>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="bg-elec-gray rounded-md p-3">
                <h5 className="font-medium text-elec-yellow text-sm mb-1">Hazard Details</h5>
                <ul className="list-disc list-inside text-sm space-y-1">
                  <li>Specific location of the hazard</li>
                  <li>Detailed description</li>
                  <li>Date and time identified</li>
                  <li>Potential consequences</li>
                </ul>
              </div>
              
              <div className="bg-elec-gray rounded-md p-3">
                <h5 className="font-medium text-elec-yellow text-sm mb-1">Risk Assessment</h5>
                <ul className="list-disc list-inside text-sm space-y-1">
                  <li>Likelihood of incident</li>
                  <li>Potential severity</li>
                  <li>Overall risk level</li>
                  <li>People potentially affected</li>
                </ul>
              </div>
              
              <div className="bg-elec-gray rounded-md p-3">
                <h5 className="font-medium text-elec-yellow text-sm mb-1">Reporter Information</h5>
                <ul className="list-disc list-inside text-sm space-y-1">
                  <li>Name of person reporting</li>
                  <li>Contact details</li>
                  <li>Job role/position</li>
                  <li>Signature and date</li>
                </ul>
              </div>
              
              <div className="bg-elec-gray rounded-md p-3">
                <h5 className="font-medium text-elec-yellow text-sm mb-1">Immediate Actions</h5>
                <ul className="list-disc list-inside text-sm space-y-1">
                  <li>Steps taken to control</li>
                  <li>Temporary measures</li>
                  <li>Communication to others</li>
                  <li>Evidence (photos, etc.)</li>
                </ul>
              </div>
            </div>
          </div>
          
          {/* Right Column */}
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="p-1.5 bg-elec-yellow/10 rounded">
                    <Eye className="h-5 w-5 text-elec-yellow" />
                  </div>
                  <h4 className="font-medium text-elec-yellow">Record-Keeping</h4>
                </div>
                
                <div className="bg-elec-gray rounded-md p-3 h-full">
                  <ul className="space-y-2 text-sm">
                    <li><span className="font-medium text-elec-yellow">Retention Period:</span> Minimum 3 years, 5 years recommended</li>
                    <li><span className="font-medium text-elec-yellow">Accessibility:</span> Records must be easily accessible to safety representatives and inspectors</li>
                    <li><span className="font-medium text-elec-yellow">Storage Format:</span> Both physical and electronic records acceptable with backup</li>
                  </ul>
                </div>
              </div>
              
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="p-1.5 bg-elec-yellow/10 rounded">
                    <Clipboard className="h-5 w-5 text-elec-yellow" />
                  </div>
                  <h4 className="font-medium text-elec-yellow">Management Review</h4>
                </div>
                
                <div className="bg-elec-gray rounded-md p-3 h-full">
                  <ul className="space-y-2 text-sm">
                    <li><span className="font-medium text-elec-yellow">Regular Review:</span> All reports reviewed in safety meetings</li>
                    <li><span className="font-medium text-elec-yellow">Action Tracking:</span> Document actions taken, dates, and responsible persons</li>
                    <li><span className="font-medium text-elec-yellow">Effectiveness:</span> Periodically assess effectiveness of control measures</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentationRequirements;
