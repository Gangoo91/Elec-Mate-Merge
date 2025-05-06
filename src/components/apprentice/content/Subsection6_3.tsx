
import React from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle, Cable, ShieldAlert, Bolt } from "lucide-react";

interface Subsection6_3Props {
  subsectionId: string;
  isCompleted: boolean;
  markAsComplete: () => void;
}

const Subsection6_3 = ({ subsectionId, isCompleted, markAsComplete }: Subsection6_3Props) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-elec-yellow">Common Faults and How to Identify Them</h2>
      
      <div className="space-y-4">
        <p>
          Fault finding is a systematic process of identifying and locating electrical problems.
          Effective fault finding requires understanding of circuit operation, systematic testing, and logical deduction.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div className="bg-elec-dark/50 border border-elec-yellow/30 rounded-lg p-6 space-y-4">
            <h3 className="text-xl font-bold text-elec-yellow flex items-center">
              <Cable className="h-5 w-5 mr-2" />
              Common Electrical Faults
            </h3>
            <div className="space-y-3">
              <h4 className="font-semibold">Open Circuit Faults</h4>
              <ul className="list-disc pl-5 space-y-2">
                <li>Break in the circuit preventing current flow</li>
                <li>Common causes: broken conductors, loose connections</li>
                <li>Symptoms: no operation, partial operation of circuit</li>
                <li>Higher resistance at connection points</li>
                <li>Test method: continuity testing of affected circuit</li>
              </ul>
              
              <h4 className="font-semibold mt-4">Short Circuit Faults</h4>
              <ul className="list-disc pl-5 space-y-2">
                <li>Direct contact between live conductors</li>
                <li>Causes immediate operation of protective device</li>
                <li>Often caused by damaged insulation</li>
                <li>Potentially dangerous due to high fault currents</li>
                <li>Test method: insulation resistance testing</li>
              </ul>
              
              <div className="mt-4 pt-4 border-t border-elec-yellow/20">
                <h4 className="font-semibold text-elec-yellow mb-2">Earth Faults:</h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Connection between live conductor and earth</li>
                  <li>May cause RCD operation without MCB tripping</li>
                  <li>Often caused by moisture ingress or insulation breakdown</li>
                  <li>Particular issue in damp environments</li>
                  <li>Test method: insulation resistance to earth</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="bg-elec-dark/50 border border-elec-yellow/30 rounded-lg p-6 space-y-4">
            <h3 className="text-xl font-bold text-elec-yellow flex items-center">
              <Bolt className="h-5 w-5 mr-2" />
              Fault Finding Methodology
            </h3>
            <div className="space-y-3">
              <h4 className="font-semibold">Systematic Approach</h4>
              <ul className="list-disc pl-5 space-y-2">
                <li>Gather information: when fault occurs, symptoms, circumstances</li>
                <li>Visual inspection: look for obvious damage or issues</li>
                <li>Circuit understanding: review diagrams and system operation</li>
                <li>Isolate problem: determine affected components or sections</li>
                <li>Testing: perform relevant electrical tests</li>
              </ul>
              
              <h4 className="font-semibold mt-4">Half-Split Technique</h4>
              <ul className="list-disc pl-5 space-y-2">
                <li>Start at middle of circuit and test</li>
                <li>Determine if fault is before or after test point</li>
                <li>Continue dividing the faulty section in half</li>
                <li>Narrows down location with minimum number of tests</li>
                <li>Particularly useful for long cable runs</li>
              </ul>
              
              <div className="mt-4 pt-4 border-t border-elec-yellow/20">
                <h4 className="font-semibold text-elec-yellow mb-2">Documentation:</h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Record all symptoms and test results</li>
                  <li>Note any temporary repairs or modifications</li>
                  <li>Update diagrams if circuit changes made</li>
                  <li>Document resolution for future reference</li>
                  <li>Maintain test equipment calibration records</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-8 bg-elec-dark/30 border border-elec-yellow/20 rounded-lg p-6">
          <h3 className="text-xl font-bold text-elec-yellow mb-4 flex items-center">
            <ShieldAlert className="h-5 w-5 mr-2" />
            Advanced Fault Finding Techniques
          </h3>
          
          <div className="space-y-4">
            <p>Beyond basic electrical testing, several advanced techniques can help identify complex faults:</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h4 className="font-semibold text-white">Specialized Test Equipment</h4>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    <span className="font-medium">Thermal imaging</span>
                    <p className="text-sm mt-1">Identifies hot spots indicating high resistance connections</p>
                  </li>
                  <li>
                    <span className="font-medium">Power quality analyzers</span>
                    <p className="text-sm mt-1">Detect issues with harmonics, voltage stability, power factor</p>
                  </li>
                  <li>
                    <span className="font-medium">Time domain reflectometers (TDR)</span>
                    <p className="text-sm mt-1">Locate cable faults by measuring reflected signals</p>
                  </li>
                  <li>
                    <span className="font-medium">Earth fault path analyzers</span>
                    <p className="text-sm mt-1">Trace earth fault current paths in complex systems</p>
                  </li>
                </ul>
              </div>
              
              <div className="space-y-3">
                <h4 className="font-semibold text-white">Specific Fault Scenarios</h4>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    <span className="font-medium">Nuisance tripping</span>
                    <p className="text-sm mt-1">Identifying causes of intermittent RCD operation</p>
                  </li>
                  <li>
                    <span className="font-medium">High resistance connections</span>
                    <p className="text-sm mt-1">Voltage drop tests under load to identify poor connections</p>
                  </li>
                  <li>
                    <span className="font-medium">Transient faults</span>
                    <p className="text-sm mt-1">Data logging to capture intermittent issues</p>
                  </li>
                  <li>
                    <span className="font-medium">Shared neutral problems</span>
                    <p className="text-sm mt-1">Identifying and resolving neutral current issues in circuits</p>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="mt-4 p-4 bg-elec-dark/70 rounded-lg text-sm">
              <p className="font-medium mb-1 text-elec-yellow">Safety Note:</p>
              <p>Always isolate circuits before investigating faults, unless live testing is absolutely necessary and appropriately risk assessed. When a fault is found and repaired, always perform verification tests to ensure the installation is safe before returning to service. This should include appropriate insulation resistance, continuity, and functional tests of the affected circuits.</p>
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

export default Subsection6_3;
