
import React from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle, CircuitBoard, Activity, Cable } from "lucide-react";

interface Subsection9_2Props {
  subsectionId: string;
  isCompleted: boolean;
  markAsComplete: () => void;
}

const Subsection9_2 = ({ subsectionId, isCompleted, markAsComplete }: Subsection9_2Props) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-elec-yellow">Testing Procedures</h2>
      
      <div className="space-y-4">
        <p>
          Testing procedures verify the safety and compliance of electrical installations. Following the correct 
          sequence and methods ensures accurate results and identifies potential issues before energization.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div className="bg-elec-dark/50 border border-elec-yellow/30 rounded-lg p-6 space-y-4">
            <h3 className="text-xl font-bold text-elec-yellow flex items-center">
              <Cable className="h-5 w-5 mr-2" />
              Dead Testing
            </h3>
            <div className="space-y-3">
              <h4 className="font-semibold">Continuity Testing</h4>
              <ul className="list-disc pl-5 space-y-2">
                <li>Protective conductor continuity (R₂ values)</li>
                <li>Main and supplementary bonding continuity</li>
                <li>Ring final circuit continuity (L-L, N-N, CPC-CPC)</li>
                <li>Test methods: long lead or R₁+R₂ measurement</li>
                <li>Low resistance ohmmeter with minimum 200mA test current</li>
              </ul>
              
              <h4 className="font-semibold mt-4">Insulation Resistance Testing</h4>
              <ul className="list-disc pl-5 space-y-2">
                <li>Test voltage: 500V DC for installations up to 500V</li>
                <li>Minimum acceptable values: 1MΩ for circuits up to 500V</li>
                <li>Testing between live conductors and earth</li>
                <li>Testing between all live conductors</li>
                <li>Precautions for electronic equipment</li>
              </ul>
              
              <div className="mt-4 pt-4 border-t border-elec-yellow/20">
                <h4 className="font-semibold text-elec-yellow mb-2">Special Tests:</h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li>SELV and PELV circuit separation verification</li>
                  <li>Electrical separation verification</li>
                  <li>Floor and wall resistance testing (if required)</li>
                  <li>Polarization of Edison screw lampholders</li>
                  <li>Verification of barriers and enclosures</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="bg-elec-dark/50 border border-elec-yellow/30 rounded-lg p-6 space-y-4">
            <h3 className="text-xl font-bold text-elec-yellow flex items-center">
              <Activity className="h-5 w-5 mr-2" />
              Live Testing
            </h3>
            <div className="space-y-3">
              <h4 className="font-semibold">Polarity</h4>
              <ul className="list-disc pl-5 space-y-2">
                <li>Verification of correct connection of line, neutral, and earth</li>
                <li>Center contact of lampholders connected to line conductor</li>
                <li>Single-pole devices in line conductor only</li>
                <li>Correct connection of socket outlets</li>
                <li>Verification at distribution boards and final outlets</li>
              </ul>
              
              <h4 className="font-semibold mt-4">Earth Fault Loop Impedance</h4>
              <ul className="list-disc pl-5 space-y-2">
                <li>Verification that values are within limits for protection device</li>
                <li>External Ze measurement at origin</li>
                <li>Zs measurement at furthest point of each circuit</li>
                <li>Consideration of temperature correction factors</li>
                <li>R1+R2 method as alternative in certain cases</li>
              </ul>
              
              <div className="mt-4 pt-4 border-t border-elec-yellow/20">
                <h4 className="font-semibold text-elec-yellow mb-2">Additional Live Tests:</h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li>RCD functional testing (× ½, ×1, ×5 rated tripping current)</li>
                  <li>Prospective fault current (PFC) measurement</li>
                  <li>Phase sequence verification (three-phase systems)</li>
                  <li>Functional testing of assemblies and controls</li>
                  <li>Voltage drop verification (if required)</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-8 bg-elec-dark/30 border border-elec-yellow/20 rounded-lg p-6">
          <h3 className="text-xl font-bold text-elec-yellow mb-4 flex items-center">
            <CircuitBoard className="h-5 w-5 mr-2" />
            Testing Methods and Interpretation
          </h3>
          
          <div className="space-y-4">
            <p>Accurate test methods and correct interpretation of results are critical:</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h4 className="font-semibold text-white">Test Equipment Selection</h4>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    <span className="font-medium">Low resistance ohmmeter</span>
                    <p className="text-sm mt-1">Resolution: 0.01Ω, test current: minimum 200mA</p>
                  </li>
                  <li>
                    <span className="font-medium">Insulation resistance tester</span>
                    <p className="text-sm mt-1">500V DC output for low voltage systems</p>
                  </li>
                  <li>
                    <span className="font-medium">Earth fault loop impedance tester</span>
                    <p className="text-sm mt-1">Resolution: 0.01Ω, accuracy: ±5%</p>
                  </li>
                  <li>
                    <span className="font-medium">RCD tester</span>
                    <p className="text-sm mt-1">Variable test currents, measurement of trip time</p>
                  </li>
                </ul>
              </div>
              
              <div className="space-y-3">
                <h4 className="font-semibold text-white">Result Interpretation</h4>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    <span className="font-medium">Continuity acceptable values</span>
                    <p className="text-sm mt-1">Low resistance values proportional to conductor length</p>
                  </li>
                  <li>
                    <span className="font-medium">Insulation resistance</span>
                    <p className="text-sm mt-1">Minimum 1MΩ for circuits ≤ 500V, 2MΩ for whole installation</p>
                  </li>
                  <li>
                    <span className="font-medium">Earth fault loop impedance</span>
                    <p className="text-sm mt-1">Compare against maximum value in device tables</p>
                  </li>
                  <li>
                    <span className="font-medium">RCD operation times</span>
                    <p className="text-sm mt-1">General: 300ms at In, S-type: 130-500ms at In</p>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="mt-4 p-4 bg-elec-dark/70 rounded-lg text-sm">
              <p className="font-medium mb-1 text-elec-yellow">Regulatory Note:</p>
              <p>BS 7671 Guidance Note 3 provides comprehensive information on testing procedures and interpretation of results. All test equipment must comply with the relevant standards, be well-maintained, and calibrated regularly. Tests must be carried out using appropriate methods to avoid misleading results. Test results must be recorded accurately on the appropriate certification forms.</p>
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

export default Subsection9_2;
