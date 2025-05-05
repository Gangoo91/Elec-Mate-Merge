
import React from "react";
import { Plug2, PowerOff, BellElectric } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

type Subsection2_3Props = {
  subsectionId: string;
  isCompleted: boolean;
  markAsComplete: () => void;
};

const Subsection2_3 = ({ subsectionId, isCompleted, markAsComplete }: Subsection2_3Props) => {
  return (
    <>
      <section>
        <h2 className="text-xl font-semibold text-elec-yellow mb-3">Component Compatibility</h2>
        <p>Ensuring component compatibility is essential for a safe and effective installation. Manufacturers' specifications, industry standards, and regulatory requirements guide the selection of compatible components.</p>
        
        <div className="mt-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border border-elec-yellow/30 p-4 rounded-md">
              <h3 className="flex items-center text-lg font-medium text-elec-yellow mb-3">
                <Plug2 className="mr-2 h-5 w-5" />
                Circuit Protection Coordination
              </h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>Ensure protective devices are correctly rated for the circuit load</li>
                <li>RCD and MCB types must be compatible with the circuit characteristics</li>
                <li>Verify coordination between upstream and downstream protective devices</li>
                <li>Consider fault current ratings and disconnection times</li>
              </ul>
              <div className="mt-4 p-3 bg-elec-gray/50 rounded text-sm">
                <p className="font-medium mb-1">Example:</p>
                <p>A Type B MCB would be appropriate for purely resistive loads, while motor circuits typically require Type C or D to handle inrush current without nuisance tripping.</p>
              </div>
            </div>
            
            <div className="border border-elec-yellow/30 p-4 rounded-md">
              <h3 className="flex items-center text-lg font-medium text-elec-yellow mb-3">
                <PowerOff className="mr-2 h-5 w-5" />
                Environmental Compatibility
              </h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>Components must have appropriate IP ratings for their environment</li>
                <li>Consider temperature ranges for installation location</li>
                <li>Special materials may be required in corrosive environments</li>
                <li>UV protection needed for outdoor components</li>
              </ul>
              <div className="mt-4 p-3 bg-elec-gray/50 rounded text-sm">
                <p className="font-medium mb-1">Example:</p>
                <p>In a swimming pool area, all accessories must be at least IP44 rated, with higher ratings required for splash zones (min. IP55) and underwater fittings (IP68).</p>
              </div>
            </div>
          </div>
          
          <div className="border border-elec-yellow/30 p-4 rounded-md">
            <h3 className="flex items-center text-lg font-medium text-elec-yellow mb-3">
              <BellElectric className="mr-2 h-5 w-5" />
              Component Selection Criteria
            </h3>
            
            <div className="overflow-x-auto mt-3">
              <table className="min-w-full border-collapse">
                <thead>
                  <tr>
                    <th className="bg-elec-gray/70 text-white p-2 text-left border border-elec-yellow/20">Compatibility Factor</th>
                    <th className="bg-elec-gray/70 text-white p-2 text-left border border-elec-yellow/20">Consideration Points</th>
                    <th className="bg-elec-gray/70 text-white p-2 text-left border border-elec-yellow/20">BS7671 Reference</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-2 border border-elec-yellow/20">Voltage Rating</td>
                    <td className="p-2 border border-elec-yellow/20">Components must be rated for the system voltage or higher</td>
                    <td className="p-2 border border-elec-yellow/20">Section 512</td>
                  </tr>
                  <tr>
                    <td className="p-2 border border-elec-yellow/20">Current Capacity</td>
                    <td className="p-2 border border-elec-yellow/20">Must handle maximum load current with appropriate derating factors</td>
                    <td className="p-2 border border-elec-yellow/20">Section 523</td>
                  </tr>
                  <tr>
                    <td className="p-2 border border-elec-yellow/20">Mechanical Protection</td>
                    <td className="p-2 border border-elec-yellow/20">Impact resistance appropriate for installation location</td>
                    <td className="p-2 border border-elec-yellow/20">Section 522</td>
                  </tr>
                  <tr>
                    <td className="p-2 border border-elec-yellow/20">Fire Performance</td>
                    <td className="p-2 border border-elec-yellow/20">Fire resistance, flame propagation characteristics</td>
                    <td className="p-2 border border-elec-yellow/20">Section 527</td>
                  </tr>
                  <tr>
                    <td className="p-2 border border-elec-yellow/20">EMC</td>
                    <td className="p-2 border border-elec-yellow/20">Electromagnetic compatibility between systems</td>
                    <td className="p-2 border border-elec-yellow/20">Section 444</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        
        <div className="mt-6 p-4 bg-elec-dark/50 border border-elec-yellow/30 rounded-lg">
          <h3 className="text-lg font-semibold text-elec-yellow mb-2">Key Component Compatibility Requirements</h3>
          <p className="mb-3">When selecting components for an electrical installation, always verify:</p>
          <ol className="list-decimal pl-6 space-y-2">
            <li>All components meet or exceed BS7671 requirements</li>
            <li>Components are compatible with system voltage and frequency</li>
            <li>All parts have appropriate certification (UKCA, BS EN standards)</li>
            <li>Protective devices provide adequate coordination</li>
            <li>Environmental conditions have been considered</li>
          </ol>
          <div className="mt-4 text-sm text-elec-light/80 italic">
            <p>Remember that component compatibility is not just about physical fit - it's about ensuring all elements work together as a coherent, safe, and efficient system throughout the installation's lifecycle.</p>
          </div>
        </div>
      </section>

      <div className="flex justify-end pt-6 border-t border-elec-yellow/20 mt-6">
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
    </>
  );
};

export default Subsection2_3;
