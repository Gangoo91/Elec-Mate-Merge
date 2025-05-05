
import React from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle, Ruler, Droplet } from "lucide-react";

type Subsection1_3Props = {
  subsectionId: string;
  isCompleted: boolean;
  markAsComplete: () => void;
};

const Subsection1_3 = ({ subsectionId, isCompleted, markAsComplete }: Subsection1_3Props) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-elec-yellow">Installation Zones and Special Locations</h2>
      
      <div className="space-y-5">
        <p>
          BS 7671 defines specific installation zones to ensure safe cable routing and equipment placement. 
          Understanding these zones is essential for compliant installations that minimise the risk of cables 
          being damaged by nails, screws or drills during subsequent work.
        </p>
        
        <div className="bg-elec-dark/50 border border-elec-yellow/30 rounded-lg p-6 space-y-5 mt-6">
          <h3 className="text-xl font-bold text-elec-yellow flex items-center">
            <Ruler className="h-5 w-5 mr-2" />
            Standard Installation Zones
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h4 className="font-semibold text-white">Horizontal Zones</h4>
              <p>Horizontal cable runs should be installed within these zones:</p>
              
              <ul className="list-disc pl-5 space-y-2 mt-2">
                <li><span className="font-medium">0-150mm</span> from ceiling</li>
                <li><span className="font-medium">150-450mm</span> from ceiling</li>
                <li><span className="font-medium">0-150mm</span> from floor</li>
                <li><span className="font-medium">150-450mm</span> from floor</li>
              </ul>
              
              <div className="bg-elec-dark/70 p-3 rounded-md mt-3 text-sm">
                <p className="font-semibold text-elec-yellow mb-1">Safety Reminder:</p>
                <p>Cable runs outside these zones should either be installed at least 50mm deep or have additional mechanical protection to prevent damage from drilling or fixings.</p>
              </div>
            </div>
            
            <div className="space-y-3">
              <h4 className="font-semibold text-white">Vertical Zones</h4>
              <p>Vertical cable runs should be installed within these zones:</p>
              
              <ul className="list-disc pl-5 space-y-2 mt-2">
                <li><span className="font-medium">0-150mm</span> from internal corners</li>
                <li><span className="font-medium">150-450mm</span> from openings (doors, windows)</li>
                <li><span className="font-medium">In-line</span> with accessories (vertical drop from socket to floor)</li>
              </ul>
              
              <div className="bg-elec-dark/70 p-3 rounded-md mt-3 text-sm">
                <p className="font-semibold text-elec-yellow mb-1">RCD Protection:</p>
                <p>If cables must run outside these zones, consider additional RCD protection to provide enhanced safety against potential damage.</p>
              </div>
            </div>
          </div>
          
          <div className="pt-5 border-t border-elec-yellow/20 mt-4">
            <h4 className="font-semibold text-white mb-3">Standard Mounting Heights</h4>
            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse text-sm">
                <thead>
                  <tr className="border-b border-elec-yellow/30">
                    <th className="py-2 px-2 text-left text-elec-yellow">Component</th>
                    <th className="py-2 px-2 text-left text-elec-yellow">Standard Height (from FFL)</th>
                    <th className="py-2 px-2 text-left text-elec-yellow">Accessibility Considerations</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-elec-yellow/10">
                  <tr>
                    <td className="py-2 px-2">Light switches</td>
                    <td className="py-2 px-2">1200mm (centre)</td>
                    <td className="py-2 px-2">900-1000mm for wheelchair users</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-2">Socket outlets</td>
                    <td className="py-2 px-2">450mm (centre)</td>
                    <td className="py-2 px-2">400-1000mm for wheelchair users</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-2">Consumer units</td>
                    <td className="py-2 px-2">1350-1500mm (top)</td>
                    <td className="py-2 px-2">900-1100mm for wheelchair users</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-2">Cooker control units</td>
                    <td className="py-2 px-2">1050-1200mm (centre)</td>
                    <td className="py-2 px-2">Avoid positioning above the hob</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-2">Distribution boards</td>
                    <td className="py-2 px-2">2000mm (maximum)</td>
                    <td className="py-2 px-2">Operating height not to exceed 2m</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        
        <div className="mt-8 bg-elec-dark/30 border border-elec-yellow/20 rounded-lg p-6">
          <h3 className="text-xl font-bold text-elec-yellow flex items-center">
            <Droplet className="h-5 w-5 mr-2" />
            Special Locations
          </h3>
          
          <div className="space-y-5 mt-4">
            <p>
              Certain locations have specific requirements due to increased risks. These are covered in Part 7 of BS 7671 
              and require careful consideration of zoning, IP ratings, and equipment selection.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
              <div className="bg-elec-dark/50 border border-elec-yellow/20 rounded-lg p-4">
                <h4 className="font-semibold text-elec-yellow mb-3">Bathroom Zones</h4>
                
                <div className="space-y-3">
                  <div>
                    <h5 className="font-medium text-white">Zone 0</h5>
                    <p className="text-sm mt-1">Inside the bath or shower basin. Only SELV (max 12V AC) equipment with minimum IPX7 rating.</p>
                  </div>
                  
                  <div>
                    <h5 className="font-medium text-white">Zone 1</h5>
                    <p className="text-sm mt-1">Above the bath/shower to 2.25m from floor level. Minimum IPX4 rating, limited to shower pumps, water heaters, SELV equipment.</p>
                  </div>
                  
                  <div>
                    <h5 className="font-medium text-white">Zone 2</h5>
                    <p className="text-sm mt-1">Area extending 0.6m beyond Zone 1 and to 2.25m above floor. Minimum IPX4 rating, greater equipment options including luminaires.</p>
                  </div>
                  
                  <div className="bg-elec-dark/70 p-3 rounded-md mt-3 text-sm">
                    <p className="font-semibold text-elec-yellow mb-1">Important Requirement:</p>
                    <p>All circuits in bathrooms must be protected by a 30mA RCD. Switches must be cord-operated or outside the room except for SELV switches.</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-elec-dark/50 border border-elec-yellow/20 rounded-lg p-4">
                <h4 className="font-semibold text-elec-yellow mb-3">Swimming Pool Zones</h4>
                
                <div className="space-y-3">
                  <div>
                    <h5 className="font-medium text-white">Zone 0</h5>
                    <p className="text-sm mt-1">Inside the pool basin. Only SELV equipment (max 12V AC) with IPX8 rating permitted.</p>
                  </div>
                  
                  <div>
                    <h5 className="font-medium text-white">Zone 1</h5>
                    <p className="text-sm mt-1">2.5m horizontally from pool edge and 2.5m above. Very limited equipment, minimum IPX4 rating.</p>
                  </div>
                  
                  <div>
                    <h5 className="font-medium text-white">Zone 2</h5>
                    <p className="text-sm mt-1">1.5m beyond Zone 1 and 2.5m above floor. Minimum IPX2 rating (IPX4 if water jets used for cleaning).</p>
                  </div>
                  
                  <div className="bg-elec-dark/70 p-3 rounded-md mt-3 text-sm">
                    <p className="font-semibold text-elec-yellow mb-1">Additional Protection:</p>
                    <p>All circuits in Zones 0, 1 and 2 must be protected by a 30mA RCD. Supplementary equipotential bonding required for all extraneous-conductive-parts.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
              <div className="bg-elec-dark/50 border border-elec-yellow/20 rounded-lg p-4">
                <h4 className="font-semibold text-elec-yellow mb-3">Kitchens</h4>
                
                <div className="space-y-3">
                  <p className="text-sm">While not formally zoned like bathrooms, kitchens have specific requirements:</p>
                  
                  <ul className="list-disc pl-5 space-y-2">
                    <li><span className="font-medium">Socket positioning</span> - At least 150mm above worktops, away from sinks</li>
                    <li><span className="font-medium">Appliance circuits</span> - Dedicated circuits for major appliances</li>
                    <li><span className="font-medium">RCD protection</span> - Required for socket outlets likely to supply portable equipment outdoors</li>
                    <li><span className="font-medium">IP ratings</span> - Increased protection near sinks and water sources</li>
                  </ul>
                </div>
              </div>
              
              <div className="bg-elec-dark/50 border border-elec-yellow/20 rounded-lg p-4">
                <h4 className="font-semibold text-elec-yellow mb-3">Agricultural Installations</h4>
                
                <div className="space-y-3">
                  <p className="text-sm">Specific requirements for farms and agricultural buildings:</p>
                  
                  <ul className="list-disc pl-5 space-y-2">
                    <li><span className="font-medium">Protection against fire</span> - AFDDs often required</li>
                    <li><span className="font-medium">IP ratings</span> - Minimum IP44 for most areas, higher in wash-down zones</li>
                    <li><span className="font-medium">Additional protection</span> - 30mA RCD protection typically required</li>
                    <li><span className="font-medium">Equipotential bonding</span> - Comprehensive bonding requirements</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="mt-6 pt-6 border-t border-elec-yellow/20">
              <h4 className="font-semibold text-white mb-3">Other Special Locations</h4>
              <p className="mb-3">BS 7671 Section 7 covers many other special locations with specific requirements:</p>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <div className="bg-elec-dark/70 p-3 rounded-md text-sm">
                  <p className="font-medium text-elec-yellow">Saunas</p>
                  <p>Temperature resistance, zoning based on heat levels</p>
                </div>
                
                <div className="bg-elec-dark/70 p-3 rounded-md text-sm">
                  <p className="font-medium text-elec-yellow">Marinas</p>
                  <p>Corrosion resistance, specific RCD requirements</p>
                </div>
                
                <div className="bg-elec-dark/70 p-3 rounded-md text-sm">
                  <p className="font-medium text-elec-yellow">Medical Locations</p>
                  <p>Backup power, equipotential bonding</p>
                </div>
                
                <div className="bg-elec-dark/70 p-3 rounded-md text-sm">
                  <p className="font-medium text-elec-yellow">Exhibition Halls</p>
                  <p>Flexible distribution, additional RCD protection</p>
                </div>
                
                <div className="bg-elec-dark/70 p-3 rounded-md text-sm">
                  <p className="font-medium text-elec-yellow">Solar Installations</p>
                  <p>DC systems, specialised protection, weather resistance</p>
                </div>
                
                <div className="bg-elec-dark/70 p-3 rounded-md text-sm">
                  <p className="font-medium text-elec-yellow">Construction Sites</p>
                  <p>Robust protection, regular inspection, temporary installations</p>
                </div>
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

export default Subsection1_3;
