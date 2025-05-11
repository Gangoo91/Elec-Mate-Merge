
import React from "react";
import { AlertTriangle, Users, ArrowRight } from "lucide-react";

const EmergencyProcedures = () => {
  return (
    <div className="space-y-4">
      <h3 className="text-2xl font-bold text-elec-yellow">Emergency Response Procedures</h3>
      
      <p className="text-base md:text-lg mb-4">
        Every workplace must have clearly defined emergency procedures that all workers understand and can follow under pressure. 
        Knowing what to do during an emergency can prevent injuries and save lives.
      </p>
      
      <div className="bg-elec-dark border border-elec-yellow/20 rounded-lg p-4 md:p-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {/* Left Column */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="p-1.5 bg-elec-yellow/10 rounded">
                <AlertTriangle className="h-5 w-5 text-elec-yellow" />
              </div>
              <h4 className="font-medium text-elec-yellow text-lg">Evacuation Procedures</h4>
            </div>
            
            <div className="bg-elec-gray rounded-md p-3">
              <h5 className="font-medium text-elec-yellow text-base mb-1">Primary Evacuation Steps</h5>
              <ol className="list-decimal list-inside text-base space-y-1">
                <li>Raise the alarm according to site protocols</li>
                <li>Immediately stop all work activities</li>
                <li>Secure equipment if safe to do so (quick shutdown)</li>
                <li>Follow designated evacuation routes to assembly points</li>
                <li>Do not use lifts during evacuations</li>
              </ol>
            </div>
            
            <div className="bg-elec-gray rounded-md p-3">
              <h5 className="font-medium text-elec-yellow text-base mb-1">Assembly Points</h5>
              <ul className="list-disc list-inside text-base space-y-1">
                <li>Know the location of primary and secondary assembly points</li>
                <li>Report to the fire warden or supervisor</li>
                <li>Participate in head counts to ensure all personnel are accounted for</li>
                <li>Remain at assembly points until the 'all clear' is given</li>
                <li>Follow instructions from emergency services personnel</li>
              </ul>
            </div>
          </div>
          
          {/* Right Column */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="p-1.5 bg-elec-yellow/10 rounded">
                <Users className="h-5 w-5 text-elec-yellow" />
              </div>
              <h4 className="font-medium text-elec-yellow text-lg">Emergency Response Roles</h4>
            </div>
            
            <div className="bg-elec-gray rounded-md p-3">
              <h5 className="font-medium text-elec-yellow text-base mb-1">Key Personnel</h5>
              <ul className="list-disc list-inside text-base space-y-1">
                <li><span className="text-elec-yellow">Fire Wardens:</span> Coordinate evacuations and conduct head counts</li>
                <li><span className="text-elec-yellow">First Aiders:</span> Provide immediate medical assistance</li>
                <li><span className="text-elec-yellow">Site Supervisors:</span> Liaise with emergency services</li>
                <li><span className="text-elec-yellow">Safety Officers:</span> Evaluate incident and manage post-incident procedures</li>
              </ul>
            </div>
            
            <div className="bg-elec-gray rounded-md p-3">
              <h5 className="font-medium text-elec-yellow text-base mb-1">Emergency Communication</h5>
              <ul className="list-disc list-inside text-base space-y-1">
                <li>Use emergency call points when applicable</li>
                <li>Contact emergency services: 999 (UK) or 112 (EU)</li>
                <li>Clearly state location, nature of emergency, and casualties</li>
                <li>Use two-way radios if available for on-site communication</li>
                <li>Follow communication chain of command</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="mt-4 p-4 bg-elec-dark/70 rounded-lg text-base">
          <p className="font-medium mb-1 text-elec-yellow">Regulatory Requirements:</p>
          <p>Under the Health and Safety (First-Aid) Regulations 1981 and the Regulatory Reform (Fire Safety) Order 2005, 
          employers must ensure adequate emergency procedures are established and communicated to all employees. This includes 
          creating evacuation plans, designating emergency exits, establishing assembly points, and conducting regular drills.</p>
        </div>
      </div>
    </div>
  );
};

export default EmergencyProcedures;
