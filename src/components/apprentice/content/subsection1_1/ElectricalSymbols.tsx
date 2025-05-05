
import React from "react";
import { Ruler } from "lucide-react";

const ElectricalSymbols = () => {
  return (
    <div className="bg-elec-dark/50 border border-elec-yellow/30 rounded-lg p-6 space-y-4">
      <h3 className="text-xl font-bold text-elec-yellow flex items-center">
        <Ruler className="h-5 w-5 mr-2" />
        Electrical Symbols and Notations
      </h3>
      
      <div className="space-y-4">
        <p>
          BS EN 60617 standardises electrical symbols used in drawings. Recognising these symbols is essential for 
          interpreting electrical plans correctly. Common symbols include:
        </p>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="border border-elec-yellow/20 rounded p-3 text-sm">
            <div className="font-semibold text-elec-yellow mb-1">Power</div>
            <ul className="list-disc pl-4 space-y-1">
              <li>Socket outlet (single/twin)</li>
              <li>Fused connection unit</li>
              <li>Consumer unit/distribution board</li>
              <li>Isolator switch</li>
            </ul>
          </div>
          
          <div className="border border-elec-yellow/20 rounded p-3 text-sm">
            <div className="font-semibold text-elec-yellow mb-1">Lighting</div>
            <ul className="list-disc pl-4 space-y-1">
              <li>Ceiling rose/pendant</li>
              <li>Wall light</li>
              <li>Spotlights/downlights</li>
              <li>Emergency lighting</li>
            </ul>
          </div>
          
          <div className="border border-elec-yellow/20 rounded p-3 text-sm">
            <div className="font-semibold text-elec-yellow mb-1">Control</div>
            <ul className="list-disc pl-4 space-y-1">
              <li>One-way switch</li>
              <li>Two-way switch</li>
              <li>Intermediate switch</li>
              <li>Dimmer switch</li>
            </ul>
          </div>
          
          <div className="border border-elec-yellow/20 rounded p-3 text-sm">
            <div className="font-semibold text-elec-yellow mb-1">Protection</div>
            <ul className="list-disc pl-4 space-y-1">
              <li>Circuit breaker</li>
              <li>RCD (Residual Current Device)</li>
              <li>RCBO</li>
              <li>Fuse</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ElectricalSymbols;
