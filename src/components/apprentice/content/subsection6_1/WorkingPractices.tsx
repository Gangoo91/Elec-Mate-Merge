
import React from "react";
import { Wrench, ChevronRight } from "lucide-react";

const WorkingPractices = () => {
  return (
    <div className="space-y-4">
      <h3 className="text-2xl font-bold text-elec-yellow">Safe Working Practices for Electricians</h3>
      
      <p className="text-base md:text-lg mb-4">
        Safe working practices are essential for electricians to maintain safety for themselves, colleagues, and end-users. 
        Following established procedures helps prevent accidents, injuries, and property damage throughout electrical work activities.
      </p>
      
      <div className="bg-elec-dark border border-elec-yellow/20 rounded-lg p-4 md:p-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {/* Left Column */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="p-1.5 bg-elec-yellow/10 rounded">
                <Wrench className="h-5 w-5 text-elec-yellow" />
              </div>
              <h4 className="font-medium text-elec-yellow text-lg">Core Safety Principles</h4>
            </div>
            
            <div className="bg-elec-gray rounded-md p-3">
              <h5 className="font-medium text-elec-yellow text-base mb-1">Personal Safety</h5>
              <ul className="list-disc list-inside text-base space-y-1">
                <li>Always wear appropriate PPE for the task</li>
                <li>Maintain up-to-date safety training and qualifications</li>
                <li>Never work on live equipment unless absolutely necessary</li>
                <li>Follow safe isolation procedures before commencing work</li>
                <li>Take regular breaks to avoid fatigue-related errors</li>
              </ul>
            </div>
            
            <div className="bg-elec-gray rounded-md p-3">
              <h5 className="font-medium text-elec-yellow text-base mb-1">Site Safety</h5>
              <ul className="list-disc list-inside text-base space-y-1">
                <li>Secure the work area with barriers and signage</li>
                <li>Keep work areas clean and free from trip hazards</li>
                <li>Store tools and materials safely when not in use</li>
                <li>Dispose of waste materials in appropriate containers</li>
                <li>Maintain clear emergency exit routes at all times</li>
              </ul>
            </div>
          </div>
          
          {/* Right Column */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="p-1.5 bg-elec-yellow/10 rounded">
                <ChevronRight className="h-5 w-5 text-elec-yellow" />
              </div>
              <h4 className="font-medium text-elec-yellow text-lg">Procedural Safety</h4>
            </div>
            
            <div className="bg-elec-gray rounded-md p-3">
              <h5 className="font-medium text-elec-yellow text-base mb-1">Tool & Equipment Safety</h5>
              <ul className="list-disc list-inside text-base space-y-1">
                <li>Inspect tools and test equipment before each use</li>
                <li>Only use tools designed for electrical work</li>
                <li>Ensure tools are properly insulated and undamaged</li>
                <li>Maintain and calibrate test equipment regularly</li>
                <li>Never use damaged or makeshift tools</li>
                <li>Store tools properly to prevent damage</li>
              </ul>
            </div>
            
            <div className="bg-elec-gray rounded-md p-3">
              <h5 className="font-medium text-elec-yellow text-base mb-1">Communication</h5>
              <ul className="list-disc list-inside text-base space-y-1">
                <li>Brief all team members before commencing work</li>
                <li>Use clear, unambiguous language when giving instructions</li>
                <li>Report hazards immediately to supervisors</li>
                <li>Maintain clear communication during complex tasks</li>
                <li>Document all safety-related information</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="mt-4 p-4 bg-elec-dark/70 rounded-lg text-base">
          <p className="font-medium mb-1 text-elec-yellow">Regulatory Requirements:</p>
          <p>The Electricity at Work Regulations 1989 require that all reasonable steps must be taken to ensure that work activities 
          do not give rise to danger. This includes following proper procedures, using appropriate equipment, and ensuring all 
          workers are competent to carry out their assigned tasks safely.</p>
        </div>
      </div>
    </div>
  );
};

export default WorkingPractices;
