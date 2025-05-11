
import React from "react";
import { LayoutPlanIcon, Box } from "lucide-react";

const PlanningConsiderations = () => {
  return (
    <div className="space-y-4">
      <h3 className="text-2xl font-bold text-elec-yellow">Planning for Electrical Installation Work</h3>
      
      <p className="text-base md:text-lg mb-4">
        Proper planning is essential for the safe and efficient completion of electrical installation work. 
        This includes considering material handling, sequencing of tasks, and maintaining an organised work area.
      </p>
      
      <div className="bg-elec-dark border border-elec-yellow/20 rounded-lg p-4 md:p-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {/* Left Column */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="p-1.5 bg-elec-yellow/10 rounded">
                <LayoutPlanIcon className="h-5 w-5 text-elec-yellow" />
              </div>
              <h4 className="font-medium text-elec-yellow text-lg">Work Area Considerations</h4>
            </div>
            
            <div className="bg-elec-gray rounded-md p-3">
              <h5 className="font-medium text-elec-yellow text-base mb-1">Preparation</h5>
              <ul className="list-disc list-inside text-base space-y-1">
                <li>Clear access and exit routes</li>
                <li>Establish designated work zones</li>
                <li>Ensure adequate lighting and ventilation</li>
                <li>Identify and isolate potential hazards</li>
                <li>Position tools and materials for efficient access</li>
                <li>Setup barriers and signage where required</li>
              </ul>
            </div>
            
            <div className="bg-elec-gray rounded-md p-3">
              <h5 className="font-medium text-elec-yellow text-base mb-1">Organisation During Work</h5>
              <ul className="list-disc list-inside text-base space-y-1">
                <li>Maintain clear walkways and work areas</li>
                <li>Store tools safely when not in use</li>
                <li>Manage cables to prevent trip hazards</li>
                <li>Clean as you go to prevent accumulation of waste</li>
                <li>Maintain separation between power and data cables</li>
                <li>Label circuits and components clearly</li>
              </ul>
            </div>
            
            <div className="bg-elec-gray rounded-md p-3">
              <h5 className="font-medium text-elec-yellow text-base mb-1">Completion Procedures</h5>
              <ul className="list-disc list-inside text-base space-y-1">
                <li>Thorough clean-up of work areas</li>
                <li>Proper disposal of waste materials</li>
                <li>Restoration of moved furniture or equipment</li>
                <li>Final safety checks before handover</li>
                <li>Documentation of work completed</li>
              </ul>
            </div>
          </div>
          
          {/* Right Column */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="p-1.5 bg-elec-yellow/10 rounded">
                <Box className="h-5 w-5 text-elec-yellow" />
              </div>
              <h4 className="font-medium text-elec-yellow text-lg">Materials Handling</h4>
            </div>
            
            <div className="bg-elec-gray rounded-md p-3">
              <h5 className="font-medium text-elec-yellow text-base mb-1">Manual Handling Best Practices</h5>
              <ul className="list-disc list-inside text-base space-y-1">
                <li>Assess the load before lifting</li>
                <li>Use proper lifting techniques (bend knees, not back)</li>
                <li>Get assistance for heavy or awkward items</li>
                <li>Use mechanical aids where available</li>
                <li>Plan the route before moving materials</li>
                <li>Take breaks during repetitive handling tasks</li>
              </ul>
            </div>
            
            <div className="bg-elec-gray rounded-md p-3">
              <h5 className="font-medium text-elec-yellow text-base mb-1">Storage Considerations</h5>
              <ul className="list-disc list-inside text-base space-y-1">
                <li>Store heavy items at waist height</li>
                <li>Ensure materials are stable and secure</li>
                <li>Protect cables and components from damage</li>
                <li>Store hazardous materials according to regulations</li>
                <li>Keep pathways clear of stored materials</li>
                <li>Consider weather protection for outdoor storage</li>
              </ul>
            </div>
            
            <div className="bg-elec-gray rounded-md p-3">
              <h5 className="font-medium text-elec-yellow text-base mb-1">Equipment Requirements</h5>
              <ul className="list-disc list-inside text-base space-y-1">
                <li>Choose appropriate transport equipment</li>
                <li>Inspect lifting equipment before use</li>
                <li>Ensure adequate space for equipment operation</li>
                <li>Consider access limitations for large materials</li>
                <li>Plan delivery schedules to minimise storage needs</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="mt-4 p-4 bg-elec-dark/70 rounded-lg text-base">
          <p className="font-medium mb-1 text-elec-yellow">Manual Handling Regulations:</p>
          <p>The Manual Handling Operations Regulations 1992 (as amended) require employers to avoid hazardous manual handling operations 
          where reasonably practicable. Where such operations cannot be avoided, employers must assess the risk and take appropriate steps to 
          reduce the risk of injury. This includes considering the task, the load, the working environment, individual capability, and 
          providing training for workers who undertake manual handling activities.</p>
        </div>
      </div>
    </div>
  );
};

export default PlanningConsiderations;
