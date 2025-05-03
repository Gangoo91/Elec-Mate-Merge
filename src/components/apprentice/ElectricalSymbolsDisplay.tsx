
import React from "react";

type ElectricalSymbolsSectionProps = {
  subsectionId: string;
};

const ElectricalSymbolsDisplay = ({ subsectionId }: ElectricalSymbolsSectionProps) => {
  // Only show for specific subsections
  if (subsectionId !== "1.1") return null;
  
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
        
        {/* Switches */}
        <div className="bg-elec-gray/50 border border-elec-yellow/20 rounded-lg p-4">
          <h4 className="font-medium text-elec-yellow mb-3">Light Switches</h4>
          <div className="space-y-4">
            {/* One-way switch */}
            <div className="flex flex-col items-center">
              <div className="w-14 h-14 border-2 border-white/80 rounded-md flex items-center justify-center mb-2">
                <div className="w-10 h-4 flex items-center">
                  <div className="w-4 h-0.5 bg-white"></div>
                  <div className="w-2 h-2 border border-white rounded-full"></div>
                  <div className="w-4 h-0.5 bg-white"></div>
                </div>
              </div>
              <span className="text-sm text-elec-light/80">One-way Switch</span>
            </div>
            
            {/* Two-way switch */}
            <div className="flex flex-col items-center">
              <div className="w-14 h-14 border-2 border-white/80 rounded-md flex items-center justify-center mb-2">
                <div className="w-10 h-8 flex flex-col items-center justify-center">
                  <div className="w-8 h-0.5 bg-white mb-1"></div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 border border-white rounded-full"></div>
                    <div className="w-4 h-0.5 bg-white transform rotate-45 translate-x-1 -translate-y-1"></div>
                  </div>
                  <div className="w-8 h-0.5 bg-white mt-1"></div>
                </div>
              </div>
              <span className="text-sm text-elec-light/80">Two-way Switch</span>
            </div>
            
            {/* Dimmer switch */}
            <div className="flex flex-col items-center">
              <div className="w-14 h-14 border-2 border-white/80 rounded-md flex items-center justify-center mb-2">
                <div className="w-8 h-8 border border-white/80 rounded-full flex items-center justify-center">
                  <div className="w-5 h-5 bg-elec-yellow/30 rounded-full"></div>
                </div>
              </div>
              <span className="text-sm text-elec-light/80">Dimmer Switch</span>
            </div>
          </div>
        </div>
        
        {/* Other common symbols */}
        <div className="bg-elec-gray/50 border border-elec-yellow/20 rounded-lg p-4">
          <h4 className="font-medium text-elec-yellow mb-3">Other Common Symbols</h4>
          <div className="space-y-4">
            {/* Light fitting */}
            <div className="flex flex-col items-center">
              <div className="w-14 h-14 border-2 border-white/80 rounded-md flex items-center justify-center mb-2">
                <div className="w-8 h-8 border-2 border-white/80 rounded-full flex items-center justify-center">
                  <div className="w-4 h-4 bg-elec-yellow/50 rounded-full"></div>
                </div>
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
            
            {/* Junction box */}
            <div className="flex flex-col items-center">
              <div className="w-14 h-14 border-2 border-white/80 rounded-md flex items-center justify-center mb-2">
                <div className="w-8 h-8 flex items-center justify-center">
                  <div className="w-6 h-6 border border-white/80 relative">
                    <div className="absolute top-0 left-1/2 h-2 w-0.5 -translate-x-1/2 -translate-y-1/2 bg-white"></div>
                    <div className="absolute bottom-0 left-1/2 h-2 w-0.5 -translate-x-1/2 translate-y-1/2 bg-white"></div>
                    <div className="absolute left-0 top-1/2 h-0.5 w-2 -translate-x-1/2 -translate-y-1/2 bg-white"></div>
                    <div className="absolute right-0 top-1/2 h-0.5 w-2 translate-x-1/2 -translate-y-1/2 bg-white"></div>
                  </div>
                </div>
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
};

export default ElectricalSymbolsDisplay;
