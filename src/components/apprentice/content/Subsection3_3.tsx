
import React from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle, Ruler, Cable } from "lucide-react";

interface Subsection3_3Props {
  subsectionId: string;
  isCompleted: boolean;
  markAsComplete: () => void;
}

const Subsection3_3 = ({ subsectionId, isCompleted, markAsComplete }: Subsection3_3Props) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-elec-yellow">Cable Installation Techniques</h2>
      
      <div className="space-y-5">
        <p>
          Proper cable installation techniques ensure the safety, reliability, and longevity of electrical installations.
          Correctly installed cables minimize voltage drop, reduce electromagnetic interference, and prevent damage during and after installation.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div className="bg-elec-dark/50 border border-elec-yellow/30 rounded-lg p-6 space-y-4">
            <h3 className="text-xl font-bold text-elec-yellow">Installation in Containment Systems</h3>
            
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-white mb-2 flex items-center">
                  <Cable className="h-4 w-4 mr-2 text-elec-yellow" />
                  Trunking
                </h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Ensure cables are laid flat and not crossing over each other</li>
                  <li>Fill trunking to no more than 45% of its internal area</li>
                  <li>Use trunking dividers to separate circuits of different types</li>
                  <li>Support longer cable runs to prevent sagging</li>
                  <li>Maintain minimum bending radii for all cables</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold text-white mb-2 flex items-center">
                  <Cable className="h-4 w-4 mr-2 text-elec-yellow" />
                  Conduit
                </h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Install draw wires before running cables through conduit</li>
                  <li>Fill conduit to no more than 40% of its internal area</li>
                  <li>Use appropriate lubricant to reduce friction during pulling</li>
                  <li>Install inspection fittings at strategic points for future access</li>
                  <li>Keep maximum lengths between draw points to 15m straight or 10m with bends</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold text-white mb-2 flex items-center">
                  <Cable className="h-4 w-4 mr-2 text-elec-yellow" />
                  Cable Trays
                </h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Space heavy cables evenly across the width of the tray</li>
                  <li>Use cable ties or cleats to secure cables at regular intervals</li>
                  <li>Install vertical support for rising sections to prevent cable slippage</li>
                  <li>Maintain appropriate spacing between power and data/signal cables</li>
                  <li>Ensure tray has adequate load capacity for the intended cables</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="bg-elec-dark/50 border border-elec-yellow/30 rounded-lg p-6 space-y-4">
            <h3 className="text-xl font-bold text-elec-yellow">Installation in Building Structures</h3>
            
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-white mb-2 flex items-center">
                  <Ruler className="h-4 w-4 mr-2 text-elec-yellow" />
                  Cavity Walls
                </h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Run cables vertically or horizontally, not diagonally</li>
                  <li>Position cables within allowed zones (as per BS 7671)</li>
                  <li>Use appropriate cable clips at 400mm intervals</li>
                  <li>Protect cables passing through metal studs with grommets</li>
                  <li>Allow sufficient slack at outlet boxes for connections</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold text-white mb-2 flex items-center">
                  <Ruler className="h-4 w-4 mr-2 text-elec-yellow" />
                  Solid Walls
                </h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Install cable in chases at minimum 50mm depth</li>
                  <li>Protect cables with earthed metal covering if less than 50mm deep</li>
                  <li>Secure cables before plastering using appropriate fixings</li>
                  <li>Run cables in permitted zones to avoid damage from fixings</li>
                  <li>Consider mechanical protection with conduit in vulnerable areas</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold text-white mb-2 flex items-center">
                  <Ruler className="h-4 w-4 mr-2 text-elec-yellow" />
                  Under Floors
                </h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Support cables every 400mm in suspended floors</li>
                  <li>Use conduit or trunking for additional protection</li>
                  <li>Keep cables at least 50mm from metal pipes</li>
                  <li>Protect cables crossing joists with metal plates</li>
                  <li>Avoid placing cables in areas susceptible to water penetration</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-8 bg-elec-dark/30 border border-elec-yellow/20 rounded-lg p-6">
          <h3 className="text-xl font-bold text-elec-yellow mb-4">Cable Protection and Support</h3>
          
          <div className="space-y-5">
            <p>
              Proper protection and support of cables is essential for preventing damage and ensuring the installation meets regulations.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h4 className="font-semibold text-white">Mechanical Protection</h4>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    <span className="font-medium">Metal Plates</span>
                    <p className="text-sm mt-1">Install where cables pass through joists or studs to prevent penetration by nails or screws.</p>
                  </li>
                  <li>
                    <span className="font-medium">Conduit or Trunking</span>
                    <p className="text-sm mt-1">Use in areas where cables are exposed to physical damage or environmental factors.</p>
                  </li>
                  <li>
                    <span className="font-medium">Armored Cable</span>
                    <p className="text-sm mt-1">Consider SWA cable for external runs or areas with high risk of physical damage.</p>
                  </li>
                </ul>
              </div>
              
              <div className="space-y-3">
                <h4 className="font-semibold text-white">Support Methods</h4>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    <span className="font-medium">Cable Clips</span>
                    <p className="text-sm mt-1">Space according to cable size and route. Typically 300-400mm intervals for horizontal runs.</p>
                  </li>
                  <li>
                    <span className="font-medium">Cable Ties</span>
                    <p className="text-sm mt-1">Use appropriately rated ties and avoid over-tightening which can damage cable insulation.</p>
                  </li>
                  <li>
                    <span className="font-medium">Saddles and Cleats</span>
                    <p className="text-sm mt-1">Required for larger cables to provide adequate support and prevent strain.</p>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="mt-5 pt-5 border-t border-elec-yellow/20">
              <h4 className="font-semibold text-white mb-3">Installation Spacing Requirements</h4>
              <div className="overflow-x-auto">
                <table className="min-w-full border-collapse">
                  <thead>
                    <tr className="bg-elec-yellow/20">
                      <th className="px-4 py-2 text-left text-sm font-semibold text-elec-yellow">Cable Type</th>
                      <th className="px-4 py-2 text-left text-sm font-semibold text-elec-yellow">Min. Spacing from Other Services</th>
                      <th className="px-4 py-2 text-left text-sm font-semibold text-elec-yellow">Support Interval (Horizontal)</th>
                      <th className="px-4 py-2 text-left text-sm font-semibold text-elec-yellow">Support Interval (Vertical)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-elec-yellow/10">
                    <tr>
                      <td className="px-4 py-2 text-sm">Flat Twin & Earth</td>
                      <td className="px-4 py-2 text-sm">50mm</td>
                      <td className="px-4 py-2 text-sm">400mm</td>
                      <td className="px-4 py-2 text-sm">400mm</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 text-sm">Single Core</td>
                      <td className="px-4 py-2 text-sm">50mm</td>
                      <td className="px-4 py-2 text-sm">300mm</td>
                      <td className="px-4 py-2 text-sm">400mm</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 text-sm">Steel Wire Armored</td>
                      <td className="px-4 py-2 text-sm">75mm</td>
                      <td className="px-4 py-2 text-sm">600mm</td>
                      <td className="px-4 py-2 text-sm">800mm</td>
                    </tr>
                  </tbody>
                </table>
              </div>
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

export default Subsection3_3;
