
import React from "react";

type Subsection1_3Props = {
  subsectionId: string;
};

const Subsection1_3 = ({ subsectionId }: Subsection1_3Props) => {
  return (
    <>
      <section>
        <h2 className="text-xl font-semibold text-elec-yellow mb-3">Installation Zones in Buildings</h2>
        <p>BS 7671 specifies preferred zones for cable routes in walls to minimise the risk of damage:</p>
        <div className="border border-elec-yellow/30 p-4 rounded-md mt-3">
          <h3 className="font-semibold">Horizontal Zones:</h3>
          <ul className="list-disc pl-5 mt-1">
            <li>0-150mm from ceiling</li>
            <li>150-450mm from ceiling</li>
            <li>0-150mm from floor</li>
          </ul>
          
          <h3 className="font-semibold mt-4">Vertical Zones:</h3>
          <ul className="list-disc pl-5 mt-1">
            <li>0-150mm from corners</li>
            <li>150-450mm from openings (doors, windows)</li>
          </ul>
        </div>
        <p className="mt-3">Cables run outside these zones should be at least 50mm deep or have additional mechanical protection.</p>
      </section>
      
      <section>
        <h2 className="text-xl font-semibold text-elec-yellow mb-3">Special Location Considerations</h2>
        <p>Certain locations have specific zone requirements that affect cable routing:</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
          <div className="border border-elec-yellow/30 p-3 rounded-md">
            <p className="font-semibold mb-2">Bathrooms:</p>
            <ul className="list-disc pl-5">
              <li>Divided into zones 0, 1, 2, and outside zones</li>
              <li>Specific IP ratings required in each zone</li>
              <li>Restrictions on equipment in zones 0 and 1</li>
              <li>SELV devices preferred in wet zones</li>
            </ul>
          </div>
          <div className="border border-elec-yellow/30 p-3 rounded-md">
            <p className="font-semibold mb-2">Kitchens:</p>
            <ul className="list-disc pl-5">
              <li>Socket outlets at least 150mm above worktops</li>
              <li>Avoidance of areas behind appliances</li>
              <li>Special considerations for cooker circuits</li>
              <li>Higher rating for circuits supplying fixed appliances</li>
            </ul>
          </div>
        </div>
        
        {/* New detailed bathroom zones content */}
        <div className="mt-6 border border-elec-yellow/30 p-4 rounded-md bg-elec-gray/30">
          <h3 className="text-lg font-semibold text-elec-yellow mb-3">Bathroom Zones in Detail (BS 7671)</h3>
          
          <div className="mb-5">
            <p className="mb-3">Bathrooms are classified into specific zones based on proximity to water sources, with each zone having distinct requirements for electrical equipment:</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="relative min-h-[260px] border border-elec-yellow/20 rounded-md bg-elec-dark/50 p-3">
                <h4 className="font-medium text-elec-yellow mb-2">Bathroom Zones Diagram</h4>
                <div className="w-full h-[220px] relative">
                  {/* Bath outline */}
                  <div className="absolute bottom-4 left-4 right-4 h-16 border-2 border-white/60 rounded-b-lg"></div>
                  
                  {/* Zone 0 */}
                  <div className="absolute bottom-4 left-4 right-4 h-12 bg-blue-500/20 border border-blue-400/40 flex items-center justify-center">
                    <span className="text-xs font-bold text-blue-300">ZONE 0</span>
                  </div>
                  
                  {/* Zone 1 */}
                  <div className="absolute bottom-4 left-4 right-4 h-32 border border-red-400/40 flex items-end pb-14 justify-center">
                    <span className="text-xs font-bold text-red-300">ZONE 1</span>
                  </div>
                  
                  {/* Zone 2 */}
                  <div className="absolute bottom-4 left-[-12px] right-[-12px] h-32 border border-yellow-400/40 flex items-start pt-2 justify-center">
                    <span className="text-xs font-bold text-yellow-300">ZONE 2</span>
                  </div>
                  
                  {/* Shower head */}
                  <div className="absolute top-12 right-8 w-4 h-4 bg-gray-300 rounded-full"></div>
                  <div className="absolute top-16 right-8 w-0.5 h-12 bg-gray-300"></div>
                </div>
                <p className="text-xs text-elec-light/70 mt-1 absolute bottom-1 right-2">Simplified diagram (not to scale)</p>
              </div>
              
              <div className="space-y-3 text-sm">
                <div>
                  <h4 className="font-medium text-blue-300">Zone 0</h4>
                  <p className="text-elec-light/90">The interior of the bath or shower basin. Only SELV (max 12V AC) equipment with a minimum rating of IPX7 can be installed here.</p>
                </div>
                
                <div>
                  <h4 className="font-medium text-red-300">Zone 1</h4>
                  <p className="text-elec-light/90">Area directly above the bath/shower up to a height of 2.25m from the floor. Equipment must be at least IPX4 and generally limited to water heaters, shower pumps, and SELV equipment.</p>
                </div>
                
                <div>
                  <h4 className="font-medium text-yellow-300">Zone 2</h4>
                  <p className="text-elec-light/90">Area extending 0.6m beyond zone 1, to a height of 2.25m from the floor. Equipment must be IPX4 rated or better. More options permitted including lighting.</p>
                </div>
                
                <div>
                  <h4 className="font-medium text-green-300">Outside Zones</h4>
                  <p className="text-elec-light/90">All other areas of the bathroom. Standard restrictions apply, all accessories must be suitable for the location, typically IPX2 in wet environments.</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">
            <div>
              <h4 className="font-medium text-elec-yellow mb-2">Equipment Restrictions by Zone</h4>
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="border-b border-elec-yellow/30">
                    <th className="py-2 px-2 text-left text-elec-yellow/90">Zone</th>
                    <th className="py-2 px-2 text-left text-elec-yellow/90">Permitted Equipment</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-elec-yellow/10">
                    <td className="py-2 px-2 text-blue-300">Zone 0</td>
                    <td className="py-2 px-2 text-elec-light/90">SELV 12V AC devices designed for the zone (IPX7)</td>
                  </tr>
                  <tr className="border-b border-elec-yellow/10">
                    <td className="py-2 px-2 text-red-300">Zone 1</td>
                    <td className="py-2 px-2 text-elec-light/90">SELV devices, shower pumps, water heaters (IPX4)</td>
                  </tr>
                  <tr className="border-b border-elec-yellow/10">
                    <td className="py-2 px-2 text-yellow-300">Zone 2</td>
                    <td className="py-2 px-2 text-elec-light/90">As Zone 1 plus luminaires, radiant heaters, towel rails, sockets for shavers/toothbrushes (IPX4)</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-2 text-green-300">Outside</td>
                    <td className="py-2 px-2 text-elec-light/90">Standard accessories suitable for location</td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <div>
              <h4 className="font-medium text-elec-yellow mb-2">IP Rating Requirements</h4>
              <ul className="list-disc pl-5 text-sm space-y-2">
                <li><span className="font-medium text-blue-300">Zone 0:</span> Minimum IPX7 (protected against immersion)</li>
                <li><span className="font-medium text-red-300">Zone 1:</span> Minimum IPX4 (protected against water splashes)</li>
                <li><span className="font-medium text-yellow-300">Zone 2:</span> Minimum IPX4 (protected against water splashes)</li>
                <li><span className="font-medium text-green-300">Outside Zones:</span> Standard regulations apply</li>
              </ul>
              
              <div className="mt-4 border border-elec-yellow/30 p-3 rounded-md bg-elec-yellow/10">
                <h5 className="font-medium mb-1">Important Safety Note</h5>
                <p className="text-sm text-elec-light/90">All bathroom circuits must be protected by a 30mA RCD. Switches must be either outside the bathroom or cord-operated within the room (except SELV switches).</p>
              </div>
            </div>
          </div>
          
          <div className="mt-4 text-sm text-elec-light/80">
            <p><strong>Note:</strong> Bathroom zones are measured from the edge of baths, shower basins, or in the case of showers without trays, from the fixed water outlet. Dimensions are important and should be precisely measured during installation planning.</p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Subsection1_3;
