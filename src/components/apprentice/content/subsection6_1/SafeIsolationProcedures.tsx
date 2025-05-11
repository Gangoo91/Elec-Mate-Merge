
import React from "react";
import { Lock, CheckSquare2, ShieldAlert, CircleAlert } from "lucide-react";

const SafeIsolationProcedures = () => {
  return (
    <div className="space-y-4">
      <h3 className="text-2xl font-bold text-elec-yellow">Safe Isolation Procedures</h3>
      
      <p className="text-base md:text-lg mb-4">
        Safe isolation is a critical procedure that ensures electrical systems are completely disconnected from their power 
        source before work begins. This process protects electricians from electric shock, arc flash, and other electrical hazards.
      </p>
      
      <div className="bg-elec-dark border border-elec-yellow/20 rounded-lg overflow-hidden">
        {/* Header with banner */}
        <div className="bg-elec-yellow/10 p-4 flex items-center gap-3 border-b border-elec-yellow/20">
          <div className="p-2 bg-elec-yellow/20 rounded-full">
            <Lock className="h-6 w-6 text-elec-yellow" />
          </div>
          <h4 className="font-semibold text-xl text-elec-yellow">The Safe Isolation Process</h4>
        </div>
        
        <div className="p-5 md:p-6">
          {/* Main content grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left column */}
            <div className="space-y-5">
              <div className="bg-gradient-to-r from-elec-gray to-elec-gray/80 rounded-lg p-4">
                <h5 className="flex items-center gap-2 font-medium text-elec-yellow text-lg mb-3">
                  <span className="bg-elec-yellow/10 p-1.5 rounded-md flex items-center justify-center w-7 h-7">1</span>
                  Preparation
                </h5>
                <ul className="space-y-2 text-base">
                  <li className="flex items-start gap-2">
                    <CheckSquare2 className="h-5 w-5 text-elec-yellow shrink-0 mt-0.5" />
                    <span>Obtain permission to isolate from the appropriate authority</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckSquare2 className="h-5 w-5 text-elec-yellow shrink-0 mt-0.5" />
                    <span>Identify the correct circuit or equipment to be isolated</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckSquare2 className="h-5 w-5 text-elec-yellow shrink-0 mt-0.5" />
                    <span>Check isolation equipment is in good condition and properly calibrated</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-gradient-to-r from-elec-gray to-elec-gray/80 rounded-lg p-4">
                <h5 className="flex items-center gap-2 font-medium text-elec-yellow text-lg mb-3">
                  <span className="bg-elec-yellow/10 p-1.5 rounded-md flex items-center justify-center w-7 h-7">2</span>
                  Isolation
                </h5>
                <ul className="space-y-2 text-base">
                  <li className="flex items-start gap-2">
                    <CheckSquare2 className="h-5 w-5 text-elec-yellow shrink-0 mt-0.5" />
                    <span>Switch off the identified circuit or equipment</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckSquare2 className="h-5 w-5 text-elec-yellow shrink-0 mt-0.5" />
                    <span>Lock the isolation point with an appropriate lock-off device</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckSquare2 className="h-5 w-5 text-elec-yellow shrink-0 mt-0.5" />
                    <span>Apply warning tags with your name, contact details, and date</span>
                  </li>
                </ul>
              </div>
            </div>
            
            {/* Right column */}
            <div className="space-y-5">
              <div className="bg-gradient-to-r from-elec-gray to-elec-gray/80 rounded-lg p-4">
                <h5 className="flex items-center gap-2 font-medium text-elec-yellow text-lg mb-3">
                  <span className="bg-elec-yellow/10 p-1.5 rounded-md flex items-center justify-center w-7 h-7">3</span>
                  Verification
                </h5>
                <ul className="space-y-2 text-base">
                  <li className="flex items-start gap-2">
                    <CheckSquare2 className="h-5 w-5 text-elec-yellow shrink-0 mt-0.5" />
                    <span>Test the voltage tester on a known live source</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckSquare2 className="h-5 w-5 text-elec-yellow shrink-0 mt-0.5" />
                    <span>Confirm the isolated circuit is dead using approved voltage indicator</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckSquare2 className="h-5 w-5 text-elec-yellow shrink-0 mt-0.5" />
                    <span>Verify the voltage tester is working by testing again on a known live source</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-gradient-to-r from-elec-gray to-elec-gray/80 rounded-lg p-4">
                <h5 className="flex items-center gap-2 font-medium text-elec-yellow text-lg mb-3">
                  <span className="bg-elec-yellow/10 p-1.5 rounded-md flex items-center justify-center w-7 h-7">4</span>
                  Security & Completion
                </h5>
                <ul className="space-y-2 text-base">
                  <li className="flex items-start gap-2">
                    <CheckSquare2 className="h-5 w-5 text-elec-yellow shrink-0 mt-0.5" />
                    <span>Secure the work area to prevent unauthorized access</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckSquare2 className="h-5 w-5 text-elec-yellow shrink-0 mt-0.5" />
                    <span>Only remove lock-off devices when all work is completed</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckSquare2 className="h-5 w-5 text-elec-yellow shrink-0 mt-0.5" />
                    <span>Check area is clear before reinstating power</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          
          {/* Safety box */}
          <div className="mt-6 bg-elec-dark/80 rounded-lg border border-red-400/30 p-4">
            <div className="flex items-center gap-2 mb-2">
              <ShieldAlert className="h-5 w-5 text-red-400" />
              <h5 className="text-red-400 font-medium">Critical Safety Points</h5>
            </div>
            
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
              <li className="flex items-start gap-2">
                <CircleAlert className="h-4 w-4 text-red-400 shrink-0 mt-0.5" />
                <span className="text-sm">Never rely on isolation devices without verification</span>
              </li>
              <li className="flex items-start gap-2">
                <CircleAlert className="h-4 w-4 text-red-400 shrink-0 mt-0.5" />
                <span className="text-sm">Always perform the live-dead-live test sequence</span>
              </li>
              <li className="flex items-start gap-2">
                <CircleAlert className="h-4 w-4 text-red-400 shrink-0 mt-0.5" />
                <span className="text-sm">Use your own lock and keep the key with you</span>
              </li>
              <li className="flex items-start gap-2">
                <CircleAlert className="h-4 w-4 text-red-400 shrink-0 mt-0.5" />
                <span className="text-sm">Never work on equipment that you haven't personally verified</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SafeIsolationProcedures;
