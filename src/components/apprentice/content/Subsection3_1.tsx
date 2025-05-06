
import React from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle, ShieldAlert, Zap, List } from "lucide-react";
import { SubsectionProps } from "./subsection1_1/types";

const Subsection3_1 = ({ 
  subsectionId, 
  isCompleted, 
  markAsComplete 
}: SubsectionProps) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-elec-yellow">Safe Isolation Procedures</h2>
      
      <div className="space-y-6">
        <p className="text-elec-light/80">
          Safe isolation is one of the most critical safety procedures in electrical work. It ensures that electrical equipment 
          or circuits are made dead before work begins, preventing the risk of electric shock, burns, or fatalities. 
          The essential steps of safe isolation must be followed without exception:
        </p>
        
        <div className="bg-elec-dark/50 border-l-4 border-amber-500 rounded-lg p-6 space-y-4">
          <h3 className="text-xl font-semibold text-amber-400 flex items-center">
            <ShieldAlert className="mr-2 h-5 w-5" /> The Essential Steps of Safe Isolation
          </h3>
          
          <ol className="list-decimal pl-6 space-y-4 text-elec-light/80">
            <li>
              <span className="font-semibold text-white">Identify</span> 
              <p className="mt-1">Correctly identify the circuit or equipment to be worked on, using diagrams, labels or drawings.</p>
            </li>
            <li>
              <span className="font-semibold text-white">Isolate</span> 
              <p className="mt-1">Switch off and securely lock the appropriate isolation device. This might be a circuit breaker, fused switch disconnector or plug.</p>
            </li>
            <li>
              <span className="font-semibold text-white">Prove the voltage indicator</span> 
              <p className="mt-1">Test your voltage indication device on a known live source to ensure it's working correctly.</p>
            </li>
            <li>
              <span className="font-semibold text-white">Test dead</span> 
              <p className="mt-1">Use the proven voltage indicator to verify the circuit or equipment is dead at all possible points of supply.</p>
            </li>
            <li>
              <span className="font-semibold text-white">Reprove the voltage indicator</span> 
              <p className="mt-1">Test your voltage indication device again on a known live source to confirm it was working during your test.</p>
            </li>
            <li>
              <span className="font-semibold text-white">Lock off and apply warning labels</span> 
              <p className="mt-1">Secure isolation devices with locks and place appropriate warning notices to prevent reconnection.</p>
            </li>
            <li>
              <span className="font-semibold text-white">Issue permit-to-work (if required)</span> 
              <p className="mt-1">For complex systems or where multiple parties are involved, issue formal documentation.</p>
            </li>
          </ol>
        </div>
        
        <div className="bg-elec-dark/60 border border-elec-yellow/20 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-elec-yellow flex items-center mb-4">
            <Zap className="mr-2 h-5 w-5" /> Isolation Equipment
          </h3>
          
          <p className="text-elec-light/80 mb-4">
            Proper isolation equipment includes:
          </p>
          
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-white">Voltage Indication Devices</h4>
              <ul className="list-disc pl-6 text-elec-light/80 mt-1">
                <li>Must comply with GS38 requirements</li>
                <li>Suitable for the voltage range being tested</li>
                <li>Incorporate built-in test functionality</li>
                <li>Properly insulated probes with finger guards</li>
                <li>Regularly calibrated and inspected before use</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-white">Locking Off Equipment</h4>
              <ul className="list-disc pl-6 text-elec-light/80 mt-1">
                <li>MCB lock-off devices</li>
                <li>Hasp and staple locks</li>
                <li>Padlocks with unique keys</li>
                <li>Circuit breaker locking kits</li>
                <li>Multi-lock hasps for group isolation</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-white">Warning Notices</h4>
              <ul className="list-disc pl-6 text-elec-light/80 mt-1">
                <li>"Do Not Switch On" signs</li>
                <li>"Danger - Work in Progress" notices</li>
                <li>"Men at Work" warnings</li>
                <li>Custom signs with contact information</li>
                <li>Lockout tags attached to locks</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="bg-elec-dark/50 border border-elec-yellow/30 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-elec-yellow flex items-center mb-4">
            <List className="mr-2 h-5 w-5" /> Special Considerations
          </h3>
          
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-white">Multiple Points of Supply</h4>
              <p className="text-elec-light/80 mt-1">
                Some circuits or equipment may have multiple sources of electrical energy:
              </p>
              <ul className="list-disc pl-6 text-elec-light/80 mt-2">
                <li>Backup generators or UPS systems</li>
                <li>Solar PV or other embedded generation</li>
                <li>Dual supply arrangements</li>
                <li>Voltage transformers</li>
                <li>Capacitors that may hold charge</li>
              </ul>
              <p className="text-elec-light/80 mt-2">
                All potential sources must be identified and isolated before work begins.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold text-white">Proving Units</h4>
              <p className="text-elec-light/80 mt-1">
                When a known live source is not available for proving your voltage indicator:
              </p>
              <ul className="list-disc pl-6 text-elec-light/80 mt-2">
                <li>Use a dedicated proving unit that generates a suitable test voltage</li>
                <li>Follow the same procedure: prove, test, reprove</li>
                <li>Ensure the proving unit is within calibration</li>
                <li>Check batteries are adequately charged</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-white">Remote or Concealed Equipment</h4>
              <p className="text-elec-light/80 mt-1">
                For equipment where isolation points may be remote or accessible to others:
              </p>
              <ul className="list-disc pl-6 text-elec-light/80 mt-2">
                <li>Use additional locks and warning notices at all access points</li>
                <li>Consider using barriers to prevent access to isolated areas</li>
                <li>Implement a formal permit-to-work system</li>
                <li>Ensure clear communication between all affected parties</li>
              </ul>
            </div>
          </div>
          
          <div className="bg-amber-900/20 border-l-4 border-amber-500 p-4 mt-6 rounded-r-lg">
            <p className="text-amber-400 font-semibold">IMPORTANT:</p>
            <p className="text-elec-light/80 mt-1">
              Never work on live electrical systems unless it is unavoidable, properly justified and 
              authorised through risk assessment. The Electricity at Work Regulations 1989 require that 
              work on or near live conductors should not be undertaken unless:
            </p>
            <ul className="list-disc pl-6 text-elec-light/80 mt-2">
              <li>It is unreasonable for the equipment to be dead</li>
              <li>It is reasonable for the work to be done live</li>
              <li>Suitable precautions are taken to prevent injury</li>
            </ul>
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

export default Subsection3_1;
