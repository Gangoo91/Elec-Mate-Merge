
import React from "react";

type ElectricalSymbolsSectionProps = {
  subsectionId: string;
};

const ElectricalSymbolsDisplay = ({ subsectionId }: ElectricalSymbolsSectionProps) => {
  // Only show specific content for specific subsections
  if (subsectionId !== "1.1" && subsectionId !== "2.2") return null;
  
  // Render different content based on subsection
  if (subsectionId === "1.1") {
    return (
      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-3">Visual Guide to BS7671 Electrical Symbols</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
          {/* Socket symbols */}
          <div className="bg-elec-gray/50 border border-elec-yellow/20 rounded-lg p-4">
            <h4 className="font-medium text-elec-yellow mb-3">Socket Outlets</h4>
            <div className="space-y-4">
              {/* Single socket */}
              <div className="flex flex-col items-center">
                <div className="w-14 h-14 border-2 border-white/80 rounded-md flex items-center justify-center mb-2">
                  <div className="w-8 h-8 border border-white/80 rounded-full flex items-center justify-center">
                    <div className="w-2 h-5 border-l-2 border-r-2 border-white/80"></div>
                  </div>
                </div>
                <span className="text-sm text-elec-light/80">Single Socket Outlet</span>
              </div>
              
              {/* Double socket */}
              <div className="flex flex-col items-center">
                <div className="w-14 h-14 border-2 border-white/80 rounded-md flex items-center justify-center mb-2">
                  <div className="flex space-x-1">
                    <div className="w-5 h-5 border border-white/80 rounded-full"></div>
                    <div className="w-5 h-5 border border-white/80 rounded-full"></div>
                  </div>
                </div>
                <span className="text-sm text-elec-light/80">Twin Socket Outlet</span>
              </div>
              
              {/* Switched socket */}
              <div className="flex flex-col items-center">
                <div className="w-14 h-14 border-2 border-white/80 rounded-md flex items-center justify-center mb-2">
                  <div className="w-8 h-8 border border-white/80 rounded-full flex items-center justify-center relative">
                    <div className="w-2 h-5 border-l-2 border-r-2 border-white/80"></div>
                    <div className="w-3 h-3 bg-elec-yellow absolute -top-1 -right-1 rounded-full"></div>
                  </div>
                </div>
                <span className="text-sm text-elec-light/80">Switched Socket Outlet</span>
              </div>
            </div>
          </div>
          
          {/* Switches - Updated for correct BS7671 representation */}
          <div className="bg-elec-gray/50 border border-elec-yellow/20 rounded-lg p-4">
            <h4 className="font-medium text-elec-yellow mb-3">Light Switches</h4>
            <div className="space-y-4">
              {/* One-way switch - Updated symbol */}
              <div className="flex flex-col items-center">
                <div className="w-14 h-14 border-2 border-white/80 rounded-md flex items-center justify-center mb-2">
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="16" cy="16" r="10" stroke="white" strokeWidth="1.5" fill="none"/>
                    <line x1="6" y1="16" x2="12" y2="16" stroke="white" strokeWidth="1.5"/>
                    <line x1="20" y1="16" x2="26" y2="16" stroke="white" strokeWidth="1.5"/>
                    <line x1="12" y1="16" x2="20" y2="22" stroke="white" strokeWidth="1.5"/>
                  </svg>
                </div>
                <span className="text-sm text-elec-light/80">One-way Switch</span>
              </div>
              
              {/* Two-way switch - Updated symbol */}
              <div className="flex flex-col items-center">
                <div className="w-14 h-14 border-2 border-white/80 rounded-md flex items-center justify-center mb-2">
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="16" cy="16" r="10" stroke="white" strokeWidth="1.5" fill="none"/>
                    <line x1="6" y1="12" x2="11" y2="12" stroke="white" strokeWidth="1.5"/>
                    <line x1="6" y1="20" x2="11" y2="20" stroke="white" strokeWidth="1.5"/>
                    <line x1="21" y1="16" x2="26" y2="16" stroke="white" strokeWidth="1.5"/>
                    <line x1="11" y1="12" x2="21" y2="16" stroke="white" strokeWidth="1.5"/>
                    <line x1="11" y1="20" x2="21" y2="16" stroke="white" strokeWidth="1.5"/>
                  </svg>
                </div>
                <span className="text-sm text-elec-light/80">Two-way Switch</span>
              </div>
              
              {/* Dimmer switch - Updated symbol */}
              <div className="flex flex-col items-center">
                <div className="w-14 h-14 border-2 border-white/80 rounded-md flex items-center justify-center mb-2">
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="16" cy="16" r="10" stroke="white" strokeWidth="1.5" fill="none"/>
                    <line x1="6" y1="16" x2="12" y2="16" stroke="white" strokeWidth="1.5"/>
                    <line x1="20" y1="16" x2="26" y2="16" stroke="white" strokeWidth="1.5"/>
                    <path d="M12 16C12 16 14 10 20 16" stroke="white" strokeWidth="1.5" fill="none"/>
                    <circle cx="16" cy="16" r="3" fill="#d9a52080"/>
                  </svg>
                </div>
                <span className="text-sm text-elec-light/80">Dimmer Switch</span>
              </div>
            </div>
          </div>
          
          {/* Other common symbols */}
          <div className="bg-elec-gray/50 border border-elec-yellow/20 rounded-lg p-4">
            <h4 className="font-medium text-elec-yellow mb-3">Other Common Symbols</h4>
            <div className="space-y-4">
              {/* Light fitting - Updated symbol */}
              <div className="flex flex-col items-center">
                <div className="w-14 h-14 border-2 border-white/80 rounded-md flex items-center justify-center mb-2">
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="16" cy="16" r="8" stroke="white" strokeWidth="1.5" fill="none"/>
                    <circle cx="16" cy="16" r="4" fill="#d9a52050"/>
                    <line x1="16" y1="6" x2="16" y2="8" stroke="white" strokeWidth="1.5"/>
                    <line x1="16" y1="24" x2="16" y2="26" stroke="white" strokeWidth="1.5"/>
                    <line x1="6" y1="16" x2="8" y2="16" stroke="white" strokeWidth="1.5"/>
                    <line x1="24" y1="16" x2="26" y2="16" stroke="white" strokeWidth="1.5"/>
                  </svg>
                </div>
                <span className="text-sm text-elec-light/80">Ceiling Light Fitting</span>
              </div>
              
              {/* Consumer unit */}
              <div className="flex flex-col items-center">
                <div className="w-14 h-14 border-2 border-white/80 rounded-md flex items-center justify-center mb-2">
                  <div className="w-10 h-8 border border-white/80 flex flex-col p-1">
                    <div className="border-b border-white/80 h-3 text-xs flex items-center justify-center">
                      CU
                    </div>
                    <div className="flex-1 flex items-center justify-center">
                      <div className="w-6 h-2 bg-elec-yellow/40"></div>
                    </div>
                  </div>
                </div>
                <span className="text-sm text-elec-light/80">Consumer Unit</span>
              </div>
              
              {/* Junction box - Updated symbol */}
              <div className="flex flex-col items-center">
                <div className="w-14 h-14 border-2 border-white/80 rounded-md flex items-center justify-center mb-2">
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="10" y="10" width="12" height="12" stroke="white" strokeWidth="1.5" fill="none"/>
                    <line x1="16" y1="4" x2="16" y2="10" stroke="white" strokeWidth="1.5"/>
                    <line x1="16" y1="22" x2="16" y2="28" stroke="white" strokeWidth="1.5"/>
                    <line x1="4" y1="16" x2="10" y2="16" stroke="white" strokeWidth="1.5"/>
                    <line x1="22" y1="16" x2="28" y2="16" stroke="white" strokeWidth="1.5"/>
                  </svg>
                </div>
                <span className="text-sm text-elec-light/80">Junction Box</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-4 p-3 bg-elec-gray/30 border border-elec-yellow/10 rounded text-sm text-elec-light/80">
          <p>Note: These symbols conform to BS7671 (IET Wiring Regulations) standards used in the UK. Always refer to the drawing legend for the specific meanings of symbols in a given electrical schematic.</p>
        </div>
      </div>
    );
  }
  
  // Content for subsection 2.2 (Enclosures and Accessories)
  if (subsectionId === "2.2") {
    return (
      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-3">Enclosure Types and IP Ratings</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          {/* IP Ratings Visual Guide */}
          <div className="bg-elec-gray/50 border border-elec-yellow/20 rounded-lg p-4">
            <h4 className="font-medium text-elec-yellow mb-3">Understanding IP Ratings</h4>
            <div className="space-y-4">
              {/* IP Rating Diagram */}
              <div className="flex flex-col items-center">
                <div className="w-32 h-16 border-2 border-white/80 rounded-md flex items-center justify-center mb-2 bg-elec-gray/80">
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1">
                      <span className="text-lg font-bold text-elec-yellow">IP</span>
                      <span className="text-lg font-bold text-white">6</span>
                      <span className="text-lg font-bold text-white">5</span>
                    </div>
                    <div className="flex items-center justify-center text-xs text-white/80 gap-2 mt-1">
                      <span>Solids</span>
                      <span>Liquids</span>
                    </div>
                  </div>
                </div>
                <span className="text-sm text-elec-light/80 text-center">IP (Ingress Protection) Rating Format</span>
                <p className="text-xs text-elec-light/70 mt-2 text-center">First digit: Protection against solids (0-6)<br/>Second digit: Protection against liquids (0-8)</p>
              </div>
              
              {/* Common IP Ratings */}
              <div className="mt-4 space-y-2">
                <h5 className="text-sm font-medium text-elec-yellow">Common IP Ratings in Electrical Installations:</h5>
                <ul className="list-disc pl-5 text-sm text-elec-light/80 space-y-1">
                  <li><span className="font-semibold">IP20:</span> Standard indoor enclosures (no water protection)</li>
                  <li><span className="font-semibold">IP44:</span> Splash-proof (bathrooms, outdoor under cover)</li>
                  <li><span className="font-semibold">IP65:</span> Dust-tight and water jet protection (outdoor)</li>
                  <li><span className="font-semibold">IP67:</span> Complete dust protection and temporary immersion</li>
                </ul>
              </div>
            </div>
          </div>
          
          {/* Enclosure Materials */}
          <div className="bg-elec-gray/50 border border-elec-yellow/20 rounded-lg p-4">
            <h4 className="font-medium text-elec-yellow mb-3">Enclosure Materials</h4>
            <div className="space-y-4">
              {/* Metal Enclosure */}
              <div className="flex items-start gap-3">
                <div className="w-14 h-14 border-2 border-gray-400 rounded-md flex items-center justify-center bg-gray-600/30">
                  <div className="w-10 h-10 bg-gradient-to-br from-gray-300 to-gray-500 rounded"></div>
                </div>
                <div>
                  <h5 className="text-sm font-semibold text-white">Metal Enclosures</h5>
                  <ul className="list-disc pl-5 text-xs text-elec-light/80 space-y-0.5 mt-1">
                    <li>Superior mechanical protection</li>
                    <li>Better heat dissipation</li>
                    <li>EMI/RFI shielding capabilities</li>
                    <li>Must be properly earthed</li>
                  </ul>
                </div>
              </div>
              
              {/* Plastic Enclosure */}
              <div className="flex items-start gap-3">
                <div className="w-14 h-14 border-2 border-white/60 rounded-md flex items-center justify-center">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-200/20 to-blue-300/20 rounded"></div>
                </div>
                <div>
                  <h5 className="text-sm font-semibold text-white">Plastic Enclosures</h5>
                  <ul className="list-disc pl-5 text-xs text-elec-light/80 space-y-0.5 mt-1">
                    <li>Electrical insulation properties</li>
                    <li>Lightweight and corrosion resistant</li>
                    <li>Lower cost than metal alternatives</li>
                    <li>Limited heat dissipation</li>
                  </ul>
                </div>
              </div>
              
              {/* Fire-Rated Enclosure */}
              <div className="flex items-start gap-3">
                <div className="w-14 h-14 border-2 border-red-500/60 rounded-md flex items-center justify-center bg-red-900/20">
                  <div className="w-10 h-10 bg-gradient-to-br from-red-400/30 to-orange-300/20 rounded flex items-center justify-center">
                    <span className="text-xs font-bold text-red-400">FR</span>
                  </div>
                </div>
                <div>
                  <h5 className="text-sm font-semibold text-white">Fire-Rated Enclosures</h5>
                  <ul className="list-disc pl-5 text-xs text-elec-light/80 space-y-0.5 mt-1">
                    <li>Required for fire barrier penetrations</li>
                    <li>Typically rated in minutes of fire protection</li>
                    <li>Common ratings: 30, 60, 90 minutes</li>
                    <li>Must maintain circuit integrity</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Mounting Methods */}
        <div className="bg-elec-gray/50 border border-elec-yellow/20 rounded-lg p-4 mt-6">
          <h4 className="font-medium text-elec-yellow mb-3">Enclosure Mounting Methods</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Surface Mounting */}
            <div className="flex flex-col items-center">
              <div className="w-20 h-16 border-2 border-white/80 rounded-md flex items-center justify-center mb-2 relative">
                <div className="w-14 h-10 border border-white/80 rounded"></div>
                <div className="absolute w-full h-1 bg-gray-500/50 bottom-0"></div>
              </div>
              <span className="text-sm text-elec-light/80 font-medium">Surface Mounting</span>
              <ul className="list-disc pl-5 text-xs text-elec-light/80 space-y-0.5 mt-1 self-start">
                <li>Used on finished walls</li>
                <li>Readily accessible for maintenance</li>
                <li>Requires adequate fixing to surface</li>
              </ul>
            </div>
            
            {/* Flush Mounting */}
            <div className="flex flex-col items-center">
              <div className="w-20 h-16 border-2 border-white/80 rounded-md flex items-center justify-center mb-2 relative bg-gray-700/50">
                <div className="w-14 h-10 border border-white/80 rounded bg-elec-gray/70"></div>
                <div className="absolute w-full h-full border-4 border-gray-600/60 rounded-md"></div>
              </div>
              <span className="text-sm text-elec-light/80 font-medium">Flush Mounting</span>
              <ul className="list-disc pl-5 text-xs text-elec-light/80 space-y-0.5 mt-1 self-start">
                <li>Recessed into walls or ceilings</li>
                <li>More aesthetically pleasing</li>
                <li>Requires larger space in building fabric</li>
              </ul>
            </div>
            
            {/* DIN Rail Mounting */}
            <div className="flex flex-col items-center">
              <div className="w-20 h-16 border-2 border-white/80 rounded-md flex items-center justify-center mb-2 relative">
                <div className="w-14 h-1 bg-yellow-500/80 absolute top-4"></div>
                <div className="w-10 h-6 border border-white/80 rounded absolute top-5 bg-elec-gray/70"></div>
              </div>
              <span className="text-sm text-elec-light/80 font-medium">DIN Rail Mounting</span>
              <ul className="list-disc pl-5 text-xs text-elec-light/80 space-y-0.5 mt-1 self-start">
                <li>Standard 35mm profile rail</li>
                <li>Quick installation and removal</li>
                <li>Common in consumer units/distribution boards</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="mt-6 p-4 bg-elec-gray/30 border border-elec-yellow/10 rounded">
          <h4 className="text-base font-medium text-elec-yellow mb-3">Selection Considerations for Enclosures</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h5 className="text-sm font-semibold mb-2">Environmental Factors:</h5>
              <ul className="list-disc pl-5 text-sm text-elec-light/80 space-y-1">
                <li>Ambient temperature range</li>
                <li>Presence of water, dust or corrosive substances</li>
                <li>UV exposure for outdoor installations</li>
                <li>Physical impact risk and mechanical protection needs</li>
              </ul>
            </div>
            <div>
              <h5 className="text-sm font-semibold mb-2">Regulatory Requirements:</h5>
              <ul className="list-disc pl-5 text-sm text-elec-light/80 space-y-1">
                <li>BS 7671 minimum protection ratings</li>
                <li>Fire resistance requirements</li>
                <li>Circuit segregation needs</li>
                <li>Accessibility for maintenance (Reg. 513.1)</li>
              </ul>
            </div>
          </div>
          <div className="mt-4 text-sm text-elec-light/80">
            <p className="font-semibold">BS EN 60529 classifies IP ratings while BS EN 62208 provides requirements for empty enclosures used in electrical installations.</p>
          </div>
        </div>
      </div>
    );
  }
  
  return null;
};

export default ElectricalSymbolsDisplay;
