
import React from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle, Wrench, AlertTriangle } from "lucide-react";

interface Subsection3_2Props {
  subsectionId: string;
  isCompleted: boolean;
  markAsComplete: () => void;
}

const Subsection3_2 = ({ subsectionId, isCompleted, markAsComplete }: Subsection3_2Props) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-elec-yellow">Termination and Connection Methods</h2>
      
      <div className="space-y-5">
        <p>
          Proper termination and connection techniques are critical for electrical safety and system reliability.
          Incorrect terminations can lead to high resistance joints that overheat and potentially cause fires.
        </p>
        
        <div className="bg-elec-dark/50 border border-elec-yellow/30 rounded-lg p-6 space-y-5 mt-6">
          <h3 className="text-xl font-bold text-elec-yellow">Common Termination Methods</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3 border-l-2 border-elec-yellow/40 pl-4">
              <h4 className="font-semibold text-white">Screw Terminals</h4>
              <p>Widely used in wiring accessories and distribution boards. The conductor is inserted into a terminal and secured with a screw.</p>
              
              <div className="bg-elec-dark/70 p-3 rounded-md">
                <h5 className="text-sm font-semibold text-elec-yellow mb-2">Key Points:</h5>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li>Ensure correct stripping length (typically 10-12mm)</li>
                  <li>Terminal screws should be tightened to manufacturer's torque specification</li>
                  <li>Check that no copper strands remain outside the terminal</li>
                  <li>Avoid over-tightening that can damage conductors</li>
                </ul>
              </div>
            </div>
            
            <div className="space-y-3 border-l-2 border-elec-yellow/40 pl-4">
              <h4 className="font-semibold text-white">Spring-Loaded Terminals</h4>
              <p>Push-fit terminations that use spring pressure to maintain contact with the conductor.</p>
              
              <div className="bg-elec-dark/70 p-3 rounded-md">
                <h5 className="text-sm font-semibold text-elec-yellow mb-2">Key Points:</h5>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li>Ensure correct stripping length as specified</li>
                  <li>Insert the conductor fully into the terminal</li>
                  <li>For stranded conductors, consider ferrules for better connection</li>
                  <li>Check the release mechanism if conductor removal is needed</li>
                </ul>
              </div>
            </div>
            
            <div className="space-y-3 border-l-2 border-elec-yellow/40 pl-4">
              <h4 className="font-semibold text-white">Crimped Connections</h4>
              <p>Used for more permanent connections, especially in industrial settings or where vibration is present.</p>
              
              <div className="bg-elec-dark/70 p-3 rounded-md">
                <h5 className="text-sm font-semibold text-elec-yellow mb-2">Key Points:</h5>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li>Use the correct crimping tool for the terminal type</li>
                  <li>Match crimp terminal size to conductor size</li>
                  <li>Ensure the crimp deforms the terminal barrel correctly</li>
                  <li>Test the connection by pulling gently on the conductor</li>
                </ul>
              </div>
            </div>
            
            <div className="space-y-3 border-l-2 border-elec-yellow/40 pl-4">
              <h4 className="font-semibold text-white">Maintenance-Free Connectors</h4>
              <p>Connectors that don't require periodic retightening, such as Wago connectors.</p>
              
              <div className="bg-elec-dark/70 p-3 rounded-md">
                <h5 className="text-sm font-semibold text-elec-yellow mb-2">Key Points:</h5>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li>Select appropriate connector for the number and size of conductors</li>
                  <li>Follow manufacturer's guidelines for insertion</li>
                  <li>Ensure conductors are fully inserted into the connector</li>
                  <li>Verify the connection by gently pulling on each conductor</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-8 bg-elec-dark/30 border border-elec-yellow/20 rounded-lg p-6">
          <div className="flex items-center gap-3 mb-4">
            <AlertTriangle className="h-6 w-6 text-elec-yellow" />
            <h3 className="text-xl font-bold text-elec-yellow">Common Termination Errors</h3>
          </div>
          
          <div className="space-y-4">
            <p>Be aware of these common termination issues that can lead to failures:</p>
            
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="bg-red-500/20 p-1 rounded-full mt-1">
                  <Wrench className="h-4 w-4 text-red-400" />
                </div>
                <div>
                  <span className="font-semibold text-white">Insufficient Tightening</span>
                  <p className="mt-1">Loose connections create high resistance points that can overheat and potentially cause fires.</p>
                </div>
              </li>
              
              <li className="flex items-start gap-3">
                <div className="bg-red-500/20 p-1 rounded-full mt-1">
                  <Wrench className="h-4 w-4 text-red-400" />
                </div>
                <div>
                  <span className="font-semibold text-white">Over-Tightening</span>
                  <p className="mt-1">Can damage terminals and conductors, leading to eventual failure of the connection.</p>
                </div>
              </li>
              
              <li className="flex items-start gap-3">
                <div className="bg-red-500/20 p-1 rounded-full mt-1">
                  <Wrench className="h-4 w-4 text-red-400" />
                </div>
                <div>
                  <span className="font-semibold text-white">Improper Stripping</span>
                  <p className="mt-1">Too much insulation removed can leave bare conductors exposed; too little prevents proper contact.</p>
                </div>
              </li>
              
              <li className="flex items-start gap-3">
                <div className="bg-red-500/20 p-1 rounded-full mt-1">
                  <Wrench className="h-4 w-4 text-red-400" />
                </div>
                <div>
                  <span className="font-semibold text-white">Mixed Metals</span>
                  <p className="mt-1">Connecting dissimilar metals can lead to galvanic corrosion and eventual connection failure.</p>
                </div>
              </li>
              
              <li className="flex items-start gap-3">
                <div className="bg-red-500/20 p-1 rounded-full mt-1">
                  <Wrench className="h-4 w-4 text-red-400" />
                </div>
                <div>
                  <span className="font-semibold text-white">Damaged Conductors</span>
                  <p className="mt-1">Nicked or partially cut conductors have reduced cross-sectional area, creating high resistance points.</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-6 bg-elec-dark/40 border border-elec-yellow/20 rounded-lg p-6">
          <h3 className="text-xl font-bold text-elec-yellow mb-4">Best Practices for Reliable Connections</h3>
          
          <ol className="list-decimal pl-5 space-y-3">
            <li>
              <span className="font-semibold text-white">Use appropriate tools</span>
              <p className="mt-1">Always use the correct tools for stripping, crimping, and tightening connections.</p>
            </li>
            <li>
              <span className="font-semibold text-white">Follow manufacturer specifications</span>
              <p className="mt-1">Adhere to torque settings and installation methods specified by equipment manufacturers.</p>
            </li>
            <li>
              <span className="font-semibold text-white">Perform visual inspections</span>
              <p className="mt-1">Check for correct stripping, proper seating, and absence of stray strands before finalizing connections.</p>
            </li>
            <li>
              <span className="font-semibold text-white">Conduct pull tests</span>
              <p className="mt-1">Gently tug on terminated conductors to ensure they're securely connected.</p>
            </li>
            <li>
              <span className="font-semibold text-white">Check for temperature rise</span>
              <p className="mt-1">After energizing, monitor terminals for abnormal temperature increases that could indicate poor connections.</p>
            </li>
          </ol>
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

export default Subsection3_2;
