
import React from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle, Power, Lock, AlertOctagon } from "lucide-react";

interface Subsection6_1Props {
  subsectionId: string;
  isCompleted: boolean;
  markAsComplete: () => void;
}

const Subsection6_1 = ({ subsectionId, isCompleted, markAsComplete }: Subsection6_1Props) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-elec-yellow">Safe Isolation Procedures</h2>
      
      <div className="space-y-4">
        <p>
          Safe isolation is one of the most critical procedures in electrical work. It ensures that electrical
          equipment is disconnected from all sources of supply before work begins, preventing electric shock.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div className="bg-elec-dark/50 border border-elec-yellow/30 rounded-lg p-6 space-y-4">
            <h3 className="text-xl font-bold text-elec-yellow flex items-center">
              <Power className="h-5 w-5 mr-2" />
              The Safe Isolation Process
            </h3>
            <div className="space-y-3">
              <h4 className="font-semibold">Step-by-Step Procedure</h4>
              <ol className="list-decimal pl-5 space-y-2">
                <li>Identify the circuit or equipment to be worked on</li>
                <li>Obtain permission to isolate if necessary</li>
                <li>Identify all sources of supply</li>
                <li>Isolate using appropriate means (switch, circuit breaker, etc.)</li>
                <li>Secure the isolation using lock-off device and padlock</li>
                <li>Prove the voltage indicator on a known live source</li>
                <li>Test that the circuit/equipment is dead</li>
                <li>Re-prove the voltage indicator on a known live source</li>
                <li>Post warning signs where appropriate</li>
              </ol>
              
              <div className="mt-4 pt-4 border-t border-elec-yellow/20">
                <h4 className="font-semibold text-elec-yellow mb-2">Remember:</h4>
                <p className="text-sm font-medium">Never assume a circuit is dead – always TEST BEFORE TOUCH</p>
              </div>
            </div>
          </div>
          
          <div className="bg-elec-dark/50 border border-elec-yellow/30 rounded-lg p-6 space-y-4">
            <h3 className="text-xl font-bold text-elec-yellow flex items-center">
              <Lock className="h-5 w-5 mr-2" />
              Essential Equipment
            </h3>
            <div className="space-y-3">
              <h4 className="font-semibold">Required Tools</h4>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <span className="font-medium">GS38 Approved Voltage Indicator</span>
                  <p className="text-sm mt-1">Must comply with HSE Guidance Note GS38</p>
                </li>
                <li>
                  <span className="font-medium">Proving Unit</span>
                  <p className="text-sm mt-1">For testing the voltage indicator works correctly</p>
                </li>
                <li>
                  <span className="font-medium">Locking Off Devices</span>
                  <p className="text-sm mt-1">MCB lock-offs, fuse carriers, isolation switches</p>
                </li>
                <li>
                  <span className="font-medium">Padlocks with Unique Keys</span>
                  <p className="text-sm mt-1">Each worker should have their own padlock and key</p>
                </li>
                <li>
                  <span className="font-medium">Warning Signs</span>
                  <p className="text-sm mt-1">"Danger – Do Not Switch On – Work in Progress"</p>
                </li>
              </ul>
              
              <div className="mt-4 pt-4 border-t border-elec-yellow/20">
                <h4 className="font-semibold text-elec-yellow mb-2">Voltage Indicators:</h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Must be rated for the working voltage</li>
                  <li>Must be in good condition with no damage</li>
                  <li>Should have leads with minimal exposed metal</li>
                  <li>Must be tested before and after use</li>
                  <li>Should not rely on battery power alone</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-8 bg-elec-dark/30 border border-elec-yellow/20 rounded-lg p-6">
          <h3 className="text-xl font-bold text-elec-yellow mb-4 flex items-center">
            <AlertOctagon className="h-5 w-5 mr-2" />
            Special Considerations
          </h3>
          
          <div className="space-y-4">
            <p>Some situations require additional precautions during isolation:</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h4 className="font-semibold text-white">Multiple Supplies</h4>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    <span className="font-medium">Generator Backfeed</span>
                    <p className="text-sm mt-1">Auxiliary generators may backfeed even when main supply is isolated</p>
                  </li>
                  <li>
                    <span className="font-medium">UPS Systems</span>
                    <p className="text-sm mt-1">Can continue to provide power after mains isolation</p>
                  </li>
                  <li>
                    <span className="font-medium">Solar PV</span>
                    <p className="text-sm mt-1">May generate electricity even when grid connection is isolated</p>
                  </li>
                  <li>
                    <span className="font-medium">Capacitors</span>
                    <p className="text-sm mt-1">Can store charge even after isolation</p>
                  </li>
                </ul>
              </div>
              
              <div className="space-y-3">
                <h4 className="font-semibold text-white">Multiple Workers</h4>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    <span className="font-medium">Multi-Locking Hasp</span>
                    <p className="text-sm mt-1">Allows multiple padlocks to secure a single isolation point</p>
                  </li>
                  <li>
                    <span className="font-medium">Permit-to-Work</span>
                    <p className="text-sm mt-1">Formal system for controlling work on complex systems</p>
                  </li>
                  <li>
                    <span className="font-medium">Communication</span>
                    <p className="text-sm mt-1">All workers must be informed when isolation occurs and before re-energizing</p>
                  </li>
                  <li>
                    <span className="font-medium">Sign-Off Procedures</span>
                    <p className="text-sm mt-1">Verify all work is complete before removing isolation</p>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="mt-4 p-4 bg-elec-dark/70 rounded-lg text-sm">
              <p className="font-medium mb-1 text-elec-yellow">Legal Requirements:</p>
              <p>The Electricity at Work Regulations 1989, Regulation 12 requires that "suitable means shall be available for cutting off the supply of electrical energy to any electrical equipment" and Regulation 13 requires precautions to be taken to prevent electrical equipment, which has been made dead, from becoming electrically charged during work.</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex justify-end pt-6 border-t border-elec-yellow/20">
        <Button
          variant="study"
          className={`${isCompleted ? 'bg-green-600/20 border-green-500/50 text-green-400' : 'hover:bg-elec-yellow hover:text-elec-dark'}`}
          onClick={markAsComplete}
          disabled={isCompleted}
        >
          {isCompleted ? 'Completed' : 'Mark as Complete'}
          {isCompleted && <CheckCircle className="ml-2 h-4 w-4" />}
        </Button>
      </div>
    </div>
  );
};

export default Subsection6_1;
