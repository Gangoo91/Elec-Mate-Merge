
import React from "react";
import { Flame, FileText, ShieldAlert } from "lucide-react";

const FireSafety = () => {
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold text-elec-yellow">Fire Safety for Electrical Environments</h3>
      
      <p className="text-sm md:text-base mb-4">
        Electrical fires require specific response procedures due to their unique hazards. Understanding the 
        correct extinguishing methods and preventive measures is essential for all electrical workers.
      </p>
      
      <div className="bg-elec-dark border border-elec-yellow/20 rounded-lg p-4 md:p-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {/* Left Column */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="p-1.5 bg-elec-yellow/10 rounded">
                <Flame className="h-5 w-5 text-elec-yellow" />
              </div>
              <h4 className="font-medium text-elec-yellow">Fire Classification & Extinguishers</h4>
            </div>
            
            <div className="bg-elec-gray rounded-md p-3">
              <h5 className="font-medium text-elec-yellow text-sm mb-1">Electrical Fires (Class E/C)</h5>
              <p className="text-sm mb-2">Electrical fires are classified as Class E (UK) or Class C (EU) fires. They require specific extinguishing agents that do not conduct electricity.</p>
              
              <h6 className="font-medium text-white text-xs mt-3 mb-1">Appropriate Extinguishers:</h6>
              <ul className="list-disc list-inside text-sm space-y-1">
                <li><span className="text-elec-yellow">CO₂ extinguishers</span> - Primary choice for electrical fires</li>
                <li><span className="text-elec-yellow">Dry powder</span> - Effective but causes significant mess</li>
                <li className="text-red-400">NEVER use water or foam extinguishers on live electrical equipment</li>
              </ul>
            </div>
            
            <div className="bg-elec-gray rounded-md p-3">
              <h5 className="font-medium text-elec-yellow text-sm mb-1">Fire Extinguisher Operation (PASS)</h5>
              <ol className="list-decimal list-inside text-sm space-y-1">
                <li><span className="font-medium">P</span>ull the pin</li>
                <li><span className="font-medium">A</span>im at the base of the fire</li>
                <li><span className="font-medium">S</span>queeze the handle</li>
                <li><span className="font-medium">S</span>weep from side to side</li>
              </ol>
              
              <p className="text-sm mt-2">Only attempt to fight small, contained fires if it is safe to do so and you have a clear escape route.</p>
            </div>
          </div>
          
          {/* Right Column */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="p-1.5 bg-elec-yellow/10 rounded">
                <ShieldAlert className="h-5 w-5 text-elec-yellow" />
              </div>
              <h4 className="font-medium text-elec-yellow">Fire Prevention & Response</h4>
            </div>
            
            <div className="bg-elec-gray rounded-md p-3">
              <h5 className="font-medium text-elec-yellow text-sm mb-1">Preventive Measures</h5>
              <ul className="list-disc list-inside text-sm space-y-1">
                <li>Regular inspection and maintenance of electrical equipment</li>
                <li>Avoid overloading circuits and extension leads</li>
                <li>Proper cable management to prevent damage</li>
                <li>Keep flammable materials away from electrical equipment</li>
                <li>Switch off and unplug equipment when not in use</li>
                <li>Use RCDs for additional protection</li>
              </ul>
            </div>
            
            <div className="bg-elec-gray rounded-md p-3">
              <h5 className="font-medium text-elec-yellow text-sm mb-1">Response Procedures</h5>
              <ol className="list-decimal list-inside text-sm space-y-1">
                <li>Raise the alarm immediately</li>
                <li>If safe, disconnect power to affected equipment</li>
                <li>Evacuate the area if fire cannot be controlled</li>
                <li>Close doors and windows to contain fire if safe to do so</li>
                <li>Call fire brigade (999) even if fire appears extinguished</li>
                <li>Never re-enter a building until authorised</li>
              </ol>
            </div>
            
            <div className="bg-elec-gray rounded-md p-3">
              <h5 className="font-medium text-elec-yellow text-sm mb-1">Post-Fire Investigation</h5>
              <ul className="list-disc list-inside text-sm space-y-1">
                <li>All electrical fires must be formally reported</li>
                <li>Equipment involved should not be used until inspected</li>
                <li>Root cause analysis should be conducted</li>
                <li>Update risk assessments based on findings</li>
                <li>Implement preventive measures to avoid recurrence</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="mt-4 p-4 bg-elec-dark/70 rounded-lg text-sm">
          <div className="flex items-start gap-3">
            <FileText className="h-5 w-5 text-elec-yellow mt-1 flex-shrink-0" />
            <div>
              <p className="font-medium mb-1 text-elec-yellow">Legal Requirements:</p>
              <p>The Regulatory Reform (Fire Safety) Order 2005 requires employers to conduct fire risk assessments, 
              provide appropriate firefighting equipment, and ensure workers are trained in fire safety procedures. 
              All electrical workers should be familiar with the specific requirements for electrical fire safety, including 
              the locations of fire extinguishers, fire alarm call points, and emergency exits.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FireSafety;
