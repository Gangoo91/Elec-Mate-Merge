
import React from "react";
import { LayoutTemplate, ClipboardList } from "lucide-react";

const PlanningConsiderations = () => {
  return (
    <div className="space-y-4">
      <h3 className="text-2xl font-bold text-elec-yellow">Planning Considerations for Electrical Work</h3>
      
      <p className="text-base md:text-lg mb-4">
        Proper planning is essential for safe and efficient electrical installation and maintenance. 
        This involves careful consideration of the work environment, resources needed, and potential hazards.
      </p>
      
      <div className="bg-elec-dark border border-elec-yellow/20 rounded-lg p-4 md:p-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {/* Left Column */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="p-1.5 bg-elec-yellow/10 rounded">
                <LayoutTemplate className="h-5 w-5 text-elec-yellow" />
              </div>
              <h4 className="font-medium text-elec-yellow text-lg">Work Planning</h4>
            </div>
            
            <div className="bg-elec-gray rounded-md p-3">
              <h5 className="font-medium text-elec-yellow text-base mb-1">Pre-Work Assessment</h5>
              <ul className="list-disc list-inside text-base space-y-1">
                <li>Detailed site survey before commencing work</li>
                <li>Identification of electrical supply points</li>
                <li>Confirmation of isolation possibilities</li>
                <li>Assessment of access restrictions</li>
                <li>Identification of material storage areas</li>
              </ul>
            </div>
            
            <div className="bg-elec-gray rounded-md p-3">
              <h5 className="font-medium text-elec-yellow text-base mb-1">Resource Planning</h5>
              <ul className="list-disc list-inside text-base space-y-1">
                <li>Determining appropriate staffing levels</li>
                <li>Ensuring correct tools and equipment are available</li>
                <li>Planning for material delivery and storage</li>
                <li>Arranging specialized equipment if needed</li>
                <li>Allocating time for testing and commissioning</li>
              </ul>
            </div>
          </div>
          
          {/* Right Column */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="p-1.5 bg-elec-yellow/10 rounded">
                <ClipboardList className="h-5 w-5 text-elec-yellow" />
              </div>
              <h4 className="font-medium text-elec-yellow text-lg">Documentation</h4>
            </div>
            
            <div className="bg-elec-gray rounded-md p-3">
              <h5 className="font-medium text-elec-yellow text-base mb-1">Required Documentation</h5>
              <ul className="list-disc list-inside text-base space-y-1">
                <li>Risk assessments specific to the work</li>
                <li>Method statements outlining work process</li>
                <li>Permits to work where applicable</li>
                <li>Electrical installation certificates</li>
                <li>Test results and commissioning records</li>
                <li>Hand-over documentation</li>
              </ul>
            </div>
            
            <div className="bg-elec-gray rounded-md p-3">
              <h5 className="font-medium text-elec-yellow text-base mb-1">Communication Plan</h5>
              <ul className="list-disc list-inside text-base space-y-1">
                <li>Briefing all personnel before work commences</li>
                <li>Clear communication methods during work</li>
                <li>Emergency procedures and contacts</li>
                <li>Client communication protocols</li>
                <li>Reporting procedures for issues</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="mt-4 p-4 bg-elec-dark/70 rounded-lg text-base">
          <p className="font-medium mb-1 text-elec-yellow">Legal Compliance:</p>
          <p>The Management of Health and Safety at Work Regulations 1999 require suitable and sufficient planning, 
          including risk assessment, before undertaking work activities. For electrical work, the Electricity at Work 
          Regulations 1989 require that all work is properly planned, with consideration given to the risks associated 
          with electricity.</p>
        </div>
      </div>
    </div>
  );
};

export default PlanningConsiderations;
