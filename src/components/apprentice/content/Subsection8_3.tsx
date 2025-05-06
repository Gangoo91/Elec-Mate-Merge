
import React from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle, Shield, Bolt, Zap } from "lucide-react";

interface Subsection8_3Props {
  subsectionId: string;
  isCompleted: boolean;
  markAsComplete: () => void;
}

const Subsection8_3 = ({ subsectionId, isCompleted, markAsComplete }: Subsection8_3Props) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-elec-yellow">Protection Against Overcurrent</h2>
      
      <div className="space-y-4">
        <p>
          Overcurrent protection safeguards conductors from excessive current that could cause overheating and fire.
          This protection must detect and disconnect circuits in both overload and short-circuit conditions.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div className="bg-elec-dark/50 border border-elec-yellow/30 rounded-lg p-6 space-y-4">
            <h3 className="text-xl font-bold text-elec-yellow flex items-center">
              <Shield className="h-5 w-5 mr-2" />
              Overload Protection
            </h3>
            <div className="space-y-3">
              <h4 className="font-semibold">Protection Requirements</h4>
              <ul className="list-disc pl-5 space-y-2">
                <li>Required for all circuits except where disconnection causes greater danger</li>
                <li>Device characteristics must satisfy: Ib ≤ In ≤ Iz</li>
                <li>Operating current I₂ ≤ 1.45 × Iz</li>
                <li>Placed at origin of circuit or change in cross-sectional area/rating</li>
                <li>Exception cases for specific applications (safety circuits, etc.)</li>
              </ul>
              
              <h4 className="font-semibold mt-4">Protective Devices</h4>
              <ul className="list-disc pl-5 space-y-2">
                <li>Circuit breakers with overload protection (MCBs, MCCBs)</li>
                <li>Fuses (gG type for general applications)</li>
                <li>Thermal-magnetic protection for motor circuits</li>
                <li>Thermal relays and electronic overload protection</li>
                <li>Selection based on load characteristics and system requirements</li>
              </ul>
              
              <div className="mt-4 pt-4 border-t border-elec-yellow/20">
                <h4 className="font-semibold text-elec-yellow mb-2">Typical Circuit Ratings:</h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Lighting circuits: 6A or 10A</li>
                  <li>Socket outlet ring circuits: 30/32A</li>
                  <li>Socket outlet radial circuits: 20A (2.5mm²) or 32A (4.0mm²)</li>
                  <li>Cooker circuits: 32A or 45A depending on rating</li>
                  <li>Electric shower: Sized according to power rating</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="bg-elec-dark/50 border border-elec-yellow/30 rounded-lg p-6 space-y-4">
            <h3 className="text-xl font-bold text-elec-yellow flex items-center">
              <Bolt className="h-5 w-5 mr-2" />
              Short-Circuit Protection
            </h3>
            <div className="space-y-3">
              <h4 className="font-semibold">Protection Characteristics</h4>
              <ul className="list-disc pl-5 space-y-2">
                <li>Breaking capacity must exceed maximum prospective short-circuit current</li>
                <li>Protective device must operate before conductors reach limiting temperature</li>
                <li>Fault current energy (I²t) must be less than conductor withstand capacity (k²S²)</li>
                <li>Verification at all points in the circuit (not just origin)</li>
                <li>Protection against both phase-phase and phase-earth faults</li>
              </ul>
              
              <h4 className="font-semibold mt-4">Fault Current Calculation</h4>
              <ul className="list-disc pl-5 space-y-2">
                <li>Impedance method for accurate calculation</li>
                <li>Point-to-point method for simplified assessments</li>
                <li>Supply impedance (Ze) consideration</li>
                <li>Cable impedance effects on fault levels</li>
                <li>Minimum fault current verification for reliable operation</li>
              </ul>
              
              <div className="mt-4 pt-4 border-t border-elec-yellow/20">
                <h4 className="font-semibold text-elec-yellow mb-2">Back-up Protection:</h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Cascading protection for high fault levels</li>
                  <li>Energy-limiting Class II fuses</li>
                  <li>Current-limiting circuit breakers</li>
                  <li>Manufacturer-verified combinations</li>
                  <li>Conditional short-circuit rating approach</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-8 bg-elec-dark/30 border border-elec-yellow/20 rounded-lg p-6">
          <h3 className="text-xl font-bold text-elec-yellow mb-4 flex items-center">
            <Zap className="h-5 w-5 mr-2" />
            Coordination and Selectivity
          </h3>
          
          <div className="space-y-4">
            <p>Proper coordination ensures effective protection while minimizing disruption:</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h4 className="font-semibold text-white">Selectivity (Discrimination)</h4>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    <span className="font-medium">Current-based selectivity</span>
                    <p className="text-sm mt-1">Upstream device set higher than downstream device</p>
                  </li>
                  <li>
                    <span className="font-medium">Time-based selectivity</span>
                    <p className="text-sm mt-1">Deliberate time delay in upstream device operation</p>
                  </li>
                  <li>
                    <span className="font-medium">Zone selectivity</span>
                    <p className="text-sm mt-1">Communication between protective devices</p>
                  </li>
                  <li>
                    <span className="font-medium">Energy-based selectivity</span>
                    <p className="text-sm mt-1">Consideration of let-through energy (I²t)</p>
                  </li>
                </ul>
              </div>
              
              <div className="space-y-3">
                <h4 className="font-semibold text-white">Protective Device Selection</h4>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    <span className="font-medium">Type B, C, and D circuit breakers</span>
                    <p className="text-sm mt-1">Selection based on load type and inrush characteristics</p>
                  </li>
                  <li>
                    <span className="font-medium">Type gG and aM fuses</span>
                    <p className="text-sm mt-1">General purpose and motor-rated applications</p>
                  </li>
                  <li>
                    <span className="font-medium">RCBOs</span>
                    <p className="text-sm mt-1">Combined overcurrent and earth fault protection</p>
                  </li>
                  <li>
                    <span className="font-medium">Electronic trip units</span>
                    <p className="text-sm mt-1">Adjustable protection settings for precise coordination</p>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="mt-4 p-4 bg-elec-dark/70 rounded-lg text-sm">
              <p className="font-medium mb-1 text-elec-yellow">Regulatory Note:</p>
              <p>BS 7671 Chapter 43 details the requirements for protection against overcurrent. Section 433 addresses protection against overload current, while Section 434 addresses protection against short-circuit current. Documentation of overcurrent protective device selection is essential for verification and certification of the installation.</p>
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

export default Subsection8_3;
